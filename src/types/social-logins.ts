import { Icons } from '@/app/widget/login/components/icons';

export enum SocialLoginValue {
  Github = 'github',
  Google = 'google',
  Discord = 'discord',
  Microsoft = 'microsoft',
  Figma = 'figma'
}

export enum SocialLoginLabel {
  Github = 'GitHub',
  Google = 'Google',
  Discord = 'Discord',
  Microsoft = 'Microsoft',
  Figma = 'Figma'
}

interface SocialLoginInfo {
  icon: keyof typeof Icons;
  label: SocialLoginLabel;
  value: SocialLoginValue;
}

export type SocialLoginCollection = Record<SocialLoginValue, SocialLoginInfo>;
