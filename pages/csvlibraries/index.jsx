import React from 'react';
import Layout from '../../layouts/Layout';

import ListTemplateLibraries from '../../components/csvlibraries';

const TemplateLibraries = () => {
  return (
    <>
      <Layout>
        <div className="overflow-x-auto mx-4 mt-10">
          <div className="p-6">
            <ListTemplateLibraries />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TemplateLibraries;
