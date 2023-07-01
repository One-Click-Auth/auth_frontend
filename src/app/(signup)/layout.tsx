"use client"

import Image from "next/image";
import { LOGO, SIGNUP_GRAPHIC } from "@/constants";
import LayoutBanner from "@/components/authForm/LayoutBanner";
import Modal from "@/components/Modal";
import OtpInput from "react-otp-input";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="min-h-screen flex flex-col sm:flex-row justify-center">
      <div className="container sm:basis-3/5 flex flex-col min-h-screen">
        <div className="self-start mt-7">
          <Image width={34} height={34} src={LOGO} alt="AuthX logo" />
        </div>
        <div className="flex my-12 items-center justify-center grow sm:mr-12">
          <div className="-mt-20 w-fit max-w-lg">
            <Image
              className="mx-auto mb-8"
              width={62}
              height={62}
              src={LOGO}
              alt="AuthX logo"
            />
            <h1 className="text-4xl text-center pb-9 md:pb-11 font-semibold transition-colors first:mt-0">
              Create a new AuthX account
            </h1>
            {children}
          </div>
        </div>
      </div>
      <LayoutBanner
        bannerText="AuthX’s Frictionless Signup/Login Hybrids"
        src={SIGNUP_GRAPHIC}
      />
    </div>
  );
}
