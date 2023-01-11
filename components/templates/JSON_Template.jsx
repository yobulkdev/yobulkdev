import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import { useRouter } from 'next/router';

const JSON_Template = () => {
    const router = useRouter();

    const [code, setCode] = useState(`{

}`);
    const [value, setValue] = useState(code);

    const handleEditorChange = (value) => {
        setValue(value);
        setCode(value);
    };


    const handleClick = () => {
        // Write Logic for saving the JSON

        router.push({ pathname: '/templates' }, undefined, {
            shallow: true,
        });
    };

    return (
        <div className='mx-20 w-2/3'>
            <Editor
                height="75vh"
                width={`100%`}
                language="json"
                value={value}
                defaultValue={code}
                onChange={handleEditorChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                }}
            />

            <div className='mx-auto items-center'>
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
        </div>
    );
};

export default JSON_Template;