import React from "react";
import { FormButton } from "./FormButton";
import { LinkText } from "./LinkText";

type PasswordSubmitType = {
  handlePasswordSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  password: string | File;
  errors: any;
};

export const PasswordComponent = ({
  handlePasswordSubmit,
  password,
  errors,
}: PasswordSubmitType
) => {
  return (
    <div>
      <form
        onSubmit={handlePasswordSubmit}
      // className="was-validated"
      >
        <div>
          <label
            htmlFor="password"
            className="form-label absolute translate-x-6 translate-y-[-12px] bg-white px-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-8 py-3 border rounded-lg border-slate-500"
            defaultValue={
              password as string
            }
            required
            name="password"
            placeholder="Enter password"
          />
          {errors?.password && (
            <div className=" color text-red-600">
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
