import React from 'react';
import Select from 'react-tailwindcss-select';

const AttachToImporter = ({
  attachToImporters,
  setAttachToImporters,
  importers,
}) => {
  return (
    <div className="flex p-4 align-middle items-center">
      <div className="flex flex-col w-5/12">
        <h2 className="text-lg font-bold text-gray-500">Attach A Template</h2>
        <p className="text-gray-400">Attach a template to a importer.</p>
      </div>

      <div className="flex flex-col justify-center w-1/2">
        <Select
          value={attachToImporters}
          onChange={(e) => setAttachToImporters(e)}
          options={importers}
        />
      </div>
    </div>
  );
};

export default AttachToImporter;
