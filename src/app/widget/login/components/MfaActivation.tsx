'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { QRCodeSVG } from 'qrcode.react';
import OtpInput from 'react-otp-input';
import { useOrgData, useUserData } from '../widgetStore'; //import zustand store to store and update org data
type MfaProps = {
  code: string;
  mfaAction: () => void;
};
export default function MfaActivation({ code, mfaAction }: MfaProps) {
  const [otp, setOtp] = useState('');
  const storeOrgData = useOrgData(state => state.data);
  const widget = storeOrgData.widget;

  const goButtonStyle = {
    color: widget.color9,
    background: `linear-gradient(to right, ${widget.color0} 0%,${widget.color1} 50%,${widget.color2} 100% )`,
    borderRadius: `${widget.button.radius}px`,
    borderColor: widget.button.bc
  };

  //   const cardStyle = {
  //     background: `linear-gradient(to bottom, ${widget.color6},${widget.color7})`,
  //     boxShadow: `0 10px 15px -3px ${widget.color8}, 0 4px 6px -4px ${widget.color8}`,
  //     border: `${widget.widget_border.width}px solid ${widget.widget_border.color}`,
  //     borderRadius: `${widget.widget_border.radius}px`
  //   };

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
  const labelStyle = {
    color: ` ${widget.input_border.color}`
  };

  return (
    <>
      {/* <div className="flex flex-col justify-center items-center">
          <h1
            className="text-3xl font-medium  text-center break-words w-44 mt-0.5"  
          >
            Hi !
          </h1>
        </div> */}
      <div className="flex flex-col gap-8  ">
        <div className="flex items-center justify-center flex-col lg:px-4 gap-6">
          <p className="  w-44 break-words text-center">
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
            <a href="#" className="underline text-black">
              Auth provider
            </a>
          </p>
        </div>

        <div className="flex flex-col   justify-center items-center gap-8  ">
          <QRCodeSVG value={code} bgColor="transparent" />

          <p className="my-2  text-center ">Enter OTP to turn On MFA</p>

          <OtpInput
            containerStyle="grid justify-center gap-1 w-full"
            inputStyle="!w-10 h-10  mt-1 border bg-transparent border-blue-400 p-0 text-center rounded-xl"
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span></span>}
            renderInput={props => <input {...props} />}
          />

          <Button
            variant={'black'}
            className="w-full text-lg py-5 "
            onClick={mfaAction}
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}
