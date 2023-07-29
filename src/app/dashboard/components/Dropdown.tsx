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

export function AccountDropdown() {
  const { user } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="active:border-0 active:outline-none">
        <div className="text-xs sm:text-sm flex items-center font-semibold  min-w-max">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 mt-2 mx-8 p-12 bg-white cursor-pointer rounded-2xl">
        <div className="flex items-center gap-1">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <p className="text-base text-black">{user?.full_name}</p>
            <p className="text-xs">{user?.email}</p>
          </div>
        </div>

        <MenuItem icon={<ProfileItemSvg />} title="Profile" />
        <MenuItem icon={<BillingSvg />} title="Billing" />
        <MenuItem
          icon={<SettingsSvg />}
          title="Settings"
          href="/dashboard/settings"
        />
        <MenuItem icon={<TeamSvg />} title="Team" />
        <MenuItem icon={<InviteSvg />} title="Invite users" />
        <MenuItem icon={<AddItemSvg />} title="New Item" />
        <MenuItem icon={<GithubSvg />} title="Github" />
        <MenuItem icon={<InviteSvg />} title="Support" />
        <div className="opacity-40">
          <MenuItem icon={<CloudSvg />} title="Api" />
        </div>
        <DropdownMenuItem
          className="cursor-pointer flex items-center p-1 hover:border-0 hover:outline-none hover:bg-gray-100 rounded-sm"
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface MenuItemType {
  icon: React.ReactNode;
  title: string;
  href?: string;
}

const MenuItem = ({ icon, title, href = '#' }: MenuItemType) => {
  return (
    <DropdownMenuItem className="p-1 my-4 hover:border-0 hover:outline-none hover:bg-gray-100 rounded-sm">
      <Link href={href} className="flex items-center ">
        <span className="w-5 h-5 mt-1">{icon}</span>
        <span className="ml-4"> {title} </span>
      </Link>
    </DropdownMenuItem>
  );
};
