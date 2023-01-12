import ConfigList from '../../components/Configuration/ConfigList';
import Layout from '../../layouts/Layout';

const ConfigCreate = () => {
    return (
        <Layout>
            <div className="overflow-x-auto mx-4 mt-5">
                <div className="p-6 ">
                    <ConfigList />
                </div>
            </div>
        </Layout>
    );
};

export default ConfigCreate;