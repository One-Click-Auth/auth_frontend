import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

export function WidgetPreview() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col justify-center items-center">
        <Avatar className='w-12 h-12'>
          <AvatarImage src="/ellipse-flitchcoin.svg" alt="Organisation Logo" />
          <AvatarFallback>LOGO</AvatarFallback>
        </Avatar>
        <h1 className="text-lg font-medium mt-0.5 mb-1.5">Flitchcoin</h1>
        <small className="text-[0.6rem]">
          Continue to Log in to Flitchcoin
        </small>
      </div>
      <div className="flex flex-col gap-8 items-center">
        <div className="relative">
          <label
            htmlFor="email"
            className="form-label text-[0.6rem] absolute translate-x-3 translate-y-[-7px] bg-white px-1"
          >
            Your Email
          </label>
          <input
            name="username"
            id="email"
            type="text"
            className="w-44 px-4 py-0.5 border rounded-md border-black disabled:bg-primary"
            disabled
          />
        </div>
        <Button className="bg-black w-44 h-8 text-white hover:bg-black/90">
          <span className="ml-6">Go !!</span>
          <ChevronRightIcon className="ml-3" />
        </Button>
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-black border-t" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-black">or</span>
          </div>
        </div>
        <Image width={159} height={22} src="/widget-logos.svg" alt="Google, Apple, Microsoft, WhatsApp logos"/>
      </div>
    </div>
  );
}
