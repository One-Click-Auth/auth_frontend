"use client"
import React, { useState, useEffect } from "react";
import { LuXCircle } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import logo from "./images/logo.svg";
import graphics from "./images/signup-graphic.svg";
import OtpInput from "react-otp-input";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { createRipple } from "../../helper/createRipple";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

// TODO: debounce I have not received email button
// Remove bootstrap components
// Add email validation
const SignUp = () => {
  const navigate = useRouter();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [messageToken, setMessageToken] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [requestObject, setRequestObject] = useState<RequestObjectType>();

  // Alert component
  const AlertMessage = ({ message }: { message: string }) => {
    return (
      <Alert
        // className={`${alert ? "" : "hidden"
        //   } absolute top-6 w-96 bg-yellow-400 z-[1100]`}
        className="absolute top-6 w-96 bg-yellow-400 z-[1100]"
      >
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
      console.log("verifying OTP");
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
        setLoading(false);
        if (data.status === 200 && data.is_ok === true) {
          navigate("/");
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
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsedData = Object.fromEntries(formData.entries());
    const reqObject = {
      username: parsedData.username,
      password: parsedData.password,
      full_name: "Test User",
      is_pool: true,
      link: true,
      ref: "string",
      types: "string",
    };

    setAlert(false);
    if (!parsedData.agreeTerms) {
      setAlertMessage("Please accept our Terms of Service and Privacy Policy!");
      setAlert(true);
      return;
    }

    setRequestObject(reqObject);
    setLoading(true);
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center">
      <div className="container sm:basis-3/5 flex flex-col min-h-screen">
        <div className="self-start mt-7">
          <img src={logo} alt="AuthX logo" />
        </div>
        <div className="flex my-12 items-center justify-center grow sm:mr-12">
          <div className="md:w-96 lg:w-[32rem]">
            <h1 className="scroll-m-20 text-[2.5rem] text-center pb-9 md:pb-11 font-semibold transition-colors first:mt-0">
              Create a new AuthX account
            </h1>

            <div className="login-wrapper form-wrapper">
              <form
                onSubmit={handleFormSubmit}
              // className="was-validated"
              >
                <div className="form-group relative">
                  <label
                    htmlFor="email"
                    className="form-label absolute translate-x-6 translate-y-[-12px] bg-white px-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="username"
                    type="text"
                    className="form-control"
                    required
                    placeholder="name@example.com"
                  />
                </div>

                <div className="form-group mt-8 md:mt-11 relative">
                  <label
                    htmlFor="password"
                    className="form-label absolute translate-x-6 translate-y-[-12px] bg-white px-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    required
                    name="password"
                    placeholder="Enter password"
                  />
                </div>

                <div className="form-group mt-8 md:mt-11 relative">
                  <label
                    htmlFor="referral-id"
                    className="form-label absolute translate-x-6 translate-y-[-12px] bg-white px-1"
                  >
                    Referral ID (Optional)
                  </label>
                  <input
                    id="referral-id"
                    type="text"
                    className="form-control"
                    name="referral-id"
                    placeholder="Referral-ID"
                  />
                </div>

                <div className="form-group">
                  <div className="d-grid start">
                    <button
                      type="submit"
                      onClick={createRipple}
                      className="ripple-button btn btn-spl-primary mt-8 md:mt-11 btn-ca bg-gradient-to-r from-black to-[#6F6F6F] flex items-center justify-center"
                    >
                      <span>Next</span>
                      <span className="forward-arr">
                        {" "}
                        <FaAngleRight className="ca-forward-arr text-2xl mt-[2px]" />
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center mt-8 md:mt-11">
                  <input
                    id="terms"
                    type="checkbox"
                    name="agreeTerms"
                    className="checkbox-customized cursor-pointer"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-5 text-sm font-medium tracking-[.13em] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have read and agree to Flitchcoin's{" "}
                    <a className="highlighted-text" href="#">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="highlighted-text">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <div className="ats-content mt-8 md:mt-11">
                  <p className="mb-0 text-xl flex items-center flex-wrap">
                    I already have an AuthX account &nbsp;
                    <Link
                      className="a-t-s a-link text-xl flex items-center"
                      href="/"
                    >
                      advance to Login{" "}
                      <span className="forward-arr arr-black">
                        {" "}
                        <FaAngleRight className="pt-1 text-2xl" />
                      </span>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black min-h-screen w-full sm:basis-2/5 relative">
        <div className="flex flex-col items-center my-10 md:mt-12">
          <h1 className="text-3xl xl:text-4xl mx-4 text-white max-w-md tracking-widest font-light text-center">
            AuthX’s Frictionless Signup/Login Hybrids
          </h1>
          <img
            className="mt-8 md:mt-10 xl:mt-12 w-3/5"
            src={graphics}
            alt="AuthX pre login"
            width={340}
          />
        </div>
        <span className="text-white w-full text-right absolute bottom-0 right-0 mb-4 xl:mb-8 mr-6">
          © 2023 TrustAuthx. All rights reserved.
        </span>
      </div>

      {alert && <AlertMessage message={alertMessage} />}

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        className="modal-dialog-popup"
      >
        <div className="bg-white rounded-3xl p-16">
          <p className="font-light">
            Please check your email for a registration link or OTP. You can
            register any way by clicking on the{" "}
            <span className="text_design">link in E-mail </span>or{" "}
            <span className="text_design">by entering OTP </span>in the
            designated column. If you didn't receive an email, you can click I
            didn't receive any email.
          </p>
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="">
              <div className="number_input">
                <div className="text-3xl my-11">Enter e-mail OTP</div>
                <OtpInput
                  containerStyle="flex justify-center gap-1"
                  inputStyle="otp-input-width h-12 p-0 text-center rounded-xl"
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
                    className="mt-16 p-0 bg-transparent font-['Lexend'] font-normal down-button"
                    onClick={resendEmail}
                  >
                    I didn't receive Email
                    <span className="modal-arr pl-2">›</span>
                  </button>
                </div>
                <div className="col-lg-2"></div>
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </Modal>

      <Modal
        show={loading}
        onHide={() => setLoading(false)}
        backdrop="static"
        keyboard={false}
        className="modal-dialog-coin"
      >
        <div className="h-[80vh]">
          <div className="absolute inset-x-1/2 inset-y-1/2">
            <svg
              className="animate-spin w-14 h-14 -ml-1 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SignUp;
