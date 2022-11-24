import CsvUploader from '../components/csvuploader';
import Layout from '../layouts/Layout';

const Index = () => {
  return (
    <Layout>
      <CsvUploader isStepperVisible={true} nextPageRoute={'/snapshotviewer'} />
    </Layout>
  );
};

export default Index;
