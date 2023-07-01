"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LOGIN_GRAPHIC, LOGO } from "@/constants";
import { FormButton } from "@/components/authForm/FormButton";
import { LinkText } from "@/components/authForm/LinkText";
import LayoutBanner from "@/components/authForm/LayoutBanner";

const PasswordReset: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.length > 0) {
      const encodedParam = encodeURIComponent(email);
      router.push(`/new-password?param=${encodedParam}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row justify-center">
      <div className="container sm:basis-3/5 flex flex-col min-h-screen">
        <div className="self-start mt-7">
          <Image width={34} height={34} src={LOGO} alt="AuthX logo" />
        </div>
        <div className="flex my-12 items-center justify-center grow sm:mr-12">
          <div className="-mt-32 w-fit max-w-lg">
            <Image
              className="mx-auto mb-8"
              width={62}
              height={62}
              src={LOGO}
              alt="AuthX logo"
            />
            <h1 className="scroll-m-20 text-4xl text-left pb-9 md:pb-11 font-semibold transition-colors first:mt-0">
              Reset Password
            </h1>
            <div className="login-wrapper form-wrapper">
              <form onSubmit={handleForm}>
                <div className="form-group relative">
                  <label
                    htmlFor="email"
                    className={`form-label absolute translate-x-6 translate-y-[-12px] bg-white px-2 
                    ${
                      ""
                      // errors.password && "text-red-600"
                    }
                    `}
                  >
                    Email
                  </label>
                  <input
                    // {...register("password")}
                    id="email"
                    type="text"
                    className={`form-control w-full px-8 py-3 border rounded-lg border-slate-500
                    ${
                      ""
                      // errors.password ? "border-red-600" : "border-slate-500"
                    }`}
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* {errors.password && (
                    <div className="mt-2 color text-red-600">
                      <span>{errors.password?.message}</span>
                    </div>
                  )} */}
                </div>

                <div className="form-group">
                  <div className="d-grid start">
                    <FormButton>Next</FormButton>
                  </div>
                </div>

                <div className="ats-content mt-8 md:mt-11">
                  <p className="mb-0 text-xl flex items-center flex-wrap">
                    I remember my AuthX password
                    <LinkText to="/">advance to Login</LinkText>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <LayoutBanner
        bannerText="AuthX: Ensure Security at every level"
        src={LOGIN_GRAPHIC}
      />
    </div>
  );
};

export default PasswordReset;
