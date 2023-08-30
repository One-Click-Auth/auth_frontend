/* eslint-disable @typescript-eslint/ban-ts-comment */

import { API_DOMAIN } from '@/constants';
import axios from 'axios';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

async function refreshTokens(token: string) {
  try {
    const url = API_DOMAIN + '/token';
    const {data:refreshedTokens} = await axios.get(url, {
      headers: {
        token: token
      },
    });

    
    return {
      ...refreshedTokens
    };
  } catch (error) {
    console.log(JSON.stringify(error));
    return {
      token,
      error: 'refreshTokensError'
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
          const tokenData = await refreshTokens(githubToken);
          const {
            userData: { profile, ...restUser }
          } = await fetchUserInfo(tokenData.access_token) as any;
          return { user: { ...profile, ...restUser }, ...tokenData };
        }
        const body = {
          otp: '100000',
          grant_type: '',
          username: creds?.username,
          password: creds?.password,
          client_id: '',
          client_secret: creds?.otp ? Number(creds?.otp) : '100000'
        };
        console.log({body})
        const { data } = await axios
          .post(`${API_DOMAIN}/token`, body, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/x-www-form-urlencoded'
            },
            params:{scp:0}
          })
          .catch(e => {
            console.error(e);
            return { data: null };
          });
        const tokens = await refreshTokens(data.access_token)
        const {
          userData: { profile, ...restUser }
        } = await fetchUserInfo(tokens.access_token) as any;
        return { user: { ...profile, ...restUser }, ...tokens };
      }
    })
  ],
  callbacks: {
    // @ts-ignore
    async signIn(data) {
      // @ts-ignore
      const { access_token, ...user } = data.user;
      console.log({ user ,data});
      return Promise.resolve({ user, access_token });
    },
    // @ts-ignore
    async jwt(jwtData) {
      const { token, trigger } = jwtData;
      if (trigger === 'update') {
        // @ts-ignoreß
        const tokens = await refreshTokens(token.refresh_token)
      }
      // @ts-ignore
      if (jwtData.user?.user) {
        return jwtData.user;
      }
      return token;
    },

    // @ts-ignore
    async session(session, token) {
      session.user = token?.user ?? session.user
      return session
    },
  },
};
