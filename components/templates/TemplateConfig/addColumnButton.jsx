import MainModel from '../MainModel';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
export default function addColumnButton({
  openModal,
  isOpen,
  closeModal,
  setTemplateData,
}) {
  return (
    <div className="rounded-md mt-4 flex align-middle justify-between">
      <h1 className="text-xl font-bold text-gray-500">Columns</h1>
      <button
        type="button"
        onClick={openModal}
        className="flex rounded-sm bg-blue-500 px-2 py-1 text-sm font-medium border-2 items-center hover:bg-blue-700 text-lime-50"
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
