import React from 'react';
import Layout from '../../layouts/Layout';

import RegexLibraries from '../../components/regexLibraries.jsx';

const TemplateLibraries = () => {
    return (
        <>
            <Layout>
                <div className="overflow-x-auto mx-4 mt-10">
                    <div className="p-6">
                        <RegexLibraries />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default TemplateLibraries;
