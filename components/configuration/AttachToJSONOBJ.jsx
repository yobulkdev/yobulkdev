import React from 'react';
import Select from 'react-tailwindcss-select';

const AttachToJSONOBJ = ({
  attachThemeJSONObj,
  setAttachThemeJSONObj,
  jsonOBJ,
  availiable = true,
}) => {
  return (
    <div
      className={`flex flex-col border-2 rounded-md ${
        !availiable ? 'cursor-no-drop border-black' : 'border-[#64B6EB]'
      } `}
    >
      {availiable ? null : (
        <div className="rounded-t-sm bg-black text-center text-white">
          COMING SOON
        </div>
      )}
      <div className="flex p-4 align-middle items-center">
        <div className="flex flex-col w-5/12">
          <h2 className="text-lg font-bold text-gray-500">Attach A Theme</h2>
          <p className="text-gray-400">
            Attach A Theme To the Importer JSON Object
          </p>
        </div>

        <div className="flex flex-col justify-center w-1/2">
          <Select
            value={attachThemeJSONObj}
            onChange={(e) => setAttachThemeJSONObj(e)}
            options={jsonOBJ}
            isDisabled={!availiable}
          />
        </div>
      </div>
    </div>
  );
};

export default AttachToJSONOBJ;
