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
        <div className='flex mt-4 border-2 rounded-md py-1 px-2 align-middle justify-between'>

            <form className='p-5 w-full'>
                <div className="flex mt-7 align-middle items-center">
                    <div className="flex flex-col w-5/12">
                        <h2 className="text-lg font-bold text-gray-500">Create a Organization </h2>
                        <p className="text-gray-400">
                            The Organization Name to identify your organization
                        </p>
                    </div>
                    <div className="flex flex-col justify-center w-1/2">
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

                <div className="flex mt-7 align-middle items-center">
                    <div className="flex flex-col w-5/12">
                        <h2 className="text-lg font-bold text-gray-500">Create a Workspace</h2>
                        <p className="text-gray-400">
                            The Workspace Name to identify your workspace
                        </p>
                    </div>
                    <div className="flex flex-col justify-center w-1/2">
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

                <hr className='my-7 align-middle items-center' />

                <div className="flex">
                    <div className="flex flex-col w-5/12">
                        <h2 className="text-lg font-bold text-gray-500">Add Colaborators</h2>
                        <p className="text-gray-400">
                            The Collaborators to add to your workspace
                        </p>
                    </div>
                    <div className="flex flex-col justify-center w-1/2">
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
                    className="bg-white float-right mt-10 border-2 hover:bg-blue-500 hover:text-white text-black py-1 px-2 rounded shadow-sm"
                    onClick={handleClick}
                >
                    SUBMIT
                </button>
            </form>

        </div>
    );
};

export default CollaborateComponent;