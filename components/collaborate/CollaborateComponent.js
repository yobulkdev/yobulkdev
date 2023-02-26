import { useState, useEffect } from 'react';
import { TrashIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import SuccessModal from '../common/SuccessModal';

const CollaborateComponent = () => {
  const [orgName, setOrgName] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');
  const [collaborators, setCollaborators] = useState([]);
  const [name, setName] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [warning, setWarning] = useState(false);
  const [alreadyPresentError, setAlreadyPresentError] = useState(false);
  // const [collaborateData, setCollaborateData] = useState();

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handleAdd = (e) => {
    e.preventDefault();
    if (!validateEmail(name)) {
      alert('Please enter a valid email');
    } else {
      if (collaborators.includes(name)) {
        setAlreadyPresentError(true);
        return;
      }
      setCollaborators([...collaborators, name]);
    }
    setName('');
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!orgName || !workspaceName || !collaborators) {
      setWarning(true);
      return;
    }
    axios
      .post('/api/collaborate', {
        orgName,
        workspaceName,
        collaborators,
      })
      .then((response) => {
        setVisible(true);
      })
      .catch((error) => console.log(error));
  };

  const acknowledgeModal = () => {
    setVisible(false);
    setOrgName('');
    setWorkspaceName('');
    setCollaborators([]);
  };

  const handleDelete = (value) => {
    const newCollaborators = collaborators.filter((item) => item !== value);
    setCollaborators(newCollaborators);
  };

  return (
    <div className="">
      {isVisible && (
        <SuccessModal
          submit={acknowledgeModal}
          message={'Successfully added the workspace !'}
        />
      )}
      <div className="flex mt-4 w-full bg-white shadow-sm rounded-md py-1 px-2 align-middle justify-between">
        <form className="p-5 w-full">
          <div className="flex mt-7 align-middle items-center">
            <div className="flex flex-col w-5/12">
              <h2 className="text-base font-bold text-gray-500">
                Create an Organization{' '}<span className='text-red-400'>*</span>
              </h2>
              <p className="text-gray-400 text-sm">
                The Organization Name to identify your organization
              </p>
            </div>
            <div className="flex flex-col justify-center w-1/2">
              <input
                type="text"
                className={`border border-gray-300 text-gray-400  text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block
                   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="Enter Organization Name Here ..."
                value={orgName}
                onChange={(evt) => {setWarning(false); setOrgName(evt.target.value)}}
                required
              />
              {!orgName && (
                <div className="flex gap-1 w-full text-sm text-red-400 dark:text-red-200">
                  <InformationCircleIcon className="w-3 mt-1" /> This field is
                  required
                </div>
              )}
            </div>
          </div>

          <div className="flex mt-7 align-middle items-center">
            <div className="flex flex-col w-5/12">
              <h2 className="text-base font-bold text-gray-500">
                Create a Workspace <span className='text-red-400'>*</span>
              </h2>
              <p className="text-gray-400 text-sm">
                The Workspace Name to identify your workspace
              </p>
            </div>
            <div className="flex flex-col justify-center w-1/2">
              <input
                type="text"
                className={`border border-gray-300 text-gray-400  text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block
                p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="Enter Workspace Name Here ..."
                value={workspaceName}
                onChange={(evt) => {setWarning(false); setWorkspaceName(evt.target.value)}}
                required
              />
              {!workspaceName && (
                <div className="flex gap-1 w-full text-sm text-red-400 dark:text-red-200">
                  <InformationCircleIcon className="w-3 mt-1" /> This field is
                  required
                </div>
              )}
            </div>
          </div>

          <hr className="my-7 align-middle items-center border-gray-200" />

          <div className="flex">
            <div className="flex flex-col w-5/12">
              <h2 className="text-base font-bold text-gray-500">
                Add Collaborators <span className='text-red-400'>*</span>
              </h2>
              <p className="text-gray-400 text-sm">
                The Collaborators to add to your workspace
              </p>
            </div>
            <div className="flex flex-col justify-center w-1/2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={name}
                  className={`border border-gray-300 text-gray-400  text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Enter Collaborator Email Here ..."
                  onChange={(evt) => {
                    setAlreadyPresentError(false);
                    setWarning(false);
                    setName(evt.target.value);
                  }}
                  required
                />
                <button
                  type="submit"
                  className=" bg-white border-2 mt-1  border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:outline-none font-medium rounded-md gap-1 text-sm px-6 py-1 text-center mb-2"
                  onClick={handleAdd}
                >
                  ADD
                </button>
              </div>
              {(collaborators.length < 1) && (
                  <div className="flex gap-1 w-full text-sm text-red-400 dark:text-red-200">
                    <InformationCircleIcon className="w-3 mt-1" /> Please add at least one collaborator
                  </div>
                )}
              {alreadyPresentError && (
                <div className="flex gap-1 w-full text-sm text-red-400 dark:text-red-200">
                  <InformationCircleIcon className="w-3 mt-1" /> This user is already a collaborator
                </div>
              )}
            </div>
          </div>
            
          <button
            type="submit"
            className="mt-10 bg-blue-500 text-sm border border-blue-500 text-white rounded-md hover:bg-transparent hover:text-blue-500 focus:outline-none font-medium px-6 py-2 text-center float-right"
            onClick={handleClick}
          >
            SUBMIT
          </button>
        </form>
      </div>
      {warning && (
        <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-2 mb-10"
        role="alert"
        >
          Please fill all the required fields
        </div>
      )}
      <div className="flex flex-col mt-4 bg-white shadow-sm rounded-md py-4 px-12 ">
        <h1 className="text-base text-center font-bold text-gray-500">
          Collaborators
        </h1>

        <ul className="flex flex-col gap-2 mt-4 my-2 p-2">
          {collaborators.length === 0 && (
            <li className="text-slate-500">No Collaborators Added</li>
          )}
          {collaborators.map((collaborator, index) => (
            <li key={index} className="text-slate-500 flex justify-between">
              {collaborator}

              <button
                className="bg-red-200 py-1 px-2 rounded shadow-sm"
                onClick={() => handleDelete(collaborator)}
              >
                <TrashIcon className="w-4 h-4 text-red-600" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollaborateComponent;
