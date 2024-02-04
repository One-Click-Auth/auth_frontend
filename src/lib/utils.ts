import { PartialOrg } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SocialLoginOptions {
  provider: string;
  orgToken: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImagePath(imagename: string) {
  return `/images/${imagename}`;
}

export const getOrgData = async (slug: string, token: string | undefined) => {
  const res = await fetch(`https://api.trustauthx.com/org/${slug}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  const data = (await res.json()) as PartialOrg;
  return data;
};

export const getSocialLoginUrl = async (
  options: SocialLoginOptions
): Promise<string> => {
  const { provider, orgToken } = options;

  const response = await fetch(
    `https://api.trustauthx.com/single/social/signup?provider=${provider}`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        OrgToken: orgToken
      })
    }
  );
  const { url } = (await response.json()) as { url: string };
  return url;
};
