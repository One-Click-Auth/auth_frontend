import { API_DOMAIN } from "@/constants";
import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
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
        console.log(response.data);
        return response.data;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const isAllowedToSignIn = true; // user.emailVerified;
      if (account.provider === "github") {
        const access_token = account.access_token;
        const res = await axios.get("/auth/google", {
          params: { access_token },
        });
        const userTokens = res.data;
        return Promise.resolve(userTokens);
      }
      if (isAllowedToSignIn) {
        return Promise.resolve(user);
      } else {
        return false;
      }
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        const { access_token, refresh_token, ...rest } = user;
        token = { access_token, refresh_token, user: rest };
      }
      return token;
    },

    session: async ({ session, token }) => {
      session.token = token.access_token;
      return { ...session };
    },
  },
};
