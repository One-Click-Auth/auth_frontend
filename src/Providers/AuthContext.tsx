/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useMemo } from 'react';

export interface IUser {
  full_name: string;
  email: string;
}
export type AuthContextType = {
  user?: IUser;
  token?: string;
  update: () => void;
};
const authContext = createContext<AuthContextType>({ update: () => null });

export function AuthContext({
  session,
  children
}: {
  session: Session;
  children: React.ReactNode;
}) {
  // const user = useMemo(() => session.token)
  const { update } = useSession();
  const values: AuthContextType = useMemo(
    () => ({
      // @ts-ignore
      user: session?.token?.user ?? {},
      // @ts-ignore
      token: session?.token?.access_token,
      // @ts-ignore
      update
    }),
    [session, update]
  );
  return (
    <authContext.Provider value={{ ...values }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
