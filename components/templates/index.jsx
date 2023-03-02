import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusIcon } from '@heroicons/react/24/outline';

const MainBar = () => {
  const [templates, setTemplates] = useState();

  useEffect(() => {
    axios
      .get('/api/templates')
      .then((res) => {
        setTemplates(res.data.filter((el) => el['template_name']));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <div className="flex align-middle justify-between">
        <h1 className="text-2xl font-bold text-gray-500 dark:text-gray-200">
          Templates
        </h1>
        <Link href={`/templatecreate`}>
          <button
            type="button"
            className="flex bg-white border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:outline-none font-medium rounded-md gap-1 text-sm px-6 py-2 text-center mb-2 dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:border-white"
          >
            <PlusIcon className="w-5 mr-1" />
            Create Template
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-3">
        {templates &&
          templates.map((obj, idx) => (
            <div
              className="mt-4 bg-white rounded-md flex flex-col align-middle justify-between p-4 mx-2 shadow-sm dark:bg-gray-900"
              key={idx}
            >
              <div className="flex flex-col">
                <Link href={`/templates/${obj._id}`}>
                  <h2 className="text-lg text-blue-500 cursor-pointer dark:text-white">
                    {obj.template_name}
                  </h2>
                </Link>
              </div>

              <div className="mt-4">
                <Link href={`/templates/testtemplate/${obj._id}`}>
                  <button
                    type="button"
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded-full text-sm mr-2 dark:bg-white dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Preview
                  </button>
                </Link>
                <Link href={`/templates/${obj._id}`}>
                  <button
                    type="button"
                    className="py-1 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-blue-500 hover:bg-blue-300 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 
                    dark:bg-gray-900 dark:text-gray-200 dark:border-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200
                    "
                  >
                    View
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MainBar;
