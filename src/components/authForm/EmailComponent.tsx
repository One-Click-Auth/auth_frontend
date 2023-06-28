import React from "react";
import { FormButton } from "./FormButton";
import { LinkText } from "./LinkText";

type EmailSubmitType = {
  handleEmailSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  register: any;
  errors: any;
  handleSubmit: any;
};

export const EmailComponent = ({
  handleEmailSubmit,
  register,
  errors,
  handleSubmit,
}: EmailSubmitType) => {
  console.log("redered", errors);
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleEmailSubmit)}
      >
        <div>
          <label
            htmlFor="email"
            className={`form-label absolute translate-x-6 translate-y-[-12px] bg-white px-2 ${
              errors.username && "text-red-600"
            }`}
          >
            Email
          </label>
          <input
            {...register("username")}
            id="email"
            type="text"
            className={`form-control w-full px-8 py-3 border rounded-lg ${
              errors.username ? "border-red-600" : "border-slate-500"
            }`}
            placeholder="name@example.com"
          />
          {errors.username && (
            <div className="mt-2 color text-red-600">
              <span>{errors.username?.message}</span>
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
