import React, { useState, useRef } from 'react';

import Editor from '@monaco-editor/react';
import { useRouter } from 'next/router';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { googlecode } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Link from 'next/link';
import { ArrowDownTrayIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { Tab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const JSON_Template = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState();
  const editorRef = useRef();
  const defaultCode = `{
    "type": "object",
    "properties": {
        "firstName": {
        "type": "string",
        "maxLength": 5,
        "format": "first-name-validation",
        "validate": "(x) => (x.startsWith('yo') ? true : false)"
        },
        "email": { "type": "string", "format": "email" },
        "dob": { "type": "string", "format": "date" },
        "countryCode": {
        "type": "string",
        "enum": ["US", "CA"]
        }
    },
    "required": ["firstName", "email", "dob", "countryCode"]    
}    
`;
  const [isValidJson, setIsValidJson] = useState(true);
  const [code, setCode] = useState(`{}`);
  const [templateName, setTemplateName] = useState('');
  const [value, setValue] = useState(code);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const saveTemplate = () => {
    if (!templateName) {
      return;
    }
    try {
      JSON.parse(value);
    } catch (e) {
      setIsValidJson(false);
      return;
    }
    editorRef.current.trigger('editor', 'editor.action.formatDocument');
    axios
      .post('/api/templates/json', { templateName, schema: value })
      .then((result) => {
        router.push({ pathname: '/templates' }, undefined, {
          shallow: true,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleEditorChange = (value) => {
    try {
      JSON.parse(value);
      setIsValidJson(true);
    } catch {
      setIsValidJson(false);
    }
    setValue(value);
    setCode(value);
  };

  const generateAJV = () => {
    setValue('Generating schema...');
    fetch('/api/yobulk-ai/ajvschema', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    })
      .then((res) => res.json())
      .then((data) => setValue(data.data))
      .catch((e) => console.log(e));
  };
  return (
    <div className="p-4">
      <div className="flex align-middle justify-between ">
        <div className="flex align-middle items-center gap-2 ">
          <Link href="/templates">
            <ArrowLeftIcon className="h-5 cursor-pointer" />
          </Link>

          {/*      <h1 className="text-2xl font-bold text-gray-500">
            {`${templateName ? templateName : 'Name your'} template`}
          </h1> */}
        </div>

        <button
          type="button"
          onClick={saveTemplate}
          className="flex bg-white border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:outline-none font-medium rounded-md gap-1 text-sm px-6 py-2 text-center mb-2"
        >
          <ArrowDownTrayIcon className="h-4 mr-1" /> Save Template
        </button>
      </div>

      <div className="flex gap-4">
        <div>
          <div className="bg-white rounded-md p-2 my-1 shadow-sm">
            <div className="flex">
              <div className="flex flex-col w-5/12">
                <div className='ml-2'>
                  <h2 className="text-lg w-full font-bold text-gray-500">Name <span className='text-red-400'>*</span> </h2> 
                  <p className="text-gray-400 text-sm">Name of the template</p>
                </div>
              </div>
              <div className="flex flex-col justify-center w-full">
                <div className="mb-2">
                  <>
                    <input
                      type="text"
                      id="default-input"
                      className={`border border-gray-300 text-gray-400  text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full
                        p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      !templateName && 'border-red-400'
                    }`}
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                    />
                    {!templateName && (
                      <div className="flex gap-1 w-full text-sm text-red-400 dark:text-red-200">
                        <InformationCircleIcon className="w-3 mt-1" /> This field is required
                      </div>
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>
          {!isValidJson && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-1 relative"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <ol className="block sm:inline">
                <li>
                  {' '}
                  1. Please check if the JSON formatting is proper using{' '}
                  <a
                    href="https://jsonformatter.curiousconcept.com/"
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://jsonformatter.curiousconcept.com/
                  </a>
                  .
                </li>
                <li>
                  {' '}
                  2. There might be an issue with your Regex. Please get it
                  verfied by using{' '}
                  <a
                    href="https://regex101.com/"
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://regex101.com/
                  </a>
                  .
                </li>
                <li>
                  {' '}
                  3. Please make the regex JSON escaped. You can use{' '}
                  <a
                    href="https://www.freeformatter.com/json-escape.html#before-output"
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://www.freeformatter.com/json-escape.html#before-output
                  </a>
                  .
                </li>
              </ol>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
            </div>
          )}
          <Editor
            height="65vh"
            width={`50vw`}
            language="json"
            value={value}
            defaultValue={code}
            theme="vs-dark"
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              validate: false,
              renderValidationDecorations: 'off',
            }}
          />
        </div>

        <div className="w-full px-2 py-3 sm:px-0">
          <Tab.Group>
            <Tab.List className="flex space-x-1 justify-between rounded-xl bg-blue-900/20 p-3">
              <>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full relative rounded-lg py-2.5 text-sm font-medium leading-5',
                      selected
                        ? 'bg-white shadow'
                        : 'text-black hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  With YoBulkAI{' '}
                  <div className="absolute inline-flex items-center px-1 justify-center text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2 dark:border-gray-900">
                    BETA
                  </div>
                </Tab>
              </>

              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    selected
                      ? 'bg-white shadow'
                      : 'text-black hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                Without YoBulkAI
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel
                className={classNames(
                  'flex flex-col rounded-xl bg-white min-h-fit p-3'
                )}
              >
                <h1 className="text-md flex text-sm items-center justify-center  text-gray-600">
                  Ensure to add OpenAI Secret Key in .env file.
                </h1>
                <h1 className="text-md flex text-sm items-center justify-center my-2 text-gray-600">
                  Please Refer to{' '}
                  <span className="ml-1 text-blue-700">
                    <Link href="https://doc.yobulk.dev/YoBulk%20AI/AI%20usecases">
                      Documentation
                    </Link>
                  </span>
                </h1>
                <textarea
                  rows="20"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your prompt here for YoBulkAI"
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                  type="button"
                  className="flex mt-2 bg-white border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:outline-none font-medium rounded-md gap-1 text-sm px-6 py-2 text-center items-center justify-center"
                  onClick={generateAJV}
                >
                  Generate
                </button>
              </Tab.Panel>
              <Tab.Panel>
                <div className="flex flex-col text-sm">
                  <h1 className="text-md flex items-center justify-center my-2 text-gray-600">
                    Sample Import Config Code Snippet
                  </h1>
                  <SyntaxHighlighter
                    language="json"
                    wrapLongLines={true}
                    style={googlecode}
                  >
                    {defaultCode}
                  </SyntaxHighlighter>
                  <div
                    className="mt-2 flex items-center bg-white justify-center rounded-md px-2 py-3 hover:bg-blue-500 hover:text-white text-center cursor-pointer shadow-sm"
                    onClick={() => setValue(defaultCode)}
                  >
                    COPY TO THE EDITOR
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default JSON_Template;
