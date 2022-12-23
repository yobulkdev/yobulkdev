import Layout from '../../layouts/Layout';
import CollaborateComponent from '../../components/Collaborate/CollaborateComponent';
import MultiSelectComponent from '../../components/Collaborate/MultiSelectComponent';

const Collaborate = () => {
    return (
        <Layout>
            <div className="overflow-x-auto mx-4 mt-10 h-full">
                <div className="p-6 ">

                    <CollaborateComponent />
                    <MultiSelectComponent />
                </div>
            </div>
        </Layout>
    );
};

export default Collaborate;