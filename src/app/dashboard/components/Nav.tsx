import React from 'react';
import { AccountDropdown } from './Dropdown';
import { Switch } from '@/components/ui/Switch';

function AccountNav() {
  return (
    <div className="flex  items-center justify-end min-w-max sticky top-0 mr-4">
      <div className="flex  ">
        <AccountDropdown />
      </div>
    </div>
  );
}

export default AccountNav;
