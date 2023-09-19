'use client';
import React, { useEffect } from 'react';
import { AccountDropdown } from './Dropdown';
import Link from 'next/link';
import { useAuth } from '@/Providers/AuthContext';

function AccountNav() {
  const { update, expires } = useAuth();

  useEffect(() => {
    if (!expires) return;

    const timeDifference = expires * 1000 - Date.now();
    console.log('expires', expires);
    const timeout = setTimeout(() => {
      update();
    }, timeDifference);

    return () => clearTimeout(timeout);
  }, [expires]);

  return (
    <div className="flex  items-center justify-end min-w-max sticky top-0 mr-4">
      <div className="flex items-center gap-8 ">
        <Link
          href={'https://docs.trustauthx.com'}
          target="_blank"
          className="bg-accent text-black shadow hover:text-white hover:bg-black px-6 py-1 rounded-sm h-fit  "
        >
          Docs
        </Link>
        <AccountDropdown />
      </div>
    </div>
  );
}

export default AccountNav;
