import React from 'react';
import ConfigList from '../../components/Configuration/ConfigList';
import Layout from '../../layouts/Layout';

const Configuration = () => {
    return (
        <Layout>
            <div className="overflow-x-auto mx-4 mt-10">
                <div className="p-6 ">
                    <div className="flex align-middle justify-between">
                        <h1 className="text-2xl font-bold text-gray-500">Configuration</h1>
                    </div>
                    <ConfigList />
                </div>
            </div>
        </Layout>
    );
};

export default Configuration;