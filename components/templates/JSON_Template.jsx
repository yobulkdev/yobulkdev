import React, { useState, useRef } from 'react';

import Editor from '@monaco-editor/react';
import { useRouter } from 'next/router';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { googlecode } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const JSON_Template = () => {
  const router = useRouter();

  const defaultCode = `{
    "type": "object",
    "properties": {
        "firstName": {
        "type": "string",
        "maxlength": 3,
        "format": "first-name-validation",
        "validate": "(x) => (x.startsWith('chinm') ? true : false)"
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

  const [code, setCode] = useState(`{

}`);

  const [value, setValue] = useState(code);

  const handleEditorChange = (value) => {
    setValue(value);
    setCode(value);
  };

  const handleClick = () => {
    var json = JSON.stringify(code, function (key, code) {
      if (typeof code === 'function') {
        return code.toString();
      } else {
        return code;
      }
    });

    console.log(json);

    // router.push({ pathname: '/templates' }, undefined, {
    //     shallow: true,
    // });
  };

  return (
    <div>
      <div className="flex align-middle items-center gap-1 my-2 p-2">
        <Link href="/templates">
          <ArrowLeftIcon className="h-5 cursor-pointer" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-500">
          Create Your Template Using JSON
        </h1>
      </div>

      <div className="flex">
        <div className="flex flex-col gap-5 items-center">
          <Editor
            height="70vh"
            width={`50vw`}
            language="json"
            value={value}
            defaultValue={code}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              validate: false,
              renderValidationDecorations: 'off',
            }}
          />
          <button
            type="submit"
            className="py-2.5 px-5 flex
                                text-sm font-medium text-gray-900
                                bg-blue-200 rounded-md
                                border border-gray-200 hover:bg-gray-100 hover:text-blue-700
                                focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-200
                                dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
            onClick={handleClick}
          >
            SAVE
          </button>
        </div>

        <div className="flex flex-col text-sm">
          <SyntaxHighlighter
            language="json"
            wrapLongLines={true}
            style={googlecode}
          >
            {defaultCode}
          </SyntaxHighlighter>
          <div
            className="mt-4 flex items-center justify-center border-2 rounded-md py-1 px-2 text-center cursor-pointer border-blue-300"
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
