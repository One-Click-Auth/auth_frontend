'use client';
import { FormButton } from '@/components/authForm/FormButton';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/card';
import {
  LOGO,
  GOOGLEICON,
  APPLEICON,
  GITHUBICON,
  MICROSOFT
} from '@/constants';
import Image from 'next/image';
import React from 'react';

const Login = () => {
  const handleSubmit = () => {
    console.log('submit called');
  };
  return (
    <div className="w-full top-1/2 flex justify-center items-center absolute  left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-2/5  ">
      <div className="flex flex-col items-center w-full mr-0 !important bg-white border-2 border-gray-300 rounded-2xl shadow-2xl sm:w-8/12">
        <div className="flex flex-col justify-center items-center mt-7">
          <Image width={34} height={34} src={LOGO} alt="AuthX logo" />
          <div className="mt-4">
            <span className="text-xl font-semibold">Trust AUTHX</span>
          </div>
          <div className="mt-4">
            <span className="text-sm text-slate-600">
              Continue to Log in to AuthX
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`mt-10 flex flex-col items-center w-9/12 `}
        >
          <div className="grid grid-cols-1 w-full">
            <label
              htmlFor="email"
              className={`absolute translate-x-6 translate-y-[-12px] bg-white px-1`}
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              className=" p-2 pl-2.5 border-2 border-gray-500 bg-white text-gray-900 rounded-lg focus:ring-gray-900 focus:border-gray-900 "
              placeholder="name@example.com"
            />
          </div>
          <div className="w-full mt-0">
            <FormButton padding={1} marginTop={8}>{`GO `}</FormButton>
          </div>
        </form>
        <div className="flex w-11/12 justify-center mt-4">
          <div className="mt-4 w-10/12 border-t-2 border-gray-900 "></div>
          <span className="p-1"> or </span>
          <div className="mt-4 w-10/12 border-t-2 border-gray-900 "></div>
        </div>
        <div className="flex my-10 w-8/12 justify-around">
          <Image width={25} height={25} src={GOOGLEICON} alt="AuthX logo" />
          <Image width={30} height={30} src={APPLEICON} alt="AuthX logo" />
          <Image width={30} height={30} src={GITHUBICON} alt="AuthX logo" />
          <Image width={30} height={30} src={MICROSOFT} alt="AuthX logo" />
        </div>
      </div>
    </div>
  );
};

export default Login;
