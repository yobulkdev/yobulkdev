import React from 'react';
import Select from 'react-tailwindcss-select';

const AttachToJSONOBJ = ({ attachThemeJSONObj, setAttachThemeJSONObj, jsonOBJ }) => {
    return (
        <div className="flex p-4 align-middle items-center">
            <div className="flex flex-col w-5/12">
                <h2 className="text-lg font-bold text-gray-500">Attach Theme JSON Object</h2>
                <p className="text-gray-400">
                    Attach the JSON Object to template.
                </p>
            </div>

            <div className="flex flex-col justify-center w-1/2">
                <Select
                    value={attachThemeJSONObj}
                    onChange={(e) => setAttachThemeJSONObj(e)}
                    options={jsonOBJ}
                />
            </div>
        </div>
    );
};

export default AttachToJSONOBJ;