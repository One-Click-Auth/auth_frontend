import { API_DOMAIN } from "@/constants";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        otp: { label: "otp", type: "number", placeholder: "otp" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds, req) {
        console.log({ creds });
        const body = {
          otp: "100000",
          grant_type: "",
          username: creds?.username,
          password: creds?.password,
          scope: "",
          client_id: "",
          client_secret: creds?.otp ? Number(creds?.otp) : "100000",
        };
        const response = await axios
          .post(`${API_DOMAIN}/token`, body, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/x-www-form-urlencoded",
            },
          })
          .catch((e) => {
            console.error(e);
            return { data: null };
          });
        return response.data;
      },
    }),
  ];
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, {
    pages: {
      signIn: "/login",
      error: "/login",
    },
    session: {
      strategy: "jwt",
    },
    providers,
    callbacks: {
      session({ session, token }) {
        return session;
      },
    },
  });
}
