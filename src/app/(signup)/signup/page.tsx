"use client";

import { ErrorMessage } from "@hookform/error-message";
import { FormButton } from "@/components/authForm/FormButton";
import { LinkText } from "@/components/authForm/LinkText";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuXCircle } from "react-icons/lu";
import OtpInput from "react-otp-input";
import Modal from "@/components/Modal";
import LoadingModal from "@/components/authForm/LoadingModal";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

// TS types
type RequestObjectType = {
  username: FormDataEntryValue;
  password: FormDataEntryValue;
  full_name: string;
  is_pool: boolean;
  link: boolean;
  ref: string;
  types: string;
};

type RegisterUser = {
  username: string;
  password: string;
  "referral-id": string | null | undefined;
  agreeTerms: boolean | undefined;
};

//yup schema
const registerSchema = yup
  .object({
    username: yup
      .string()
      .required("Please enter your email address")
      .email("Please enter a valid email"),
    password: yup.string().required("Please enter a password").min(8),
    "referral-id": yup.string().nullable(),
    agreeTerms: yup
      .boolean()
      .oneOf([true], "Please accept our Terms of Service and Privacy policy"),
  })
  .required();

export default function Signup() {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [messageToken, setMessageToken] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [requestObject, setRequestObject] = useState<RequestObjectType>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUser>({
    resolver: yupResolver(registerSchema),
    mode: "onSubmit",
  });

  // Alert component
  const AlertMessage = ({ message }: { message: string }) => {
    return (
      <Alert className="fixed top-6 w-[22rem] left-[calc(50vw_-_11rem)] bg-yellow-400 z-[1100]">
        <ExclamationTriangleIcon className="w-4 h-4" />
        <AlertTitle>Notice!</AlertTitle>
        <button
          onClick={() => setAlert(false)}
          className="absolute right-2 top-2"
        >
          <LuXCircle className="w-5 h-5" />
        </button>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    );
  };

  // OTP action
  useEffect(() => {
    if (otp.length === 8) {
      console.log("verifying OTP", otp);
      setLoading(true);
      handleOTPValidation();
    }
  }, [otp]);

  // Execute fetch once requestObject is updated to ensure we use latest data
  useEffect(() => {
    async function fetchdata() {
      const data = await handleSignUpRequest();

      if (data.msg) {
        setMessageToken(data.msg);
        setLoading(false);
        setShow(true);
      }

      if (data.detail) {
        setAlertMessage(data.detail);
        setAlert(true);
        setLoading(false);
      }
    }

    console.log(requestObject);
    if (requestObject) {
      fetchdata();
    }
  }, [requestObject]);

  //handle OTP Validation
  const handleOTPValidation = () => {
    fetch("https://api.trustauthx.com/verify_email/false", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp,
        add: messageToken,
        types: "email",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        if (data.status === 200 && data.is_ok === true) {
          setShow(false);
          router.push("/");
        }
        if (data.is_ok === false) {
          setAlertMessage(data.msg);
          setAlert(true);
        }
        if (data.detail) {
          setAlertMessage(data.detail);
          setAlert(true);
        }
      })
      .catch((err) => console.log(err));
  };

  // Handle resend OTP email
  const resendEmail = async () => {
    setLoading(true);
    const data = await handleSignUpRequest();
    if (data.msg) {
      setMessageToken(data.msg);
      setLoading(false);
      setShow(true);
    }

    if (data.detail) {
      setAlertMessage(data.detail);
      setAlert(true);
      setLoading(false);
    }
  };

  // Signup request
  const handleSignUpRequest = async () => {
    return await fetch("https://api.trustauthx.com/signup", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestObject),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  // form submit handler
  const handleFormSubmit = async (data: RegisterUser) => {
    const reqObject = {
      username: data.username,
      password: data.password,
      full_name: "Test User",
      is_pool: true,
      link: true,
      ref: "string",
      types: "string",
    };

    setAlert(false);
    setRequestObject(reqObject);
    setLoading(true);
  };

  return (
    <>
      <div className="login-wrapper form-wrapper">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          // className="was-validated"
        >
          <div className="form-group relative">
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
            <ErrorMessage
              errors={errors}
              name="username"
              render={({ message }) => (
                <p className="text-red-600 pl-8">{message}</p>
              )}
            />
          </div>

          <div className="form-group mt-8 md:mt-11 relative">
            <label
              htmlFor="password"
              className={`form-label absolute translate-x-6 translate-y-[-12px] bg-white px-2 ${
                errors.password && "text-red-600"
              }`}
            >
              Password
            </label>
            <input
              {...register("password")}
              id="password"
              type="password"
              className={`form-control w-full px-8 py-3 border rounded-lg ${
                errors.password ? "border-red-600" : "border-slate-500"
              }`}
              placeholder="Enter password"
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <p className="text-red-600 pl-8">{message}</p>
              )}
            />
          </div>

          <div className="form-group mt-8 md:mt-11 relative">
            <label
              htmlFor="referral-id"
              className="form-label absolute translate-x-6 translate-y-[-12px] bg-white px-2"
            >
              Referral ID (Optional)
            </label>
            <input
              {...register("referral-id")}
              id="referral-id"
              type="text"
              className="form-control w-full px-8 py-3 border border-slate-500 rounded-lg"
              placeholder="Referral-ID"
            />
          </div>

          <div className="form-group">
            <div className="d-grid start">
              <FormButton>Next</FormButton>
            </div>
          </div>

          <div className="flex items-center mt-8 md:mt-11">
            <input
              {...register("agreeTerms")}
              id="terms"
              type="checkbox"
              className={`checkbox-customized w-7 h-7 cursor-pointer ${
                errors.agreeTerms && "border-red-600"
              }`}
            />
            <label
              htmlFor="terms"
              className="ml-5 text-sm font-medium tracking-[.13em] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have read and agree to Flitchcoin's{" "}
              <a className="underline underline-offset-2" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-2">
                Privacy Policy
              </a>
            </label>
          </div>
          <ErrorMessage
            errors={errors}
            name="agreeTerms"
            render={({ message }) => (
              <p className="text-red-600 pl-10 mt-2">{message}</p>
            )}
          />

          <div className="ats-content mt-8 md:mt-11">
            <p className="mb-0 text-xl flex items-center flex-wrap">
              I already have an AuthX account
              <LinkText to="/">advance to Login</LinkText>
            </p>
          </div>
        </form>
      </div>
      {alert && <AlertMessage message={alertMessage} />}

      <Modal show={show}>
        <div className="bg-white max-w-3xl mt-4 mb-12 mx-8 rounded-3xl p-12 md:p-16">
          <p className="font-light text-center">
            Please check your email for a registration link or OTP. You can
            register any way by clicking on the{" "}
            <span className="bg-gradient-to-r text-transparent bg-clip-text from-[#2932FF] to-[#589BFF] ">
              link in E-mail{" "}
            </span>
            or{" "}
            <span className="bg-gradient-to-r text-transparent bg-clip-text from-[#589BFF] to-[#2932FF]">
              by entering OTP{" "}
            </span>
            in the designated column. If you didn't receive an email, you can
            click "Resend Email".
          </p>
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="">
              <div className="number_input">
                <div className="text-3xl text-center my-11">
                  Enter e-mail OTP
                </div>
                <OtpInput
                  containerStyle="flex justify-center gap-1"
                  inputStyle="otp-input-width !w-8 md:!w-12 h-12 p-0 text-center border border-slate-500 rounded-xl"
                  value={otp}
                  onChange={setOtp}
                  numInputs={8}
                  renderSeparator={<span></span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <div className="row">
                <div className="col-lg-10 text-start">
                  <button
                    className="group mt-16 p-0 bg-transparent font-mono font-normal"
                    onClick={resendEmail}
                  >
                    Resend Email
                    <span className="inline-block group-hover:translate-x-2 ease-in duration-300 pl-2">
                      ›
                    </span>
                  </button>
                </div>
                <div className="col-lg-2"></div>
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </Modal>

      <LoadingModal show={loading} />
    </>
  );
}
