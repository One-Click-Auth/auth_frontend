'use client';
import * as React from 'react';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LogOutSvg, ProfileItemSvg } from '@/assets/Svg/Account/DropDown';
import { useAuth } from '@/Providers/AuthContext';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogTrigger } from '@/components/ui/Dialog';
import ProfilePopup from './ProfilePopup';
import { ChevronDown } from 'lucide-react';

export function AccountDropdown() {
  const { user } = useAuth();
  return (
    //dropdown needs to be wrapped in dialog for the trigger to work
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="active:border-0 gap-2 [data-state]: flex items-center  active:outline-none">
          <div className="flex items-center gap-2">
            <p className="font-medium">{user?.full_name}</p>

            <ChevronDown className="text-muted-foreground" />
          </div>

          <div className="text-xs sm:text-sm flex items-center font-semibold  min-w-max">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-96 max-w-[80vw] mt-2 mx-8 py-6 overflow-hidden bg-white cursor-pointer rounded-2xl">
          <div className="flex sticky top-0 bg-white items-center gap-1 px-6 pb-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <p className="text-base text-black">{user?.full_name}</p>
              <p className="text-xs">{user?.email}</p>
            </div>
          </div>

          <ScrollArea className=" max-h-[60vh] overflow-y-scroll overflow-hidden">
            {/* The component wasnt used here because of radix/shadcn having to access the ref, and the component being a Link */}
            <DialogTrigger asChild>
              <DropdownMenuItem className="p-1 px-6 py-4 hover:border-0 hover:outline-none hover:bg-gray-100 rounded-sm">
                <div className="flex items-center ">
                  <span className="w-5 h-5 mt-1">
                    <ProfileItemSvg />
                  </span>
                  <span className="ml-4"> Profile </span>
                </div>
              </DropdownMenuItem>
            </DialogTrigger>

            {/* <MenuItem icon={<BillingSvg />} title="Billing" /> */}
            {/* <MenuItem
              icon={<SettingsSvg />}
              title="Settings"
              href="/dashboard/settings"
            /> */}
            {/* <MenuItem icon={<TeamSvg />} title="Team" />
            <MenuItem icon={<InviteSvg />} title="Invite users" />
            <MenuItem icon={<AddItemSvg />} title="New Item" />
            <MenuItem icon={<GithubSvg />} title="Github" />
            <MenuItem icon={<InviteSvg />} title="Support" /> */}

            {/* <MenuItem icon={<CloudSvg />} title="Api" /> */}

            <DropdownMenuItem
              className="cursor-pointer flex items-center px-6 py-4 hover:border-0 hover:outline-none hover:bg-gray-100 rounded-sm"
              onClick={() =>
                signOut({
                  callbackUrl: window.location.origin
                })
              }
            >
              <span className="w-5 h-5 mt-1">
                <LogOutSvg />
              </span>
              <span className="ml-4"> Sign Out </span>
            </DropdownMenuItem>

            <div className="text-[#D6D6D6] flex items-center gap-2   text-sm mt-4 px-6">
              <p>Secured by</p>

              <div className="flex  items-center gap-1">
                <TrustAuthXLogo />
                TrustAuthX
              </div>
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfilePopup />
    </Dialog>
  );
}

interface MenuItemType {
  icon: React.ReactNode;
  title: string;
  href?: string;
}

const MenuItem = ({ icon, title, href = '#' }: MenuItemType) => {
  return (
    <DropdownMenuItem className="p-1 px-6 py-4 hover:border-0 hover:outline-none hover:bg-gray-100 rounded-sm">
      <Link href={href} className="flex items-center ">
        <span className="w-5 h-5 mt-1">{icon}</span>
        <span className="ml-4"> {title} </span>
      </Link>
    </DropdownMenuItem>
  );
};

function TrustAuthXLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 62 62"
      fill="none"
    >
      <circle
        cx="30.8762"
        cy="30.8762"
        r="30.8762"
        transform="matrix(-1 0 0 1 61.7539 0)"
        fill="#D6D6D6"
      />
      <path
        d="M30.6603 52.2892C30.8187 52.3429 30.974 52.3422 31.1319 52.2871C33.1631 51.5784 47.6484 45.9641 47.6484 29.9788V15.5288C47.6484 15.1465 47.3869 14.8132 47.014 14.7205L31.0996 10.7627C30.9662 10.7295 30.8267 10.7295 30.6933 10.7627C30.5599 10.7958 14.7789 14.7205 14.7789 14.7205C14.406 14.8132 14.1445 15.1465 14.1445 15.5288V29.9788C14.1445 46.1255 28.6266 51.6001 30.6603 52.2892Z"
        fill="white"
      />
      <path
        d="M20.8708 20.654C22.1525 19.2483 23.7155 18.1276 25.4582 17.3648C27.2009 16.6019 29.0845 16.2139 30.9869 16.2259C32.8892 16.2378 34.7678 16.6494 36.5008 17.4341C38.2338 18.2188 39.7826 19.3589 41.0466 20.7806L30.9017 29.8005L20.8708 20.654Z"
        fill="#D6D6D6"
      />
      <defs>
        <radialGradient
          id="paint0_radial_1_11691"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(30.9017 29.8005) rotate(-90.0445) scale(29.9638)"
        >
          <stop offset="0.220303" />
          <stop offset="0.995966" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
