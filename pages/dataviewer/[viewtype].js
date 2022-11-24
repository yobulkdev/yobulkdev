import React, { useEffect, useState } from 'react';
import Dataviewer from '../../components/dataviewer';
import { useRouter } from 'next/router';
import Layout from '../../layouts/Layout';

const DataviewerPage = () => {
  const { query } = useRouter();
  const { viewtype } = query;
  const [dataViewerType, setDataViewerType] = useState();
  useEffect(() => {
    if (!viewtype) {
      return;
    }
    setDataViewerType(viewtype);
  }, [viewtype]);

  return (
    <>
      {dataViewerType === 'norm' ? (
        <Layout>
          <Dataviewer version={dataViewerType} />
        </Layout>
      ) : (
        <Dataviewer version={dataViewerType} />
      )}
    </>
  );
};

export default DataviewerPage;
