import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useContext, useEffect } from 'react';
import ValidationModel from './ValidationModel';
import InputField from './InputField';
import { Context } from '../../../context';
import { XMarkIcon } from '@heroicons/react/24/outline';
import cuid from 'cuid';
const MainModel = ({ isOpen, closeModal, setTemplateData }) => {
  let [isOpenValidation, setIsOpenValidation] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [enabled, setEnabled] = useState(true);
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    if (state.isTemplateEditing) {
      setModalData(
        Object.keys(state.templateColumnToEdit).map((el) => {
          return { key: el, value: state.templateColumnToEdit[el] };
        })
      );
    }
  }, [state.templateColumnToEdit]);

  function closeSubModel() {
    setIsOpenValidation(false);
  }

  function openSubModal() {
    setIsOpenValidation(true);
  }

  const handleCloseMainModal = (e) => {
    setModalData([]);
    closeModal(e);
  };

  const handleSaveMainModalData = (e) => {
    setTemplateData((prev) => {
      let colObj = {};
      colObj['is_required'] = enabled;

      modalData.map((el) => {
        colObj[el.key] = el.value;
      });
      if (!colObj['key']) {
        colObj['key'] = cuid();
      }

      if (!prev.columns) {
        return { ...prev, columns: [{ ...colObj }] };
      }

      if (prev.columns.find((el) => el.key === colObj.key)) {
        return {
          ...prev,
          columns: prev.columns.map((obj) =>
            obj.key === colObj.key ? colObj : obj
          ),
        };
      } else if (
        prev.columns.find(
          (el) => el.label.toUpperCase() === colObj.label.toUpperCase()
        )
      ) {
        return {
          ...prev,
          columns: prev.columns.map((obj) =>
            obj.label.toUpperCase() === colObj.label.toUpperCase()
              ? colObj
              : obj
          ),
        };
      } else {
        return { ...prev, columns: [...prev.columns, colObj] };
      }
    });
    handleCloseMainModal(e);
    if (state.isTemplateEditing) {
      dispatch({ type: 'SET_CUR_TEMPLATE_EDIT', payload: false });
    }
  };

  const handleRequired = () => {
    setModalData((prev) => {
      if (prev.find((el) => el.key === 'is_required')) {
        return prev.map((obj) =>
          obj.key === 'is_required'
            ? { key: 'is_required', value: !enabled }
            : obj
        );
      } else {
        return [...prev, { key: 'is_required', value: !enabled }];
      }
    });

    setEnabled(!enabled);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseMainModal}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h2"
                  className="text-lg flex items-center font-medium leading-6 text-gray-900"
                >
                  Add Column{' '}
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="defaultModal"
                    onClick={handleCloseMainModal}
                  >
                    <XMarkIcon className="h-6" />
                    <span className="sr-only">Close modal</span>
                  </button>
                </Dialog.Title>
                <div>
                  <div className="mt-2 p-2">
                    <InputField
                      name="Name"
                      colKey="label"
                      desc="Input the column name exactly as in your CSV or Excel file."
                      setModalData={setModalData}
                      columnData={'label'}
                    />

                    <InputField
                      name="Example"
                      colKey="example"
                      desc="Enter the example of the data like 'John Doe' or 123456 "
                      setModalData={setModalData} // setModalData was saving exmaple as column name in template -> fix this
                      columnData={'example'}
                    />

                    <div className="flex py-4">
                      <label className="inline-flex relative items-center mr-5 cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={enabled}
                          readOnly
                        />
                        <div
                          onClick={handleRequired}
                          className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-blue-400  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"
                        ></div>
                        <span className="ml-2 text-sm font-medium text-gray-900">
                          Is Required
                        </span>
                      </label>
                    </div>

                    <div className="pb-4">
                      <label
                        htmlFor="default-input"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Column Format
                      </label>{' '}
                      <div className="border-2 rounded p-2 flex items-center justify-between pr-4 h-18">
                        <div className="flex">
                          <p className="flex  text-blue-400">
                            {modalData.find((el) => el.key === 'data_type')
                              ? modalData.find((el) => el.key === 'data_type')
                                  .value
                              : 'Select data type ...'}
                          </p>

                          <p className="flex flex-nowrap text-gray-500 ml-5">
                            {modalData.find(
                              (el) => el.key === 'custom_validation'
                            )
                              ? modalData.find(
                                  (el) => el.key === 'custom_validation'
                                ).value
                              : ''}
                          </p>
                        </div>
                        <div className="right">
                          <button
                            type="button"
                            onClick={openSubModal}
                            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-[#2c71b2] items-center"
                          >
                            Change
                          </button>
                          <ValidationModel
                            isOpen={isOpenValidation}
                            closeModal={closeSubModel}
                            setModalData={setModalData}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <InputField
                        name="Validation through Regex"
                        colKey="regex"
                        placeholder="^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$"
                        setModalData={setModalData}
                        columnData={'regex'}
                      />
                    </div>

                    <InputField
                      name="Custom Validation Error Message"
                      colKey="custom_message"
                      desc="Custom error to show when column doesn't meet the validation format."
                      setModalData={setModalData}
                      columnData={'custom_message'}
                    />

                    <div className="mt-4 float-right">
                      <button
                        type="button"
                        className="flex bg-white border-2 border-black text-black hover:text-white hover:bg-black focus:outline-none font-medium rounded-md gap-1 text-sm px-6 py-2 text-center mb-2"
                        onClick={handleSaveMainModalData}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MainModel;
