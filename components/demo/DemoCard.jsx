import { Fragment, useEffect, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import Editor from '@monaco-editor/react';

import Link from 'next/link';
import axios from 'axios';

const DemoCard = ({ item }) => {
  const [isSchemaMenuOpen, setIsSchemaMenuOpen] = useState(false);
  const [templateData, setTemplateData] = useState({});
  const [mode, setMode] = useState('light');

  function beforeMount(monaco) {
    monaco.editor.defineTheme('yobulkdark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1F2937',
      },
    });
  }

  function closeModal() {
    setIsSchemaMenuOpen(false);
  }

  function openModal() {
    setIsSchemaMenuOpen(true);
  }

  useEffect(() => {
    const headers = {
      template_id: item.templateId,
    };
    axios
      .get('/api/templates', { headers })
      .then((res) => {
        setTemplateData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => setMode(e.matches ? 'dark' : 'light'));
    setMode(
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    );
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', () => {});
    };
  }, []);

  return (
    <>
      <div className="mx-16 flex gap-1 shadow-md rounded-md text-left p-4 bg-white justify-between dark:bg-gray-900">
        <div className="flex flex-col text-black dark:text-white">
          <h1 className="text-lg">{item.title}</h1>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            {item.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={item.downloadLink}>
            <button className="bg-[#C83] w-[160px] h-[36px]  text-sm text-white p-2 rounded-md dark:bg-white dark:text-black">
              Download CSV
            </button>
          </Link>
          <ArrowRightIcon className="h-6 w-6 text-[#5EB4EA]" />
          <Link href={item.importLink}>
            <button className="bg-[#5EB4EA] w-[160px] h-[36px]  text-sm text-white p-2 rounded-md dark:bg-white dark:text-black">
              Import CSV
            </button>
          </Link>

          <div>
            <button
              className="bg-gray-400 w-[160px] h-[36px]  text-sm text-white p-2 ml-12 rounded-md hover:bg-white hover:text-blue-700 hover:border hover:border-blue-700"
              onClick={() => setIsSchemaMenuOpen(true)}
            >
              View Schema
            </button>
          </div>
        </div>
      </div>

      <Transition appear show={isSchemaMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsSchemaMenuOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-1/2 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-900">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Template Schema
                  </Dialog.Title>
                  <div className="mt-2">
                    <Editor
                      height="65vh"
                      width="100%"
                      theme={mode === 'dark' ? 'yobulkdark' : 'vs'}
                      language="json"
                      beforeMount={beforeMount}
                      defaultValue={JSON.stringify(
                        templateData.schema,
                        null,
                        '  '
                      )}
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsSchemaMenuOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DemoCard;
