import React, { useEffect, useState } from 'react';
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
  const [defaultTab, setDefaultTab] = useState(0);

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

  useEffect(() => {
    setDefaultTab(window.location.href.slice(-1));
  }, []);

  return (
    <>
      <Layout>
        <div className="p-2 dark:bg-gray-800 h-screen">
          <Tab.Group
            defaultIndex={defaultTab}
            selectedIndex={defaultTab}
            onChange={setDefaultTab}
          >
            <Tab.List className="flex space-x-1 rounded-xl p-1">
              {tabList.map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      'w-full  py-2.5 text-sm font-medium leading-5 dark:text-white',
                      selected
                        ? 'border-b-2 text-blue-900 outline-none border-blue-900 dark:border-blue-500 dark:text-blue-500'
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
                          <ArrowLeftIcon className="h-5 cursor-pointer dark:text-white" />
                        </Link>

                        {/* <h1 className="text-2xl font-bold text-gray-500">
                          {`${
                            templateName ? templateName : 'Name your'
                          } template`}
                        </h1> */}
                      </div>

                      {/* <button
                        type="button"
                        onClick={saveTemplate}
                        className="flex bg-white border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:outline-none font-medium rounded-md gap-1 text-sm px-6 py-2 text-center mb-2"
                      >
                        <ArrowDownTrayIcon className="h-4 mr-1" /> Save Template
                      </button> */}
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
