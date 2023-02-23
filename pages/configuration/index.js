import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Layout from '../../layouts/Layout';
import { PlusIcon } from '@heroicons/react/24/outline';

const Configuration = () => {
  const [configList, setConfigList] = useState([]);

  useEffect(() => {
    axios
      .get('/api/importer') //to be changed to /api/config
      .then((res) => {
        setConfigList(res.data); // to be changed to config_name
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Layout>
      <div className="overflow-x-auto mx-4 mt-10">
        <div className="p-6 ">
          <div className="flex align-middle justify-between">
            <h1 className="text-2xl font-bold text-gray-500">
              Importer Configuration
            </h1>
            <Link href={`/configcreate`}>
              <button className="flex bg-white border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:outline-none font-medium rounded-md gap-1 text-sm px-6 py-2 text-center mb-2">
                <PlusIcon className="w-5 mr-1" />
                Add an Importer
              </button>
            </Link>
          </div>

          {/* TODO: Create a List Here for Configs Availiable */}
          {/* HERE */}
          <div className="grid grid-cols-3">
            {configList &&
              configList.map((obj, idx) => (
                <div
                  className="mt-4 bg-white rounded-md flex flex-col align-middle justify-between p-4 mx-2 shadow-sm"
                  key={idx}
                >
                  <div className="flex flex-col">
                    <Link href={`/configuration/${obj._id}`}>
                      <h2 className="text-lg text-blue-500 cursor-pointer">
                        {obj.name}
                      </h2>
                    </Link>
                  </div>

                  <div className="mt-4">
                    <Link href={`/configuration/testconfig/${obj._id}`}>
                      <button
                        type="button"
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded-full text-sm mr-2"
                      >
                        Preview
                      </button>
                    </Link>
                    <Link href={`/configuration/${obj._id}`}>
                      <button
                        type="button"
                        className="py-1 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-blue-500 hover:bg-blue-300 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Configuration;
