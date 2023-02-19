import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { googlecode } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import CopyToClipboard from 'react-copy-to-clipboard';

const templateLibraries = [
    {
        title: "Custom Validation Function",
        code: `{
    "type":"object",
    "properties":{
        "age":{
            "type":"integer",
            "maximum":999
        },
        "Name":{
            "type":"string",
            "format":"first_name",
            "validate":"(x) => {let regex = new RegExp('([A-Z][a-zA-Z]*)');return regex.test(x);}"
        },
        "email":{
            "type":"string",
            "format":"email"
        }
    },
    "required":[
        "age",
        "Name",
        "email"
    ],
    "errorMessage":{
        "properties":{
            "age":"Age should not be more than 3 digit",
            "Name":"Should be a set of character ",
            "email":"Should be a valid email"
        }
    }
}`
    },
    {
        title: "Yahoo & GMail Validation",
        code: `{
    "type":"object",
    "properties":{
        "age":{
            "type":"integer"
        },
        "Name":{
            "type":"string"
        },
        "email": {
        "type": "string",
        "format": "email",
        "pattern": "^((?!yahoo|gmail).)*$"
        }
    },
    "required":[
        "age",
        "Name",
        "email"
    ],
    "errorMessage":{
        "properties":{
    
            "age":"Age should be an integer",
            "Name":"Should be a set of character ",
            "email":"Should not include yahoo and gmail IDs"
        }
    }
}`
    },
    {
        title: "Custom Date validation",
        code: `{
    "type":"object",
    "properties":{
        "age":{
            "type":"integer"
        },
        "Name":{
            "type":"string"
        },
        "date":{
            "type":"string",
            "format":"custom-date-time",
            "pattern":"^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\\\\d{4}$",
            "minLength":1
        }
    },
    "required":[
        "age",
        "Name",
        "custom-date-time"
    ],
    "errorMessage":{
        "properties":{
            "Name":"Should be a set of characters",
            "age":"Should be a number",
            "date":"Only dd/mm/yyyy format is accepted"
        }
    }
}`
    },
    {
        title: "Custom String Validation",
        code: `{
    "type":"object",
    "properties":{
        "age":{
            "type":"integer"
        },
        "Name":{
            "type":"string",
            "format":"first_name",
            "validate":"(x) => (x.startsWith('yo') ? true : false)"
        },
        "email":{
            "type":"string",
            "format":"email",
            "pattern":"^((?!yahoo|gmail).)*$",
            "minLength":1
        },
        "date":{
            "type":"string",
            "format":"custom-date-time",
            "pattern":"^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\\\\d{4}$",
            "minLength":1
        }
    },
    "required":[
        "age",
        "Name",
        "email",
        "custom-date-time"
    ],
    "errorMessage":{
        "properties":{
            "Name":"Should start with yo",
            "age":"Should be an integer",
            "email":"GMAIL AND yahoo mail ids are not accepted",
            "date":"Only dd/mm/yyyy is accepted"
        }
    }
}`}
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
