import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CopyPasteSvg } from '@/assets/Svg/Account/Account';
import { CheckSquareValid } from '@/assets/Svg/Account/Account';
import { ClipboardCopy } from 'lucide-react';
function InputWithButtons() {
  return (
    <div className="flex w-full items-center space-x-2 tracking-wide">
      <Input
        type="text"
        placeholder="*****************"
        className="bg-transparent appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:border-black"
      />
      <Button variant={'authx'} type="button">
        Reveal
      </Button>
      <Button variant={'authx'} type="button">
        <ClipboardCopy size={18} />

        <span className="ml-2">Copy</span>
      </Button>
    </div>
  );
}

export default function KeysCard() {
  return (
    <div className="flex flex-col gap-8 max-w-3xl mt-14 p-14 border border-slate-300 text-[#2E2E2E] rounded-lg mx-auto">
      <div>
        <h2 className="text-3xl font-semibold tracking-wide mb-6">
          Your API Key & Secret Key
        </h2>
        <p className="text-lg font-extralight tracking-wide">
          <span className="font-semibold ">*Note</span> : The secret key is a
          sensitive piece of information that is only shown once. You will not
          be able to see it again, so it is important to save it in a safe
          place. In the future, you can only change your API key and secret key.{' '}
        </p>
      </div>
      <div>
        <small className="font-semibold">*Your Organization API Key </small>
        <InputWithButtons />
      </div>
      <div>
        <small className="font-semibold">*Your Organization Secret Key </small>
        <InputWithButtons />
      </div>
      <Button className="mx-auto" variant={'authx'} type="button">
        <CheckSquareValid />
        <span className="ml-3">
          I’ve Stored The Keys In Safe and Want To Proceed
        </span>
      </Button>
    </div>
  );
}
