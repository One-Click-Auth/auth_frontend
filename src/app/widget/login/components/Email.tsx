'use client';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useOrgData } from '../widgetStore';
import Image from 'next/image';
import github from '../github-mark.svg';
import microsoft from '../microsoft.svg';
import google from '../google.svg';
import discord from '../discord.svg';
import figma from '../figma_logo.svg';
import WidgetButton from './WidgetButton';
import {
  MdOutlineKeyboardArrowDown as KeyDown,
  MdOutlineKeyboardArrowUp as KeyUp
} from 'react-icons/md';
import SocialButton from './SocialButton';
type EmailCompProps = {
  email: string;
  setEmail: (NewPass: string) => void;
  loading: boolean;
  handleSubmit: (e: { preventDefault: () => void }) => Promise<void>;
};

export default function EmailComponent({
  email,
  loading,
  setEmail,
  handleSubmit
}: EmailCompProps) {
  const storeOrgData = useOrgData(state => state.data);
  const storeOrg_token = useOrgData(state => state.org_token);
  const [showMore, setShowMore] = useState(false);
  const socialLogin = (
    social: string,
    setLoading: (loading: boolean) => void
  ) => {
    const url = `https://api.trustauthx.com/single/social/signup?provider=${social}&OrgToken=${storeOrg_token}`;
    // reset();
    window.location.href = url; //next router was creating a problem in routing back that's why window object is being used
  };

  const socialValues = Object.keys(storeOrgData.social);
  const socialLength = socialValues.length;
  let firstFour: (string | any)[] = [];
  let rest: (string | any)[] = [];
  const show = socialLength > 0;
  const more = socialLength > 4;

  if (!more) {
    firstFour = socialValues;
  }
  if (more) {
    firstFour = socialValues.slice(0, 4);
    rest = socialValues.slice(4);
  }

  const widget = storeOrgData.widget;
  const moreButtonStyle = {
    color: widget.color9,
    background: `linear-gradient(to right, ${widget.color0} 0%,${widget.color1} 50%,${widget.color2} 100% )`,
    border: `${widget.button.width}px solid`,
    borderColor: widget.button.bc
  };
  const lineStyle = {
    borderColor: widget.color12,
    color: widget.color12
  };
  const orgNameStyle = {
    color: `${widget.color10}`
  };
  const greetingStyle = {
    color: `${widget.color11}`
  };
  const inputStyle = {
    borderColor: ` ${widget.input_border.color}`,
    borderRadius: `${widget.input_border.radius}px`
  };
  const socialProviders: { [key: string]: any } = {
    github: github,
    microsoft: microsoft,
    google: google,
    discord: discord,
    figma: figma
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4">
        <Avatar className="w-16 h-16 rounded-none">
          <AvatarImage
            src={widget.logo_url}
            width={80}
            alt="Organisation Logo"
          />
          <AvatarFallback delayMs={1000}>LOGO</AvatarFallback>
        </Avatar>
        <h1
          className="text-3xl font-medium text-center break-words"
          style={orgNameStyle}
        >
          {widget.name}
        </h1>
        <p
          style={greetingStyle}
          className="w-full text-[18.4px] break-words text-center"
        >
          {widget.greeting}
        </p>
      </div>
      <div className="flex flex-col gap-12 mt-16">
        <form className="flex flex-col gap-12" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Input
              name="email"
              placeholder="Email"
              id="email"
              type="email"
              style={inputStyle}
              className={
                'w-full h-[2.8rem] border-[1.4px] py-0 focus-visible:ring-2 focus-visible:ring-slate-300 bg-transparent'
              }
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <WidgetButton loading={loading} />
        </form>
        {show && (
          <div className="gap-10 flex flex-col">
            <div className="relative w-full">
              <div className="absolute w-full inset-0 flex items-center">
                <span className="w-full border-black border-t"></span>
                <span className="px-2">or</span>
                <span className="w-full border-black border-t"></span>
              </div>
            </div>
            <div
              className={`grid  gap-x-2 gap-y-4 w-full place-content-center place-items-center ${
                firstFour.length == 1
                  ? 'grid-cols-1'
                  : firstFour.length == 2
                  ? 'grid-cols-2'
                  : firstFour.length == 3
                  ? 'grid-cols-3'
                  : 'grid-cols-4'
              } `}
            >
              {firstFour.map((social, key) => {
                return (
                  <SocialButton
                    image={socialProviders[social]}
                    social={social}
                    socialLogin={socialLogin}
                    key={key}
                  />
                );
              })}
            </div>
            <div
              className={` ${
                !showMore
                  ? 'h-0 opacity-0 overflow-hidden -mb-6'
                  : `opacity-100  ${
                      socialLength > 4 && socialLength <= 8
                        ? 'h-[48px]'
                        : 'h-[96px]'
                    }`
              }  grid grid-cols-4 gap-x-2 gap-y-4 w-full  -mt-2   place-content-center place-items-center transition-all`}
            >
              {rest.map((social, key) => {
                return (
                  <SocialButton
                    image={socialProviders[social]}
                    social={social}
                    socialLogin={socialLogin}
                    key={key}
                  />
                );
              })}
            </div>
            {more && (
              <Button
                type="button"
                className="w-24 rounded-full mx-auto h-8 flex flex-row gap-2 items-center"
                style={moreButtonStyle}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? (
                  <>
                    <span>Less</span>
                    <KeyUp />
                  </>
                ) : (
                  <>
                    <span>More</span>
                    <KeyDown />
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
