"use client";
import { createContext, useContext } from "react";

const authContext = createContext({});

export function AuthContext({ token, user, children }) {
  return (
    <authContext.Provider value={{ token, user }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
