import React from 'react';
import ListTemplates from '../../components/templates';
import Layout from '../../layouts/Layout';

const Templates = () => {
  return (
    <>
      <Layout>
        <div className="overflow-x-auto h-full dark:bg-gray-800">
          <div className="mx-4 mt-10">
            <div className="p-6">
              <ListTemplates />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Templates;
