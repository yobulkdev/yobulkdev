import React from 'react';
import SaasLoader from '../../components/saasLoader';
import { useRouter } from 'next/router';

const SaasLoaderPage = () => {
  const router = useRouter();
  const { templateId } = router.query;

  if (!templateId) {
    // we are still waiting for dynamic data to be available
    return 'loading...';
  }

  return (
    <div>
      <SaasLoader templateId={templateId} />
    </div>
  );
};

export default SaasLoaderPage;
