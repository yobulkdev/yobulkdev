import Layout from '../../layouts/Layout';

import { useRouter } from 'next/router';

import { ConfigurationConfig } from '../../components/configuration';

const ConfigurationPage = () => {
  const router = useRouter();
  const { configId } = router.query;

  return (
    <>
      <Layout>
        <ConfigurationConfig configId={configId} />
      </Layout>
    </>
  );
};

export default ConfigurationPage;
