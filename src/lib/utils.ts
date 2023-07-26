import { PartialOrg } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
