import React, { useEffect, useState } from 'react';
export default function SuccessModal({ submit, message }) {
  const [isloading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = (message.validRecords < 5000) ? 1 : (Math.round(message.validRecords / 10000)); // reduced interval for large files
    const intervalId = setInterval(() => {
      setProgress((prev) => {
        if (prev >= Number(message.validRecords)) {
          clearInterval(intervalId);
          setLoading(false);
          return Number(message.validRecords);
        } else {
          return prev + interval;
        }
      });
    }, 1);
    return () => clearInterval(intervalId);
  }, [message.validRecords]);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-96 h-100-px my-6 mx-auto">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
            {isloading ? (
              <div class="grid h-20 place-content-center">
                <div class="flex items-center gap-2 text-gray-500">
                  <span class="h-6 w-6 block rounded-full border-4 border-t-blue-300 animate-spin"></span>
                  Imported {progress} out of {message.validRecords} rows
                </div>
              </div>
            ) : (
              <div className="flex flex-col p-5">
                <div className="flex flex-col gap-2 items-center h-50 justify-center text-lg text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    />
                  </svg>
                  <div className="text-sm font-normal leading-tight text-gray-800 mb-10">
                    You have successfully imported the records
                  </div>
                  <div className="flex gap-10 justify-center mb-10">
                    <h6 class="text-base flex flex-col gap-3 items-center justify-center font-medium leading-tight text-gray-800">
                      Submitted
                      <span class="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-white-300 text-blue rounded">
                        {message.totalRecords}
                      </span>
                    </h6>
                    <h6 class="text-base flex flex-col gap-3 items-center justify-center font-medium leading-tight text-gray-800">
                      Accepted
                      <span class="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-500 text-white rounded">
                        {message.validRecords}
                      </span>
                    </h6>
                    <h6 class="text-base flex flex-col gap-3 items-center justify-center font-medium leading-tight text-gray-800">
                      Rejected
                      <span class="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-500 text-white rounded">
                        {message.totalRecords - message.validRecords}
                      </span>
                    </h6>
                  </div>
                </div>
                <button
                  onClick={submit}
                  className="bg-transparent h-8 w-1/4 text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white   border border-blue-500 hover:border-transparent rounded mx-auto"
                >
                  OK
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
