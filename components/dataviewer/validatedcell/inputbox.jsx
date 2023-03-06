import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const InputBox = ({ val }) => {
  const [value, setValue] = useState(val);
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div class="flex flex-nowrap relative text-gray-600 focus-within:text-gray-400">
      <span class=" inset-y-0 flex  items-center pl-2">
        <input
          value={value}
          onChange={onChange}
          className="border text-white bg-gray-900 rounded-md py-2 text-sm focus:outline-none focus:bg-white focus:text-gray-900"
        />
        <button
          type="submit"
          class="p-1 focus:outline-none focus:shadow-outline"
        >
          <ExclamationTriangleIcon className="w-9 h-9 text-red-300" />
        </button>
      </span>
    </div>
  );
};

export default InputBox;
