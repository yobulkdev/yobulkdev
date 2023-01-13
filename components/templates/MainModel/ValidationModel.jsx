import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import {
  DROPDOWN_SELECT_TEXT,
  // NO_GMAIL_CHECK_TYPE,
  // THREE_DIGIT_CHECK_TYPE,
} from '../../../constants';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import customValidationDropdown from './customValidationDropdown';

const formats = [
  {
    name: 'Number',
    Description: 'Numbers with , and . characters allowed',
    // custom_validations: [DROPDOWN_SELECT_TEXT, THREE_DIGIT_CHECK_TYPE],
  },
  {
    name: 'Text',
    Description: 'Any String of Characters',
  },
  {
    name: 'Date',
    Description: 'Matches selected Format',
  },
  {
    name: 'Boolean',
    Description: 'Matches Boolean Values',
  },
  {
    name: 'Email',
    Description: 'Valid Email Address',
    // custom_validations: [DROPDOWN_SELECT_TEXT, NO_GMAIL_CHECK_TYPE],
  },
];

const ValidationModel = ({ isOpen, closeModal, setModalData }) => {
  const [selected, setSelected] = useState();

  const customValidationFinder = ({ obj, e }) => {
    if (!e.custom_validations || e.custom_validations.length === 0) {
      return { key: 'custom_validation', value: null };
    }
    if (e.custom_validations.indexOf(obj.value) > -1) {
      return obj;
    } else {
      return { key: 'custom_validation', value: null };
    }
  };

  const handleFormatSelection = (e) => {
    setModalData((prev) => {
      if (prev.find((el) => el.key === 'data_type')) {
        let newArr = prev.map((obj) =>
          obj.key === 'data_type'
            ? { key: 'data_type', value: e.name }
            : obj.key === 'custom_validation'
              ? customValidationFinder({ obj, e })
              : obj
        );

        return newArr;
      } else {
        return [...prev, { key: 'data_type', value: e.name }];
      }
    });

    setSelected(e);
  };

  const handleCustomFormatSelection = (selected) => {
    if (selected !== DROPDOWN_SELECT_TEXT) {
      setModalData((prev) => {
        if (prev.find((el) => el.key === 'custom_validation')) {
          return prev.map((obj) =>
            obj.key === 'custom_validation'
              ? { key: 'custom_validation', value: selected }
              : obj
          );
        } else {
          return [...prev, { key: 'custom_validation', value: selected }];
        }
      });
    }
    return;
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-fit justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform  rounded-md bg-white p-6 text-left align-middle transition-all">
                <Dialog.Title
                  as="h2"
                  className="text-lg flex items-center font-medium leading-6 text-gray-900"
                >
                  Choose Validation Format
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="defaultModal"
                    onClick={closeModal}
                  >
                    <XMarkIcon className="h-6" />
                    <span className="sr-only">Close modal</span>
                  </button>
                </Dialog.Title>
                <div className="mt-2">
                  <RadioGroup value={selected} onChange={handleFormatSelection}>
                    <div className="space-y-2">
                      {formats.map((plan) => (
                        <RadioGroup.Option
                          key={plan.name}
                          value={plan}
                          className={({ active, checked }) =>
                            `${active
                              ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                              : ''
                            }
                                                      ${checked
                              ? 'bg-white'
                              : 'bg-white'
                            }
                                                      relative flex cursor-pointer rounded-lg px-5 py-4 border shadow-sm focus:outline-none`
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <div className="flex w-full items-center justify-between">
                                <div className="flex items-center">
                                  <div className="text-sm">
                                    <RadioGroup.Label className="flex justify-between items-center">
                                      <p className="flex items-center">
                                        {plan.name}{' '}
                                        {customValidationDropdown({
                                          options: plan,
                                          handleCustomFormatSelection,
                                          handleFormatSelection,
                                        })}
                                      </p>
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as="span"
                                      className={`italic inline text-gray-500`}
                                    >
                                      <span>{plan.Description}</span>
                                    </RadioGroup.Description>
                                  </div>
                                </div>

                                {checked ? (
                                  <div className="shrink-0">
                                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                                  </div>
                                ) : null}
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}

                      <div className="mb-2">
                        <div className='ring-2 ring-white ring-opacity-60 ring-offset-2'>
                          <label
                            htmlFor="regexVal"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Custom Regular Expression
                          </label>
                          <input
                            type="text"
                            id="regexVal"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="^[a-zA-Z]*$"
                          />

                        </div>

                      </div>


                      <div className="mt-4 float-right">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div >
      </Dialog >
    </Transition >
  );
};

export default ValidationModel;
