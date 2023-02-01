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

const SassLoadMapper = () => {
  const gridRef = useRef();
  const router = useRouter();

  const { state, dispatch } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duplicate, setDuplicate] = useState(false);

  useEffect(() => {
    setInterval(() => {
      console.log(state.curSaasLoadMapperTemplate);
    }, 3000);
  }, []);

  useEffect(() => {
    dispatch({
      type: 'SET_SAAS_LOAD_MAPPER_TEMPLATE',
      payload: columnMatcher({
        saasTemplate: state.saasTemplateColumns,
        validationTemplate: state.validationTemplate,
      }),
    });
  }, []);

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
      columns: state.curSaasLoadMapperTemplate.filter((el) => el.is_imported),
      baseTemplateId: state.baseTemplateId,
      fileName: state.curFile.name
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
      .catch((err) => console.log(err));
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
      }
    },
    {
      headerName: 'Select Columns',
      resizable: true,
      field: 'is_imported',
      cellStyle: { 'direction': 'rtl' },
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
            <div className="flex mb-3 text-blue-700 font-semibold">
              {' '}
              Change or confirm column matches.{' '}
              <button
                onClick={saveTemplate}
                className="bg-transparent h-8 px-4 text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded  ml-auto"
              >
                Upload
              </button>
            </div>

            <div className="flex saas-load-matcher">
              <div
                className="ag-theme-alpine"
                style={{
                  height: (state.curSaasLoadMapperTemplate?.length + 1) * 50,
                  width: '90vw',
                  border: 'none',
                }}
              >
                <AgGridReact
                  ref={gridRef}
                  columnDefs={columnDefs}
                  rowData={state.curSaasLoadMapperTemplate}
                  onGridReady={onGridReady}
                  rowHeight={50}
                  suppressHorizontalScroll={true}
                  suppressRowClickSelection={true}
                  rowSelection={'multiple'}
                  onFirstDataRendered={onFirstDataRendered}
                  components={frameworkComponents}
                />
              </div>
            </div>
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
