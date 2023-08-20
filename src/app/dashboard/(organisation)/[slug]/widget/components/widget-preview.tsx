'use client';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
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
import { useWidgetStore } from '../widgetStore';

export function WidgetPreview() {
  const {
    button2Status,
    button3Status,
    widget2Status,
    color,
    color1,
    color2,
    color9,
    social,
    logoImage,
    displayName,
    greeting,
    inputBorderColor,
    widgetColor,
    widgetColor2,
    inputBoxRadius,
    nameFontColor,
    greetingFontColor
  } = useWidgetStore();

  const socialValues = Object.values(social);
  const show = socialValues.includes(true);

  // Method to determine if button color is solid or gradient
  const updateButtonBg = () => {
    if (!button2Status && !button3Status) {
      return color.hex;
    }

    if (button2Status && button3Status) {
      return `linear-gradient(to right, ${color.hex}, ${color1.hex}, ${color2.hex})`;
    }

    if (button2Status || button3Status) {
      if (!button2Status) {
        return `linear-gradient(to right, ${color.hex}, ${color2.hex},${color2.hex})`;
      }
      return `linear-gradient(to right, ${color.hex}, ${color1.hex},${color1.hex})`;
    }
  };

  // const updateButtonTextColor = ()=>{
  //     return ` ${color4.hex} `
  // }

  const [buttonBackground, setButtonBackground] = useState(updateButtonBg());
  const [buttonTextColor, setButtonTextColor] = useState(`${color9.hex}`);

  useEffect(() => {
    setButtonBackground(updateButtonBg());
  }, [color, color1, color2, button2Status, button3Status]);

  useEffect(() => {
    setButtonTextColor(`${color9.hex}`);
  }, [color9]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col justify-center items-center">
        <Avatar className="w-12 h-12 rounded-none">
          <AvatarImage src={logoImage} alt="Organisation Logo" />
          <AvatarFallback delayMs={1000}>LOGO</AvatarFallback>
        </Avatar>
        <h1
          className="text-lg font-medium text-center break-words w-44 mt-0.5 mb-1.5"
          style={{ color: nameFontColor.hex }}
        >
          {displayName}
        </h1>
        <small
          style={{ color: greetingFontColor.hex }}
          className="text-[0.6rem] w-44 break-words text-center"
        >
          {greeting}
        </small>
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col">
          <label
            style={{
              backgroundColor: 'transparent',
              color: inputBorderColor.hex
            }}
            htmlFor="email"
            className="form-label text-[0.7rem] "
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
              background: 'transparent'
            }}
            className="w-44 px-4 py-0.5 border-[1.4px] disabled:bg-primary"
            disabled
          />
        </div>
        <Button
          style={{ background: buttonBackground, color: buttonTextColor }}
          className={cn('w-44 h-8', !show && 'mb-3')}
        >
          <span className="ml-6">Go !!</span>
          <ChevronRightIcon className="ml-3" />
        </Button>
        {show && (
          <>
            <div className="relative w-full ">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-black border-t" />
                <span className="px-2">or</span>
                <span className="w-full border-black border-t" />
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
