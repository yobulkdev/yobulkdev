import { useCallback, useRef, useContext, useMemo } from 'react';
import { useRouter } from 'next/router';
import { AgGridReact } from 'ag-grid-react';
import { Context } from '../../context';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Stepper from '../stepper';

const SnapshotViewer = () => {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  const getColumns = (arr) => {
    return arr.map((e) => {
      return { field: e, minWidth: 150 };
    });
  };

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
    };
  }, []);

  const gridRef = useRef();

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
      {/* <Stepper step={2} /> */}
      <div className="w-full sm:flex sm:space-x-8 sm:p-4">
        <button
          onClick={() =>
            router.push({ pathname: '/schemamapper' }, undefined, {
              shallow: true,
            })
          }
          className="bg-transparent h-8 px-4 m-2 text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white   border border-blue-500 hover:border-transparent rounded  ml-auto"
        >
          Create Template
        </button>
      </div>
      <div className="ag-theme-alpine" style={{ height: 500, width: 'auto' }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={getColumns(state.sourceFileHeaders)}
          rowData={state.initialRows}
          onGridReady={onGridReady}
          defaultColDef={defaultColDef}
          rowHeight={30}
        />
      </div>
    </>
  );
};

export default SnapshotViewer;
