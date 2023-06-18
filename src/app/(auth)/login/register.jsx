import React, { useState, useEffect } from "react";
import {FaAngleRight} from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkUser } from "../../helper/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { reset, signupUser, verifyEmail } from "../../Feature/Auth/authSlice";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Modal } from "react-bootstrap";
import cross from "./images/cross.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/Dialog"
import { Input } from "../../components/ui/Input"
import { Label } from "../../components/ui/Label"



const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginString, verifyString, userExistStatus } = useSelector(
    (state) => state.auth
  );

  const [termChecked, setTermChecked] = useState(false);
  const [fa2, setfa2] = useState(false);
  const [show, setShow] = useState(false);
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState();
  const [showOtp, setShowOtp] = useState(false);
  const [signType, setSignType] = useState("");

  const [searchParams] = useSearchParams();
  const [otpQuery, setOtpQuery] = useState(
    searchParams.get("otp") ? searchParams.get("otp") : null
  );

  const [memoQuery, setMemoQuery] = useState(
    searchParams.get("memo") ? searchParams.get("memo") : null
  );

  const [refQuery, setRefQuery] = useState(
    searchParams.get("ref") ? searchParams.get("ref") : null
  );

  const [typeQuery, setTypeQuery] = useState(
    searchParams.get("type") ? searchParams.get("type") : null
  );

    // Email Validation
  const asyncEmailValidation = async (email, values, a, d) => {
    console.log(errors)
    if (!document.activeElement || (document.activeElement && document.activeElement.type === "submit")) {
      try {
        const response = await checkUser(email);
        const { detail } = response;
        if (!detail) {
          // setError('email', false)
          return false;
        } else {
          // setError('email', true);
          return true;
        }
      } catch (e) {
        return false;
      }
    } else {
      return false
    }
  }


  const schema = yup.object({
    fullName: yup.string().required("Full Name required"),
    username: yup.string().required("Email required").email("Valid Email address required").test('userFound', 'User  exists', asyncEmailValidation),
    password: yup.string().required("Password required"),
    referal: yup.string().nullable().default("XXX"),
    type: yup.mixed().nullable().default("participant"),
    otp: yup.mixed().nullable().default(100000)
  }).required();


  const { register, handleSubmit, formState: { errors, isValid, isSubmitted }, clearErrors, setValue, getValues } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit"
  });

  const handleChange = () => {
    setTermChecked(!termChecked);
  }
// otp handler
  const otpHandler = (e) => {
    // debugger
    const formData = getValues();
    setLoading(true);
    let data;
    if (formData.username === "") {
      data = {
        otp: String(otp),
        add: String(loginString.msg),
        link: true,
        types: "email"
      };
    } else {
      data = {
        otp: String(otp),
        add: String(loginString.msg),
        link: false,
        types: "email"
      };
    }
    e.preventDefault();
    dispatch(verifyEmail(data));
    setLoading(false);
    if (verifyString === "Wrong OTP") {
      setShowOtp(true);
      setOtp("");
      setTimeout(() => {
        setShowOtp(false);
      }, 3000);
    }
    if (verifyString) {
      if (verifyString?.status === 200) {
        navigate("/login");
      }
    }
  };


  // next handler
  const nextHandler = (e) => {

    const formData = getValues();

    const { username, password, fullName, type } = formData;
    setLoading(true);
    if (e) {
      e.preventDefault();
      setLoading(false);
    }
    if (username === "" || password === "" || fullName === "") {
      setLoading(false);
      setShowA(true);
    } else {
      setLoading(true);
      setSignType("participant");
      setValue("type", "participant")
      if (username === "" || password === "" || fullName === "" || type === "") {
        setShowA(true);
      } else {
        dispatch(signupUser({ formData, type }));
        setLoading(false);
      }
    }
  };



  const [proceed,setProceed] = useState(false);
  // form on submit handler
  const onSubmit = (value) => {

    setProceed(!proceed);

    let isManualValid = false;
    if (value.fullName && value.username && value.password) {
      isManualValid = true;
    }
    if (isValid || isManualValid) {
      const data = {
        formData: value
      }
      dispatch(signupUser(data));
      setLoading(false)
    } else {
      setLoading(false)
      setShowA(true);
    }
  }

  var fun = (text) => {
    text = text.trim();
    var newString = "";
    for (const char of text) {
      newString += char === "" ? "+" : char;
    }
    return newString;
  };

  useEffect(() => {

    setValue("referal",refQuery);
    if (memoQuery && otpQuery && typeQuery) {
      const strMemo = fun(memoQuery);
        const strOtp = fun(otpQuery);
        const strType = fun(typeQuery);
  
        var str = memoQuery;
        var posMemo = "";
        for (var i = 0; i < str.length; i++) {
          if (str[i] === " ") {
            posMemo += "+";
          }else{
            posMemo += str[i];
          }
        }
        
        var str2 = otpQuery;
        var posOtp = "";
        for ( i = 0; i < str2.length; i++) {
          if (str2[i] === " ") {
            posOtp += "+";
          }else{
            posOtp += str2[i];
          }
        }
        var str3 = typeQuery;
        var posType = "";
        for ( i = 0; i < str3.length; i++) {
          if (str3[i] === " ") {
            posType += "+";
          }else{
            posType += str3[i];
          }
        }
      let data = {
        otp: posOtp,
        add: posMemo,
        link: true,
        types: posType
      };


      dispatch(verifyEmail(data));
      setLoading(true);
      if (verifyString) {
        if (verifyString?.status === 200) {
          navigate("/");
        }
      }
    } else {
      if (verifyString && verifyString.status === 200) {
        if (verifyString.msg) {
          navigate("/");
        }
      }
    }


    setLoading(false);
    if (userExistStatus === true) {
      setShowB(true);
      setTimeout(() => {
        dispatch(reset());
        navigate("/");
      }, 3000);
    } else if (userExistStatus === false) {
      setLoading(false);
      setShow(true);
    }
    if (verifyString === "Wrong OTP") {
      setShowOtp(true);
      setOtp("");
      setTimeout(() => {
        setShowOtp(false);
      }, 3000);
    }
  }, [userExistStatus, otpQuery, memoQuery, verifyString,refQuery,proceed]);

  useEffect(() => {
    setTimeout(() => {
      setShowA(false);
      setShowB(false);
    }, 3000)
  }, [showA, showB]);




  
  // for button ripple effect
  function createRipple(event) {
    const button = event.currentTarget;
  
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
  
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");
   button.appendChild(circle);
  }

  return (
    
      <div className="login-2-page register-page">
        <div className="container">
          <div className="row login-row">
          <div class="col-xs-12 col-sm-12 col-lg-6 first-column">
          <h1 className="scroll-m-20 text-4xl pb-5 font-semibold tracking-tight transition-colors first:mt-0">
              Create Personal Account
                </h1>

          <div class="login-wrapper form-wrapper">

            <form 
            onSubmit={handleSubmit(onSubmit)} className={`false ${isSubmitted && 'was-validated'}`}
            >

              <div class="form-group">
                <label for="" class="form-label">Full Name</label>
                <input
                {...register('fullName')} name="fullName" required="true" type="text" className={`form-control undefined${errors?.fullName && 'is-invalid'}`}
                 placeholder="Enter your Name"/>
                 {
                      (errors?.fullName) && (
                        <div className="invalid-feedback">
                          <span>{errors?.fullName.message}</span>
                        </div>
                      )
                    }
                </div>

                <div class="form-group">
                  <label for="" class="form-label">Personal Email</label>
                  <input
                   {...register('username', { required: true })} name="username" type="text" className={`form-control undefined${errors?.username && 'is-invalid'}`} required 
                   placeholder="Enter your Email" />
                   {
                      (errors?.username) && (
                        <div className="invalid-feedback">
                          <span>
                            {errors?.username?.message}
                          </span>
                        </div>
                      )
                    }
                  </div>

                  <div class="form-group">
                    <label for="" class="form-label">Password</label>
                    <input {...register('password')} type="password" className={`form-control undefined${errors?.password && 'is-invalid'}`} required
                      name="password"
                      placeholder="Enter your password"
                     />
                     {
                      (errors?.password) && (
                        <div className="invalid-feedback">
                          <span>
                            {errors?.password?.message}
                          </span>
                        </div>
                      )
                    }
                    </div>

                    <div class="form-group">
                      <label for="" class="form-label">Referral ID (Optional)</label>
                      <input {...register('referal', { required: false })} type="text" className={`form-control undefined${errors?.referal && 'is-invalid'}`}
                      />

                      </div>
                      
                      <div className="flex items-center space-x-2">
                 <input type="checkbox" className='checkbox-customized'  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have read and agree to Flitchcoin's  <a className='highlighted-text' href='#'>Terms of Service</a> and <a href='#' className='highlighted-text'>Privacy Policy</a>
                  </label>
                </div>

                            <div class="form-group">
                              <div class="d-grid start">

                                <button type="submit" class="block btn btn-spl-primary btn-ca" onClick={createRipple}>
                                  Create New Account
                                  <span className="forward-arr"> <FaAngleRight className="ca-forward-arr"/></span>
                                  </button>

                                  </div>
                                  </div>

                                  </form>
                                  
                                  </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-lg-6 login-a-center">

            </div>
          </div>
        </div>

        
        <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false} className="modal-dialog-popup">
          <div className="signup_popup p-5 pt-0">
            <div className="text-end pt-2 signup_cross" onClick={() => setShow(false)}>&#9747;</div>
            <p className="pt-4">Please check your email for a registration link or OTP. You can register any way by clicking on the <span className="text_design">link in E-mail </span>or <span className="text_design">by entering OTP </span>in the designated column. If you didn't receive an email, you can click I didn't receive any email.</p>
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-8">
                <div className="signup_popup mt-5 p-4">
                  <b>Enter OTP</b><br />
                  <input
                    type="text"
                    className="w-50 signup_input mt-3"
                    placeholder="x x x x"
                    onChange={(e) => setOtp(e.target.value)}
                    name="otp"
                    value={otp}
                  />
                  <div className="row">
                    <div className="col-lg-6"></div>
                    <div className="col-lg-6 mt-4">
                      <button className="ok_btn_login w-100" onClick={e => otpHandler(e)}>
                        Proceed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="modal-arr"> ›</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-10 text-start">
                    <button className="round-btn btn-dark mt-4 ps-4 pe-4 down-button" onClick={e => nextHandler(e)}>
                      I didn't receive Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="modal-arr">›</span>
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
          show={showA}
          onHide={() => setShowA(false)}
          backdrop="static"
          keyboard={false}
          className="modal-dialog-coin"
        >
          <div className="popup_error">
            <div className="popup_error_head">
              <p className="popup_error_head_text text-start ps-3 pt-2 mb-1">Unfilled !</p>
              <div className="event_line"></div>
            </div>
            <p className="popup_error_body_text pt-4 pb-3">Please enter the details to proceed.</p>
            <div className='d-flex justify-content-center pb-4'>
              <CountdownCircleTimer
                size={40}
                strokeWidth={3}
                isPlaying
                duration={3}
                colors={"red"}
                colorsTime={[3, 0]}
              >
                {({ remainingTime }) => {
                  return <img src={cross} className="cross" onClick={() => setShowA(false)} />
                }}

              </CountdownCircleTimer>
            </div>
          </div>
        </Modal>
        <Modal
          show={showB}
          onHide={() => setShowB(false)}
          backdrop="static"
          keyboard={false}
          className="modal-dialog-coin"
        >
          <div className="popup_error">
            <div className="popup_error_head">
              <p className="popup_error_head_text text-start ps-3 pt-2 mb-1">Error !</p>
              <div className="event_line"></div>
            </div>
            <p className="popup_error_body_text pt-4 pb-3">User already exist. <br />Taking you back to Login Page.</p>
            <div className='d-flex justify-content-center pb-4'>
              <CountdownCircleTimer
                size={40}
                strokeWidth={3}
                isPlaying
                duration={3}
                colors={"red"}
                colorsTime={[3, 0]}
              >
                {({ remainingTime }) => {
                  return <img src={cross} className="cross" onClick={() => setShowB(false)} />
                }}

              </CountdownCircleTimer>
            </div>
          </div>
        </Modal>
      </div>

   
    
  )
}

export default Register