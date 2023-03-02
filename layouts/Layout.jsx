import Link from 'next/link';
import Sidebar from '../components/sidebar/Sidebar';
import Switcher from '../hooks/Switcher';

import { BsSlack } from 'react-icons/bs';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-nowrap">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="bg-gray-100 dark:bg-gray-800 flex items-center gap-2 justify-end px-4 py-2">
          <a
            href="https://yobulkdev.slack.com/join/shared_invite/zt-1kiutrmhx-6z_Mvq17dW0pPYePrwPocg#/shared-invite/email"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Connect
              <BsSlack />
            </button>
          </a>
          <Switcher />
        </div>
        <div className="flex-1 bg-gray-100 dark:bg-gray-800">
          {children}{' '}
          {/*        <footer className="flex bottom-0 right-1/3 text-gray-400 ">
          <p className="text-center tracking-tight">
            Developed with &#10084;&#65039; by YoBulk Team!
          </p>
        </footer> */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
