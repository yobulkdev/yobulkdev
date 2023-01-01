import { useEffect, useState } from 'react';
import {
    AttachToImporter,
    AttachToOrganizations,
    AttachToJSONOBJ,
    AttachToWorkspace,
    AttachWebHookURL
} from './index';

const importers = [
    { value: "Importer #1", label: "Importer #1" },
    { value: "Importer #2", label: "Importer #2" },
    { value: "Importer #3", label: "Importer #3" },
    { value: "Importer #4", label: "Importer #4" },
    { value: "Importer #5", label: "Importer #5" },
];

const organizations = [
    {
        value: 'Company A',
        label: 'Company A',
    },
    {
        value: 'Company B',
        label: 'Company B',
    },
    {
        value: 'Company C',
        label: 'Company C',
    },
    {
        value: 'Company D',
        label: 'Company D',
    },
];

const jsonOBJ = [
    {
        value: 'Object A',
        label: 'Object A',
    },
    {
        value: 'Object B',
        label: 'Object B',
    },
    {
        value: 'Object C',
        label: 'Object C',
    },
];

const workspaces = [
    {
        value: 'Workspace #A',
        label: 'Workspace #A',
    },
    {
        value: 'Workspace #B',
        label: 'Workspace #B',
    },
    {
        value: 'Workspace #C',
        label: 'Workspace #C',
    },
];

const ConfigList = () => {
    const [attachToImporters, setAttachToImporters] = useState(null);
    const [attachToOrganizations, setAttachToOrganizations] = useState(null);
    const [attachThemeJSONObj, setAttachThemeJSONObj] = useState(null);
    const [attachToWorkspace, setAttachToWorkspace] = useState(null);
    const [attachWebHookURL, setAttachWebHookURL] = useState(null);

    const [configurationData, setConfigurationData] = useState(null);
    const [error, setError] = useState(null);

    const handleClick = (e) => {
        e.preventDefault();
        if (!attachToImporters || !attachToOrganizations || !attachThemeJSONObj || !attachToWorkspace || !attachWebHookURL) {
            setError('*Please fill all the fields');
            return;
        }

        setConfigurationData({
            attachToImporters, attachToOrganizations, attachThemeJSONObj, attachToWorkspace, attachWebHookURL
        });
    };

    useEffect(() => {
        if (attachToImporters && attachToOrganizations && attachThemeJSONObj && attachToWorkspace && attachWebHookURL) {
            setError('');
        }
    }, [attachThemeJSONObj, attachToImporters, attachToOrganizations, attachToWorkspace, attachWebHookURL]);

    return (
        <div className='flex mt-4 border-2 rounded-md py-1 px-2 align-middle justify-between'>

            <form className='p-5 w-7/12'>

                <AttachToImporter
                    attachToImporters={attachToImporters}
                    setAttachToImporters={setAttachToImporters}
                    importers={importers}
                />


                <AttachToOrganizations
                    attachToOrganizations={attachToOrganizations}
                    setAttachToOrganizations={setAttachToOrganizations}
                    organizations={organizations}
                />


                <AttachToJSONOBJ
                    attachThemeJSONObj={attachThemeJSONObj}
                    setAttachThemeJSONObj={setAttachThemeJSONObj}
                    jsonOBJ={jsonOBJ}
                />

                <AttachToWorkspace
                    attachToWorkspace={attachToWorkspace}
                    setAttachToWorkspace={setAttachToWorkspace}
                    workspaces={workspaces}
                />


                <AttachWebHookURL
                    attachWebHookURL={attachWebHookURL}
                    setAttachWebHookURL={setAttachWebHookURL}
                />

                <div className="flex mt-7 align-middle items-center">
                    <div className="flex flex-col w-5/12">
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>

                    <div className="flex flex-col justify-center">
                        <button
                            type="submit"
                            className="py-2.5 px-5 flex
                                text-sm font-medium text-gray-900
                                bg-white rounded-md
                                border border-gray-200 hover:bg-gray-100 hover:text-blue-700
                                focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-200
                                dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                            onClick={handleClick}
                        >
                            NEXT
                        </button>
                    </div>
                </div>

            </form>

            <div className="w-5/12 m-1 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

                {configurationData &&
                    <div className="p-5">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">Configuration</h3>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Attach to Importer</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{configurationData.attachToImporters.value}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Attach to Organizations</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{configurationData.attachToOrganizations.value}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Attach Theme JSON Object</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{configurationData.attachThemeJSONObj.value}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Attach To Workspace</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{configurationData.attachToWorkspace.value}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Attach Webhook URL</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{configurationData.attachWebHookURL}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </div>

        </div>
    );
};

export default ConfigList;
