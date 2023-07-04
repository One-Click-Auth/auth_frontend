'use client';
import { FormButton } from '@/components/authForm/FormButton';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/card';
import { LOGO } from '@/constants';
import Image from 'next/image';
import React from 'react';

const Login = () => {
  const handleSubmit = () => {
    console.log('submit called');
  };
  return (
    <div className="w-full flex justify-center items-center absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-2/5 md:top-1/2 ">
      <div className="flex flex-col items-center w-11/12 mr-0 !important bg-white border-2 border-gray-300 rounded-2xl shadow-2xl">
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
          className="mt-10 flex flex-col items-center"
        >
          <div>
            <label
              htmlFor="email"
              className={`absolute translate-x-6 translate-y-[-12px] bg-white px-1`}
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              className="border border-red-500 bg-white text-gray-900 rounded-xl focus:ring-gray-900 focus:border-gray-900 w-full"
              placeholder="name@example.com"
            />
          </div>
          <div className="w-full mt-0">
            <FormButton>{`GO `}</FormButton>
          </div>
        </form>
        <div className="flex w-11/12 justify-center">
          <div className="mt-4 w-10/12 border-t-2 border-gray-900 "></div>
          <span className="p-1"> or </span>
          <div className="mt-4 w-10/12 border-t-2 border-gray-900 "></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
