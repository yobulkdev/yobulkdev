import Layout from '../../layouts/Layout';

import { useRouter } from 'next/router';

import ConfigurationConfig from '../../components/configuration/ConfigurationConfig';

const ConfigurationPage = () => {
  const router = useRouter();
  const { configID } = router.query;


  return (
    <>
      <Layout>
        <ConfigurationConfig configID={configID} />
      </Layout>
    </>
  );
};

export default ConfigurationPage;
