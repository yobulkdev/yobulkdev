import React from 'react';

export default function WarningModal({ setWarning, message }) {
  return (
        <>
          <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-96 h-50 my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
                <div className="flex flex-col p-5">
                    <div className="flex h-20 justify-center text-lg text-red-700">
                      {message}
                    </div>
                    <button
                      onClick={() => setWarning(false)}
                      className="bg-transparent h-8 w-1/4 text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white   border border-blue-500 hover:border-transparent rounded mx-auto"
                    >
                      OK
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </>
  );
}
