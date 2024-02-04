import {
  SocialLoginCollection,
  SocialLoginLabel,
  SocialLoginValue
} from '@/types/social-logins';

export const allSocialLogins: SocialLoginCollection = {
  [SocialLoginValue.Github]: {
    icon: 'github',
    label: SocialLoginLabel.Github,
    value: SocialLoginValue.Github
  },
  [SocialLoginValue.Google]: {
    icon: 'google',
    label: SocialLoginLabel.Google,
    value: SocialLoginValue.Google
  },
  [SocialLoginValue.Discord]: {
    icon: 'discord',
    label: SocialLoginLabel.Discord,
    value: SocialLoginValue.Discord
  },
  [SocialLoginValue.Figma]: {
    icon: 'figma',
    label: SocialLoginLabel.Figma,
    value: SocialLoginValue.Figma
  },
  [SocialLoginValue.Microsoft]: {
    icon: 'microsoft',
    label: SocialLoginLabel.Microsoft,
    value: SocialLoginValue.Microsoft
  }
};
