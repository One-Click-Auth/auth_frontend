"use client";
 // @ts-nocheck
import { Session } from "next-auth";
import { createContext, useContext, useMemo } from "react";

const authContext = createContext({});

export function AuthContext({ session, children }: { session: Session, children: React.ReactNode }) {
  // const user = useMemo(() => session.token)
  const values = useMemo(() => ({
    user: session?.token?.user ?? {},
    token:session?.token?.access_token
  }), [session])
  return (
    <authContext.Provider value={{ ...values}}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
