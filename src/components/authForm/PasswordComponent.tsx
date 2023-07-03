import React from 'react';
import { FormButton } from './FormButton';
import { LinkText } from './LinkText';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const passwordSchema = yup
  .object({
    password: yup.string().required('Please enter a password')
  })
  .required();

type PasswordSubmitType = {
  handlePasswordSubmit: (data: { password: string;}) => void;
};

export const PasswordComponent = ({
  handlePasswordSubmit
}: PasswordSubmitType) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(passwordSchema)
  });
  return (
    <div>
      <form
        onSubmit={handleSubmit(handlePasswordSubmit)}
      >
        <div>
          <label
            htmlFor="password"
            className={`form-label absolute translate-x-6 translate-y-[-12px] bg-white px-2 ${
              errors.password && "text-red-600"
            }`}
          >
            Password
          </label>
          <input
            {...register('password')}
            id="password"
            type="password"
            className={`form-control w-full px-8 py-3 border rounded-lg ${
              errors.password ? "border-red-600" : "border-slate-500"
            }`}
            placeholder="Enter password"
          />
          {errors?.password && (
            <div className="mt-2 pl-8 color text-red-600">
              <span>{errors?.password?.message}</span>
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
            Forgot Password?
            <LinkText to="/reset-password">advance to reset Password</LinkText>
          </p>
        </div>
      </form>
    </div>
  );
};
