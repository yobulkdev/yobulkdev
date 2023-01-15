import React, { useState } from 'react';
import Layout from '../../layouts/Layout';
import { Tab } from '@headlessui/react';

import TemplateConfig from '../../components/templates/TemplateConfig';
import JSON_Template from '../../components/templates/JSON_Template.jsx';
import CsvUploader from '../../components/csvuploader';
import Link from 'next/link';
import { ArrowDownTrayIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const tabList = ['No Code Template', 'JSON Template', 'CSV Template'];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Templates = () => {
  const [templateName, setTemplateName] = useState('');

  const saveTemplate = () => {
    axios
      .post('/api/templates', templateData)
      .then((result) => {
        router.push({ pathname: '/templates' }, undefined, {
          shallow: true,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Layout>
        <div className="p-2 ">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl p-1">
              {tabList.map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      'w-full  py-2.5 text-sm font-medium leading-5 dark:text-white',
                      selected
                        ? 'border-b-2 text-blue-900 outline-none border-blue-900'
                        : 'text-black hover:bg-white/[0.12] hover:text-blue-500'
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <TemplateConfig type="create" />
              </Tab.Panel>
              <Tab.Panel>
                <JSON_Template />
              </Tab.Panel>
              <Tab.Panel>
                <div className="p-4 flex flex-col gap-10">
                  <div>
                    <div className="flex align-middle justify-between ">
                      <div className="flex align-middle items-center gap-2 ">
                        <Link href="/templates">
                          <ArrowLeftIcon className="h-5 cursor-pointer" />
                        </Link>

                        <h1 className="text-2xl font-bold text-gray-500">
                          {`${
                            templateName ? templateName : 'Name your'
                          } template`}
                        </h1>
                      </div>

                      <button
                        type="button"
                        onClick={saveTemplate}
                        className="flex bg-white border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:outline-none font-medium rounded-md gap-1 text-sm px-6 py-2 text-center mb-2"
                      >
                        <ArrowDownTrayIcon className="h-4 mr-1" /> Save Template
                      </button>
                    </div>

                    <div className="my-4 bg-white rounded-md p-6 flex flex-col align-middle shadow-sm">
                      <div className="flex">
                        <div className="flex flex-col w-5/12">
                          <h2 className="text-lg font-bold text-gray-500">
                            Name
                          </h2>
                          <p className="text-gray-400">Name of the template</p>
                        </div>
                        <div className="ml-10 flex flex-col justify-center w-72">
                          <div className="mb-2">
                            <input
                              type="text"
                              id="default-input"
                              className={`border border-gray-300 text-gray-400  text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-[700px] 
                   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                              value={templateName}
                              onChange={(e) => setTemplateName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CsvUploader
                    isStepperVisible={false}
                    nextPageRoute={'/snapshotviewer'}
                  />
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </Layout>
    </>
  );
};

export default Templates;
