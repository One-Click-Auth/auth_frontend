'use client';
import React, { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import OtpInput from 'react-otp-input';
import { LOGIN_GRAPHIC, LOGO } from '@/constants';
import Image from 'next/image';
import LayoutBanner from '@/components/authForm/LayoutBanner';
import { signIn } from 'next-auth/react';
import { PasswordComponent } from '@/components/authForm/PasswordComponent';
import { EmailComponent } from '@/components/authForm/EmailComponent';
import { Button } from '@/components/ui/Button';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import LoadingModal from '@/components/authForm/LoadingModal';

type FormValues = {
  username?: string;
  password?: string;
  type?: string;
  otp?: string;
};

const Login = () => {
  const [values, setValues] = useState<FormValues>({});
  const [fa2, setFa2] = useState<boolean>(false);
  // const [userRes, setUserRes] = useState({});
  // const [value, setValue] = useState('');
  // const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log(fa2);
  }, [fa2]);

  const initiateLogin = async (data: Partial<FormValues>) => {
    await signIn('credentials', {
      ...values,
      ...data,
      callbackUrl: '/dashboard'
    });
  };

  // on submit handler
  const onSubmitHandler = async (pwd: string) => {
    try {
      return initiateLogin({ password: pwd });
    } catch (err) {
      setLoading(false);
      console.log('Error in onSubmitHandler ', err);
    }
  };

  const handlePasswordSubmit = (data: { password: string }) => {
    setLoading(true);
    setValues(prev => ({ ...prev, password: data.password }));
    setTimeout(() => {
      onSubmitHandler(data.password);
    }, 100);
  };

  const handleEmailSubmit = (data: { username: string }) => {
    setValues(prev => ({ ...prev, username: data.username }));
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row justify-center">
      <div className="container sm:basis-3/5 flex flex-col min-h-screen">
        <div className="self-start mt-7">
          <Link href="/">
            <Image width={34} height={34} src={LOGO} alt="AuthX logo" />
          </Link>
        </div>
        <div className="flex my-12 items-center justify-center grow sm:mr-12">
          <div className="-mt-32 w-fit max-w-lg">
            <Image
              className="mx-auto mb-8"
              width={62}
              height={62}
              src={LOGO}
              alt="AuthX logo"
            />
            <h1 className="scroll-m-20 text-4xl text-center pb-9 md:pb-11 font-semibold transition-colors first:mt-0">
              Login to your AuthX account
            </h1>

            {!values.username ? (
              <EmailComponent
                handleEmailSubmit={handleEmailSubmit}
                setFa2={setFa2}
              />
            ) : (
              <PasswordComponent handlePasswordSubmit={handlePasswordSubmit} />
            )}
          </div>
        </div>
      </div>
      <LayoutBanner
        bannerText="AuthX: Ensure Security at every level"
        src={LOGIN_GRAPHIC}
      />

      <Modal 
        show={show}
        onHide={() => setShow(false)}
      >
        <div className="bg-white rounded-3xl p-16 mt-[20vh] w-max self-center">
          <div>
            <div className="">
              <div className="text-3xl text-center mb-4">Enter MFA OTP</div>
              <p className="text-center mb-10 text-slate-600">
                Enter Multifactor OTP from your authentication app
              </p>
              <OtpInput
                containerStyle="flex justify-center gap-1"
                inputStyle="otp-input-width h-12 p-0 text-center rounded-xl"
                value={values.otp}
                onChange={otp => setValues(prev => ({ ...prev, otp }))}
                numInputs={6}
                renderSeparator={<span></span>}
                renderInput={props => <input {...props} />}
              />
            </div>
          </div>
        </div>
      </Modal>
      <LoadingModal show={loading}/>
    </div>
  );
};

export default Login;
