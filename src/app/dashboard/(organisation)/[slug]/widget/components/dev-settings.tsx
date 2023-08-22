'use client';

import { WidgetInput } from './widget-input';
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
import { useWidgetStore, Social } from '../widgetStore';
import SocialSignInPopup from './SocialSignInPopup';
import { Dialog, DialogTrigger } from '@/components/ui/Dialog';
import { useEffect } from 'react';
type SocialList = {
  [key: string]: {
    name: string;
    icon: JSX.Element;
    disabled: boolean;
    active: boolean;
  };
};

export function DevSettings() {
  const {
    social,
    setSocial,
    callbackURL,
    setCallbackURL,
    hostURL,
    setHostURL,
    redirectURL,
    setRedirectURL
  } = useWidgetStore();

  useEffect(() => {
    console.log(social);
  }, [social]);

  const socialsList: SocialList = {
    github: {
      name: 'Github',
      icon: <GithubIcon className="w-6" />,
      disabled: false,
      active: social.github ? true : false
    },
    microsoft: {
      name: 'Microsoft',
      icon: <MicrosoftIcon className="w-6" />,
      disabled: false,
      active: social.microsoft ? true : false
    },
    google: {
      name: 'Google',
      icon: <GoogleIcon className="w-5" />,
      disabled: false,
      active: social.google ? true : false
    },
    apple: {
      name: 'Apple',
      icon: <AppleIcon className="w-6" />,
      disabled: true,
      active: social.apple ? true : false
    },
    whatsapp: {
      name: 'WhatsApp',
      icon: <WhatsappIcon className="w-7 h-7" />,
      disabled: true,
      active: social.whatsapp ? true : false
    },
    tiktok: {
      name: 'Tiktok',
      icon: <TiktokIcon2 className="h-7" />,
      disabled: true,
      active: social.tiktok ? true : false
    },
    facebook: {
      name: 'Facebook',
      icon: <FacebookIcon className="w-6" />,
      disabled: true,
      active: social.faceboo ? true : false
    },
    linkedin: {
      name: 'Linkedin',
      icon: <LinkedinIcon className="w-6" />,
      disabled: true,
      active: social.facebook ? true : false
    },
    twitter: {
      name: 'Twitter',
      icon: <TwitterIcon className="w-6" />,
      disabled: true,
      active: social.twitter ? true : false
    }
  };

  const handleButtonToggle = (newSocial: Social) => {
    setSocial(newSocial);
  };

  return (
    <div className="flex flex-col space-y-10">
      <WidgetInput
        heading="**Add a Host URL"
        placeholder="http://app.trustauthx.com/"
        changeHandler={setHostURL}
        value={hostURL}
      />
      <WidgetInput
        heading="Add a callback URL"
        placeholder="http://api.trustauthx.com/github/callback"
        changeHandler={setCallbackURL}
        value={callbackURL}
      />
      <WidgetInput
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
                  <Dialog>
                    <DialogTrigger asChild={true}>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full flex items-center justify-evenly rounded-lg h-14 py-4 px-1 hover:bg-blue-50',
                          social.active && 'border-slate-700 bg-blue-50'
                        )}
                        disabled={social.disabled}
                      >
                        {social.icon}
                        <span className="text-base font-normal">
                          {social.name}
                        </span>
                      </Button>
                    </DialogTrigger>
                    <SocialSignInPopup socialName={social.name} />
                  </Dialog>
                </TooltipTrigger>
                <TooltipContent>
                  {social.disabled ? (
                    <p>Coming soon</p>
                  ) : (
                    <p>
                      {social.active ? '' : 'Add'} {social.name} Sign-in
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
