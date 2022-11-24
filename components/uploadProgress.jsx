import React from 'react';

const UploadProgress = ({ progress }) => {
  return (
    <>
      <div className="flex w-full justify-center mt-4">
        <div className="progress_wrapper">
          <div>
            <span className="float-left font-light my-4">Uploading...</span>
            <span className="float-right my-4">{progress}%</span>
          </div>
          <div className="flex h-1 w-full rounded bg-gray-200">
            <div
              className="h-full animate-pulse rounded bg-blue-400"
              style={{ width: progress + '%' }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadProgress;
