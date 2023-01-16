import React from 'react';
import ListTemplates from '../../components/templates';
import Layout from '../../layouts/Layout';

const Templates = () => {
  return (
    <>
      <Layout>
        <div className="overflow-x-auto mx-4 mt-10">
          <div className="p-6">
            <ListTemplates />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Templates;
