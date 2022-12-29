import Layout from '../../layouts/Layout';
import CollaborateComponent from '../../components/Collaborate/CollaborateComponent';

const Collaborate = () => {
    return (
        <Layout>
            <div className="overflow-x-auto mx-4 mt-10 h-full">
                <div className="p-6 ">

                    <CollaborateComponent />
                </div>
            </div>
        </Layout>
    );
};

export default Collaborate;