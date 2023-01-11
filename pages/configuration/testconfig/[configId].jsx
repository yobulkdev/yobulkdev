import React from 'react';
import TestConfiguration from '../../../components/Configuration/TestConfiguration';
import Layout from '../../../layouts/Layout';
import { useRouter } from 'next/router';
const Templates = () => {
    const router = useRouter();
    const { configId } = router.query;

    if (!configId) {
        // we are still waiting for dynamic data to be available
        return 'loading...';
    }

    return (
        <>
            <Layout>
                <TestConfiguration configId={configId} />
            </Layout>
        </>
    );
};

export default Templates;
