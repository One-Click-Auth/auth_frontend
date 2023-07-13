import React from 'react';
import { SidebarOrg } from '../components/sidebarOrg';
import AccountNav from '../components/Nav';

interface AccountLayoutType {
  children: React.ReactNode;
}
function AccountLayout({ children }: AccountLayoutType) {
  return (
    <div className="flex flex-col sm:flex-row">
      <SidebarOrg />

      <div className="w-full px-2 sm:px-4 py-3 max-w-full overflow-x-auto">
        <AccountNav />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default AccountLayout;
