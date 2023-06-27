"use client"
import React, { useState, useEffect } from "react";
import { FaAngleRight, FaApple, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { Button } from "../../components/ui/Button";
import { checkUser } from "../../helper/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginToken, loginUser } from "../../redux/Auth/authSlice";
import { Modal } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { AppDispatch } from "../../redux/store";
import Link from "next/link";
import { useRouter } from "next/router";

type FormValues = {
  username: string;
  password: string;
  type: string | null;
  otp: string | number;
};

const Login = () => {
  const { userToken, user } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");


  // email validation
  const asyncEmailValidation = async (email: string) => {
    console.log("Email validsetffa2ation triggered");
    // console.log("active element is ",document.activeElement)
    const activeElement = document.activeElement as HTMLInputElement;
    if (!activeElement || (activeElement && activeElement?.type === "submit")) {
      try {
        const response = await checkUser({ emailid: email });
        const { detail } = response;
        if (!detail) {
          if (response.is_pool) {
            setValue("type", "pool");
          } else {
            setValue("type", "participant");
          }
          setfa2(JSON.stringify(response.fa2 || false));
          // setError('email', false)
          return true;
        } else {
          console.log("async email validation failed");
          // setError('email', true);
          return false;
        }
      } catch (e) {
        console.log("Error in asyncEmailValidation ", e);
        return false;
      }
    } else {
      return true;
    }
  };

  // yup handler
  const schema = yup
    .object({
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Minimum 6 character"),
      username: yup
        .string()
        .required("Email field required")
        .email("Valid Email address required")
        .test("userNotFound", "User does not exist", asyncEmailValidation),
      type: yup.string().nullable().default(""),
      otp: yup.mixed().default(100000),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    setValue,
    setError,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  // setting states
  const [fa2, setfa2] = useState("null");
  const [show, setShow] = useState(false);
  const [gAuth, setgAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);

    if (userToken?.access_token) {
      dispatch(loginUser());
      setLoading(false);
    }
    if (user && user?.username) {
      router.push("/dashboard");
      setLoading(false);
    }

    const formData = getValues();
    if (gAuth && formData.username.length && formData.password.length) {
      const loginAction = loginToken(formData as FormValues);
      dispatch(loginAction);
      setLoading(false);
    }
    setLoading(false);
  }, [userToken, user]);

  let str = "";
  const nextDigit = (currVal: any, e: any) => {
    str += e;
    if (str.length === 6) {
      setValue("otp", str);
    }
    let ele = document.querySelectorAll("input.otp");
    if (str.length != 6) {
      ele[currVal + 0].focus();
    }
  };

  const responseSocialAuth = async (response: any) => {
    // debugger
    const { user, providerId } = response;
    const {
      reloadUserInfo: { passwordHash },
    } = user;
    if (user && user.email) {
      setgAuth(true);
      setValue("username", user.email);
      setValue("password", passwordHash);
      const userResponse = await checkUser({ emailid: user.email });
      if (userResponse) {
        if (userResponse.fa2) {
          setShow(true);
        } else {
          if (!userResponse.detail) {
            dispatch(loginToken(getValues() as FormValues));
          }
        }
      }
    }
  };

  // otp handler
  const otpHandler = async (e: any) => {
    try {
      e.preventDefault();
      let res = await dispatch(loginToken(getValues() as FormValues));
      if (res.type === "auth/loginToken/rejected" && !res.payload) {
        alert("Invalid OTP");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.log("Error from OTP handler ", e);
    } finally {
      setShow(false);
    }
  };

  // on submit handler
  const onSubmitHandler: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log("inside submit handler email", isValid);
      setLoading(true);
      const response = await checkUser({ emailid: getValues().username });
      console.log("checkUser response is ", response);
      const faValue = JSON.stringify(response.fa2);
      if (isValid) {
        if (faValue === "true") {
          setShow(true);
        } else {
          let res = await dispatch(loginToken(data));
          console.log("response from login token ", res);
          if (res["type"] === "auth/loginToken/fulfilled" && !res.payload) {
            setError("password", {
              type: "custom",
              message: "Invalid Password",
            });
          }
          // console.log("dispatch res is ",res)
          router.push("/dashboard/page1");
        }
        setLoading(false);
      } else {
        console.log("Not valid");
        setTimeout(() => { }, 3000);
        setLoading(false);
      }
    } catch (err) {
      console.log("Error in onSubmitHandler ", err);
    }
  };

  // for button ripple effect
  function createRipple(event: any) {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  const buttons = document.getElementsByTagName("button");
  for (const button of buttons) {
    button.addEventListener("click", createRipple);
  }

  return (
    <div>
      <div className="login-2-page">
        <div className="container">
          <div className="row login-row">
            <div className="col-xs-12 col-sm-12 col-lg-6">
              <div>
                <div className="main-text-login ">
                  <h3 className="r-main-title-2">Business Login</h3>
                </div>
                <div className="login2-wrapper form-wrapper">
                  <form
                    onSubmit={handleSubmit(onSubmitHandler)}
                    autoComplete={false.toString()}
                    noValidate
                    className={`${isSubmitted && "was-validated"}`}
                  >
                    <div className="form-group">
                      <label htmlFor="username" className="form-label">
                        Personal Email
                      </label>
                      <input
                        {...register("username", { required: true })}
                        type="text"
                        name="username"
                        placeholder="Enter your Email"
                        className={`form-control undefined ${errors?.username && "is-invalid"
                          }`}
                      />
                      {errors.username && (
                        <div className="invalid-feedback">
                          <span>{errors.username?.message}</span>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        {...register("password", { required: true })}
                        name="password"
                        type="password"
                        className={`form-control undefined ${errors?.password && "is-invalid"
                          }`}
                        placeholder="Enter your Password"
                      />
                      {errors?.password && (
                        <div className="invalid-feedback">
                          {errors?.password?.message}
                        </div>
                      )}
                    </div>

                    <div className="a-t-s a-link mt-4">
                      <span
                        onClick={() => router.push("/reset-password")}
                        className="a-t-s cursor-pointer"
                      >
                        Forgot Password ?
                      </span>
                    </div>

                    <div className="d-grid d-grid-login pt-4">
                      <button
                        type="submit"
                        className="btn btn-signup loginbtn block btn-spl-primary"
                      >
                        <span className="signup-txt">Next</span>
                        <span className="forward-arr">
                          {" "}
                          <FaAngleRight className="pt-1" />
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="relative mt-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="buttons-row pt-4">
                <Button variant="outline" className="new_btns button1">
                  <span className="icon1">
                    {" "}
                    <FaGoogle />{" "}
                  </span>{" "}
                  Google
                </Button>
                <Button variant="outline" className="new_btns button2">
                  <span className="icon2">
                    {" "}
                    <FaApple />{" "}
                  </span>
                  Apple
                </Button>
                <Button variant="outline" className="new_btns button3">
                  <span className="icon3">
                    {" "}
                    <FaMicrosoft />{" "}
                  </span>
                  Microsoft
                </Button>
              </div>

              <div className="ats-content pt-4">
                <p className="mb-0 text-center">
                  I don’t have Flitchcoin account &nbsp;
                  <Link className="a-t-s a-link" href="/sign-up">
                    advance to Sign Up{" "}
                  </Link>
                  <span className="forward-arr arr-black">
                    {" "}
                    <FaAngleRight className="pt-2" />
                  </span>
                </p>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-lg-6 login-a-center"></div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        className="modal-dialog-login"
      >
        <div className="modal_popup">
          <div className="login_modal_head text-start pt-3 ps-3 pb-2">
            2 Factor Authentication
          </div>
          <div className="popup_line"></div>
          <div className="login_modal_sub pt-2">
            Please enter <b>2FA</b> code to login
          </div>
          <form className="mt-3">
            <input
              className="otp me-2"
              type="text"
              onChange={(e) => nextDigit(1, e.target.value)}
            />
            <input
              className="otp me-2"
              type="text"
              onChange={(e) => nextDigit(2, e.target.value)}
            />
            <input
              className="otp me-2"
              type="text"
              onChange={(e) => nextDigit(3, e.target.value)}
            />
            <input
              className="otp me-2"
              type="text"
              onChange={(e) => nextDigit(4, e.target.value)}
            />
            <input
              className="otp me-2"
              type="text"
              onChange={(e) => nextDigit(5, e.target.value)}
            />
            <input
              className="otp"
              type="text"
              onChange={(e) => nextDigit(6, e.target.value)}
            />
          </form>
          <div className="text-center">
            <button
              type="button"
              className="ok_btn_login mt-5 ps-4 pe-4 mb-4"
              onClick={otpHandler}
            >
              Ok &#10004;
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
