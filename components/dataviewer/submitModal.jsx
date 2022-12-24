import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function SubmitModal({ isVisible, setIsVisible, metaData }) {
    const router = useRouter();
  return (
    <>
      {isVisible ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-96 h-50 my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex p-4 items-start justify-between p-3 mx-4 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-sm font-semibold">
                    You have {metaData.totalRecords - metaData.validRecords}{' '}
                    rows with unresolved format issues
                  </h3>
                </div>
                <div className="flex bg-gray-100">
                  <div className="flex flex-col mx-4 my-4">
                    <div className="flex h-20 text-center text-sm">
                      Review and fix format issues
                    </div>
                    <button
                      onClick={() => {
                        setIsVisible(false);
                      }}
                      className="bg-white w-20 h-8 px-2 py-1 m-2 text-sm hover:bg-white text-blue-500 font-semibold hover:text-blue-700 border border-blue-500 hover:border-blue-500 rounded mx-auto"
                    >
                      Go Back
                    </button>
                  </div>
                  <div className="flex flex-col mx-2 my-4">
                    <div className="flex h-20 text-center text-sm">
                      Discard {metaData.totalRecords - metaData.validRecords}{' '}
                      rows with issues. Submit the rest
                    </div>
                    <button
                      onClick={() => {
                        router.push('/')
                      }}
                      className="bg-blue-500 w-20 h-8 px-2 py-1 m-2 text-sm hover:bg-blue-700 text-white font-semibold hover:text-white border border-blue-500 hover:border-blue-500 rounded mx-auto"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
