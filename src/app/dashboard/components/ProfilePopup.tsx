'use client';
import React, { useRef, useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/Dialog';
// import CryptoJS from 'crypto-js';
import { Separator } from '@/components/ui/seperator';
import { ProfileItemSvg } from '@/assets/Svg/Account/DropDown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/Providers/AuthContext';
import OTPInput from 'react-otp-input';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Plus } from 'lucide-react';

function ProfilePopup() {
  const { user, token } = useAuth();
  const [qr, setQr] = useState('');
  //the otp to turn on the mfa
  const [otpTurnOn, setOtpTurnOn] = useState('');
  //the otp to turn off the mfa
  const [otpTurnOff, setOtpTurnOff] = useState('');
  //is used to show the section where u turn on mfa
  const [showMFAOn, setShowMFAOn] = useState(false);
  //is used to show the section where u turn off mfa
  const [showMFAOff, setShowMFAOff] = useState(false);
  const SecurityRef = useRef<HTMLDivElement>(null);
  const AccountRef = useRef<HTMLDivElement>(null);
  const [AccountButton, setAccountButton] = useState(true);
  const [SecurityButton, setSecurityButton] = useState(false);

  const { toast } = useToast();

  // const decryptCode = (mfa: string): string => {
  //   const bytes = CryptoJS.AES.decrypt(mfa,  process.env.NEXT_PUBLIC_AES_KEY?process.env.NEXT_PUBLIC_AES_KEY:'');
  //   const decoded = bytes.toString(CryptoJS.enc.Utf8);

  //   return decoded;
  // };

  const url = 'https://api.trustauthx.com/fa2url';

  // useEffect(() => {
  //   if (otpTurnOn.length === 6) {
  //     checkOTP();
  //   }
  // }, [otpTurnOn]);

  // useEffect(() => {
  //   if (otpTurnOff.length === 6) {
  //     deleteOTP();
  //   }
  // }, [otpTurnOff]);

  const scrollToSecurity = () => {
    setAccountButton(false);
    setSecurityButton(true);

    if (SecurityRef.current) {
      SecurityRef.current.scrollIntoView({
        behavior: 'smooth', // Use 'auto' for instant scrolling
        block: 'start' // Scroll to the top of the element
      });
    }
  };

  const scrollToAccount = () => {
    setAccountButton(true);
    setSecurityButton(false);

    if (AccountRef.current) {
      AccountRef.current.scrollIntoView({
        behavior: 'smooth', // Use 'auto' for instant scrolling
        block: 'start' // Scroll to the top of the element
      });
    }
  };

  // async function checkOTP() {
  //   const headers = {
  //     accept: 'application/json',
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   };

  //   const requestBody = {
  //     otp: otpTurnOn
  //   };

  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: headers,
  //     body: JSON.stringify(requestBody)
  //   });

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }

  //   const data: any = await response.json();

  //   data.is_ok &&
  //     toast({
  //       variant: 'success',
  //       title: 'Succesful',
  //       description: data.msg,
  //       style: {
  //         left: 0
  //       }
  //     });
  // }

  // async function deleteOTP() {
  //   const headers = {
  //     accept: 'application/json',
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   };

  //   const requestBody = {
  //     otp: otpTurnOff
  //   };
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: headers,
  //     body: JSON.stringify(requestBody)
  //   });

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }

  //   const data: any = await response.json();

  //   data.is_ok &&
  //     toast({
  //       variant: 'destructive',
  //       title: 'Otp removed',
  //       description: data.msg,
  //       style: {
  //         left: 0
  //       }
  //     });
  // }

  // function getQrCode() {
  //   const headers = {
  //     accept: 'application/json',
  //     Authorization: `Bearer ${token}`
  //   };

  //   fetch(url, {
  //     method: 'GET',
  //     headers: headers
  //   })
  //     .then(response => response.json())
  //     .then(data => setQr(decryptCode(data as string)))
  //     .catch(error => console.error('Error:', error));
  // }

  function MFASwitcher() {
    return (
      <>
        <p className="font-bold text-3xl text-center">
          Multi Factor Authentication
        </p>
        <p className="text-center">
          <b>*Note : </b>
          The QR code will be displayed once. Use an Authentication app such as
          Google Authenticator
        </p>
        <div className="flex gap-5 mt-4 items-center">
          <Button
            onClick={() => {
              setShowMFAOn(true);
              // getQrCode();
            }}
            variant={'authx'}
          >
            <Plus />
            Turn On MFA
          </Button>

          <Button onClick={() => setShowMFAOff(true)} variant={'destructive'}>
            Turn Off MFA
          </Button>
        </div>
      </>
    );
  }

  function TurnOnMFA() {
    return (
      <div className="flex flex-col md:flex-row  justify-center items-center gap-8 md:gap-0 md:justify-between">
        <div className="md:max-w-[50%] ">
          <p className="my-2  text-center  md:text-left text-muted-foreground ">
            Scan the QR code & Enter OTP from your Auth app to turn on MFA.
          </p>
          <OTPInput
            containerStyle="grid grid-cols-2 justify-center gap-1"
            inputStyle="!w-8 h-8 md:!w-8 mt-4 border bg-transparent border-black  md:h-8 p-0 text-center rounded-xl"
            value={otpTurnOn}
            onChange={setOtpTurnOn}
            numInputs={6}
            renderSeparator={<span></span>}
            renderInput={props => <input {...props} />}
          />
        </div>
        <QRCodeSVG value={qr} bgColor="transparent" />

        <ArrowLeft
          onClick={() => {
            setShowMFAOn(false);
            setOtpTurnOn('');
          }}
          size={18}
          className="absolute hover:text-muted-foreground  cursor-pointer top-2  right-2  "
        />
      </div>
    );
  }

  function TurnOffMFA() {
    return (
      <>
        <p className="text-lg text-center text-muted-foreground">
          Enter OTP from your Auth app to turn off MFA
        </p>
        <OTPInput
          containerStyle="grid grid-cols-2 justify-center gap-1"
          inputStyle="!w-8 h-8 md:!w-8 mt-2 border bg-transparent border-black  md:h-8 p-0 text-center rounded-xl"
          value={otpTurnOff}
          onChange={setOtpTurnOff}
          numInputs={6}
          renderSeparator={<span></span>}
          renderInput={props => <input {...props} />}
        />

        <ArrowLeft
          onClick={() => {
            setShowMFAOff(false);
            setOtpTurnOff('');
          }}
          size={18}
          className="absolute hover:text-muted-foreground  cursor-pointer top-2  right-2  "
        />
      </>
    );
  }

  function MFA() {
    if (showMFAOff) {
      return <TurnOffMFA />;
    }

    if (showMFAOn) {
      return <TurnOnMFA />;
    }

    return <MFASwitcher />;
  }

  return (
    <DialogContent className="  flex  !max-w-[85vw]  overflow-hidden px-10 rounded-2xl p-0 max-h-[85vh] md:w-[850px] md:h-[670px]  ">
      <div className=" flex-col gap-2 border-r-2 md:flex hidden     py-10 px-6">
        <button
          onClick={scrollToAccount}
          className={` 
          ${
            AccountButton ? ' text-black bg-gray-100' : ' text-muted-foreground'
          }
          focus:outline-none p-1 px-4   hover:text-black py-2 hover:border-0 
        hover:outline-none text-lg hover:bg-gray-100 rounded-md flex items-center gap-3 w-48`}
        >
          <ProfileItemSvg />
          <p className="mt-[1px] ">Account</p>
        </button>

        <button
          onClick={scrollToSecurity}
          className={` ${
            AccountButton ? ' text-muted-foreground' : ' text-black bg-gray-100'
          }  p-1 px-4  focus:outline-none  hover:text-black py-2 hover:border-0 
                hover:outline-none text-lg hover:bg-gray-100 rounded-md flex items-center gap-3 w-48`}
        >
          <Image
            width={18}
            height={18}
            src="/securityicon.svg"
            alt="securityicon.svg"
          />

          <p className="mt-[1px] ">Security</p>
        </button>
      </div>

      <div className="py-10 overflow-auto subtle-scrollbar scroll-smooth    flex-1   px-5 ">
        <div ref={AccountRef}>
          <DialogHeader>
            <DialogTitle className="text-3xl">Account </DialogTitle>
            <DialogDescription className="text-lg">
              For everything account related
            </DialogDescription>
          </DialogHeader>
        </div>

        <PopupSubSection name="Profile" />
        <div className="flex items-center hover:bg-gray-100 rounded-md py-2 px-4 gap-3">
          <Avatar className="w-14 h-14">
            {' '}
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <p className="text-lg">{user?.full_name}</p>
        </div>

        <PopupSubSection name="Email Adress" />
        <div className="flex items-center flex-1 hover:bg-gray-100 rounded-md py-2 px-4 gap-3">
          <p className=" text-lg">{user?.email}</p>

          <p className="bg-accent/50 p-1 px-3 rounded-md   ">Primary </p>
        </div>

        <div ref={SecurityRef}>
          <DialogHeader className="mt-10">
            <DialogTitle className="text-3xl">Security </DialogTitle>
            <DialogDescription className="text-lg">
              Not available
            </DialogDescription>
          </DialogHeader>
        </div>
        {/* <p>Not Available</p> */}
        {/* <PopupSubSection name="Multi Factor Authentication" />

        <div className="flex-1 gap-3 relative flex-col py-10 mx-4 px-6 items-center border  justify-center flex mt-5">
          <MFA />
        </div>

        <PopupSubSection name="Password" />
        <PopupSubSection name="Danger" /> */}
      </div>
    </DialogContent>
  );
}

function PopupSubSection({ name }: { name: string }) {
  return (
    <div className="mt-10 mb-5">
      <p className="font-medium text-lg"> {name}</p>
      <Separator className="w-full" />
    </div>
  );
}

export default ProfilePopup;
