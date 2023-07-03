import React, { useState } from 'react';
import * as yup from 'yup';
import { useDebounce } from '@/helper/hooks';
import { useRouter } from 'next/navigation';
import { FormButton } from './FormButton';
import { LinkText } from './LinkText';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkUser } from '@/helper/api';
import { Button } from '../ui/Button';
import { Icons } from '../icons';

type EmailSubmitType = {
  handleEmailSubmit: (data: { username: string }) => void;
  // asyncEmailValidation: (e: string) => Promise<boolean>;
};

export const EmailComponent = ({
  handleEmailSubmit
}: // asyncEmailValidation
EmailSubmitType) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<null | string>('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const verifyEmail = async (verify = false) => {
  //   console.log({ email });
  //   console.log(emailSchema.isValidSync(email));
  //   if (emailSchema.isValidSync(email)) {
  //     const isValid = await asyncEmailValidation(email);
  //     if (!isValid) {
  //       setError('User Not Found');
  //       if (verify) {
  //         setEmail('');
  //         router.push('/signup');
  //       }
  //       return false;
  //     } else {
  //       setError(null);
  //       return true;
  //     }
  //   } else {
  //     setError('Please Input valid email');
  //     return false;
  //   }
  // };

  // email validation
  const asyncEmailValidation = async (email: string) => {
    try {
      const response = await checkUser({ emailid: email });
      const { detail } = response;
      if (!detail) {
        if (response.is_pool) {
          setValue('type', 'pool');
        } else {
          setValue('type', 'participant');
        }
        return true;
      } else {
        console.log('async email validation failed');
        return false;
      }
    } catch (e) {
      console.log('Error in asyncEmailValidation ', e);
      return false;
    }
  };

  const emailSchema = yup
    .object({
      username: yup
        .string()
        .required('Please enter your email address')
        .email('Please enter a valid email')
        .test('userNotFound', 'User does not exist', asyncEmailValidation),
      type: yup.string().nullable().default('')
    })
    .required();

  // useDebounce(() => verifyEmail(), [email], 300);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(emailSchema),
    mode: 'onSubmit'
  });
  return (
    <div>
      <Button className='w-full mb-6 hover:bg-gray-200' variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{' '}
        Login with Github
      </Button>
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(handleEmailSubmit)}
        className="login-wrapper form-wrapper"
      >
        <div className="form-group relative">
          <label
            htmlFor="email"
            className={`form-label absolute translate-x-6 translate-y-[-12px] bg-white px-2 ${
              errors.username && 'text-red-600'
            }`}
          >
            Email
          </label>
          <input
            {...register('username')}
            id="email"
            className={`form-control w-full px-8 py-3 border rounded-lg ${
              errors.username ? 'border-red-600' : 'border-slate-500'
            }`}
            // onChange={e => {
            //   setEmail(e.target.value);
            //   setError('');
            // }}
            placeholder="name@example.com"
          />
          {errors.username && (
            <div className="mt-2 pl-8 color text-red-600">
              <span>{errors.username.message}</span>
            </div>
          )}
        </div>
        <div className="form-group">
          <div className="d-grid start">
            <FormButton>Next</FormButton>
          </div>
        </div>
        <div className="ats-content mt-8 md:mt-11">
          <p className="mb-0 text-xl flex items-center flex-wrap">
            I don’t have an AuthX account
            <LinkText to="/signup">advance to Signup</LinkText>
          </p>
        </div>
      </form>
    </div>
  );
};
