import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import { useDropzone } from 'react-dropzone';
import React, { useCallback, useContext } from 'react';
import { Context } from '../../context';
import Papa from 'papaparse';
import { useRouter } from 'next/router';
import Stepper from '../stepper';

const CsvUploader = ({ isStepperVisible, nextPageRoute }) => {
  const { dispatch } = useContext(Context);
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

  /*  accept: [
    '.csv, text/csv, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values',
  ], */

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="mt-3">
      {isStepperVisible && <Stepper step={1} />}
      <div className="flex justify-center ">
        <div className="dropzone bg-white">
          <p className="text-lg font-bold text-gray-500">Upload your CSV</p>
          <p className="text-md text-gray-500">
            The file should be in{' '}
            <span className="text-red-500 text-lg font-semibold">.csv</span>{' '}
            format. First row should be the headers.
          </p>
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
