import React, { useState, useEffect, useCallback } from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import FileDownload from 'js-file-download';

const ImportsComponent = () => {
  const [importData, setImportData] = useState({});
  const [loading, setLoading] = useState(true);
  const [downloadCollection, setDownloadCollection] = useState({});
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/imports`)
      .then((res) => {
        setImportData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const onBtnExport = () => {
    if (!downloadCollection.fileName) {
      setShowWarning(true);
      return;
    }
    var options = {
      method: 'GET',
      url: '/api/downloads',
      responseType: 'blob',
      headers: {
        collection_name: downloadCollection.collection_name,
      },
    };
    axios(options).then((response) => {
      FileDownload(response.data, downloadCollection.fileName);
    });
  };

  const handleCheckBoxSelect = (col) => {
    setDownloadCollection(col);
    setShowWarning(false);
  };
  return (
    <div>
      <div className="flex align-middle justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-500 dark:text-gray-200">
          List of CSVs Imported
        </h1>
        <button
          onClick={onBtnExport}
          type="button"
          className="flex bg-white border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:outline-none font-medium rounded-md gap-1 text-sm px-6 py-2 text-center mb-2 float-right dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:border-white"
        >
          Download Imported CSV
          <DocumentArrowDownIcon className="h-5 w-5 ml-2" aria-hidden="true" />
        </button>
      </div>
      {showWarning && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-2 relative"
          role="alert"
        >
          * Please select a file to download
        </div>
      )}
      <table className="w-full bg-white dark:bg-gray-900 rounded-2xl text-sm text-gray-500 dark:text-gray-400 table shadow-md mt-5 border-2 dark:border-gray-900">
        <thead className="text-xs text-white uppercase h-10 bg-blue-500">
          <tr>
            <th>Select</th>
            <th scope="col" className="py-3">
              Organization Id
            </th>
            <th scope="col" className="py-3">
              Import ID
            </th>
            <th scope="col" className="py-3 ">
              File Name
            </th>
            <th scope="col" className="py-3">
              <span>Rows</span>
            </th>
            <th scope="col" className="py-3">
              <span>Started Date</span>
            </th>
            <th scope="col" className="py-3">
              <span>Submitted Date</span>
            </th>
            <th scope="col" className="py-3">
              <span>Status</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(importData) && importData.length > 0 ? (
            importData.map((col, idx) => (
              <tr key={idx} className="h-10 text-center">
                <td>
                  <input
                    checked={col._id === downloadCollection._id}
                    onClick={() => handleCheckBoxSelect(col)}
                    type="checkbox"
                  />
                </td>
                <td>{col.orgId || 'NA'}</td>
                <td>{col.importerId || 'NA'}</td>
                <td>{col.fileName || 'NA'}</td>
                <td>{col.rows}</td>
                <td>
                  {col.created_date ? col.created_date.split('T')[0] : 'NA'}
                </td>
                <td>
                  {col.created_date ? col.created_date.split('T')[0] : 'NA'}
                </td>
                <td>
                  {col.status === 'Complete' ? (
                    <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 uppercase last:mr-0 mr-1">
                      Complete
                    </span>
                  ) : (
                    <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200 uppercase last:mr-0 mr-1">
                      Incomplete
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr key={1} className="h-10 text-center">
              <td>{loading ? 'Loading...' : 'No Data'}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ImportsComponent;
