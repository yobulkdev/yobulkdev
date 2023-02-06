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
  let data = await fetch(
    `http://localhost:3000/api/importer/${importerId}`
  ).then((res) => res.json());
  return {
    props: {
      templateId: data.templateId,
    },
  };
}
