import React from 'react';
import TemplateConfig from '../../components/templates/TemplateConfig';
import Layout from '../../layouts/Layout';
import { useRouter } from 'next/router';
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
        <TemplateConfig templateId={templateId} type="view" />
      </Layout>
    </>
  );
};

export default Templates;
