import React, {
  useContext,
  useCallback,
  useMemo,
  useState,
  useRef,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import tooltip from './tooltip';
import { Context } from '../../context';
import axios from 'axios';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import Stepper from '../stepper';
import {
  customBoolean,
  customDateTime,
  customThreeDigitNumber,
  customNoGmailDomain,
  validInternationalPhoneNumber,
} from '../../lib/validation-engine';
import {
  BOOLEAN_FORMAT,
  DATE_TIME_FORMAT,
  NO_GMAIL_FORMAT,
  PHONE_NUMBER_FORMAT,
  THREE_DIGIT_NUMBER_FORMAT,
} from '../../constants';
import ReviewCsv from './reviewCsv';
import Confetti from '../confetti';

ModuleRegistry.registerModules([InfiniteRowModelModule]);

const GridExample = ({ version }) => {
  const gridRef = useRef();
  const { state } = useContext(Context);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'Row',
      valueGetter: 'node.rowIndex + 1',
    },
  ]);
  const [fileMetaData, setFileMetaData] = useState();
  const [isErrorFree, setIsErrorFree] = useState(false);

  const ajv = new Ajv({ allErrors: false });
  addFormats(ajv, ['date', 'email']);
  ajv.addFormat(DATE_TIME_FORMAT, customDateTime);
  ajv.addFormat(BOOLEAN_FORMAT, customBoolean);
  ajv.addFormat(THREE_DIGIT_NUMBER_FORMAT, {
    type: 'number',
    validate: customThreeDigitNumber,
  });
  ajv.addFormat(NO_GMAIL_FORMAT, customNoGmailDomain);
  ajv.addFormat(PHONE_NUMBER_FORMAT, validInternationalPhoneNumber);

  let template = [];
  let userSchema = {};

  let recordsUri = `/api/meta/count?collection_name=${state.collection}`;
  let errorCountUri = `/api/meta/errorcount?collection_name=${state.collection}`;

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      minWidth: 100,
      tooltipComponent: tooltip,
    };
  }, []);

  const onShowLoading = useCallback(() => {
    gridRef.current.api.showLoadingOverlay();
  }, []);

  const onLoadingHide = useCallback(() => {
    gridRef.current.api.hideOverlay();
  }, []);

  const onGridReady = useCallback(
    async (params) => {
      let countOfRecords = 0;
      const dataSchema = () => {
        let schemaUrl = '/api/templates';
        const headers = {
          template_id: state.template,
        };

        fetch(schemaUrl, { headers })
          .then((httpResponse) => httpResponse.json())
          .then((response) => {
            template = response.columns;
            userSchema = response.schema;
            setColumnDefs(
              template.map((x) => {
                return {
                  headerName: x.label,
                  field: x.label,
                  editable: true,
                  cellClassRules: cellPassRules,
                  tooltipField: x.label,
                  cellRenderer: (props) => {
                    if (props.value !== undefined) {
                      onLoadingHide();
                      return props.value;
                    } else {
                      return onShowLoading();
                    }
                  },
                };
              })
            );
          });
      };
      dataSchema();

      await axios
        .get(recordsUri)
        .then((res) => {
          setFileMetaData(res.data);

          countOfRecords = res.data.totalRecords;
          axios
            .get(errorCountUri)
            .then((res) => {
              setFileMetaData((prev) => {
                return { ...prev, ...res.data };
              });
              if (
                fileMetaData &&
                typeof fileMetaData.validRecords !== 'undefined'
              ) {
                setIsErrorFree(
                  fileMetaData.totalRecords - fileMetaData.validRecords === 0
                );
              }
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));

      const dataSource = {
        rowCount: undefined,
        getRows: async (params) => {
          let url = `/api/meta?collection=${state.collection}&`;
          url += `_start=${params.startRow}&_end=${params.endRow}`;
          fetch(url)
            .then((httpResponse) => httpResponse.json())
            .then((response) => {
              params.successCallback(response.data, countOfRecords);
            })
            .catch((error) => {
              console.error(error);
              params.failCallback();
            });
        },
      };
      params.api.setDatasource(dataSource);
    },
    [state.collection]
  );

  const cellPassRules = {
    'cell-fail': (params) =>
      cellCheckBySchema(params.colDef.field, params.value),
    'null-check': (params) =>
      nullValCheckBySchema(params.colDef.field, params.value),
  };

  const cellCheckBySchema = (field, value) => {
    let flag = false;
    let error_flg = false;
    let data = value;

    if (field && value) {
      if (isNaN(value)) {
        flag = true;
      } else {
        data = JSON.parse(value);
      }

      let schemaProps = userSchema.properties;

      if (field in schemaProps) {
        let fieldSchema = schemaProps[field];
        let valid = ajv.validate(fieldSchema, data);
        if (!valid) {
          error_flg = true;
        } else error_flg = false;
      }
    }

    return error_flg;
  };

  const nullValCheckBySchema = (field, value) => {
    let nullflag = false;
    if (field && !value) {
      let schemaRequired = userSchema.required;

      if (schemaRequired.length) {
        if (schemaRequired.includes(field)) nullflag = true;
      }
    }
    return nullflag;
  };

  const onCellValueChanged = useCallback((params) => {
    let dbupdate = false;
    if (params.oldValue !== params.newValue) {
      let column = params.column.colDef.field;

      dbupdate = cellCheckBySchema(column, params.newValue);

      const removeByKey = (arr, key) => {
        const requiredIndex = arr.findIndex((el) => {
          return el.key === String(key);
        });
        if (requiredIndex === -1) {
          return false;
        }
        return !!arr.splice(requiredIndex, 1);
      };

      if (!dbupdate) {
        let obj = {};
        obj.collection_id = state.collection;
        let validation_Arr = [];
        if (params.data && params.data.validationData) {
          validation_Arr = params.data.validationData;
          removeByKey(validation_Arr, column);
        }
        delete params.data.validationData;
        obj.data = params.data;
        obj.data.validationData = validation_Arr;
        obj.data._id = params.data._id;

        let url = '/api/update';
        params.column.colDef.cellStyle = { backgroundColor: '' };
        params.api.refreshCells({
          force: true,
          columns: [column],
          rowNodes: [params.node],
        });

        axios
          .post(url, obj)
          .then((res) => {
            axios.get(errorCountUri).then((res) => {
              setFileMetaData((prev) => {
                return { ...prev, ...res.data };
              });
              setIsErrorFree(
                fileMetaData.totalRecords - fileMetaData.validRecords === 0
              );
            });
          })
          .catch((err) => console.log(err));
      } else {
        params.column.colDef.cellStyle = {
          backgroundColor: 'rgb(251 207 232 / var(--tw-bg-opacity))',
        };
        params.api.refreshCells({
          force: true,
          columns: [column],
          rowNodes: [params.node],
        });
      }
    }
  }, []);

  return (
    <>
      {version === 'norm' && <Stepper step={4} />}
      {isErrorFree && <Confetti />}
      <div class="grid grid-cols-1 gap-10">
        <ReviewCsv
          collectionName={state.collection}
          fileMetaData={fileMetaData}
        />
        <div className="flex flex-col flex-nowrap m-2">
          <div
            style={{ height: 420, width: 'auto' }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              ref={gridRef}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowBuffer={0}
              rowSelection={'single'}
              rowModelType={'infinite'}
              cacheBlockSize={100}
              cacheOverflowSize={2}
              maxConcurrentDatasourceRequests={1}
              infiniteInitialRowCount={1000}
              maxBlocksInCache={10}
              tooltipShowDelay={0}
              tooltipHideDelay={2000}
              onCellValueChanged={onCellValueChanged}
              onGridReady={onGridReady}
              rowHeight={30}
              headerHeight={30}
              overlayLoadingTemplate={
                '<span className="ag-overlay-loading-center"><b><center><svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>        </svg> <p>Please wait while your rows are loading...</b></p></center></span>'
              }
            ></AgGridReact>
          </div>
        </div>
      </div>
    </>
  );
};

export default GridExample;
