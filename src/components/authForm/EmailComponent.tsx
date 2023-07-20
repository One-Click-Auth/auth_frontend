import React from 'react';
import * as yup from 'yup';
import { FormButton } from './FormButton';
import { LinkText } from './LinkText';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkUser } from '@/helper/api';
import { UserResponse } from '@/types';

type EmailSubmitType = {
  handleEmailSubmit: (data: { username: string }) => void;
  setFa2: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EmailComponent = ({
  handleEmailSubmit,
  setFa2
}: EmailSubmitType) => {
  // email validation
  const asyncEmailValidation = async (email: string) => {
    try {
      const response = await checkUser({ emailid: email });
      const { detail, is_pool, fa2 } = response as UserResponse;
      if (!detail) {
        if (is_pool) {
          setValue('type', 'pool');
        } else {
          setValue('type', 'participant');
        }
        setFa2(fa2 ?? false);
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
  );
};
