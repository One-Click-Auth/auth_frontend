'use client';

import { UploadComputer } from '@/assets/Svg/Account/Account';
import { Input } from '@/components/ui/Input';
import Image from 'next/image';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect
} from 'react';

type LogoProps = {
  logoState: {
    logo: File | undefined;
    setLogo: Dispatch<SetStateAction<File | undefined>>;
    logoImage: string;
    setLogoImage: Dispatch<SetStateAction<string>>;
  };
};

export function LogoUpload({
  logoState: { logo, setLogo, logoImage, setLogoImage }
}: LogoProps) {
  // const [logo, setLogo] = useState<File>();
  // const [logoImage, setLogoImage] = useState<string>('/ellipse-flitchcoin.svg');

  const handleLogoInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setLogo(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (logo) {
      setLogoImage(URL.createObjectURL(logo));
    }

    if (!logo) {
      setLogoImage('/ellipse-flitchcoin.svg');
    }
  }, [logo]);

  return (
    <div className="flex border gap-2 rounded-lg py-1.5 px-2">
      <div className="basis-2/3">
        <div className="border rounded-lg h-[6.25rem]">
          <Image
            className="mx-auto py-2 h-[6.25rem]"
            src={logoImage}
            width={90}
            height={70}
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
            {/* <Image src="" /> */}
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
