import React from 'react';

const CollaborateComponent = () => {
    return (
        <>
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
                    />
                    this is random
                </div>
            </div>
        </>
    );
};

export default CollaborateComponent;