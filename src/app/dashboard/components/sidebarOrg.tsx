'use client';

import React, { useEffect, useState } from 'react';

import {
  DashboardSVG,
  ManageApiSVG,
  MethodSVG,
  SecuritySVG,
  SettingsSVG,
  UpgradeAndPlansSVG,
  TeamAndMembersSVG,
  ServicesSVG,
  WidgetSettingSVG,
  SupportSVG,
  GenSettingsSVG
} from '@/assets/sidebarSVGs/sidebarSVGs';
import FlitchcoinSVG from '@/assets/sidebarSVGs/flitchcoin.svg';
import { ChevronsLeft, ChevronsRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ArrowLeftRightIcon, ChevronsUpDown } from 'lucide-react';
// import useOrgData from '../orgDataStore';

export const SidebarOrg = () => {
  const [open, setOpen] = useState(true);
  const [isSmall, setIsSmall] = useState(1024);
  const [openSettings, setOpenSettings] = useState(false);
  // const orgData = useOrgData(state=>state.manageOrgData)
  // const data = useOrgData(state=>state.data)

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

  return (
    <div
      className={` flex flex-col flex-shrink-0 items-center transition-all text-white bg-black  ${
        open
          ? ' sm:w-[18rem]'
          : `sm:w-[4rem] w-0 ${isSmall < 640 ? 'h-[50px] overflow-hidden' : ''}`
      } sm:min-h-[100vh]`}
    >
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

      <div className=" mt-[50px] sm:sticky sm:top-8 sm:mt-1 w-full flex flex-col items-center overflow-y-auto overscroll-none max-h-[95vh] pb-4 ">
        <Image
          className="mx-auto py-2 h-[6.25rem]"
          src={FlitchcoinSVG}
          width={open ? 60 : 40}
          alt="Logo preview"
        />
        <h3 className=" text-2xl text-bold mb-6">{open ? 'Flitchcoin' : ''}</h3>
        <div className={`main-menu flex flex-col w-full`}>
          <h4 className="text-[0.75rem] opacity-50 ml-8 pl-8">
            {open ? 'Flitchcoin' : ''}
          </h4>
          <div
            className={`mt-4 flex flex-col w-full ${
              open ? '' : 'items-center'
            }`}
          >
            <Link
              href={'/dashboard/apple'}
              className={`hover:bg-white hover:bg-opacity-40 ${
                open ? 'ml-8 pl-8 w-3/4 py-2 ' : 'p-2'
              } mb-4 rounded-md flex items-center space-x-2`}
            >
              <span>
                <DashboardSVG />
              </span>
              {open ? <span>Dashboard</span> : ''}
            </Link>
            <Link
              href={'#'}
              className={`hover:bg-white hover:bg-opacity-40 ${
                open ? 'ml-8 pl-8 w-3/4 py-2 ' : 'p-2'
              } mb-4 rounded-md flex items-center space-x-2`}
              onClick={() => {
                setOpenSettings(!openSettings);
              }}
            >
              <SettingsSVG />

              {open ? (
                <>
                  <span>Settings</span>
                  <ChevronsUpDown className="opacity-50" size={16} />
                </>
              ) : (
                ''
              )}
            </Link>
            <div className={`${openSettings ? '' : 'h-0 overflow-hidden'} `}>
              <Link
                href={'/dashboard/settings/method'}
                className={`hover:bg-white hover:bg-opacity-40 ${
                  open ? 'ml-20 pl-8 w-[65%] py-2 ' : 'p-2'
                } mb-4 rounded-md flex items-center space-x-2`}
              >
                <span>
                  <MethodSVG />
                </span>
                {open ? <span>Method</span> : ''}
              </Link>
              <Link
                href={'/dashboard/settings/security'}
                className={`hover:bg-white hover:bg-opacity-40 ${
                  open ? 'ml-20 pl-8 w-[65%] py-2 ' : 'p-2'
                } mb-4 rounded-md flex items-center space-x-2`}
              >
                <span>
                  <SecuritySVG />
                </span>
                {open ? <span>Security</span> : ''}
              </Link>
              <Link
                href={'/dashboard/settings/services'}
                className={`hover:bg-white hover:bg-opacity-40 ${
                  open ? 'ml-20 pl-8 w-[65%] py-2 ' : 'p-2'
                } mb-4 rounded-md flex items-center space-x-2`}
              >
                <span>
                  <ServicesSVG />
                </span>
                {open ? <span>Services</span> : ''}
              </Link>
            </div>

            <Link
              href={'/dashboard/widget'}
              className={`hover:bg-white hover:bg-opacity-40 ${
                open ? 'ml-8 pl-8 w-3/4 py-2 ' : 'p-2'
              } mb-4 rounded-md flex items-center space-x-2`}
            >
              <span>
                <WidgetSettingSVG />
              </span>
              {open ? <span>Widget Settings</span> : ''}
            </Link>
            <Link
              href={'#'}
              className={`hover:bg-white hover:bg-opacity-40 ${
                open ? 'ml-8 pl-8 w-3/4 py-2 ' : 'p-2'
              } mb-4 rounded-md flex items-center space-x-2`}
            >
              <span>
                <ManageApiSVG />
              </span>
              {open ? <span>Manage API keys</span> : ''}
            </Link>
            <Link
              href={'#'}
              className={`hover:bg-white hover:bg-opacity-40 ${
                open ? 'ml-8 pl-8 w-3/4 py-2 ' : 'p-2'
              } mb-4 rounded-md flex items-center space-x-2`}
            >
              <span>
                <TeamAndMembersSVG />
              </span>
              {open ? <span>Team & Members</span> : ''}
            </Link>
            <Link
              href={'#'}
              className={`hover:bg-white hover:bg-opacity-40 ${
                open ? 'ml-8 pl-8 w-3/4 py-2 ' : 'p-2'
              } mb-4 rounded-md flex items-center space-x-2`}
            >
              <span>
                <UpgradeAndPlansSVG />
              </span>
              {open ? <span>Upgrade & Plans</span> : ''}
            </Link>
          </div>
        </div>
        <div className={`General flex flex-col w-full`}>
          <h4 className="text-[0.75rem] opacity-50 ml-8 pl-8">
            {open ? 'General' : ''}
          </h4>
          <div
            className={`mt-4 flex flex-col w-full ${
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
                <SupportSVG />
              </span>
              {open ? <span>Support</span> : ''}
            </Link>
            <Link
              href={'#'}
              className={`hover:bg-white hover:bg-opacity-40 ${
                open ? 'ml-8 pl-8 w-3/4 py-2' : 'p-2'
              }  rounded-md flex items-center space-x-2`}
            >
              <span>
                <GenSettingsSVG />
              </span>
              {open ? <span>Settings</span> : ''}
            </Link>
            <Link href={'/dashboard'} className="mx-auto my-6">
              <Button
                className={` bg-accent text-black text-sm ${
                  open ? 'px-10 rounded-full ' : 'px-2 '
                } `}
              >
                {open ? (
                  'Switch Organization'
                ) : (
                  <ArrowLeftRightIcon size={20} />
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
