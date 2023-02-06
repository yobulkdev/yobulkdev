import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useMemo } from 'react';
import { ArticleIcon, CollapsIcon, HomeIcon, ConfigIcon } from './icons';
import { UsersIcon, FolderIcon } from '@heroicons/react/24/outline/';

import Logo from '../../public/yobulk_logo.png';
import Image from 'next/image';

const menuItems = [
  /*   { id: 1, label: 'Importer', icon: HomeIcon, link: '/' },
   */
  {
    id: 1,
    label: 'Template Configuration',
    icon: ArticleIcon,
    link: '/templates',
  },
  {
    id: 2,
    label: 'Collaborate',
    icon: UsersIcon,
    link: '/collaborate',
  },
  {
    id: 3,
    label: 'Importer Configuration',
    icon: ConfigIcon,
    link: '/configuration',
  },
  {
    id: 4,
    label: 'Imports',
    icon: HomeIcon,
    link: '/imports',
  },
  {
    id: 5,
    label: 'CSV Libraries',
    icon: FolderIcon,
    link: '/csvlibraries',
  },
  {
    id: 6,
    label: 'Template Libraries',
    icon: FolderIcon,
    link: '/templatelibraries',
  },
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    'min-h-screen bg-[#F7FAFC] flex justify-between flex-col border-r ease-out delay-150 duration-200',
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

        <div className="flex flex-col items-start mt-12">
          {menuItems.map(({ icon: Icon, ...menu }, idx) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={idx}>
                <div className={classes}>
                  <Link href={menu.link}>
                    <a className="flex py-4 px-3 items-center w-full h-full">
                      <div style={{ width: '1.5rem' }}>
                        <Icon />
                      </div>
                      {!toggleCollapse && (
                        <span
                          className={classNames(
                            'text-md font-medium text-light text-gray-500'
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
