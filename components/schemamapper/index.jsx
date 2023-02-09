import { useState, useCallback, useRef, useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Context } from '../../context';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import UploadProgress from '../uploadProgress';
import ToggleValueRenderer from './ToggleButton';

import {
  DATE_DATA_TYPE,
  STRING_DATA_TYPE,
  NUMBER_DATA_TYPE,
  EMAIL_CHECK_TYPE,
  BOOLEAN_DATA_TYPE,
  DATE_CHECK_TYPE,
  THREE_DIGIT_CHECK_TYPE,
  NO_GMAIL_CHECK_TYPE,
  EMAIL_DATA_TYPE,
  DROPDOWN_SELECT_TEXT,
} from '../../constants';
// import Stepper from '../stepper';

const SchemaMapper = () => {
  const gridRef = useRef();
  const { state, dispatch } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [recordsUploaded, setRecordsUploaded] = useState(0);
  const [templateName, setTemplateName] = useState();
  const router = useRouter();

  const schemaDataTypes = [
    DATE_DATA_TYPE,
    STRING_DATA_TYPE,
    EMAIL_DATA_TYPE,
    NUMBER_DATA_TYPE,
    BOOLEAN_DATA_TYPE,
  ];
  const checkTypes = [
    DROPDOWN_SELECT_TEXT,
    EMAIL_CHECK_TYPE,
    DATE_CHECK_TYPE,
    THREE_DIGIT_CHECK_TYPE,
    NO_GMAIL_CHECK_TYPE,
  ];

  const columnDefs = [
    {
      headerName: 'CSV Column',
      field: 'key',
      cellStyle: { backgroundColor: '	#E0E0E0' },
    },
    {
      headerName: 'Data Type',
      field: 'data_type',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: schemaDataTypes,
      },
      cellStyle: {
        cursor: 'pointer',
        // boxShadow: '2px 2px #D3D3D3',
        borderRadius: '5px',
      },
      onCellValueChanged: (e) =>
        dispatch({ type: 'CURRENT_FILE_TEMPLATE_UPDATE', payload: e.data }),
    },

    {
      headerName: 'Required',
      field: 'is_required',
      cellRenderer: ToggleValueRenderer,
      cellStyle: { cursor: 'pointer' },
    },
  ];

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
        setRecordsUploaded(loaded);
      },
      data: data,
    };
    axios(options)
      .then((res) => {
        dispatch({
          type: 'SET_COLLECTION_NAME',
          payload: res.data.collection_name,
        });

        router.push({ pathname: '/templates' }, undefined, {
          shallow: true,
        });
      })
      .catch((err) => console.log(err));
  };

  const saveTemplate = () => {
    if (!templateName) return
    setLoading(true);
    let data = { columns: state.validationTemplate.map((e) => { return {...e, custom_message: `${e.label} should be of type ${e.data_type}`}}), template_name: templateName };
    delete data.collection_name
    axios
      .post('/api/templates', data)
      .then((result) => {
        // dispatch({ type: 'SET_CUR_TEMPLATE', payload: result.data.insertedId });
        // uploadFile({
        //   target: state.curFile,
        //   template_id: result.data.insertedId,
        // });
      })
      .catch((err) => console.log(err));
    router.push({ pathname: '/templates' });
  };

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });

    gridRef.current.api.sizeColumnsToFit();
  }, []);

  return (
    <>
      {/* <Stepper step={3} /> */}
      {!loading && (
        <>
          <div className="w-full sm:flex sm:space-x-8 sm:p-4">
            <button
              onClick={saveTemplate}
              className="bg-transparent h-8 px-4 m-2 text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white   border border-blue-500 hover:border-transparent rounded  ml-auto"
            >
              Create Template
            </button>
          </div>
          <div
            className="ag-theme-alpine p-4"
            style={{ height: '420px', width: 'auto' }}
          >
            <div className="my-4 bg-white rounded-md p-6 flex flex-col align-middle shadow-sm">
              <div className="flex">
                <div className="flex flex-col w-5/12">
                  <h2 className="text-lg font-bold text-gray-500">Name</h2>
                  <p className="text-gray-400">Name of the template</p>
                </div>
                <div className="ml-10 flex flex-col justify-center w-full">
                  <div className="mb-2">
                    <input
                      type="text"
                      id="default-input"
                      className={`border border-gray-300 text-gray-400  text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 w-full
                   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    `}
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                    />
                    {!templateName && <span className='text-red-500' >Template name cannot be empty</span>}
                  </div>
                </div>
              </div>
            </div>
            <AgGridReact
              ref={gridRef}
              columnDefs={columnDefs}
              rowData={state.validationTemplate}
              onGridReady={onGridReady}
              rowHeight={30}
              headerHeight={30}
            />
          </div>{' '}
        </>
      )}
      {loading && (
        <UploadProgress progress={progress} loaded={recordsUploaded} />
      )}
    </>
  );
};

export default SchemaMapper;
