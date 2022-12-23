import React from 'react';
import ConfigList from '../../components/Configuration/ConfigList';
import Layout from '../../layouts/Layout';

const Configuration = () => {
    return (
        <Layout>
            <div className="flex">
                <div className="w-5/12">
                    <ConfigList />
                </div>
                <div className="w-1/2 relative">
                    <button
                        type="button"
                        className="py-2.5 px-5 mr-2 absolute bottom-0 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        NEXT
                    </button>
                </div>
            </div>

        </Layout>
    );
};

export default Configuration;