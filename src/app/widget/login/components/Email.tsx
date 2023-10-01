'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Spinner from '@/components/spinner';
import { useOrgData } from '../widgetStore';
import Image from 'next/image';
import github from '../github-mark.svg';
import microsoft from '../microsoft.svg';
import google from '../google.svg';
import discord from '../discord.svg';
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

  const socialLogin = (social: string) => {
    const url = `https://api.trustauthx.com/single/social/signup?provider=${social}&OrgToken=${storeOrg_token}`;
    // reset();
    window.location.href = url; //next router was creating a problem in routing back that's why window object is being used
  };

  const socialValues = Object.keys(storeOrgData.social);
  const show = socialValues.length > 0;

  const widget = storeOrgData.widget;
  const goButtonStyle = {
    color: widget.color9,
    background: `linear-gradient(to right, ${widget.color0} 0%,${widget.color1} 50%,${widget.color2} 100% )`,
    border: `${widget.button.width}px solid`,
    borderRadius: `${widget.button.radius}px`,
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

  return (
    <div>
      <div className="flex flex-col justify-center gap-4 items-center">
        <Avatar className="w-16 h-16 rounded-none">
          <AvatarImage
            src={widget.logo_url}
            width={80}
            alt="Organisation Logo"
          />
          <AvatarFallback delayMs={1000}>LOGO</AvatarFallback>
        </Avatar>
        <h1
          className="text-3xl font-medium text-center break-words w-44"
          style={orgNameStyle}
        >
          {widget.name}
        </h1>
        <small
          style={greetingStyle}
          className="w-full text-[14px] break-words text-center"
        >
          {widget.greeting}
        </small>
      </div>
      <div className="flex flex-col gap-8">
        <form
          className="flex flex-col lg:px-4 gap-10 mt-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <Input
              name="email"
              placeholder="Email"
              id="email"
              type="email"
              style={inputStyle}
              className={`w-full h-[2.8rem] border-[1.4px] px-4 py-0 focus-visible:ring-0 bg-transparent`}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <Button
            style={goButtonStyle}
            className="w-full h-[2.8rem]  mb-4 "
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <div>
                <Spinner size={20} color={widget.color9} />
              </div>
            ) : (
              <span>Continue</span>
            )}
          </Button>
        </form>
        {show && (
          <div>
            <div className="relative w-full py-2">
              <div className="absolute w-full lg:px-4 inset-0 flex items-center">
                <span className="w-full border-black border-t"></span>
                <span className="px-2">or</span>
                <span className="w-full border-black border-t"></span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-evenly mt-6 gap-y-4 w-full">
              {socialValues.includes('github') && (
                <button onClick={() => socialLogin('github')}>
                  <div className={`h-fit w-fit rounded-full `}>
                    <Image
                      src={github}
                      alt="github"
                      width={30}
                      className="cursor-pointer"
                    />
                  </div>
                </button>
              )}

              {socialValues.includes('microsoft') && (
                <button onClick={() => socialLogin('microsoft')}>
                  {' '}
                  <div className={`h-fit w-fit`}>
                    <Image
                      src={microsoft}
                      alt="microsoft"
                      width={26}
                      className="cursor-pointer "
                    />
                  </div>
                </button>
              )}

              {socialValues.includes('google') && (
                <button onClick={() => socialLogin('google')}>
                  {' '}
                  <div className={`h-fit w-fit rounded-full`}>
                    <Image
                      src={google}
                      alt="google"
                      width={28}
                      className="cursor-pointer"
                    />
                  </div>
                </button>
              )}

              {socialValues.includes('discord') && (
                <button onClick={() => socialLogin('discord')}>
                  {' '}
                  <div className={`h-fit w-fit`}>
                    <Image
                      src={discord}
                      alt="discord"
                      width={34}
                      className="cursor-pointer"
                    />
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
