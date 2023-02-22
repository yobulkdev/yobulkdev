import React from 'react';
export default function SuccessModal({ isVisible, setIsVisible }) {

  return (
    <>
      {isVisible && (
        <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-96 h-100-px my-6 mx-auto">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
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
                  <div className="text-lg font-semibold leading-tight text-blue-700 mb-1">
                    Yay, You did it!
                  </div>
                  <p className="text-sm text-center font-normal leading-tight text-gray-800 mb-10">You have successfully fixed all the errors. You can proceed to submit the csv.</p>
                </div>
                <button
                  onClick={() => setIsVisible(false)}
                  className="bg-transparent h-8 w-1/4 text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white   border border-blue-500 hover:border-transparent rounded mx-auto"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
