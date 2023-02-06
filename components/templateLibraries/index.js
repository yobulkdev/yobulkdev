import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { googlecode } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import CopyToClipboard from 'react-copy-to-clipboard';

const templateLibraries = [
    {
        title: "Custom error validation Messaging:",
        code: `{
    "type":"object",
    "properties":{
        "id":{
            "type":"integer"
        },

        "first_name":{
            "type":"string",
            "format": "first_name",
            "validate": "(x) => {\r\n let regex = new RegExp(\"([A-Z][a-zA-Z]*)\");\r\n return regex.test(x);\r\n }"
        },
        "email":{
            "type":"string"
        }
    },
    "required":[
        "id",
        "first_name",
        "email"
    ],
    "errorMessage":{
        "properties":{
            "first_name":"custom error",
            "id":"custom error",
            "email":"custom error"
        }
    }
}`
    },
    {
        title: "Custom Gmail and Yahoo validation:",
        code: `{
    "type":"object",
    "properties":{
        "id":{
            "type":"integer"
        },
        "first_name":{
            "type":"string"
        },
        "email":{
            "type":"string",
            "format":"email",
            "pattern":"^((?!(gmail|yahoo)\\..$).)$",
            "minLength":1
        }
    },
    "required":[
        "id",
        "first_name",
        "email"
    ],
    "errorMessage":{
        "properties":{
            "first_name":"custom error",
            "id":"custom error",
            "email":"GMAIL AND yahoo not accepted"
        }
    }
}`
    },
    {
        title: "Custom Date validation: Regex has to be JSON escaped",
        code: `{
    "type":"object",
    "properties":{
        "id":{
            "type":"integer"
        },
        "first_name":{
            "type":"string"
        },
        "email":{
            "type":"string",
            "format":"email",
            "pattern":"^((?!(gmail|yahoo)\\..$).)$",
            "minLength":1
        },
        "date":{
            "type":"string",
            "format":"custom-date-time",
            "pattern":"^([0-2][0-9]|(3)[0-1])(\\\/)(((0)[0-9])|((1)[0-2]))(\\\/)\\d{4}$",
            "minLength":1
        }
    },
    "required":[
        "id",
        "first_name",
        "email",
        "custom-date-time"
    ],
    "errorMessage":{
        "properties":{
            "first_name":"custom error",
            "id":"custom error",
            "email":"GMAIL AND yahoo not accepted",
            "date":"Only dd/mm/yyyy is accepted"
        }
    }
}
`
    },
    {
        title: "Integer range validation:validation function has to be json escaped,Adding a format keyword is crashing AJV lib",
        code: `{
    "type":"object",
    "properties":{
        "id":{
            "type":"integer",
            "minimum": 10,
            "maximum": 20
    
        },
        "first_name":{
            "type":"string",
            "format": "first_name",
            "validate": "(x) => (x.startsWith('yo') ? true : false)"
        },
    
        
        "email":{
            "type":"string",
            "format":"email",
            "pattern":"^((?!(gmail|yahoo)\\..$).)$",
            "minLength":1
        },
        "date":{
            "type":"string",
            "format":"custom-date-time",
            "pattern":"^([0-2][0-9]|(3)[0-1])(\\\/)(((0)[0-9])|((1)[0-2]))(\\\/)\\d{4}$",
            "minLength":1
        }
    },
    "required":[
        "id",
        "first_name",
        "email",
        "custom-date-time"
    ],
    "errorMessage":{
        "properties":{
            "first_name":"custom error",
            "id":"custom error",
            "email":"GMAIL AND yahoo not accepted",
            "date":"Only dd/mm/yyyy is accepted"
        }
    }
}`
    }
];

const MainBar = () => {

    return (
        <div>
            <div className="flex align-middle justify-between">
                <h1 className="text-2xl font-bold mb-2 text-gray-500">Template Libraries</h1>
            </div>

            <div className="p-4">
                <p className="text-gray-500">
                    We have prepared a list of popular template libraries that you can use to prepare your CSV file.
                </p>
            </div>

            <div className="grid grid-cols-3">
                {templateLibraries &&
                    templateLibraries.map((obj, idx) => (
                        <div
                            className="mt-4 bg-white rounded-md flex flex-col align-middle justify-between p-4 mx-2 shadow-sm"
                            key={idx}
                        >
                            <div className='flex flex-col'>
                                <div className="flex items-center justify-center">
                                    <h2 className="text-md text-blue-500">
                                        {obj.title.toUpperCase()}
                                    </h2>
                                </div>

                                <div className="mt-2">

                                    <SyntaxHighlighter
                                        language="json"
                                        wrapLongLines={true}
                                        style={googlecode}
                                        customStyle={{
                                            fontSize: "10px",
                                        }}
                                    >
                                        {obj.code}
                                    </SyntaxHighlighter>
                                </div>
                            </div>

                            <CopyToClipboard text={obj.code} onCopy={() => alert('Copied')}>
                                <div className="mt-4 flex items-center bg-white justify-center rounded-md p-2 text-center cursor-pointer shadow-sm border-[0.4px]">
                                    <ClipboardDocumentIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                                    COPY
                                </div>
                            </CopyToClipboard>

                        </div>
                    ))}
            </div>
        </div >
    );
};

export default MainBar;
