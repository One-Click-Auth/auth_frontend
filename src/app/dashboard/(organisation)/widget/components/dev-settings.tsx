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
  TiktokIcon,
  TwitterIcon,
  WhatsappIcon
} from '@/assets/Svg/Account/Account';

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
};

const socialsList = [
  {
    name: 'Github',
    icon: <GithubIcon className="w-6"/>
  },
  {
    name: 'Microsoft',
    icon: <MicrosoftIcon className="w-6"/>
  },
  {
    name: 'Google',
    icon: <GoogleIcon className="w-5"/>
  },
  {
    name: 'Apple',
    icon: <AppleIcon className="w-6"/>
  },
  {
    name: 'WhatsApp',
    icon: <WhatsappIcon className="w-6"/>
  },
  {
    name: 'Tiktok',
    icon: <TiktokIcon className="h-8"/>
  },
  {
    name: 'Facebook',
    icon: <FacebookIcon className="w-6"/>
  },
  {
    name: 'Linkedin',
    icon: <LinkedinIcon className="w-6"/>
  },
  {
    name: 'Twitter',
    icon: <TwitterIcon className="w-6"/>
  }
];

export function DevSettings({
  setters: { setCallbackURL, setHostURL, setRedirectURL },
  inputValues: { callbackURL, hostURL, redirectURL }
}: DevProps) {
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
        <div className="grid grid-cols-3 gap-2 mt-5">
          {socialsList.map(social => (
            <Button
              key={social.name}
              variant="outline"
              className="col-span-1 flex items-center justify-evenly rounded-lg h-14 py-4"
              disabled
            >
              {social.icon}
              <span className="text-base font-normal">{social.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
