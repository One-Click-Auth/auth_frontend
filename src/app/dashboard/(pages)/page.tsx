'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
// import Settings from "./settings/page";
import Support from './support/page';
import AccountIndex from '../components/Index';
import AddOrganization from './add-organization/page';
import KeysCard from './keys/page';

function Account() {
  const location = usePathname();

  return (
    <>
      {location === '/dashboard' ? (
        <AccountIndex />
      ) : location === '/dashboard/support' ? (
        <Support />
      ) : location === '/dashboard/add-organization' ? (
        <AddOrganization />
      ) : location === '/dashboard/keys' ? (
        <KeysCard />
      ) : (
        'Not Found'
      )}
    </>
  );
}

export default Account;
