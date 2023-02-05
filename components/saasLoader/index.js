import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import CsvUploader from '../csvuploader';
import { Context } from '../../context';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const SaasLoader = ({ templateId }) => {
  const { state, dispatch } = useContext(Context);

  const headers = {
    template_id: templateId,
  };

  useEffect(() => {
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

  return (
    <div className='flex items-center mx-20'>
      <div className='w-72 border p-4'>
        <div className='flex mb-4 rounded bg-blue-500/25 p-2'>
          <p className='text-sm'>
            Make sure your file
            includes the following required columns:
          </p>
        </div>
        <p className='text-md uppercase font-bold text-gray-700'>
          Expected Columns
        </p>
        <hr className='my-2' />
        {state.saasTemplateColumns && state.saasTemplateColumns?.map((column, idx) => (
          <div key={idx} className='flex items-center justify-between'>

            <p className='text-gray-700 py-2'>
              {column.label}
            </p>
            {/* <AiOutlineInfoCircle className='w-4 h-4' /> */}
          </div>
        ))}
      </div>
      <div className="w-screen">
        <CsvUploader nextPageRoute={'/saasloadmatcher'} />
      </div>
    </div>);
};

export default SaasLoader;
