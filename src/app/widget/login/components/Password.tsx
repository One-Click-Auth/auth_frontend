'use client';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

import Spinner from '@/components/spinner';
import { useOrgData } from '../widgetStore'; //import zustand store to store and update org data
import WidgetButton from './WidgetButton';

type PasswordProps = {
  email: string;
  loading: boolean;
  handlePassActions: (e: { preventDefault: () => void }) => void;
  forgotPass: () => void;
  pass: string;
  setPass: (NewPass: string) => void;
};

export default function Password({
  email,
  loading,
  pass,
  setPass,
  handlePassActions,
  forgotPass
}: PasswordProps) {
  const [showPass, setShowPass] = useState(false);
  const storeOrgData = useOrgData(state => state.data);
  //for styles
  const widget = storeOrgData.widget;
  const goButtonStyle = {
    color: widget.color9,
    background: `linear-gradient(to right, ${widget.color0} 0%,${widget.color1} 50%,${widget.color2} 100% )`,
    border: `${widget.button.width}px solid`,
    borderRadius: `${widget.button.radius}px`,
    borderColor: widget.button.bc
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
    <div className="flex flex-col">
      <div className="flex items-center justify-center flex-col gap-4">
        <Avatar className="w-16 h-16 rounded-none">
          <AvatarImage
            src={widget.logo_url}
            width={80}
            alt="Organisation Logo"
          />
          <AvatarFallback delayMs={1000}>LOGO</AvatarFallback>
        </Avatar>
        <h1
          className="text-3xl font-medium   text-center break-words"
          style={greetingStyle}
        >
          Hi !
        </h1>
        <p className=" w-full break-words text-center " style={orgNameStyle}>
          {email}
        </p>
      </div>

      <form
        className="flex flex-col justify-center items-center gap-12 mt-10"
        onSubmit={handlePassActions}
      >
        <p className="text-center text-[18.4px]" style={greetingStyle}>
          Enter your Password
        </p>
        <div className="relative w-full">
          <Input
            name="pass"
            id="pass"
            value={pass}
            onChange={e => setPass(e.target.value)}
            style={inputStyle}
            className="w-full h-[2.8rem] border-[1.4px] pl-4 pr-8 py-0 focus-visible:ring-2 focus-visible:ring-slate-300 bg-transparent"
            placeholder="password"
            type={showPass ? 'text' : 'password'}
          />

          <button
            className="absolute right-3 top-3 opacity-60"
            onClick={() => setShowPass(!showPass)}
            type="button"
          >
            {showPass ? <VscEye size={20} /> : <VscEyeClosed size={20} />}
          </button>
        </div>

        <WidgetButton loading={loading} />

        <div>
          <Button
            style={{ color: widget.input_border.color }}
            className="bg-transparent shadow-none w-fit  h-fit p-0 hover:bg-transparent"
            onClick={forgotPass}
            type="button"
          >
            Forgot password
          </Button>
        </div>
      </form>
    </div>
  );
}
