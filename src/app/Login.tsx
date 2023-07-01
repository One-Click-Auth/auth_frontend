"use client"
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { LOGIN_GRAPHIC, LOGO } from "@/constants";
import Image from "next/image";
import LayoutBanner from "@/components/authForm/LayoutBanner";
import { signIn } from "next-auth/react"
import { PasswordComponent } from "@/components/authForm/PasswordComponent";
import { EmailComponent } from "@/components/authForm/EmailComponent";
import { Button } from "@/components/ui/Button";
import { checkUser } from "@/helper/api";
import { useSearchParams } from "next/navigation";

type FormValues = {
  username?: string;
  password?: string;
  type?: string;
  otp?: string;
};

const Login = () => {
  const [values, setValues] = useState<FormValues>({})
  const [userRes,setUserRes] = useState({})
  const [value, setValue] = useState('')
  const searchParams = useSearchParams()
  const [show, setShow] = useState(false);
  const [customError, setCustomError] = useState<any>(() => {
    const error = searchParams?.get('error')
    if(error === 'CredentialSignin')
      return "Invalid Email or Password"
    return null
  });
  // email validation
  const asyncEmailValidation = async (email: string) => {
      try {
        const response = await checkUser({ emailid: email, });
        const { detail } = response;
        setUserRes(() => ({...response}))
        if (!detail) {
          if (response.is_pool) {
            setValue( "pool");
          } else {
            setValue( "participant");
          }
          return true;
        } else {
          console.log("async email validation failed");
          return false;
        }
      } catch (e) {
        console.log("Error in asyncEmailValidation ", e);
        return false;
      }
  };

  const initiateLogin = async (data:Partial<FormValues>) => {
    await signIn('credentials', {
      ...values,...data,
    callbackUrl:'/dashboard'})
  }
  // on submit handler
  const onSubmitHandler = async(pwd:string) => {
    try {
        return initiateLogin({password:pwd})
    } catch (err) {
      console.log("Error in onSubmitHandler ", err);
    }
  };


  const handlePasswordSubmit = (pwd:string) => {
    // setPassword(parsedData.password);
    console.log({pwd})
    setValues(prev => ({ ...prev, password: pwd }))
    setTimeout(() => {
      onSubmitHandler(pwd)
    }, 100)
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
            <h1 className="scroll-m-20 text-4xl text-center pb-9 md:pb-11 font-semibold transition-colors first:mt-0">
              Login to your AuthX account
            </h1>
            <h1 className="scroll-m-20 text-xl text-center  font-semibold transition-colors text-red-500 first:mt-0">
              {customError}
            </h1>
            <Button className="w-full rounded-full font-semibold bg-gray-600 text-white mb-10" onClick={() => signIn('github',{  callbackUrl:'/dashboard'})}>Login with Github</Button>

            {!values.username ? (
              <EmailComponent
                handleEmailSubmit={(e) =>  {
                  setValues(prev => ({ ...prev, username: e }))
                  setCustomError('')
                }}
                asyncEmailValidation={asyncEmailValidation}
              />
            ) : (
                <PasswordComponent handlePasswordSubmit={handlePasswordSubmit}/>
            )}
          </div>
        </div>
      </div>
      <LayoutBanner
        bannerText="AuthX: Ensure Security at every level"
        src={LOGIN_GRAPHIC}
      />

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        className="modal-dialog-login"
      >
        <div className="bg-white rounded-3xl p-16 mt-[20vh] w-max self-center">
          <div>
            <div className="">
              <div className="text-3xl text-center mb-4">Enter MFA OTP</div>
              <p className="text-center mb-10 text-slate-600">
                Enter Multifactor OTP from your authentication app
              </p>
              <OtpInput
                containerStyle="flex justify-center gap-1"
                inputStyle="otp-input-width h-12 p-0 text-center rounded-xl"
                value={values.otp}
                onChange={(otp) => setValues(prev => ({...prev,otp}))}
                numInputs={6}
                renderSeparator={<span></span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
