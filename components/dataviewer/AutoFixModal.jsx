import { Transition, Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

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
              <Dialog.Panel className="w-full max-w-7xl transform  rounded-md bg-white p-6 text-left align-middle transition-all dark:bg-gray-900 dark:border-2 dark:border-white">
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
                <div className="mt-2">
                  <table>{/* TOOD: Create a table here */}</table>
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
