import React from 'react';
import Layout from '../../layouts/Layout';
import { Tab } from '@headlessui/react';

import TemplateConfig from '../../components/templates/TemplateConfig';
import JSON_Template from '../../components/templates/JSON_Template.jsx';
import CsvUploader from '../../components/csvuploader';

const tabList = ['No Code Template', 'JSON Template', 'CSV Template'];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Templates = () => {
  return (
    <>
      <Layout>
        <div className="p-2">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl p-1">
              {tabList.map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      'w-full  py-2.5 text-sm font-medium leading-5 dark:text-white',
                      selected
                        ? 'bg-white border-b-2 text-black outline-none border-blue-900'
                        : 'text-blue-400 hover:bg-white/[0.12] hover:text-blue-500'
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
                <CsvUploader
                  isStepperVisible={false}
                  nextPageRoute={'/snapshotviewer'}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </Layout>
    </>
  );
};

export default Templates;
