import React from 'react';
import Select from 'react-tailwindcss-select';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

const AttachToOrganizations = ({
  attachToOrganizations,
  setAttachToOrganizations,
  organizations,
}) => {
  return (
    <div className="flex p-4 align-middle items-center">
      <div className="flex flex-col w-5/12">
        <h2 className="text-lg font-bold text-gray-500 dark:text-gray-200">
          Attach An Organizations 
          {/* <span className="text-red-400">*</span> */}
        </h2>
        <p className="text-sm text-gray-400">
          Attach an Organization to A Importer.
        </p>
      </div>

      <div className="flex flex-col justify-center ml-4 w-6/12">
        {/* {!attachToOrganizations && (
          <div className="flex gap-1 w-full text-sm text-red-400 dark:text-red-200 justify-end mb-1">
            <InformationCircleIcon className="w-3 mt-1" /> This field is
            required
          </div>
        )} */}
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
