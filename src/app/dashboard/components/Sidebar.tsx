'use client';

import React, { useEffect, useState } from 'react';
import {
  OrgnaizationSvg,
  SupportSvg
} from '../../../assets/Svg/Account/Account';
import { ChevronsLeft, ChevronsRight, Menu, X, Instagram } from 'lucide-react';
// import { } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/Providers/AuthContext';

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [isSmall, setIsSmall] = useState(1024);

  useEffect(() => {
    if (isSmall < 1024) {
      setOpen(false);
      // console.log(isSmall);
    } else {
      setOpen(true);
    }
  }, [isSmall]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const { update } = useAuth()
  return (
    <div
      className={` flex flex-col flex-shrink-0 items-center transition-all text-white bg-black  ${
        open
          ? ' sm:w-[18rem]'
          : `sm:w-[4rem] w-0 ${isSmall < 640 ? 'h-[50px] overflow-hidden' : ''}`
      } sm:min-h-[100vh]`}
    >
      <button onClick={() => update()}>Update</button>
      {isSmall < 640 ? (
        <div className="flex flex-col  justify-center absolute  top-0, left-0 h-[50px] w-[100vw] pl-2 bg-black">
          <button
            className="hover:text-[#9EFF00] max-w-fit "
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      ) : (
        <div
          className={`sm:sticky sm:top-1 flex ${
            open ? 'justify-end' : 'justify-center'
          } w-full`}
        >
          <button
            className="px-2 pt-1 hover:text-[#9EFF00]"
            onClick={() => setOpen(!open)}
          >
            {open ? <ChevronsLeft /> : <ChevronsRight />}
          </button>
        </div>
      )}

      <div className=" mt-[50px] sm:sticky sm:top-8 sm:mt-1 w-full flex flex-col items-center">
        <h3 className=" text-2xl text-bold mb-12">
          {open ? 'Organization' : ''}
        </h3>
        <div className={`main-menu flex flex-col w-full`}>
          <h4 className="text-[0.75rem] opacity-50 ml-8 pl-8">
            {open ? 'Main menu' : ''}
          </h4>
          <div
            className={`my-6 flex flex-col w-full ${
              open ? '' : 'items-center'
            }`}
          >
            <Link
              href={'/dashboard'}
              className={`hover:bg-white hover:bg-opacity-40 ${
                open ? 'ml-8 pl-8 w-3/4 py-2' : 'p-2'
              } mb-4 rounded-md flex items-center space-x-2`}
            >
              <span>
                <OrgnaizationSvg />
              </span>
              {open ? <span>Organization</span> : ''}
            </Link>
          </div>
        </div>
        <div className={`General flex flex-col w-full`}>
          <h4 className="text-[0.75rem] opacity-50 ml-8 pl-8">
            {open ? 'General' : ''}
          </h4>
          <div
            className={`my-6 flex flex-col w-full ${
              open ? '' : 'items-center'
            }`}
          >
            <Link
              href={'#'}
              className={`hover:bg-white hover:bg-opacity-40 ${
                open ? 'ml-8 pl-8 w-3/4 py-2' : 'p-2'
              } mb-4 rounded-md flex items-center space-x-2`}
            >
              <span>
                <SupportSvg />
              </span>
              {open ? <span>Support</span> : ''}
            </Link>
            {/* <Link
              href={'#'}
              className={`hover:bg-white hover:bg-opacity-40 ${
                open ? 'ml-8 pl-8 w-3/4 py-2' : 'p-2'
              } mb-4 rounded-md flex items-center space-x-2`}
            >
              <span>
                <SettingSvg />
              </span>
              {open ? <span>Settings</span> : ''}
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};
