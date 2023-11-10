'use client';
import Image from 'next/image';
import Spinner from '@/components/spinner';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
type Props = {
  socialLogin: (social: string, setLoading: (loading: boolean) => void) => void;
  social: string;
  image: string;
};
const SocialButton = ({ socialLogin, social, image }: Props) => {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      variant={'ghost'}
      onClick={() => {
        setLoading(true);
        socialLogin(social, setLoading);
      }}
      disabled={loading}
      className=" flex items-center justify-center transition-colors bg-slate-300 hover:bg-slate-400 h-12 w-12 p-1 rounded-md ring-1 ring-white "
    >
      {loading ? (
        <Spinner color="gray" size={20} />
      ) : (
        <Image src={image} alt={social} width={28} className="m-0" />
      )}
    </Button>
  );
};
export default SocialButton;
