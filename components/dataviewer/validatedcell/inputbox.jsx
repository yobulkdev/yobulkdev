import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const InputBox = ({ val }) => {
  const [value, setValue] = useState(val);
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div class="relative text-gray-600 focus-within:text-gray-400">
      <input
        value={value}
        onChange={onChange}
        className="border text-white bg-gray-900 rounded-md py-2 text-sm pr-10 focus:outline-none focus:bg-white focus:text-gray-900"
      />
      <span class="relative inset-y-0 flex  items-center pl-2">
        <button
          type="submit"
          class="p-1 focus:outline-none focus:shadow-outline"
        >
          <ExclamationTriangleIcon className="w-8 h-8 text-red-300" />
        </button>
      </span>
    </div>
  );
};

export default InputBox;
