import { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import { Context } from '../../../context';
import { useRouter } from 'next/router';
import {
  PencilIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import addColumnButton from './addColumnButton';
import handleEdit from './handleEdit';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import Editor from '@monaco-editor/react';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

const AdminComponent = ({ templateId, type }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [templateData, setTemplateData] = useState({});
  const router = useRouter();
  const { dispatch } = useContext(Context);
  const [isRegexMenuOpen, setIsRegexMenuOpen] = useState(false);
  const [isSchemaMenuOpen, setIsSchemaMenuOpen] = useState(false);
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

  function closeREGEXModal() {
    setIsRegexMenuOpen(false);
  }

  function openREGEXModal() {
    setIsRegexMenuOpen(true);
  }

  useEffect(() => {
    const headers = {
      template_id: templateId,
    };
    if (type === 'view') {
      axios
        .get('/api/templates', { headers })
        .then((res) => {
          setTemplateData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [templateId]);

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

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleTemplateName = (e) => {
    setTemplateData((prev) => {
      return { ...prev, template_name: e.target.value };
    });
  };

  const saveTemplate = () => {
    if (!templateData.template_name) {
      return;
    }
    axios
      .post('/api/templates', templateData)
      .then((result) => {
        router.push({ pathname: '/templates' }, undefined, {
          shallow: true,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (col) => {
    setTemplateData((prev) => {
      return {
        ...prev,
        columns: prev.columns.filter((el) => el.key !== col.key),
      };
    });
  };

  const handleOpenEditModal = ({
    isOpen,
    setIsOpen,
    closeModal,
    setTemplateData,
    columnData,
  }) => {
    dispatch({ type: 'SET_CUR_TEMPLATE_EDIT', payload: true });
    dispatch({ type: 'SET_CUR_TEMPLATE_EDIT_COLUMN', payload: columnData });
    handleEdit({
      isOpen,
      setIsOpen,
      closeModal,
      setTemplateData,
      columnData,
    });
  };

  return (
    <div className="p-4 dark:bg-gray-800 h-screen">
      <div className="flex align-middle justify-between ">
        <div className="flex align-middle items-center gap-2 ">
          <Link href="/templates">
            <ArrowLeftIcon className="h-5 cursor-pointer" />
          </Link>

          <h1 className="text-2xl font-bold text-gray-500 dark:text-gray-200">
            {templateData &&
              `${
                templateData.template_name
                  ? templateData.template_name
                  : 'Name your'
              } template`}
          </h1>
        </div>
        {type === 'create' && (
          <button
            type="button"
            onClick={saveTemplate}
            className="flex bg-white border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:outline-none font-medium rounded-md gap-1 text-sm px-6 py-2 text-center mb-2"
          >
            <ArrowDownTrayIcon className="h-4 mr-1 " /> Save Template
          </button>
        )}
      </div>

      <div className="mt-4 bg-white rounded-md p-6 flex flex-col align-middle shadow-sm  dark:bg-gray-900">
        {type === 'view' && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h2 className="text-lg w-full font-bold text-gray-500 dark:text-gray-200">
                Key
              </h2>
              <p className="text-gray-400 text-sm">
                The unique key used to identify this Template
              </p>
            </div>
            <span className="text-blue-500 w-full">{templateData._id}</span>
            <div className="inline-flex justify-end">
              <button
                type="button"
                className="w-2/5 h-8 rounded-md border border-transparent bg-blue-100 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => setIsSchemaMenuOpen(true)}
              >
                View Schema
              </button>
            </div>
          </div>
        )}
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
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <h2 className="text-lg w-full font-bold text-gray-500 dark:text-gray-200">
              Name <span className="text-red-400">*</span>
            </h2>
            <p className="text-gray-400 text-sm">Name of the template</p>
          </div>
          {
            <div>
              {type === 'view' && templateData ? (
                <span> {templateData.template_name}</span>
              ) : (
                <>
                  {!templateData.template_name && (
                    <div className="flex gap-1 w-full text-sm text-red-400 dark:text-red-200 justify-end mb-1">
                      <InformationCircleIcon className="w-3 mt-1" /> This field
                      is required
                    </div>
                  )}
                  <input
                    type="text"
                    id="default-input"
                    className={`border border-gray-300 text-gray-400  text-sm rounded-lg
                      focus:ring-blue-500 focus:border-blue-500 block w-full
                      p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        !templateData.template_name && 'border-red-400'
                      }`}
                    value={templateData.template_name}
                    disabled={type === 'view'}
                    onChange={(e) => handleTemplateName(e)}
                  />
                </>
              )}
            </div>
          }
        </div>
      </div>

      {/*       <div className="p-4">{JSON.stringify(templateData)}</div>
       */}
      {type === 'create' &&
        addColumnButton({ openModal, isOpen, closeModal, setTemplateData })}

      <div className="overflow-x-auto relative mt-3">
        <table className="w-full bg-white text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400 table shadow-md border-2 dark:border-gray-700">
          <thead className="text-xs text-white uppercase h-10 bg-blue-500">
            <tr>
              {/*  <th scope="col" className="py-3">
                Column Key
              </th> */}
              <th scope="col" className="py-3">
                Column name
              </th>
              <th scope="col" className="py-3">
                Format
              </th>

              <th scope="col" className="py-3 ">
                Example
              </th>
              <th scope="col" className="py-3">
                <span>Required</span>
              </th>
              <th scope="col" className="py-3">
                <span>Validator</span>
              </th>
              {type === 'create' && (
                <th scope="col" className="py-3">
                  <span>Action</span>
                </th>
              )}
            </tr>
          </thead>
          {templateData.columns ? (
            templateData.columns.map((col, idx) => (
              <tr
                key={idx}
                className="h-10 text-center border-b-2 dark:border-gray-700"
              >
                {/*   <td className="w-8">{col.key}</td> */}
                <td>{col.label}</td>
                <td>{col.data_type}</td>
                <td>{col.example}</td>
                <td>{col.is_required ? col.is_required.toString() : ''}</td>
                <td className="justify-center items-center">
                  <button
                    className="flex mx-auto items-center gap-1"
                    onClick={openREGEXModal}
                  >
                    <span className="text-blue-500">Custom Validator</span>
                    <PencilSquareIcon className="w-4 h-4" />
                  </button>
                  <Transition appear show={isRegexMenuOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={closeREGEXModal}
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                              >
                                REGULAR EXPRESSION
                              </Dialog.Title>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  {col.pattern
                                    ? col.pattern
                                    : 'Uhh! No Regex...'}
                                </p>
                              </div>

                              <div className="mt-4">
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  onClick={closeREGEXModal}
                                >
                                  Got it, thanks!
                                </button>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                </td>
                {type === 'create' && (
                  <td className="flex my-2 justify-center">
                    <PencilIcon
                      className="h-4 cursor-pointer mr-2 mt-1"
                      onClick={() =>
                        handleOpenEditModal({
                          isOpen,
                          setIsOpen,
                          closeModal,
                          setTemplateData,
                          columnData: col,
                        })
                      }
                    />
                    <TrashIcon
                      className=" h-5 cursor-pointer text-red-400"
                      onClick={() => handleDelete(col)}
                    />
                  </td>
                )}
              </tr>
            ))
          ) : (
            <></>
          )}
        </table>
      </div>
    </div>
  );
};

export default AdminComponent;
