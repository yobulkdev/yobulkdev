import React, { useState, useRef } from 'react';

import Editor from '@monaco-editor/react';
import { useRouter } from 'next/router';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { googlecode } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Link from 'next/link';
import { ArrowDownTrayIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const JSON_Template = () => {
  const router = useRouter();

  const defaultCode = `{
    "type": "object",
    "properties": {
        "firstName": {
        "type": "string",
        "maxlength": 3,
        "format": "first-name-validation",
        "validate": (x) => (x.startsWith('chinm') ? true : false)
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

  const [code, setCode] = useState(`{}`);
  const [templateName, setTemplateName] = useState('');

  const [value, setValue] = useState(code);

  const saveTemplate = () => {
    var templateData = JSON.stringify(code, function (key, code) {
      if (typeof code === 'function') {
        return code.toString();
      } else {
        return code;
      }
    });

    axios
      .post('/api/templates/json', templateData)
      .then((result) => {
        router.push({ pathname: '/templates' }, undefined, {
          shallow: true,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleEditorChange = (value) => {
    setValue(value);
    setCode(value);
  };

  // const handleClick = () => {
  //   var json = JSON.stringify(code, function (key, code) {
  //     if (typeof code === 'function') {
  //       return code.toString();
  //     } else {
  //       return code;
  //     }
  //   });

  //   console.log(json);

  //   // router.push({ pathname: '/templates' }, undefined, {
  //   //     shallow: true,
  //   // });
  // };

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
                <h2 className="m-2 text-md font-bold text-gray-500">
                  Template Name:
                </h2>
              </div>
              <div className="flex flex-col justify-center w-full">
                <div className="mb-2">
                  <input
                    type="text"
                    id="default-input"
                    className={`border border-gray-300 text-gray-400  text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full
                   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <Editor
            height="70vh"
            width={`50vw`}
            language="json"
            value={value}
            defaultValue={code}
            theme="vs-dark"
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              validate: false,
              renderValidationDecorations: 'off',
            }}
          />
        </div>

        <div className="flex flex-col text-sm">
          <h1 className="text-xl flex items-center justify-center mt-2 mb-5 text-gray-600">
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
            className="mt-4 flex items-center bg-white justify-center rounded-md px-2 py-4 text-center cursor-pointer shadow-sm"
            onClick={() => setValue(defaultCode)}
          >
            COPY TO THE EDITOR
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSON_Template;
