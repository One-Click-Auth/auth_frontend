'use client';
import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

import { ClipboardCopy } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
function InputWithButtons({ value }: { value: string }) {
  const [show, setShow] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };
  return (
    <div className="flex w-full items-center space-x-2 tracking-wide">
      <Input
        type={show ? 'text' : 'password'}
        disabled
        value={value}
        className="bg-transparent appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:border-black"
      />
      <Button
        variant="authx"
        className="w-20"
        type="button"
        onClick={() => setShow(!show)}
      >
        {show ? 'Hide' : 'Reveal'}
      </Button>
      <Button variant="authx" type="button" onClick={handleCopy}>
        <ClipboardCopy size={18} />
        <span className="ml-2">Copy</span>
      </Button>
    </div>
  );
}

export default function KeysCard() {
  const router = useRouter();
  const keyRef = useRef<HTMLInputElement>(null);
  const keys = useSelector((state: RootState) => state.keys);

  const handleClick = () => {
    if (keyRef?.current?.checked) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-3xl mt-14 p-14 border border-slate-300 text-[#2E2E2E] rounded-lg mx-auto">
      <div>
        <h2 className="text-3xl font-semibold tracking-wide mb-6">
          Your API Key & Secret Key
        </h2>
        <p className="text-base font-extralight tracking-wide">
          <span className="font-semibold">*Note</span> : The secret key is az
          sensitive piece of information that is only shown once. You will not
          be able to see it again, so it is important to save it in a safe
          place. In the future, you can only change your API key and secret key.{' '}
        </p>
      </div>
      <div>
        <small className="font-semibold">*Your Organization API Key </small>
        <InputWithButtons value={keys.key} />
      </div>
      <div>
        <small className="font-semibold">*Your Organization Secret Key </small>
        <InputWithButtons value={keys.secret} />
      </div>
      <div>
        <small className="font-semibold">*Your Organization Secret Id </small>
        <InputWithButtons value={keys.id} />
      </div>
      <Button
        className="mx-auto"
        variant="authx"
        type="button"
        onClick={handleClick}
      >
        <input type="checkbox" name="keys" id="keys" ref={keyRef} />
        <span className="ml-3">
          I’ve Stored The Keys In Safe and Want To Proceed
        </span>
      </Button>
    </div>
  );
}
