import React from 'react';
import { AccountDropdown } from './Dropdown';

function AccountNav() {
  return (
    <div className="flex items-center justify-end min-w-max sticky top-0 mr-4">
      <div className="flex items-center gap-1">
        <AccountDropdown />
      </div>
    </div>
  );
}

export default AccountNav;
