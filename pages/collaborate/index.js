import Layout from '../../layouts/Layout';
import CollaborateComponent from '../../components/collaborate/CollaborateComponent';

const Collaborate = () => {
  return (
    <Layout>
      <div className="overflow-x-auto mx-4 mt-10">
        <div className="p-6 ">
          <div className="flex align-middle justify-between">
            <h1 className="text-2xl font-bold text-gray-500 dark:text-gray-200">Collaborate</h1>
          </div>
          <CollaborateComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Collaborate;
