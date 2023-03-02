import React from 'react';
import ImportsComponent from '../../components/imports';
import Layout from '../../layouts/Layout';

const Templates = () => {
  return (
    <>
      <Layout>
        <div className="overflow-x-auto mx-4 mt-4">
          <div className="p-6">
            <ImportsComponent />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Templates;
