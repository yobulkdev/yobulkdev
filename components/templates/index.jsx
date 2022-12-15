import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="p-12">
      <div className="flex align-middle justify-between">
        <h1 className="text-2xl font-bold text-gray-500">Templates</h1>
        <Link href={`/templatecreate`}>
          <button className="bg-white border-2 hover:bg-blue-500 hover:text-white text-black py-1 px-2 rounded shadow-sm">
            Add Template
          </button>
        </Link>
      </div>

      {templates &&
        templates.map((obj, idx) => (
          <div
            className="mt-4 border-2 rounded-md py-1 px-2 flex align-middle justify-between"
            key={idx}
          >
            <div className="flex flex-col">
              <Link href={`/templates/${obj._id}`}>
                <h2 className="text-lg text-blue-500 cursor-pointer">
                  {obj.template_name}
                </h2>
              </Link>
            </div>

            <div className="mt-1">
              <Link href={`/templates/testtemplate/${obj._id}`}>
                <button
                  type="button"
                  className="text-white bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Test
                </button>
              </Link>
              <Link href={`/templates/${obj._id}`}>
                <button
                  type="button"
                  className="text-gray-100 bg-orange-500 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-1.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  View
                </button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MainBar;
