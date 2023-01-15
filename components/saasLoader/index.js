import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import CsvUploader from '../csvuploader';
import { Context } from '../../context';

const SaasLoader = ({ templateId }) => {
  const { state, dispatch } = useContext(Context);

  const headers = {
    template_id: templateId,
  };

  useEffect(() => {
    console.log('Template ID:', templateId);
    axios
      .get('/api/templates', { headers })
      .then((result) => {
        if (result.data.columns) {
          dispatch({
            type: 'SET_SASS_TEMPLATE_COLUMNS',
            payload: result.data.columns,
          });
          dispatch({
            type: 'SET_SASS_BASE_TEMPLATE_ID',
            payload: templateId,
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return <CsvUploader nextPageRoute={'/saasloadmatcher'} />;
};

export default SaasLoader;
