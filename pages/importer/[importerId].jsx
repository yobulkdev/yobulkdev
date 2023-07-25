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

export async function getServerSideProps({ req, res, params }) {
  console.log(params.importerId, 'LLLLLLLLLLLLLLLLLLll')
  const importerId = params.importerId.replace(/\-/g, '+');
  let data = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/importer/${importerId}`, {
      headers: { Cookie: req.headers.cookie },
    } )
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
