import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SaasLoader from '../../components/saasLoader';

export default function ImporterPage({ templateId }) {
  return (
    <div>
      <SaasLoader templateId={templateId} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const importerId = params.importerId.replace(/\-/g, '+');
  let data = await axios
    .get(`${process.env.BACKEND_SERVER_HOST}/api/importer/${importerId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log('Error fetching importer document', err));
  return {
    props: {
      templateId: data.templateId,
    },
  };
}
