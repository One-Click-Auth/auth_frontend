'use client';
import * as React from 'react';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  AddItemSvg,
  BillingSvg,
  CloudSvg,
  GithubSvg,
  InviteSvg,
  LogOutSvg,
  ProfileItemSvg,
  SettingsSvg,
  TeamSvg
} from '@/assets/Svg/Account/DropDown';
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

        <DropdownMenuContent className="w-96 max-w-[80vw] mt-2 mx-8 py-10 overflow-hidden bg-white cursor-pointer rounded-2xl">
          <div className="flex sticky top-0 bg-white items-center gap-1 px-12 py-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <p className="text-base text-black">{user?.full_name}</p>
              <p className="text-xs">{user?.email}</p>
            </div>
          </div>
          <ScrollArea className="h-80 max-h-[60vh] overflow-y-scroll overflow-hidden">
            {/* The component wasnt used here because of radix/shadcn having to access the ref, and the component being a Link */}
            <DialogTrigger asChild>
              <DropdownMenuItem className="p-1 px-12 py-4 hover:border-0 hover:outline-none hover:bg-gray-100 rounded-sm">
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

            <MenuItem icon={<CloudSvg />} title="Api" />

            <DropdownMenuItem
              className="cursor-pointer flex items-center px-12 py-4 hover:border-0 hover:outline-none hover:bg-gray-100 rounded-sm"
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
    <DropdownMenuItem className="p-1 px-12 py-4 hover:border-0 hover:outline-none hover:bg-gray-100 rounded-sm">
      <Link href={href} className="flex items-center ">
        <span className="w-5 h-5 mt-1">{icon}</span>
        <span className="ml-4"> {title} </span>
      </Link>
    </DropdownMenuItem>
  );
};
