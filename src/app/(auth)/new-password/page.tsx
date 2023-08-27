'use client';

import React, { useEffect, useState } from 'react';
import { LOGIN_GRAPHIC, LOGO } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Modal from '../reset-password/otpModal';
import { FormButton } from '@/components/authForm/FormButton';
import { LinkText } from '@/components/authForm/LinkText';
import { LuXCircle } from 'react-icons/lu';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import LayoutBanner from '@/components/authForm/LayoutBanner';
import { ApiResponse } from '../../../types';

const AlertMessage = ({
  message,
  setAlert
}: {
  message: string;
  setAlert: React.Dispatch<boolean>;
}) => {
  return (
    <Alert className="absolute top-6 w-60 sm:w-96 left-[50vw] translate-x-[-50%] backdrop-filter backdrop-blur-sm bg-opacity-90 bg-yellow-400">
      <AlertTitle>Notice!</AlertTitle>
      <button
        onClick={() => setAlert(false)}
        className="absolute right-2 top-2"
      >
        <LuXCircle className="w-5 h-5" />
      </button>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
const NewPassword: React.FC = () => {
  const searchparams = useSearchParams();
  const param = searchparams && searchparams?.get('param');
  const router = useRouter();
  const [pass, setPass] = useState('');
  const [passErr, setPassErr] = useState(false);

  const [add, setAdd] = useState('');

  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  // Alert component

  useEffect(() => {
    if(param !== null && param !== email) {
      setEmail(param);
    }
  }, [param]);

  const handleModal = () => {
    setShow(true);
  };

  const handleForm = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLSpanElement>
  ) => {
    e.preventDefault();
    // console.log(email, pass);
    setPassErr(false);
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,20}$/.test(pass)) {
      return setPassErr(true);
    }
    fetch('https://api.trustauthx.com/forgot/Signup', {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password: pass
      })
    })
      .then(res => res.json())
      .then(data => {
        const resData = data as ApiResponse;
        if (resData.is_ok == true && resData.status === 200) {
          // console.log(data.msg);
          setAdd(resData.msg);
          console.log(add);
          handleModal();
        }
        if (resData.detail) {
          setAlertMessage(resData.detail);
          setAlert(true);
          console.log(data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row justify-center">
      <div className="container sm:basis-3/5 flex flex-col min-h-screen">
        <div className="self-start mt-7">
          <Image width={34} height={34} src={LOGO} alt="AuthX logo" />
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
            <h1 className="scroll-m-20 text-4xl text-left pb-9 md:pb-11 font-semibold transition-colors first:mt-0">
              Enter a New Password
            </h1>
            <div className="login-wrapper form-wrapper">
              <form onSubmit={handleForm}>
                <div className="form-group relative">
                  <label
                    htmlFor="password"
                    className={`form-label absolute translate-x-6 translate-y-[-12px] bg-white px-2 
                    ${passErr ? 'text-red-400' : ''}
                    `}
                  >
                    Password
                  </label>
                  <input
                    // {...register("password")}
                    id="password"
                    type="password"
                    className={`form-control w-full px-8 py-3 border rounded-lg border-slate-500 ${
                      passErr ? 'border-red-400' : ''
                    } `}
                    placeholder="Enter Password"
                    onChange={e => setPass(e.target.value)}
                  />
                  {passErr && (
                    <div className="mt-2 color text-red-600">
                      <span>
                        Password must be between 8 and 20 characters long,
                        contain at least one letter and one digit, and can
                        include special characters.
                      </span>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <div className="d-grid start">
                    <FormButton>Next</FormButton>
                  </div>
                </div>
              </form>
              <div className="ats-content mt-8 md:mt-11">
                <p className="mb-0 text-xl flex items-center flex-wrap">
                  I remembered my AuthX password
                  <LinkText to="/">advance to Login</LinkText>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LayoutBanner
        bannerText="AuthX: Ensure Security at every level"
        src={LOGIN_GRAPHIC}
      />

      {alert && <AlertMessage message={alertMessage} setAlert={setAlert} />}
      {show && <Modal handleForm={handleForm} add={add} />}
    </div>
  );
};

export default NewPassword;
