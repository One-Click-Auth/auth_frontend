import { FC, ReactNode } from 'react';

interface ChildrenProp {
  children: ReactNode;
}

const AuthLayout: FC<ChildrenProp> = ({ children }) => {
  return <>{children}</>;
};

export default AuthLayout;
