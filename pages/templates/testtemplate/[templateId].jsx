import React from 'react';
import Layout from '../../../layouts/Layout';
import { useRouter } from 'next/router';
import TestTemplate from '../../../components/templates/TestTemplate';

const Templates = () => {
  const router = useRouter();
  const { templateId } = router.query;

  if (!templateId) {
    // we are still waiting for dynamic data to be available
    return 'loading...';
  }

  return (
    <>
      <Layout>
        <TestTemplate templateId={templateId} />
      </Layout>
    </>
  );
};

export default Templates;
