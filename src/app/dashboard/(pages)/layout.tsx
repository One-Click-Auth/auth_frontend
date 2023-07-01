import React from "react";

interface AccountLayoutType {
  children: React.ReactNode;
}
function AccountLayout({ children }: AccountLayoutType) {
  return (
    <div >{children}</div>
  );
}

export default AccountLayout;
