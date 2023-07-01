import React, { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import Link from 'next/link';
import { createRipple } from '@/helper/createRipple';
import { string } from 'yup';
import { useDebounce } from '@/helper/hooks';
import { useRouter } from 'next/navigation';

const emailSchema = string().email().required();
type EmailSubmitType = {
  handleEmailSubmit: (e: string) => void;
  asyncEmailValidation: (e: string) => Promise<boolean>;
};

export const EmailComponent = ({
  handleEmailSubmit,
  asyncEmailValidation
}: EmailSubmitType) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<null | string>('');
  const router = useRouter();
  const verifyEmail = async (verify = false) => {
    console.log({ email });
    console.log(emailSchema.isValidSync(email));
    if (emailSchema.isValidSync(email)) {
      const isValid = await asyncEmailValidation(email);
      if (!isValid) {
        setError('User Not Found');
        if (verify) {
          setEmail('');
          router.push('/signup');
        }
        return false;
      } else {
        setError(null);
        return true;
      }
    } else {
      setError('Please Input valid email');
      return false;
    }
  };
  useDebounce(() => verifyEmail(), [email], 300);
  return (
    <div className="login-wrapper form-wrapper">
      <div className="form-group relative">
        <label
          htmlFor="email"
          className="form-label absolute translate-x-6 translate-y-[-12px] bg-white px-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="username"
          className="form-control w-full"
          required
          onChange={e => {
            setEmail(e.target.value);
            setError('');
          }}
          placeholder="name@example.com"
        />
        {error && (
          <div className="mt-2 color text-red-600">
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="form-group">
        <div className="d-grid start">
          <button
            type="submit"
            onClick={async e => {
              createRipple(e);
              const validEmail = await verifyEmail(true);
              if (validEmail) {
                handleEmailSubmit(email);
              } else setError('Please Input Valid Email');
            }}
            className="ripple-button btn btn-spl-primary mt-8 md:mt-11 btn-ca bg-gradient-to-r from-black to-[#6F6F6F] flex items-center justify-center"
          >
            <span>Next</span>
            <span className="forward-arr">
              {' '}
              <FaAngleRight className="ca-forward-arr text-2xl mt-[2px]" />
            </span>
          </button>
        </div>
      </div>

      <div className="ats-content mt-8 md:mt-11">
        <p className="mb-0 text-xl flex items-center flex-wrap">
          I don’t have an AuthX account
          <Link
            className="pl-2 a-t-s a-link text-xl flex items-center"
            href="/sign-up"
          >
            advance to Signup{' '}
            <span className="forward-arr arr-black">
              {' '}
              <FaAngleRight className="pt-1 text-2xl" />
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};
