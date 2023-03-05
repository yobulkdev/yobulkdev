import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useMemo, useEffect } from 'react';
import { ArticleIcon, CollapsIcon, HomeIcon, ConfigIcon } from './icons';
import {
  UsersIcon,
  FolderIcon,
  RocketLaunchIcon,
  HomeIcon as HomeIconOutline,
} from '@heroicons/react/24/outline/';
import { useUser } from '@auth0/nextjs-auth0/client';
import Logo from '../../public/yobulk_logo.png';
import Image from 'next/image';

const menuItems = [
  /*   { id: 1, label: 'Importer', icon: HomeIcon, link: '/' },
   */
  {
    id: 0,
    label: 'Home',
    icon: HomeIconOutline,
    link: '/',
  },
  {
    id: 1,
    label: 'Demos',
    icon: RocketLaunchIcon,
    link: '/demos',
  },
  {
    id: 2,
    label: 'Template Configuration',
    icon: ArticleIcon,
    link: '/templates',
  },
  {
    id: 3,
    label: 'Collaborate',
    icon: UsersIcon,
    link: '/collaborate',
  },
  {
    id: 4,
    label: 'Importer Configuration',
    icon: ConfigIcon,
    link: '/configuration',
  },
  {
    id: 5,
    label: 'Imports',
    icon: HomeIcon,
    link: '/imports',
  },
  {
    id: 6,
    label: 'Libraries',
    icon: FolderIcon,
    link: '/libraries',
  },
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const [usage, setUsage] = useState({memoryUsage: 0, openApiHits: 0});
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/usage')
      .then((res) => res.json())
      .then((data) => {
        setUsage(data.usage)
      });
  }, []);

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    'min-h-screen bg-[#F7FAFC] flex justify-between flex-col border-r ease-out delay-150 duration-200 dark:bg-gray-900 dark:border-gray-800',
    {
      ['w-60']: !toggleCollapse,
      ['w-16']: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    'p-4 rounded bg-light-lighter absolute right-0',
    {
      'rotate-180': toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      'flex items-center cursor-pointer hover:bg-blend-lighten rounded w-full overflow-hidden whitespace-nowrap'
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const handleSignOut = () => {
    router.push('/api/auth/logout')
  }

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: 'width 300ms cubic-bezier(0.2, 0, 0, 1) 0s' }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative ">
          <div className="flex items-center pl-2 gap-4">
            <Link href="/">
              <Image
                src={Logo}
                width={'170vw'}
                height={'50vw'}
                alt=""
                className="cursor-pointer"
              />
            </Link>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon />
            </button>
          )}
        </div>
        {!toggleCollapse && (
          <div className="mt-4 flex flex-col justify-center items-center hover:cursor-pointer w-full">
            <Image
              src={user?.picture}
              alt={user?.email}
              className="rounded-full"
              height={80}
              width={80}
            />

            <p className="text-base m-2 text-light text-gray-500 dark:text-gray-200 font-semibold">
              {user?.name}
            </p>
            <div className='h-3 w-[90%] bg-gray-300 mb-10'>
              <div
                  style={{ width: `${Math.round((usage.memoryUsage*100)/(25*1024))}%`}}
                  className={`h-full ${Math.round((usage.memoryUsage*100)/(25*1024)) > 70 ? 'bg-red-600' : 'bg-green-600'}`}>
              </div>
              <p className='w-full flex justify-center mt-1 text-xs font-semibold text-gray-700 dark:text-white'>Storage Used: {(usage.memoryUsage < 1024) ? `${usage.memoryUsage} KB` : `${Math.round(usage.memoryUsage/1024)} MB` } / 25 MB</p>
            </div>
            <div className='h-3 w-[90%] bg-gray-300 mb-10'>
              <div
                  style={{ width: `${Math.round((usage.openApiHits*100)/(25))}%`}}
                  className={`h-full ${Math.round((usage.openApiHits*100)/(25)) > 70 ? 'bg-red-600' : 'bg-green-600'}`}>
              </div>
              <p className='w-full flex justify-center mt-1 text-xs font-semibold text-gray-700 dark:text-white'>Open API Hits: {usage.openApiHits} / 25 </p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
            >
              Logout
            </button>
          </div>
        )}
        <div className="flex flex-col items-start mt-12">
          {menuItems.map(({ icon: Icon, ...menu }, idx) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={idx}>
                <div className={classes}>
                  <Link href={menu.link}>
                    <a className="flex py-4 px-3 items-center w-full h-full gap-1">
                      <div
                        className="text-black dark:text-white"
                        style={{ width: '1.5rem' }}
                      >
                        <Icon />
                      </div>
                      {!toggleCollapse && (
                        <span
                          className={classNames(
                            'text-md font-medium text-light text-gray-500 dark:text-gray-200'
                          )}
                        >
                          {menu.label}
                        </span>
                      )}
                    </a>
                  </Link>
                </div>

                <hr
                  className={`${
                    toggleCollapse ? 'w-8 ml-4' : 'w-40  ml-6'
                  } bg-slate-300 my-2 justify-center`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/*  <div className={`${getNavItemClasses({})} px-3 py-4`}>
        <div style={{ width: '2.5rem' }}>
          <LogoutIcon />
        </div>
        {!toggleCollapse && (
          <span className={classNames('text-md font-medium text-text-light')}>
            Logout
          </span>
        )}
      </div> */}
    </div>
  );
};

export default Sidebar;
