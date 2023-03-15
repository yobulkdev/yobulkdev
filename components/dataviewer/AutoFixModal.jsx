import { Transition, Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { ImMagicWand } from 'react-icons/im';

const AutoFixModal = ({ isOpen, closeModal }) => {
  return (
    <Transition appear show={isOpen} onClose={closeModal}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
              <Dialog.Panel className="w-full max-w-6xl transform  rounded-md bg-white p-6 text-left align-middle transition-all dark:bg-gray-900 dark:border-2 dark:border-white">
                <Dialog.Title
                  as="h2"
                  className="text-lg flex items-center font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Auto Fix Columns
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
                <div className="mt-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Column Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Template Column Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Preview
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          AutoFix
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-blue-100">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-900">First Name</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-900">FIRSTNAME</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-900">
                            Tanay <span className="text-red-500">|</span> Tanay
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="px-3 py-1 flex items-center gap-2 border border-blue-500 hover:border-blue-600 text-blue-500 rounded-md">
                            <ImMagicWand />
                            AutoFix
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AutoFixModal;
