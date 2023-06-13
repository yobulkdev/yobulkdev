import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Context } from '../../context';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import stringSimilarity from 'string-similarity';
import axios from 'axios';
import UploadProgress from '../uploadProgress';
import { useRouter } from 'next/router';
import MyModal from '../genericdialog';
import CheckboxComponent from './CheckboxComponent';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import Link from 'next/link';

const columnMatcher = ({ saasTemplate, validationTemplate }) => {
  if (!saasTemplate || !validationTemplate) return;
  let saasTemplateLabels = saasTemplate.map((e) => e.label);
  let columnMatcherTemplate = validationTemplate.map((el) => {
    let bestMatchObj = stringSimilarity.findBestMatch(
      el.key,
      saasTemplateLabels
    );
    let bestMatchObjLabel = bestMatchObj.bestMatch['target'];
    let saasTemplateObj = saasTemplate.find(
      (e) => e.label === bestMatchObjLabel
    );
    return { ...saasTemplateObj, key: el.key, is_imported: true };
  });
  return columnMatcherTemplate;
};

const columnMatcherAi = async ({ saasTemplate, validationTemplate }) => {
  if (!saasTemplate || !validationTemplate) return;
  let saasTemplateLabels = saasTemplate.map((e) => e.label);
  let validationTemplateLabels = validationTemplate.map((e) => e.label);
  let resp = await fetch('/api/yobulk-ai/match', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      validationTemplateColumns: validationTemplateLabels,
      saasTemplateColumns: saasTemplateLabels,
    }),
  });
  let parsedResp = await resp.json();
  let matchedColumns = parsedResp?.data || {};
  let columnMatcherTemplate = validationTemplate.map((el) => {
    let saasTemplateObj = saasTemplate.find(
      (e) => e.label === matchedColumns[el.key]
    );
    return {
      ...saasTemplateObj,
      key: el.key,
      is_imported: matchedColumns[el.key] ? true : false,
    };
  });
  return columnMatcherTemplate;
};

const SassLoadMapper = () => {
  const gridRef = useRef();
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState(1);
  const { state, dispatch } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duplicate, setDuplicate] = useState(false);

  const hideAi = process.env.NEXT_PUBLIC_HIDE_AI === 'true';

  useEffect(() => {
    selectedTab === 0
      ? columnMatcherAi({
        saasTemplate: state.saasTemplateColumns,
        validationTemplate: state.validationTemplate,
      }).then((payload) => {
        dispatch({
          type: 'SET_SAAS_LOAD_MAPPER_TEMPLATE',
          payload,
        });
      })
      : dispatch({
        type: 'SET_SAAS_LOAD_MAPPER_TEMPLATE',
        payload: columnMatcher({
          saasTemplate: state.saasTemplateColumns,
          validationTemplate: state.validationTemplate,
        }),
      });
  }, [selectedTab]);

  const uploadFile = ({ target, template_id }) => {
    let data = new FormData();
    data.append('file', target);

    var options = {
      method: 'post',
      url: '/api/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
        template_id: template_id,
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setProgress(percent);
      },
      data: data,
    };
    axios(options)
      .then((res) => {
        dispatch({
          type: 'SET_COLLECTION_NAME',
          payload: res.data.collection_name,
        });
        setTimeout(() => {
          router.push({ pathname: '/dataviewer/saas' }, undefined, {
            shallow: true,
          });
        }, 300);
      })
      .catch((err) => console.log(err));
  };

  const saveTemplate = () => {
    let labels = state.curSaasLoadMapperTemplate
      .filter((el) => el.is_imported)
      .map((el) => el.label);
    if (new Set(labels).size !== labels.length) {
      setDuplicate(true);
      return;
    }

    setLoading(true);
    let data = {
      columns: state.curSaasLoadMapperTemplate.filter(
        (el) => el.is_imported && el.label
      ),
      baseTemplateId: state.baseTemplateId,
      fileName: state.curFile.name,
    };
    axios
      .post('/api/templates', data)
      .then((result) => {
        dispatch({ type: 'SET_CUR_TEMPLATE', payload: result.data.insertedId });
        uploadFile({
          target: state.curFile,
          template_id: result.data.insertedId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columnDefs = [
    {
      headerName: 'CSV Column',
      resizable: true,
      field: 'key',
      type: 'nonEditableColumn',
      cellStyle: { backgroundColor: '	#F5F5F5' },
    },
    {
      headerName: 'Template Column',
      resizable: true,
      field: 'label',
      editable: true,
      cellStyle: { cursor: 'pointer' },
      cellEditor: 'agSelectCellEditor',
      singleClickEdit: true,
      cellEditorParams: {
        values: state.saasTemplateColumns
          ? state.saasTemplateColumns.map((el) => el.label)
          : [],
      },
      onCellValueChanged: (e) => {
        dispatch({ type: 'SAAS_LOAD_MAPPER_TEMPLATE_UPDATE', payload: e.data });
      },
      cellClass: (params) => {
        return state.curSaasLoadMapperTemplate.filter(
          (el) => el.is_imported && el.label === params.value
        ).length > 1
          ? 'text-red-400 editable-grid-cell'
          : 'editable-grid-cell';
      },
      cellRenderer: function (params) {
        return params.value;
      },
    },
    {
      headerName: 'Select Columns',
      resizable: true,
      field: 'is_imported',
      cellStyle: { direction: 'rtl' },
      cellRenderer: 'checkboxRenderer',
      onCellValueChanged: (e) => {
        dispatch({ type: 'SAAS_LOAD_MAPPER_TEMPLATE_UPDATE', payload: e.data });
      },
    },
  ];

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.forEachNode((node) => node.setSelected(true));
  }, []);

  const onGridReady = useCallback((params) => {
    //params.api.sizeColumnsToFit();
    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });

    gridRef.current.api.sizeColumnsToFit();
  }, []);

  let frameworkComponents = { checkboxRenderer: CheckboxComponent };

  return (
    <>
      {!loading && (
        <div className="grid grid-cols-3 pt-1">
          <div></div>
          <div>
            <div className="flex mb-3 mt-10 text-blue-700 font-semibold">
              {' '}
              Change or confirm column matches.{' '}
              <button
                onClick={saveTemplate}
                className="bg-transparent h-8 px-4 text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded  ml-auto"
              >
                Upload
              </button>
            </div>

            {!hideAi
              ?
              <Tab.Group
                onChange={(index) => {
                  setSelectedTab(index);
                }}
                defaultIndex={1}
              >
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        'w-full relative rounded-lg py-2.5 text-sm font-medium leading-5 text-black dark:text-white',
                        selected
                          ? 'bg-white shadow dark:text-black'
                          : 'text-black hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                  >
                    With YoBulkAI{' '}
                    <div className="absolute inline-flex items-center px-1 justify-center text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2 dark:border-gray-900">
                      BETA
                    </div>
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        'w-full relative rounded-lg py-2.5 text-sm font-medium leading-5 text-black dark:text-white',
                        selected
                          ? 'bg-white shadow dark:text-black'
                          : 'text-black hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                  >
                    Without YoBulkAI
                  </Tab>
                </Tab.List>
                <Tab.Panels className="mt-2">
                  <Tab.Panel className={classNames('rounded-xl bg-white p-3')}>
                    <>
                      <h1 className="text-md flex text-sm items-center justify-center  text-gray-600">
                        Ensure to add OpenAI Secret Key in .env file.
                      </h1>
                      <h1 className="text-md flex text-sm items-center justify-center my-2 text-gray-600">
                        Please Refer to{' '}
                        <span className="ml-1 text-blue-700">
                          <Link href="https://doc.yobulk.dev/YoBulk%20AI/AI%20usecases">
                            Documentation
                          </Link>
                        </span>
                      </h1>
                      <div className="flex saas-load-matcher">
                        <div
                          className="ag-theme-alpine"
                          style={{
                            height:
                              (state.curSaasLoadMapperTemplate?.length + 1) * 67 || 0,
                            width: '90vw',
                            border: 'none',
                          }}
                        >
                          <AgGridReact
                            ref={gridRef}
                            columnDefs={columnDefs}
                            rowData={state.curSaasLoadMapperTemplate} // with yobulkAI prompt
                            onGridReady={onGridReady}
                            rowHeight={70}
                            suppressHorizontalScroll={true}
                            suppressRowClickSelection={true}
                            rowSelection={'multiple'}
                            onFirstDataRendered={onFirstDataRendered}
                            components={frameworkComponents}
                          />
                        </div>
                      </div>
                    </>
                  </Tab.Panel>
                  <Tab.Panel className={classNames('rounded-xl bg-white p-3')}>
                    <div className="flex saas-load-matcher">
                      <div
                        className="ag-theme-alpine"
                        style={{
                          height:
                            (state.curSaasLoadMapperTemplate?.length + 1) * 67 || 0,
                          width: '90vw',
                          border: 'none',
                        }}
                      >
                        <AgGridReact
                          ref={gridRef}
                          columnDefs={columnDefs}
                          rowData={state.curSaasLoadMapperTemplate} // from csv
                          onGridReady={onGridReady}
                          rowHeight={70}
                          suppressHorizontalScroll={true}
                          suppressRowClickSelection={true}
                          rowSelection={'multiple'}
                          onFirstDataRendered={onFirstDataRendered}
                          components={frameworkComponents}
                        />
                      </div>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
              :
              <div className="flex saas-load-matcher">
                <div
                  className="ag-theme-alpine"
                  style={{
                    height:
                      (state.curSaasLoadMapperTemplate?.length + 1) *
                      67 || 0,
                    width: '90vw',
                    border: 'none',
                  }}
                >
                  <AgGridReact
                    ref={gridRef}
                    columnDefs={columnDefs}
                    rowData={state.curSaasLoadMapperTemplate} // with yobulkAI prompt
                    onGridReady={onGridReady}
                    rowHeight={70}
                    suppressHorizontalScroll={true}
                    suppressRowClickSelection={true}
                    rowSelection={'multiple'}
                    onFirstDataRendered={onFirstDataRendered}
                    components={frameworkComponents}
                  />
                </div>
              </div>
            }
          </div>
          {/*  <div className="gap-1">
        <span className="break-all">{JSON.stringify(state)}</span>
      </div> */}
        </div>
      )}
      {loading && <UploadProgress progress={progress} />}
      {duplicate && (
        <MyModal
          title={'Duplicates!'}
          description={
            'Please check the Labels in Red Colored. Those are duplicated.'
          }
          isVisible={duplicate}
          setIsvisible={setDuplicate}
        />
      )}
    </>
  );
};

export default SassLoadMapper;
