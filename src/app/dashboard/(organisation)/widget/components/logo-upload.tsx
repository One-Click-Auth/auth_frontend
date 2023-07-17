'use client';

import { UploadComputer } from '@/assets/Svg/Account/Account';
import { Input } from '@/components/ui/Input';
import { ChangeEvent } from 'react';
import { useWidgetStore } from '../widgetStore';

export function LogoUpload() {
  const { logo, setLogo, logoImage } = useWidgetStore();
  
  const handleLogoInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setLogo(event.target.files[0]);
    }
  };

  return (
    <div className="flex border gap-2 rounded-lg py-1.5 px-2">
      <div className="basis-2/3">
        <div className="border rounded-lg h-[6.25rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="mx-auto aspect-auto py-2 h-[6.25rem]"
            src={logoImage}
            alt="Logo preview"
          />
        </div>
        <small className="block mx-auto mt-2 text-center text-zinc-500">
          {logo ? logo.name : 'Flitchcoin_logo.png'}
        </small>
      </div>
      <div className="basis-1/3">
        <label className="cursor-pointer" htmlFor="logo">
          <div className="border rounded-lg flex justify-center items-center h-[6.25rem] w-full">
            <UploadComputer />
            <Input
              onChange={handleLogoInput}
              className="hidden"
              id="logo"
              type="file"
              accept="image/*"
            />
          </div>
        </label>
        <small className="block mx-auto mt-2 text-center text-zinc-500">
          Upload File
        </small>
      </div>
    </div>
  );
}
