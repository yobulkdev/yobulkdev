import { useState, useEffect } from 'react';
import Select from "react-tailwindcss-select";

const options = [
    { value: "userOne", label: "userone@gmail.com" },
    { value: "userTwo", label: "usertwo@gmail.com" },
    { value: "userThree", label: "userthree@gmail.com" }
];

const CollaborateComponent = () => {

    const [orgName, setOrgName] = useState(null);
    const [workspaceName, setWorkspaceName] = useState(null);
    const [collaborators, setCollaborators] = useState(null);

    const [collaborateData, setCollaborateData] = useState({});

    const handleClick = (e) => {
        e.preventDefault();
        setCollaborateData({ orgName, workspaceName, collaborators });
    };

    useEffect(() => {
        console.log(collaborateData);
    }, [collaborateData]);


    return (
        <form >
            <div className="flex align-middle justify-between">
                <h1 className="text-2xl font-bold text-gray-500">Collaborate</h1>
            </div>
            <div className="flex mt-7 align-middle items-center w-1/2">
                <div className='w-1/2'>
                    <h1 className="text-md font-bold text-gray-500">Create a Org Name</h1>
                </div>
                <div className="w-1/2">
                    <input
                        type="text"
                        className="bg-gray-50
                                    border border-gray-300 rounded-lg
                                    text-gray-900 text-sm
                                    focus:ring-blue-500 focus:border-blue-500 
                                    block w-full
                                    p-2.5
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='Enter Organization Name Here ...'
                        onChange={(evt) => setOrgName(evt.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="flex mt-7 align-middle items-center w-1/2">
                <div className='w-1/2'>
                    <h1 className="text-md font-bold text-gray-500">Create a Workspace</h1>
                </div>
                <div className="w-1/2">
                    <input
                        type="text"
                        className="bg-gray-50
                                    border border-gray-300 rounded-lg
                                    text-gray-900 text-sm
                                    focus:ring-blue-500 focus:border-blue-500 
                                    block w-full
                                    p-2.5
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='Enter Workspace Name Here ...'
                        onChange={(evt) => setWorkspaceName(evt.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="flex mt-7 align-middle items-center w-1/2">
                <div className='w-1/2'>
                    <h1 className="text-md font-bold text-gray-500">Add Colaborators</h1>
                </div>
                <div className="w-1/2">
                    <Select
                        value={collaborators}
                        onChange={(e) => setCollaborators(e)}
                        options={options}
                        isMultiple
                    />
                </div>
            </div>

            <button
                type='submit'
                className="bg-white border-2 hover:bg-blue-500 hover:text-white text-black py-1 px-2 rounded shadow-sm"
                onClick={handleClick}
            >
                SUBMIT
            </button>

        </form>
    );
};

export default CollaborateComponent;