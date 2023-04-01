import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import axios from 'axios';
const InputBox = ({ columnName, val }) => {
  const [value, setValue] = useState(val);
  const [feedback, setFeedback] = useState('N/A');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const getFeedback = async () => {
    let feedback_url = '/api/yobulk-ai/feedback';
    await axios
      .get(`${feedback_url}?columnName=${columnName}&columnValue=${value}`)
      .then((res) => {
        setFeedback(res.data);
      });
  };

  return (
    <>
      <div className="flex relative items-center text-gray-600 focus-within:text-gray-400 w-52">
        <input
          value={value}
          onChange={onChange}
          className="px-3 font-semibold placeholder-slate-500 text-black rounded-md py-2 border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2 focus:outline-none focus:bg-white focus:text-gray-900"
          placeholder="Some text..."
        />

        <button
          type="submit"
          className="absolute focus:outline-none focus:shadow-outline inset-y-0 right-0"
        >
          <ExclamationTriangleIcon
            className="w-9 h-9 text-red-300"
            onClick={getFeedback}
          />
        </button>
      </div>

      <pre>{JSON.stringify(feedback)}</pre>
    </>
  );
};

export default InputBox;
