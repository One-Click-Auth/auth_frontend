import { API_DOMAIN } from "@/constants";
import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

async function refreshAccessToken(token) {
  try {
    const url = "https://api.trustauthx.com/token"
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        token: token.refresh_token
      },
      method: "GET",
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(JSON.stringify(error))

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile, tokens) {
        console.log({ profile, tokens })
        return { id: profile.id, name: profile.name, email: profile.email, }
      },
    }),
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
    async signIn({ account, user }) {
      if (account?.provider === "github") {
        const access_token = account.access_token;
        // const res = await axios.get", {
        //   params: { access_token },
        // });
        // const userTokens = res.data;
        return Promise.resolve({ access_token });
      }
      return Promise.resolve(user);
    },
    async jwt({ token, account, user, trigger }) {
      if (account && user) {
        return {
          accessToken: account.accessToken,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          refreshToken: account.refresh_token,
          user,
        }
      }
      if (Date.now() < token.accessTokenExpires) {
        return token
      }
      return refreshAccessToken(token)
    },
    async session(session, token) {
      if (token) {
        session.user = token.user
        session.accessToken = token.accessToken
        session.error = token.error
      }
      return session
    },
  },
};
