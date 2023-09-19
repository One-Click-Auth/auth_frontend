'use client';
import React, { useEffect } from 'react';
import { AccountDropdown } from './Dropdown';
import Link from 'next/link';
import { useAuth } from '@/Providers/AuthContext';

function AccountNav() {
  const { update } = useAuth();

  useEffect(() => {
    let expires = localStorage.getItem('expires');

    if (!expires) {
      expires = String(Date.now() + 1000 * 60 * 59);
      localStorage.setItem('expires', expires);
    }

    const timeDifference = Number(expires) - Date.now();

    if (timeDifference < 0) update();

    const timeout = setTimeout(() => {
      console.log('updating');
      localStorage.setItem('expires', String(Date.now() + 1000 * 60 * 59));
      update();
    }, timeDifference);

    return () => clearTimeout(timeout);
  }, []);

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
