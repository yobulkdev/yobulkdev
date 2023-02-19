import React from 'react';
import Select from 'react-tailwindcss-select';

const AttachToOrganizations = ({
  attachToOrganizations,
  setAttachToOrganizations,
  organizations,
}) => {
  return (
    <div className="flex p-4 align-middle items-center">
      <div className="flex flex-col w-5/12">
        <h2 className="text-lg font-bold text-gray-500">
          Attach An Organizations
        </h2>
        <p className="text-gray-400">Attach an Organization to A Importer.</p>
      </div>

      <div className="flex flex-col justify-center w-1/2">
        <Select
          value={attachToOrganizations}
          onChange={(e) => setAttachToOrganizations(e)}
          options={organizations}
        />
      </div>
    </div>
  );
};

export default AttachToOrganizations;
