import React from 'react';

interface AccountLayoutType {
  children: React.ReactNode;
}
function AccountLayout({ children }: AccountLayoutType) {
  return <>{children}</>;
}

export default AccountLayout;
