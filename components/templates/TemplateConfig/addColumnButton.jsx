import MainModel from '../MainModel';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
export default function addColumnButton({
  openModal,
  isOpen,
  closeModal,
  setTemplateData,
}) {
  return (
    <div className="rounded-md mt-10 flex align-middle justify-between">
      <h1 className="text-xl font-bold text-gray-500">Columns</h1>
      <button
        type="button"
        onClick={openModal}
        className="flex bg-white border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:outline-none font-medium rounded-md gap-1 text-sm px-6 py-2 text-center mb-2"
      >
        <PlusCircleIcon className="h-5 mr-1" /> Add Column
      </button>

      <MainModel
        isOpen={isOpen}
        closeModal={closeModal}
        setTemplateData={setTemplateData}
      />
    </div>
  );
}
