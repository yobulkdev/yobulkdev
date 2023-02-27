import { useEffect, useState } from 'react';
import {
  AttachToImporter,
  AttachToOrganizations,
  AttachToJSONOBJ,
  AttachToWorkspace,
  AttachWebHookURL,
} from './index';
import Link from 'next/link';
import SuccessModal from '../common/SuccessModal';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { googlecode } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

import CopyToClipboard from 'react-copy-to-clipboard';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const jsonOBJ = [
  {
    value: 'Object A',
    label: 'Object A',
  },
  {
    value: 'Object B',
    label: 'Object B',
  },
  {
    value: 'Object C',
    label: 'Object C',
  },
];

const ConfigList = () => {
  const [organizations, setOrganizations] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [importers, setImporters] = useState([]);
  const [importerName, setImporterName] = useState('');
  const [attachToImporters, setAttachToImporters] = useState(null);
  const [attachToOrganizations, setAttachToOrganizations] = useState(null);
  const [attachThemeJSONObj, setAttachThemeJSONObj] = useState(null);
  const [attachToWorkspace, setAttachToWorkspace] = useState(null);
  const [attachWebHookURL, setAttachWebHookURL] = useState(null);
  const [configurationData, setConfigurationData] = useState(null);
  const [error, setError] = useState(null);
  const [isVisible, setVisible] = useState(false);

  const [code, setCode] = useState(`import { YoButton } from "yoembed";
import "./App.css";

function App() {
    return (
    <div className="App">
        <h2>This is my SAAS</h2>
        <hr />
        <br />
        <YoButton
            importId="63a28875cbc26427b0bc390e"
            yoHostUrl={"http://localhost:5050"}
        />
    </div>
    );
}

export default App;`);

  const handleClick = (e) => {
    e.preventDefault();
    if (
      !importerName ||
      !attachToImporters
      // !attachToOrganizations ||
      // !attachThemeJSONObj ||
      // !attachToWorkspace
      // !attachWebHookURL
    ) {
      setError('* Please fill all the fields');
      return;
    }

    axios
      .post('/api/importer', {
        importerName: importerName,
        templateId: attachToImporters.value,
        organizationId: attachToOrganizations?.value,
        workspaceId: attachToWorkspace?.value,
        templateName: attachToImporters.label,
      })
      .then((response) => {
        if ((response.status = 201))
          setConfigurationData({ importerId: response.data.insertedId });
        setVisible(true);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (configurationData) {
      setCode(`import { YoButton } from "yoembed";
import "./App.css";

function App() {
    return (
    <div className="App">
        <h2>This is my SAAS</h2>
        <hr />
        <br />
        <YoButton
            importId="${configurationData.importerId}"
            yoHostUrl={"http://localhost:5050"}
        />
    </div>
    );
}

export default App;`);
    }
  }, [configurationData]);

  useEffect(() => {
    // fetch and set templates
    axios
      .get('/api/templates')
      .then((res) => {
        let listOfTemplates = res.data
          .filter((el) => el['template_name'])
          .map((el) => {
            return { value: el._id, label: el.template_name };
          });
        setImporters(listOfTemplates);
      })
      .catch((e) => console.log(e));

    // fetch and set organizations
    axios
      .get('/api/organizations')
      .then((res) => {
        setOrganizations(
          res.data.map((el) => {
            return { value: el._id, label: el.orgName };
          })
        );
      })
      .catch((e) => console.log(e));

    // fetch and set workspaces
    axios
      .get('/api/organizations')
      .then((res) => {
        setWorkspaces(
          res.data.map((el) => {
            return {
              value: el.workspaces[0].workspaceId,
              label: el.workspaces[0].workspaceName,
            };
          })
        );
      })
      .catch((e) => console.log(e));
  }, []);

  const acknowledgeModal = () => {
    setVisible(false);
    setImporterName('');
    setAttachToWorkspace(null);
    setAttachToOrganizations(null);
    setAttachToImporters(null);
  };

  useEffect(() => {
    if (
      attachToImporters &&
      attachToOrganizations &&
      attachThemeJSONObj &&
      attachToWorkspace &&
      attachWebHookURL
    ) {
      setError('');
    }
  }, [
    attachThemeJSONObj,
    attachToImporters,
    attachToOrganizations,
    attachToWorkspace,
    attachWebHookURL,
  ]);

  return (
    <div className="py-1 px-2 align-middle justify-between">
      {isVisible && (
        <SuccessModal
          submit={acknowledgeModal}
          message={'Successfully added the importer !'}
        />
      )}
      <div className="flex flex-col px-6 gap-2 align-middle justify-between">
        <Link href="/configuration">
          <button className="flex items-center gap-1 rounded-full text-blue-500 font-medium hover:bg-blue-50 px-2 w-fit">
            <ChevronLeftIcon className="w-4 h-4" />
            <p className="subpixel-antialiased ">Back to list</p>
          </button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-500 dark:text-gray-200">
          Create a Importer Configuration
        </h1>
      </div>

      <div className="mt-4 mx-4 bg-white dark:bg-gray-900 rounded-md p-5 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex flex-col w-1/4">
            <h2 className="text-lg font-bold text-gray-500 dark:text-gray-200">
              Name <span className="text-red-400">*</span>
            </h2>
            <p className="text-sm text-gray-400">Name of the importer</p>
          </div>
          <div className="ml-10 flex flex-col justify-center w-3/4">
            <div className="mb-2">
              {!importerName && (
                <div className="flex gap-1 w-full text-sm text-red-400 dark:text-red-200 justify-end mb-1">
                  <InformationCircleIcon className="w-3 mt-1" /> This field is
                  required
                </div>
              )}
              <input
                type="text"
                id="default-input"
                className={`border border-gray-200 text-gray-400  text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block w-full 
                    p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      !importerName && 'border-red-400'
                    }`}
                value={importerName}
                placeholder={'Enter Your Importer Name'}
                onChange={(e) => {
                  setError('');
                  setImporterName(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <form className="p-5 w-7/12">
          <div className="bg-white dark:bg-gray-900  shadow-sm rounded-md py-1 px-2 align-middle justify-between">
            <AttachToImporter
              attachToImporters={attachToImporters}
              setAttachToImporters={setAttachToImporters}
              importers={importers}
            />

            <AttachToOrganizations
              attachToOrganizations={attachToOrganizations}
              setAttachToOrganizations={setAttachToOrganizations}
              organizations={organizations}
            />

            <AttachToWorkspace
              attachToWorkspace={attachToWorkspace}
              setAttachToWorkspace={setAttachToWorkspace}
              workspaces={workspaces}
            />
          </div>

          <div className="mt-4 rounded-md align-middle justify-between">
            <AttachToJSONOBJ
              attachThemeJSONObj={attachThemeJSONObj}
              setAttachThemeJSONObj={setAttachThemeJSONObj}
              jsonOBJ={jsonOBJ}
              availiable={false}
            />
          </div>

          <div className="mt-4 rounded-md align-middle justify-between">
            <AttachWebHookURL
              attachWebHookURL={attachWebHookURL}
              setAttachWebHookURL={setAttachWebHookURL}
              availiable={false}
            />
          </div>
        </form>

        <div className="p-5 w-5/12">
          <div className="bg-white dark:bg-gray-900 shadow-sm rounded-md p-2 align-middle justify-between">
            <SyntaxHighlighter
              language="javascript"
              showLineNumbers={true}
              wrapLongLines={true}
              style={googlecode}
            >
              {code}
            </SyntaxHighlighter>

            <CopyToClipboard text={code} onCopy={() => alert('Copied')}>
              <div className="mt-4 flex items-center bg-white dark:bg-gray-900 justify-center rounded-md p-2 text-center cursor-pointer shadow-sm border-[0.4px]">
                <DocumentDuplicateIcon className="h-5 w-5" aria-hidden="true" />{' '}
                COPY
              </div>
            </CopyToClipboard>
          </div>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-2 relative"
              role="alert"
            >
              {error}
            </div>
          )}
          <div className=" items-center flex justify-center ml-auto mt-5">
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-sm border border-blue-500 text-white rounded-md hover:bg-transparent hover:text-blue-500 focus:outline-none font-medium px-6 py-2 text-center float-right"
              onClick={handleClick}
            >
              Save & Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigList;
