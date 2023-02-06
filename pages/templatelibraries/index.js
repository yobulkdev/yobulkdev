import React from 'react';
import Layout from '../../layouts/Layout';

import TemplatelibrariesComponent from '../../components/templateLibraries';

const TemplateLibraries = () => {
    return (
        <>
            <Layout>
                <div className="overflow-x-auto mx-4 mt-10">
                    <div className="p-6">
                        <TemplatelibrariesComponent />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default TemplateLibraries;
