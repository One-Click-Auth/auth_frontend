import { ReactNode } from 'react';
import { SidebarOrg } from '../../components/sidebarOrg';
import AccountNav from '../../components/Nav';

export default function OrgLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row">
      <SidebarOrg />

      <div className="w-full px-2 sm:px-4 py-3 max-w-full overflow-x-auto">
        <AccountNav />
        {children}
      </div>
    </div>
  );
}
