import Home from '../components/home';
import Layout from '../layouts/Layout';
import Onboarding from '../components/onboarding/onboarding';

export default function Index() {
  return (
    <Onboarding>
      <Layout>
        <Home />
      </Layout>
    </Onboarding>
  );
}
