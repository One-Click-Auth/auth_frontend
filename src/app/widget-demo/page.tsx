'use client';
import {
  AppleIcon,
  GithubIcon,
  GoogleIcon,
  LinkedinIcon,
  MicrosoftIcon,
  TiktokIcon2,
  TwitterIcon,
  WhatsappIcon
} from '@/assets/Svg/Account/Account';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { ChevronDown, FacebookIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useWidgetStore } from '../dashboard/(organisation)/[slug]/widget/widgetStore';
import { Card, CardContent } from '@/components/ui/card';
import { WidgetPreview } from '../dashboard/(organisation)/[slug]/widget/components/widget-preview';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import OTPInput from 'react-otp-input';
import { QRCodeSVG } from 'qrcode.react';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import Widget from '../widget/login/page';

function Page() {
  const {
    button2Status,
    button3Status,
    widget2Status,
    color1,
    color2,
    color9,
    social,
    logoImage,
    displayName,
    greeting,
    inputBorderColor,
    buttonBorderColor,
    widgetColor,
    widgetColor2,
    inputBoxRadius,
    buttonRadius,
    nameFontColor,
    greetingFontColor
  } = useWidgetStore();

  const socialValues = Object.values(social);
  const show = socialValues.length > 0;

  return (
    <Card
      style={{
        background: 'gray'
      }}
      className="col-span-1 lg:col-span-4 h-screen  shadow-none grid place-content-center"
    >
      <CardContent
        style={{
          borderRadius: '20px',
          borderWidth: '',
          borderColor: '',
          background: 'white'
        }}
        className={`p-10 h-[670px]   w-[397px] max-w-[90vw] max-h-[90vh]   m-4`}
      >
        <div className="space-y-10 flex-1 h-full justify-center flex flex-col  ">
          <WidgetLogin />
        </div>
      </CardContent>
    </Card>
  );
}

function Password() {
  const {
    button2Status,
    button3Status,
    widget2Status,
    color1,
    color2,
    color9,
    social,
    logoImage,
    displayName,
    greeting,
    inputBorderColor,
    buttonBorderColor,
    widgetColor,
    widgetColor2,
    inputBoxRadius,
    buttonRadius,
    nameFontColor,
    greetingFontColor
  } = useWidgetStore();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const socialValues = Object.values(social);
  const [checks, setChecks] = useState({
    length: false,
    lowerCase: false,
    upperCase: false,
    number: false
  });

  useEffect(() => {
    setChecks({
      length: password.length >= 8,
      lowerCase: /[a-z]/.test(password),
      upperCase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password)
    });
  }, [password]);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1
          className="text-3xl font-medium  text-center break-words w-44 mt-0.5 "
          style={{ color: nameFontColor.hex }}
        >
          Hi !
        </h1>
      </div>
      <div className="flex flex-col gap-8  ">
        <div className="flex items-center justify-center flex-col lg:px-4 gap-6">
          <p
            style={{ color: greetingFontColor.hex }}
            className="  w-44 break-words text-center"
          >
            {/* add the href to this a tag */}
            <a
              href="
            "
              className="text-blue-600"
            >
              anyone@gmail.com
            </a>
          </p>

          <p className="text-muted-foreground text-center">
            Create a Password for your
            <br />
            <span className=" text-black">Flitchcoin </span> account
          </p>
        </div>

        <div>
          <div className="relative">
            <input
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              style={{
                borderRadius: Number(inputBoxRadius),
                borderColor: inputBorderColor.hex,
                background: 'transparent'
              }}
              className=" w-full px-4  h-12 border-[1.4px] disabled:bg-primary"
            />

            <button
              className="absolute right-3 top-3 opacity-60"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VscEye size={24} /> : <VscEyeClosed size={24} />}
            </button>
          </div>

          <div
            style={{
              borderRadius: Number(inputBoxRadius),
              background: 'transparent'
            }}
            className="border p-4 mt-1 flex flex-col gap-3"
          >
            <p>Your password must contain:</p>

            <div className="flex items-center gap-2">
              {' '}
              {checks.length ? (
                <Image width={18} height={18} alt="icon" src={'./check.svg'} />
              ) : (
                <p>x</p>
              )}
              <p className="text-muted-foreground"> At least 8 Characters</p>
            </div>

            <div className="flex items-center gap-2">
              {' '}
              {checks.lowerCase ? (
                <Image width={18} height={18} alt="icon" src={'./check.svg'} />
              ) : (
                <p>x</p>
              )}
              <p className="text-muted-foreground"> Lower case letters (a-z)</p>
            </div>

            <div className="flex items-center gap-2">
              {' '}
              {checks.upperCase ? (
                <Image width={18} height={18} alt="icon" src={'./check.svg'} />
              ) : (
                <p>x</p>
              )}
              <p className="text-muted-foreground"> Upper case letters (A-Z)</p>
            </div>

            <div className="flex items-center gap-2">
              {' '}
              {checks.number ? (
                <Image width={18} height={18} alt="icon" src={'./check.svg'} />
              ) : (
                <p>x</p>
              )}
              <p className="text-muted-foreground"> Numbers (0-9)</p>
            </div>
          </div>
        </div>
      </div>

      <Button variant={'black'} className="w-full text-lg py-5">
        Continue
      </Button>
    </>
  );
}

function MFA() {
  const {
    button2Status,
    button3Status,
    widget2Status,
    color1,
    color2,
    color9,
    social,
    logoImage,
    displayName,
    greeting,
    inputBorderColor,
    buttonBorderColor,
    widgetColor,
    widgetColor2,
    inputBoxRadius,
    buttonRadius,
    nameFontColor,
    greetingFontColor
  } = useWidgetStore();

  const socialValues = Object.values(social);
  const show = socialValues.length > 0;

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1
          className="text-3xl font-medium  text-center break-words w-44 mt-0.5 "
          style={{ color: nameFontColor.hex }}
        >
          Hi !
        </h1>
      </div>
      <div className="flex flex-col gap-8  ">
        <div className="flex items-center justify-center flex-col lg:px-4 gap-6">
          <p
            style={{ color: greetingFontColor.hex }}
            className="  w-44 break-words text-center"
          >
            {/* add the href to this a tag */}
            <a
              href="
            "
              className="text-blue-600"
            >
              anyone@gmail.com
            </a>
          </p>

          <p className="text-lg">Continue to register MFA </p>

          <p className="text-muted-foreground text-center">
            Scan the code using any TOTP
            <br />
            <a href="" className="underline text-black">
              Auth provider
            </a>
          </p>
        </div>

        <div className="flex flex-col   justify-center items-center gap-8  ">
          <QRCodeSVG value="a" bgColor="transparent" />

          <p className="my-2  text-center   ">Enter OTP to turn On MFA</p>

          <OTPInput
            onChange={e => {
              console.log(e);
            }}
            containerStyle="grid grid-cols-2 justify-center gap-1 px-2"
            inputStyle="!w-10 h-10 mt-1 border bg-transparent border-black   text-black p-0 text-center rounded-xl"
            numInputs={6}
            renderSeparator={<span></span>}
            renderInput={props => <input {...props} />}
          />

          <Button variant={'black'} className="w-full text-lg py-5">
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}

function EmailSent() {
  const {
    button2Status,
    button3Status,
    widget2Status,
    color1,
    color2,
    color9,
    social,
    logoImage,
    displayName,
    greeting,
    inputBorderColor,
    buttonBorderColor,
    widgetColor,
    widgetColor2,
    inputBoxRadius,
    buttonRadius,
    nameFontColor,
    greetingFontColor
  } = useWidgetStore();

  const socialValues = Object.values(social);
  const show = socialValues.length > 0;

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="relative flex mb-4 items-center">
          <Avatar className="w-16 h-16 ml-6  ">
            <AvatarImage
              src={'https://avatars.githubusercontent.com/u/110340508?v=4'}
              alt="Organisation Logo"
            />
            <AvatarFallback delayMs={1000}>LOGO</AvatarFallback>
          </Avatar>

          <Avatar className="w-16 h-16  -left-6  z-10">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="Organisation Logo"
            />
            <AvatarFallback delayMs={1000}>LOGO</AvatarFallback>
          </Avatar>
        </div>

        <h1
          className="text-3xl font-medium   text-center break-words w-44 mt-0.5 "
          style={{ color: nameFontColor.hex }}
        >
          Hi !
        </h1>
      </div>

      <div className="flex flex-col gap-8  ">
        <div className="flex items-center justify-center flex-col lg:px-4 gap-8">
          <p
            style={{ color: greetingFontColor.hex }}
            className="  w-44 break-words text-center"
          >
            {/* add the href to this a tag */}
            <a
              href="
            "
              className="text-blue-600"
            >
              anyone@gmail.com
            </a>
          </p>
          <Image
            width={50}
            height={50}
            src={'./emailsparkles.svg'}
            alt="email"
          />
        </div>

        <div className="h-[1px] w-full bg-muted-foreground my-6" />

        <div className="flex flex-col items-center gap-8 ">
          <div className="relative text-center text-lg w-full py-2">
            An email with your Passwordless Login has been sent to
            anyone@gmail.com
          </div>
          <Button variant={'authx'} className="text-lg p-4">
            Want to turn on MFA?
          </Button>
        </div>
      </div>
    </>
  );
}

function WidgetLogin() {
  const {
    button2Status,
    button3Status,
    widget2Status,
    color1,
    color2,
    color9,
    social,
    logoImage,
    displayName,
    greeting,
    inputBorderColor,
    buttonBorderColor,
    widgetColor,
    widgetColor2,
    inputBoxRadius,
    buttonRadius,
    nameFontColor,
    greetingFontColor
  } = useWidgetStore();

  const socialValues = Object.values(social);
  const show = socialValues.length > 0;

  function SocialsJSX() {
    return (
      <>
        {social.github && <GithubIcon className="h-8 basis-1/4" />}
        {social.microsoft && <MicrosoftIcon className="h-8 basis-1/4" />}
        {social.google && <GoogleIcon className="h-8 basis-1/4" />}
        {social.apple && <AppleIcon className="h-8 basis-1/4" />}

        {social.whatsapp && <WhatsappIcon className="h-8 basis-1/4" />}
        {social.tiktok && <TiktokIcon2 className="h-8 basis-1/4" />}
        {social.facebook && <FacebookIcon className="h-8 basis-1/4" />}
        {social.linkedin && <LinkedinIcon className="h-8 basis-1/4" />}
        {social.twitter && <TwitterIcon className="h-8 basis-1/4" />}
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Avatar className="w-12 h-12 rounded-none">
          <AvatarImage src={logoImage} alt="Organisation Logo" />
          <AvatarFallback delayMs={1000}>LOGO</AvatarFallback>
        </Avatar>
        <h1
          className="text-3xl font-medium  text-center break-words w-44 mt-0.5 mb-1.5"
          style={{ color: nameFontColor.hex }}
        >
          Javascript
        </h1>
        <small
          style={{ color: greetingFontColor.hex }}
          className="  w-44 break-words text-center"
        >
          Continue to Log in to Javascript
        </small>
      </div>
      <div className="flex flex-col gap-8   ">
        <div className="flex flex-col lg:px-4 gap-8">
          <div className="flex flex-col">
            <input
              name="username"
              placeholder="Email"
              id="email"
              type="text"
              style={{
                borderRadius: Number(inputBoxRadius),
                borderColor: inputBorderColor.hex,
                background: 'transparent'
              }}
              className=" w-full px-4  h-12 border-[1.4px] disabled:bg-primary"
            />
          </div>

          <Button
            style={{
              background: '#004B6A',
              color: color9.hex,
              borderRadius: Number(buttonRadius),
              borderColor: buttonBorderColor.hex
            }}
            className={cn('  w-full  h-12 border-[1px]', !show && 'mb-3')}
          >
            <span className=" ">Continue</span>
          </Button>
        </div>

        {show && (
          <>
            <div className="relative w-full py-4 ">
              <div className="absolute w-full lg:px-4 inset-0 flex items-center">
                <span className="w-full  border-black border-t" />
                <span className="px-2">or</span>
                <span className="w-full border-black border-t" />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-evenly gap-y-4 w-full">
              <SocialsJSX />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Page;
