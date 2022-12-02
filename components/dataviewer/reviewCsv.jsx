import React, { useState, useCallback, useEffect } from 'react';
import FileDownload from 'js-file-download';
import axios from 'axios';

import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import ErrorTypeDropDown from './errorTypeSelector';

const ReviewCsv = ({ collectionName, fileMetaData, setIsErrorFree }) => {
  const [metaData, setMetaData] = useState();
  const [downloadig, setDownloadig] = useState(false);
  useEffect(() => {
    setMetaData((prev) => {
      if (fileMetaData && typeof fileMetaData.validRecords !== 'undefined') {
        setIsErrorFree(
          fileMetaData.totalRecords - fileMetaData.validRecords === 0
        );
        setTimeout(() => {
          setIsErrorFree(false);
        }, 10000);
      }
      return fileMetaData;
    });
  }, [fileMetaData]);

  const onBtnExport = useCallback(() => {
    setDownloadig(true);
    var options = {
      method: 'GET',
      url: '/api/downloads',
      responseType: 'blob',
      headers: {
        collection_name: collectionName,
      },
    };
    axios(options).then((response) => {
      FileDownload(response.data, `${collectionName}.csv`);
      setDownloadig(false);
    });
  }, []);

  return (
    <div className="flex flex-nowrap justify-between">
      <div className="flex float-left gap-6">
        <div className="flex-auto w-auto text-gray-500 font-semibold p-2">
          All Rows{' '}
          <span className="text-xs ml-1 inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full">
            {metaData ? metaData.totalRecords / 1000 : 0}k
          </span>
        </div>
        <div className="flex-auto w-auto text-gray-500 font-semibold p-2">
          Valid Rows
          <span className="text-xs ml-2 inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-gray-600 rounded-full">
            {metaData && typeof metaData.validRecords !== 'undefined'
              ? metaData.validRecords
              : 'Loading...'}
          </span>
        </div>{' '}
        <div className="flex-auto w-auto text-red-600 font-semiboldmb-2 p-2">
          Error Rows
          <span className="text-xs ml-2 inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-red-600 text-white rounded-full">
            {metaData && typeof metaData.validRecords !== 'undefined'
              ? metaData.totalRecords - metaData.validRecords
              : 'Loading...'}
          </span>
        </div>{' '}
        <div className="flex-auto w-auto font-semibold">
          <ErrorTypeDropDown errData={metaData} />
        </div>
      </div>

      {!downloadig ? (
        <button
          onClick={onBtnExport}
          className="flex float-right bg-transparent h-8 px-2 py-1 m-2 text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white   border border-blue-500 hover:border-transparent rounded  ml-auto"
        >
          <CloudArrowDownIcon className="w-5 mr-1" />
          Download CSV
        </button>
      ) : (
        <div class="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center mr-3">
          <svg
            class="w-6 h-6 text-violet-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default ReviewCsv;
