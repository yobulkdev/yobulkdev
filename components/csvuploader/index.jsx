import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import { useDropzone } from 'react-dropzone';
import React, { useCallback, useContext, useState } from 'react';
import { Context } from '../../context';
import Papa from 'papaparse';
import { useRouter } from 'next/router';
// import Stepper from '../stepper';

const CsvUploader = ({ nextPageRoute }) => {
  const { dispatch } = useContext(Context);
  const [templateName, setTemplateName] = useState('');
  const router = useRouter();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      dispatch({
        type: 'CURRENT_FILE',
        payload: file,
      });
      const uploadStepOne = ({ target }) => {
        Papa.parse(target, {
          worker: true,
          header: true,
          preview: 15,
          dynamicTyping: true,
          skipEmptyLines: true,
          chunk: function (result, parser) {
            let fileMetaData = result.meta;
            dispatch({
              type: 'CURRENT_FILE_HEADERS',
              payload: fileMetaData.fields,
            });
            dispatch({
              type: 'CURRENT_FILE_SAMPLE_ROWS',
              payload: {
                sampleData: result.data,
                fileHeaders: fileMetaData.fields,
              },
            });

            router.push({ pathname: nextPageRoute }, undefined, {
              shallow: true,
            });
          },
        });
      };
      uploadStepOne({ target: file });
    },
    [dispatch, router]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: [
      '.csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values',
    ],
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="mt-3">
      <div className="my-4 border-2 rounded-md p-4 flex flex-col align-middle justify-center mx-20">
        <div className="flex">
          <div className="flex flex-col w-5/12">
            <h2 className="text-lg font-bold text-gray-500">Name</h2>
            <p className="text-gray-400">Name of the template</p>
          </div>
          <div className="ml-10 flex flex-col justify-center w-72">
            <div className="mb-2">
              <input
                type="text"
                id="default-input"
                className={`border border-gray-300 text-gray-400  text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-[400px] 
                   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mx-20 border-2">
        <div className="dropzone min-w-full">
          <p className="font-bold text-gray-500">Upload your CSV</p>
          <p className="text-sm text-gray-400">File should be .csv</p>
          <div {...getRootProps()} className="drag_drop_wrapper">
            <input hidden {...getInputProps()} />
            <CloudArrowUpIcon className="w-16 h-16 text-blue-200" />
            {isDragActive ? (
              <p>Drop the csv here...</p>
            ) : (
              <p className="text-gray-500">Drag & Drop your csv here</p>
            )}
          </div>
          <p className="text-gray-500">Or</p>
          <div className="flex w-full justify-center">
            <button onClick={open} className="dropzone_button">
              Choose a file
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CsvUploader;
