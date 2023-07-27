/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import { Session } from 'next-auth';
import { createContext, useContext, useMemo } from 'react';

export interface IUser {
  full_name: string;
  email: string;
}
export type AuthContextType = { user?: IUser; token?: string };
const authContext = createContext<AuthContextType>({});

export function AuthContext({
  session,
  children
}: {
  session: Session;
  children: React.ReactNode;
}) {
  // const user = useMemo(() => session.token)
  const values: AuthContextType = useMemo(
    () => ({
      // @ts-ignore
      user: session?.token?.user ?? {},
      // @ts-ignore
      token: session?.token?.access_token
    }),
    [session]
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
