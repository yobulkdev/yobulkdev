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
        <h1 className="text-2xl font-bold text-gray-500">Templates</h1>
        <Link href={`/templatecreate`}>
          <button
            type="button"
            className="flex bg-white border-2 border-black text-black hover:text-white hover:bg-black focus:outline-none font-medium rounded-lg text-sm px-6 py-2 text-center mb-2"
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
              className="mt-4 bg-white rounded-md flex flex-col align-middle justify-between p-4 mx-2 shadow-sm"
              key={idx}
            >
              <div className="flex flex-col">
                <Link href={`/templates/${obj._id}`}>
                  <h2 className="text-lg text-blue-500 cursor-pointer">
                    {obj.template_name}
                  </h2>
                </Link>
              </div>

              <div className="mt-4">
                <Link href={`/templates/testtemplate/${obj._id}`}>
                  <button
                    type="button"
                    className="text-white border-2 border-blue-500 bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-1 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Preview
                  </button>
                </Link>
                <Link href={`/templates/${obj._id}`}>
                  <button
                    type="button"
                    className="bg-white border-2 border-black text-black hover:text-white hover:bg-black focus:outline-none font-medium rounded-full text-sm px-3 py-1 text-center mr-2"
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
