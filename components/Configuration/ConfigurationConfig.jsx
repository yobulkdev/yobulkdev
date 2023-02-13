import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const ConfigurationConfig = ({ configId }) => {
  const [importerData, setImporterData] = useState({});

  useEffect(() => {
    axios
      .get(`/api/importer/${configId}`)
      .then((res) => {
        setImporterData(res.data);
      })
      .catch((err) => console.log(err));
  }, [configId]);

  return (
    <div className="p-4">
      <div className="flex align-middle justify-between ">
        <div className="flex align-middle items-center gap-2 ">
          <Link href="/configuration">
            <ArrowLeftIcon className="h-5 cursor-pointer" />
          </Link>

          <h1 className="text-2xl font-bold text-gray-500">
            {importerData.name}
          </h1>
        </div>
      </div>
      <div className="mt-4 bg-white rounded-md p-6 flex flex-col align-middle shadow-sm">
        <div className="flex">
          <div className="flex flex-col w-5/12">
            <h2 className="text-lg font-bold text-gray-500">Key</h2>
            <p className="text-gray-400">
              The unique key used to identify this Importer
            </p>
          </div>
          <div className="ml-10 flex flex-col justify-center w-72">
            <div className="mb-2">
              <span className="text-blue-500">{importerData._id}</span>
            </div>
          </div>
        </div>

        <div className="flex mt-4">
          <div className="flex flex-col w-5/12">
            <h2 className="text-lg font-bold text-gray-500">Name</h2>
            <p className="text-gray-400">Name of the importer</p>
          </div>
          <div className="ml-10 flex flex-col justify-center w-72">
            <div className="mb-2">
              <span> {importerData.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto relative mt-3">
        <table className="w-full bg-white  text-sm text-gray-500 dark:text-gray-400 table shadow-md border-2">
          <thead className="text-xs text-white uppercase h-10 bg-blue-500">
            <tr>
              <th scope="col" className="py-3">
                Importer Name
              </th>
              <th scope="col" className="py-3">
                Importer ID
              </th>

              <th scope="col" className="py-3 ">
                Date Created
              </th>
              <th scope="col" className="py-3">
                Attached Template
              </th>
            </tr>
          </thead>
          {importerData ? (
            <tr key={importerData._id} className="h-10 text-center border-b-2">
              <td>{importerData.name}</td>
              <td>{importerData._id}</td>
              <td>
                {importerData.date ? importerData.date.split('T')[0] : 'NA'}
              </td>
              <td>{importerData.templateName}</td>
            </tr>
          ) : (
            <></>
          )}
        </table>
      </div>
    </div>
  );
};

export default ConfigurationConfig;
