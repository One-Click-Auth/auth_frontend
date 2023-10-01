'use client';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PasswordCheck } from '../components/PasswodCheck';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

import Spinner from '@/components/spinner';
import { useOrgData } from '../widgetStore'; //import zustand store to store and update org data
import { testPass } from '../utils';
type NewPasswordProps = {
  email: string;
  loading: boolean;
  handleNewPassActions: (e: { preventDefault: () => void }) => void;
  newPass: string;
  setNewPass: (NewPass: string) => void;
};

export default function NewPassword({
  email,
  loading,
  newPass,
  setNewPass,
  handleNewPassActions
}: NewPasswordProps) {
  const [disabled, setDisabled] = useState(true);
  const [showChecks, setShowChecks] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (newPass.length > 0) {
      setShowChecks(true);
    } else {
      setShowChecks(false);
    }
    if (!testPass(newPass)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [newPass]);
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
    <div className="flex flex-col gap-6 sm:px-4">
      <div className="flex items-center justify-center flex-col lg:px-4 gap-4">
        <Avatar className="w-16 h-16 rounded-none">
          <AvatarImage
            src={widget.logo_url}
            width={80}
            alt="Organisation Logo"
          />
          <AvatarFallback delayMs={1000}>LOGO</AvatarFallback>
        </Avatar>
        <p className=" w-full break-words text-center" style={orgNameStyle}>
          {email}
        </p>
      </div>

      <form
        className="flex flex-col justify-center items-center gap-8 "
        onSubmit={disabled ? e => e.preventDefault() : handleNewPassActions}
      >
        <p className="text-center" style={greetingStyle}>
          Create a new Password for your <br /> <b>{widget.name} </b>account{' '}
        </p>
        <div className="relative w-full">
          <Input
            name="newpass"
            id="newPass"
            value={newPass}
            onChange={e => setNewPass(e.target.value)}
            style={inputStyle}
            className="w-full h-[2.8rem]  border-[1.4px] pl-4 pr-8 py-0 mb-2 focus-visible:ring-0 bg-transparent"
            placeholder="password"
            type={showPass ? 'text' : 'password'}
          />

          <button
            className="absolute right-3 top-3 opacity-60"
            type="button"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <VscEye size={20} /> : <VscEyeClosed size={20} />}
          </button>
          <div
            className={`${
              !showChecks
                ? 'scale-y-0 h-0 opacity-0 overflow-hidden'
                : 'scale-y-100 opacity-100 h-[185px]'
            } transition-all ease-in-out`}
          >
            <PasswordCheck pass={newPass} />
          </div>
        </div>

        <Button
          style={goButtonStyle}
          className="w-full h-[2.8rem] mb-4 transition-all "
          disabled={loading || disabled}
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
    </div>
  );
}
