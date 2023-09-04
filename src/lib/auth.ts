/* eslint-disable @typescript-eslint/ban-ts-comment */

import { API_DOMAIN } from '@/constants';
import axios from 'axios';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

async function refreshAccessToken(token: string) {
  try {
    const url = API_DOMAIN + '/token';
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: token
      },
      method: 'GET'
    });

    const refreshedTokens = (await response.json()) as any;

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      ...refreshedTokens
    };
  } catch (error) {
    console.log(JSON.stringify(error));

    return {
      token,
      error: 'RefreshAccessTokenError'
    };
  }
}
async function fetchUserInfo(token: string) {
  try {
    const url = API_DOMAIN + '/user/me';
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: token,
        Authorization: `Bearer ${token}`
      },
      method: 'GET'
    });

    const userData = await response.json();

    if (!response.ok) {
      return { userData: null };
    }

    return { userData };
  } catch (error) {
    console.log(JSON.stringify(error));

    return { userData: null };
  }
}
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/',
    error: '/'
  },
  session: {
    strategy: 'jwt'
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile, tokens) {
        console.log({ profile, tokens });
        return { id: profile.id, name: profile.name, email: profile.email };
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        otp: { label: 'otp', type: 'number', placeholder: 'otp' },
        password: { label: 'Password', type: 'password' },
        githubToken: { label: 'token', type: 'text' }
      },
      async authorize(creds, req) {
        const githubToken = creds?.githubToken;
        if (githubToken) {
          const tokenData = await refreshAccessToken(githubToken);
          const {
            userData: { profile, ...restUser }
          } = (await fetchUserInfo(tokenData.access_token)) as any;
          return { user: { ...profile, ...restUser }, ...tokenData };
        }
        const body = {
          otp: '100000',
          grant_type: '',
          username: creds?.username,
          password: creds?.password,
          scope: '',
          client_id: '',
          client_secret: creds?.otp ? Number(creds?.otp) : '100000'
        };
        const { data } = await axios
          .post(`${API_DOMAIN}/token`, body, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/x-www-form-urlencoded'
            }
          })
          .catch(e => {
            console.error(e);
            return { data: null };
          });
        const {
          userData: { profile, ...restUser }
        } = (await fetchUserInfo(data.access_token)) as any;
        return { user: { ...profile, ...restUser }, ...data };
      }
    })
  ],
  callbacks: {
    // @ts-ignore
    async signIn(data) {
      const { account } = data;
      console.log({ data });
      if (account?.provider === 'github') {
        const access_token = account.access_token;
        // const res = await axios.get", {
        //   params: { access_token },
        // });
        // const userTokens = res.data;
      }
      // @ts-ignore
      const { access_token, ...user } = data.user;
      return Promise.resolve({ user, access_token });
    },
    // @ts-ignore
    async jwt(jwtData) {
      const { token } = jwtData;
      console.log('JWT', JSON.stringify(jwtData));
      // @ts-ignore
      if (jwtData.user?.user) {
        return jwtData.user;
      }
      return token;
    },

    // @ts-ignore
    async session(session, token) {
      session.user = token?.user ?? session.user;
      return session;
    }
  }
};
