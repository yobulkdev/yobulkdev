import React from 'react';
import Select from 'react-tailwindcss-select';

const AttachToWorkspace = ({ attachToWorkspace, setAttachToWorkspace, workspaces }) => {
    return (
        <div className="flex mt-7 align-middle items-center">
            <div className="flex flex-col w-5/12">
                <h2 className="text-lg font-bold text-gray-500">Attach the template to the Workspace.</h2>
                <p className="text-gray-400">
                    Attach the JSON Object to a Workspace.
                </p>
            </div>

            <div className="flex flex-col justify-center w-1/2">
                <Select
                    value={attachToWorkspace}
                    onChange={(e) => setAttachToWorkspace(e)}
                    options={workspaces}
                />
            </div>
        </div>
    );
};

export default AttachToWorkspace;