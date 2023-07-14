'use client';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { Color } from 'react-color-palette';
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
import { Social } from '../page';
import { cn } from '@/lib/utils';
import { useWidgetStore } from '../widgetStore';

type WidgetProp = {
  logoImage: string;
  displayName: string;
  greeting: string;
  // buttonColor: {
  //   color: Color;
  //   color2: Color;
  //   color3: Color;
  // };
  // buttonStatus: {
  //   button2Status: boolean;
  //   button3Status: boolean;
  // };
  inputBorderColor: Color;
  widgetColor: Color;
  inputBoxRadius: string;
  // social: Social;
};

export function WidgetPreview({
  logoImage,
  displayName,
  greeting,
  // buttonColor: { color, color2, color3 },
  // buttonStatus: { button2Status, button3Status },
  inputBorderColor,
  widgetColor,
  inputBoxRadius,
  // social
}: WidgetProp) {
  const { button2Status, button3Status, color, color2, color3, social } =
    useWidgetStore();
  const socialValues = Object.values(social);
  const show = socialValues.includes(true);

  const updateButtonColor = () => {
    if (!button2Status && !button3Status) {
      return color.hex;
    }

    if (button2Status && button3Status) {
      return `linear-gradient(to right, ${color.hex}, ${color2.hex}, ${color3.hex})`;
    }

    if (button2Status || button3Status) {
      if (!button2Status) {
        return `linear-gradient(to right, ${color.hex}, ${color3.hex})`;
      }
      return `linear-gradient(to right, ${color.hex}, ${color2.hex})`;
    }
  };

  const [buttonBackground, setButtonBackground] = useState(updateButtonColor());

  useEffect(() => {
    setButtonBackground(updateButtonColor());
  }, [color, color2, color3, button2Status, button3Status]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col justify-center items-center">
        <Avatar className="w-12 h-12 rounded-none">
          <AvatarImage src={logoImage} alt="Organisation Logo" />
          <AvatarFallback delayMs={1000}>LOGO</AvatarFallback>
        </Avatar>
        <h1 className="text-lg font-medium text-center break-words w-44 mt-0.5 mb-1.5">
          {displayName}
        </h1>
        <small className="text-[0.6rem] w-44 break-words text-center">
          {greeting}
        </small>
      </div>
      <div className="flex flex-col gap-8 items-center">
        <div className="relative">
          <label
            style={{
              backgroundColor: widgetColor.hex,
              color: inputBorderColor.hex
            }}
            htmlFor="email"
            className="form-label text-[0.6rem] absolute translate-x-3 translate-y-[-7px] bg-white px-1"
          >
            Your Email
          </label>
          <input
            name="username"
            id="email"
            type="text"
            style={{
              borderRadius: Number(inputBoxRadius),
              borderColor: inputBorderColor.hex,
              backgroundColor: widgetColor.hex
            }}
            className="w-44 px-4 py-0.5 border disabled:bg-primary"
            disabled
          />
        </div>
        <Button
          style={{ background: buttonBackground }}
          className={cn('w-44 h-8 text-white', !show && 'mb-3')}
        >
          <span className="ml-6">Go !!</span>
          <ChevronRightIcon className="ml-3" />
        </Button>
        {show && (
          <>
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-black border-t" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span
                  style={{ backgroundColor: widgetColor.hex }}
                  className="bg-background px-2 text-black"
                >
                  or
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-evenly gap-y-4 w-full">
              {social.github && <GithubIcon className="h-6 basis-1/4" />}
              {social.microsoft && <MicrosoftIcon className="h-6 basis-1/4" />}
              {social.google && <GoogleIcon className="h-6 basis-1/4" />}
              {social.apple && <AppleIcon className="h-6 basis-1/4" />}
              {social.whatsapp && <WhatsappIcon className="h-6 basis-1/4" />}
              {social.tiktok && <TiktokIcon2 className="h-7 basis-1/4" />}
              {social.facebook && <FacebookIcon className="h-6 basis-1/4" />}
              {social.linkedin && <LinkedinIcon className="h-6 basis-1/4" />}
              {social.twitter && <TwitterIcon className="h-6 basis-1/4" />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
