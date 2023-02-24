import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, setIsOpen, data }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  return (
    <>
      {showModal ? (
        <>
          <div className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ml-auto">
            <div className="relative my-6 ml-auto w-96">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-2xl text-gray-600">
                    {data.length > 0
                      ? data.map((x) => x.errorcount).reduce((a, b) => a + b)
                      : 0}
                    Errors!
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-gray-600 opacity-7 h-9 w-9 text-2xl block rounded-full text-center justify-center">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <table className="table-auto error_panel_table">
                    <thead>
                      <tr>
                        <td>Column</td>
                        <td>Data Type</td>
                        <td>Errors</td>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.length > 0 &&
                        data.map((x, index) => (
                          <tr key={index}>
                            <td>{x.label}</td> <td>{x.data_type}</td>
                            <td>{x.errorcount}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
