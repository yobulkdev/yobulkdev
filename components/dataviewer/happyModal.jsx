import React, { useState } from 'react';

export default function Modal({ isVisible, setIsVisible }) {
  return (
    <>
      {isVisible ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-96 h-48 my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 mx-2 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">YoBulk!</h3>
                  <button
                    className="p-1 ml-auto border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsVisible(false)}
                  >
                    x
                  </button>
                </div>
                <div className="relative p-6 flex-auto">YaY! You did it...</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
