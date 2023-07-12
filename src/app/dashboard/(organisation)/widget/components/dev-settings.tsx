'use client';

import { Dispatch, SetStateAction } from 'react';
import { TermsInput } from './terms-input';
import { Button } from '@/components/ui/Button';
import {
  AppleIcon,
  FacebookIcon,
  GithubIcon,
  GoogleIcon,
  LinkedinIcon,
  MicrosoftIcon,
  TiktokIcon2,
  TwitterIcon,
  WhatsappIcon
} from '@/assets/Svg/Account/Account';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Social } from '../page';

type DevProps = {
  setters: {
    setCallbackURL: Dispatch<SetStateAction<string>>;
    setHostURL: Dispatch<SetStateAction<string>>;
    setRedirectURL: Dispatch<SetStateAction<string>>;
  };
  inputValues: {
    callbackURL: string;
    hostURL: string;
    redirectURL: string;
  };
  socials: {
    social: Social;
    setSocial: Dispatch<SetStateAction<Social>>;
  };
};

type SocialList = {
  [key: string]: {
    name: string;
    icon: JSX.Element;
    disabled: boolean;
    active: boolean;
  };
};

export function DevSettings({
  setters: { setCallbackURL, setHostURL, setRedirectURL },
  inputValues: { callbackURL, hostURL, redirectURL },
  socials: { social, setSocial }
}: DevProps) {
  const socialsList: SocialList = {
    github: {
      name: 'Github',
      icon: <GithubIcon className="w-6" />,
      disabled: false,
      active: social.github
    },
    microsoft: {
      name: 'Microsoft',
      icon: <MicrosoftIcon className="w-6" />,
      disabled: true,
      active: social.microsoft
    },
    google: {
      name: 'Google',
      icon: <GoogleIcon className="w-5" />,
      disabled: true,
      active: social.google
    },
    apple: {
      name: 'Apple',
      icon: <AppleIcon className="w-6" />,
      disabled: true,
      active: social.apple
    },
    whatsapp: {
      name: 'WhatsApp',
      icon: <WhatsappIcon className="w-6" />,
      disabled: true,
      active: social.whatsapp
    },
    tiktok: {
      name: 'Tiktok',
      icon: <TiktokIcon2 className="h-7" />,
      disabled: true,
      active: social.tiktok
    },
    facebook: {
      name: 'Facebook',
      icon: <FacebookIcon className="w-6" />,
      disabled: true,
      active: social.facebook
    },
    linkedin: {
      name: 'Linkedin',
      icon: <LinkedinIcon className="w-6" />,
      disabled: true,
      active: social.facebook
    },
    twitter: {
      name: 'Twitter',
      icon: <TwitterIcon className="w-6" />,
      disabled: true,
      active: social.twitter
    }
  };

  const handleButtonToggle = (key: string) => {
    setSocial(prevSocials => {
      const newSocials = {
        ...prevSocials,
        [key]: !prevSocials[key]
      };
      return newSocials;
    });
  };

  return (
    <div className="flex flex-col space-y-10">
      <TermsInput
        heading="**Add a Host URL"
        placeholder="http://app.trustauthx.com/"
        changeHandler={setHostURL}
        value={hostURL}
      />
      <TermsInput
        heading="Add a callback URL"
        placeholder="http://api.trustauthx.com/github/callback"
        changeHandler={setCallbackURL}
        value={callbackURL}
      />
      <TermsInput
        heading="**Add a Redirect URL"
        placeholder="http://api.trustauthx.com/login"
        changeHandler={setRedirectURL}
        value={redirectURL}
      />
      <div>
        <div>
          <small className="text-sm pl-2">Add a Social Sign-In</small>
          <hr className="border-t-2 border-slate-800" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mt-5 mb-3">
          {Object.entries(socialsList).map(([key, social]) => (
            <TooltipProvider key={social.name + key} delayDuration={400}>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    onClick={() => handleButtonToggle(key)}
                    className={cn(
                      'w-full flex items-center justify-evenly rounded-lg h-14 py-4 px-1 hover:bg-blue-50',
                      social.active && 'border-slate-700 bg-blue-50'
                    )}
                    disabled={social.disabled}
                  >
                    {social.icon}
                    <span className="text-base font-normal">{social.name}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {social.disabled ? (
                    <p>Coming soon</p>
                  ) : (
                    <p>
                      {social.active ? 'Remove' : 'Add'} {social.name} Sign-in
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
}
