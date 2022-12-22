import React from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

const ImportsComponent = () => {

    let templateData = {};

    return (
        <div className="overflow-x-auto mx-4 relative mt-10">
            <button
                type="button"
                className="py-2.5 px-5 mr-2 mb-2 flex
                text-sm font-medium text-gray-900
                bg-white rounded-md
                border border-gray-200 hover:bg-gray-100 hover:text-blue-700
                focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-200
                dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 
                float-right"
            >
                Download File
                <DocumentArrowDownIcon
                    className="h-5 w-5 ml-2"
                    aria-hidden="true" />
            </button>

            <table className="w-full text-sm text-gray-500 dark:text-gray-400 table mt-20">
                <thead className="text-xs text-gray-500 uppercase dark:bg-gray-700 dark:text-gray-400 h-10 bg-blue-50">
                    <tr>
                        <th scope="col" className="py-3">
                            OrgID
                        </th>
                        <th scope="col" className="py-3">
                            TID
                        </th>
                        <th scope="col" className="py-3 ">
                            File Name
                        </th>
                        <th scope="col" className="py-3">
                            <span>Rows</span>
                        </th>
                        <th scope="col" className="py-3">
                            <span>Started Date</span>
                        </th>
                        <th scope="col" className="py-3">
                            <span>Submitted Date</span>
                        </th>
                        <th scope="col" className="py-3">
                            <span>Status</span>
                        </th>
                    </tr>
                </thead>
                {templateData.columns ? (
                    templateData.columns.map((col, idx) => (
                        <tr key={idx} className="h-10 text-center">
                            {/*   <td className="w-8">{col.key}</td> */}
                            <td>{col.label}</td>
                            <td>{col.data_type}</td>
                            <td>{col.custom_validation}</td>
                            <td>{col.is_required ? col.is_required.toString() : ''}</td>
                        </tr>
                    ))
                ) : (
                    <></>
                )}
            </table>
        </div>
    );
};

export default ImportsComponent;