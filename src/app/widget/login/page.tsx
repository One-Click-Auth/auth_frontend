'use client';
import CryptoJS from 'crypto-js';
import { QRCodeSVG } from 'qrcode.react';
import OtpInput from 'react-otp-input';

import axios from 'axios';
import { Button } from '@/components/ui/Button';
import { ChevronRightIcon } from '@radix-ui/react-icons';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useOrgData, useUserData } from './widgetStore'; //import zustand store to store and update org data
import widgetStyle from './widget.module.css';

const Login = () => {
  //store function to set the org data in the store. It takes two arguments org token and org data.
  const setOrgData = useOrgData(state => state.setOrgData);
  //to fetch the org token from the store
  const storeOrg_token = useOrgData(state => state.org_token);
  //to fetch the org data from the store
  const storeOrgData = useOrgData(state => state.data);

  //to fetch the user data from store
  const storeUserData = useUserData(state => state.data);
  //to set the user data in the store
  const setUserData = useUserData(state => state.setUserData);
  const router = useRouter();
  //state variable to set otp
  const [otp, setOtp] = useState('');
  //state variables for loading
  const [loading1, setLoading1] = useState(true); //loading before the widget appears
  const [loading2, setLoading2] = useState(false); //loading in the widget itself for subsequent reqs
  //state variables for erros
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  // state variable to show password input box
  const [showpassField, setShowPassField] = useState(false);
  //state variables to show certain messages
  const [message, setMessage] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  //state varibale to show MFA activation panel where QR code along with an MFA code input field will be shown
  const [showMfaActivation, setShowMfaActivation] = useState(false);

  //state variable to show the OTP input modal if a user has already enabled MFA
  const [showMfaPopup, setShowMfaPopup] = useState(false);
  //state variable to show and hide dead end message panel
  const [showMsgPanel, setShowMsgPanel] = useState(false);

  //state varibale to show the enable mfa link to take the user input whether he wants to enable mfa or not
  const [showEnableMfaLink, setShowEnableMfaLink] = useState(false);
  // state varibale to store whether the user has selected enable mfa or not
  const [enableUserMfa, setEnablUsereMfa] = useState(false);

  // state varibale to store the value of email typed by the user
  const [email, setEmail] = useState('');

  //state variable to store password
  const [pass, setPass] = useState('');
  //state variable to store user_token temporarily
  const [currentUserToken, setCurrentUserToken] = useState('');
  //state variable to store mfa code

  //state variable to set encoded qr code
  const [qr, setQr] = useState('');
  //state variable to chnage the button actions
  const [buttonAction, setButtonAction] = useState('');

  //search the url for the param org_id to fetch details for that org
  const searchParams = useSearchParams();
  const org_id = searchParams.get('org_id');

  //fetch the org details as soon as page loads
  useEffect(() => {
    fetchOrgDetails();
  }, []);

  //function to set generate QR code
  const generateQr = (mfa: string): void => {
    console.log('QR generator ran');
    console.log(mfa);
    const bytes = CryptoJS.AES.decrypt(mfa, 'asjdhkasjdh');
    const decoded = bytes.toString(CryptoJS.enc.Utf8);
    console.log(decoded);
    setQr(decoded);
  };

  //function to handle when the user decides to enable mfa from his side
  const handleUserMfa = () => {
    if (enableUserMfa) {
      //display the panel for activating MFA which will have QR code to enable the authentication and the 6 didit mfa code input field
      //construct the MFA panel with QR code and input field
      setShowMfaActivation(true);
    } else if (!enableUserMfa) {
      //email will be sent to the email id given by the user to verify the email address
      setMessage('Verify your email address to continue');
    }
  };
  //this fucntion is called when user is signing up and has to create a passeord and then go through further requests
  const handleNewPassword = async () => {
    setMessage('');
    setErr(false);
    setErrMsg('');
    setShowMsg(false);
    setLoading2(true);
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,20}$/.test(pass)) {
      //show password error: Password must be between 8 and 20 characters long,
      //contain at least one letter and one digit, and can
      //include special characters.
      setLoading2(false);
      setErrMsg(
        'Password must be between 8 and 20 characters long,contain at least one letter and one digit, and can include special characters'
      );
      return setErr(true);
    }
    console.log(currentUserToken);
    //ask user to put the password in the password field and hit go button

    try {
      const response = await axios.put(
        `https://api.trustauthx.com/user/me/auth`,
        {
          new_user_password: pass
        },
        {
          params: {
            UserToken: currentUserToken
          }
        }
      );
      console.log(response);
      // const data = await response.json()
      const data = response.data;
      setLoading2(false);
      if (data.detail) {
        //show the message of password already set
        setErrMsg(data.detail);
        return setErr(true);
      }
      const { status, user_token } = data;
      if (status === true) {
        setCurrentUserToken(user_token);
        //if the organization has enabled mfa which is checked by the fa2 key
        if (storeOrgData.fa2) {
          //if the organization has enabled strict mfa

          if (storeOrgData.strict_mfa) {
            //display the panel for activating MFA which will have QR code to enable the authentication and the 6 didit mfa code input field
            //construct the MFA panel with QR code and input field

            return;

            //if the organization has not enabled strict mfa
          } else if (!storeOrgData.strict_mfa) {
            //if the user has not enbaled mfa
            if (storeUserData.fa2 === null || storeUserData.fa2 === false) {
              //display a text which will ask if the user wants to enable the mfa, clicking on it will set the enableUsermfa to true
              //if the user clicks on the enable mfa then show the user the otp activation panel
              //if user does not click on the enable mfa and proceeds to click on the go button, then ask
              //user to verify the email
              //the handleUserMfa function will handle later requests
              setShowEnableMfaLink(true);
              setButtonAction('verify_email');
            }
            //if the user has enabled mfa
            else if (storeUserData.fa2 === true) {
              //show mfa popup to send the mfa back to backend and verify
              return handleMFA();
            }
          }
          //if the org has not enabled fa2
        } else if (!storeOrgData.fa2) {
          //show the user a text to verify his email addresss
        }
      } else if (status === false) {
        //
      }
    } catch (error) {
      // console.log(error)
    }
  };

  //fucntion to handle when the user is logging in with password
  const handlePasswordLogin = async () => {
    //take the password from the user and proceed to call for logging in
    try {
      const response = await axios.post(
        `/api/user`,
        {
          password: pass
        },
        {
          params: {
            UserToken: currentUserToken
          },
          maxBodyLength: Infinity,
          maxContentLength: Infinity
        }
      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //function to be called when a user has to activate MFA
  const handleMFActivation = async (login: boolean) => {
    setErr(false);
    setShowMsg(false);
    setLoading2(true);

    try {
      const response = await axios.put(
        `https://api.trustauthx.com/user/me/auth`,
        {
          totp: otp,
          switch_mfa: true
        },
        {
          params: {
            UserToken: currentUserToken
          }
        }
      );
      const data = response.data;
      if (response.status === 200) {
        const { user_token } = data;
        setCurrentUserToken(user_token);

        setLoading2(false);
        if (login) {
          //send the user data to the login post
          const response = await axios.post(
            `https://api.trustauthx.com/user/me/auth`,
            {
              totp: otp,
              password: pass
            },
            {
              params: {
                UserToken: currentUserToken
              }
            }
          );
          console.log(response);
        } else {
          setMessage('MFA Successfully Activated!');
          setMessage('MFA Successfully Activated!');
          setShowMsgPanel(true);
          setShowMsg(true);
          setShowMsgPanel(true);
        }
      }
    } catch (error) {
      setLoading2(false);

      console.log(error);
    }
  };

  //function to handle submit mfa
  const handleMFA = async () => {
    try {
      const response = await axios.post(
        `https://api.trustauthx.com/user/me/auth`,
        {
          totp: otp
        },
        {
          params: {
            UserToken: currentUserToken
          }
        }
      );
      console.log(response);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    return;
  };

  //to fetch organization detail before widget appears to style the widget based on the styles applied by the org
  //and get the services and settings set by the org.
  const fetchOrgDetails = async () => {
    try {
      setLoading1(true);
      const response = await fetch(
        `https://api.trustauthx.com/settings/auth?org_id=${org_id}`,
        {
          method: 'GET'
        }
      );
      // console.log(response);
      if (response.status === 406) {
        //if the org id is wrong redirect to the trusauthx landing html page
        return router.push('https://www.trustauthx.com');
      }
      if (response.status === 200) {
        const orgData = await response.json();

        const { org_token, ...rest } = orgData;
        const data = rest.data;
        //store the org token and data from the response to the zustand store
        setOrgData(org_token, data);
        //set loading to false and display the widget, styled according to the org data for which can be found in the data.widget
        setLoading1(false);
      }
    } catch (err) {
      console.log(err);
      setLoading1(false);
      console.log('some error occured, not able to get the org response');
    }
  };

  //first action by the user, when the user clicks on the go button after putting in the email
  const handleSubmit = async () => {
    setErrMsg('');
    setErr(false);
    setLoading2(true);
    //checking if email field is empty
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrMsg('Enter a valid Email!');
      setLoading2(false);
      return setErr(true);
    }
    try {
      //get the user response which has a user token and public details
      const response = await fetch(
        `https://api.trustauthx.com/user/me/auth?usr=${email}&OrgToken=${storeOrg_token}`,
        {
          method: 'GET'
        }
      );
      // console.log(response)
      const data = await response.json();
      // console.log(data)

      //if a 422 validation error occurs
      if (response.status === 422) {
        setErrMsg(data.detail[0].msg);
        setLoading2(false);
        return setErr(true);
      }
      //if some problem occur in verifying the org_token
      if (response.status == 401 || response.status == 406) {
        setErrMsg(data.detail);
        setLoading2(false);
        return setErr(true);
      }
      console.log(response.status);
      //seperating user token and user details from the response data json
      const { user_token, mfa_code, ...rest } = data;
      const userInfo = rest.public;
      setCurrentUserToken(user_token);
      //handling the response when the status code is 202, email is not verified that means signup
      //203 code will come only when strict mfa is true from org
      if (response.status === 202 || response.status === 203) {
        if (response.status === 203) {
          console.log(mfa_code);
          generateQr(mfa_code);
        }

        console.log(userInfo);
        //set user data to the zustand store
        setUserData(userInfo);
        //if the org has enabled passwordless so the user will have passwordless already enabled because this is a signup route
        if (userInfo.passwordless === true) {
          //if the organization has enabled mfa which is checked by the fa2 key
          if (storeOrgData.fa2) {
            //if the organization has enabled strict mfa

            if (storeOrgData.strict_mfa) {
              //display the panel for activating MFA which will have QR code to enable the authentication and the 6 didit mfa code input field
              //construct the MFA panel with QR code and input field
              //if the user hase already enabled mf but still email is not verified
              if (userInfo.fa2 === true) {
                //login user by putting in mfa
                //show mfa popup and make a post request by sending the mfa otp
                setOtp('');
                setButtonAction('mfa-login');
                setLoading2(false);
                return setShowMfaPopup(true);
                //if user has not taken any action or has not enabled fa2
              } else if (userInfo.fa2 === null || userInfo.fa2 === false) {
                setOtp('');
                setButtonAction('mfa-activation-signup');
                setLoading2(false);
                return setShowMfaActivation(true);
              }

              //if the organization has not enabled strict mfa
            } else if (!storeOrgData.strict_mfa) {
              //if the user has not enbaled mfa
              if (userInfo.fa2 === null || userInfo.fa2 === false) {
                //display a text which will ask if the user wants to enable the mfa, clicking on it will set the enableUsermfa to true
                //if the user clicks on the enable mfa then show the user the otp activation panel
                //if user does not click on the enable mfa and proceeds to click on the go button, then ask
                //user to verify the email
                //the handleUserMfa function will handle later requests
                setShowEnableMfaLink(true);
                setButtonAction('verify_email');
              }
              //if the user has enabled mfa
              else if (userInfo.fa2 === true) {
                //show mfa popup to send the mfa back to backend and verify
                return handleMFA();
              }
            }
            //if the org has not enabled fa2
          } else if (!storeOrgData.fa2) {
            //show the user a text to verify his email addresss
          }
        }
        //if the org has not enabled passwordless so the user will not have passwordless enabled because this is a signup route
        else if (userInfo.passwordless === false) {
          //if the user has already set a password before
          if (userInfo.is_password_set === true) {
            if (storeOrgData.fa2) {
              //if the organization has enabled strict mfa
              if (storeOrgData.strict_mfa) {
                //display the panel for activating MFA which will have QR code to enable the authentication and the 6 didit mfa code input field
                //construct the MFA panel with QR code and input field

                return;

                //if the organization has not enabled strict mfa
              } else if (!storeOrgData.strict_mfa) {
                //if the user has not enbaled mfa
                if (userInfo.fa2 === null || userInfo.fa2 === false) {
                  //display a text which will ask if the user wants to enable the mfa, clicking on it will set the enableUsermfa to true
                  //if the user clicks on the enable mfa then show the user the otp activation panel
                  //if user does not click on the enable mfa and proceeds to click on the go button, then ask
                  //user to verify the email
                  //the handleUserMfa function will handle later requests
                  setShowEnableMfaLink(true);
                  setButtonAction('verify_email');
                }
                //if the user has enabled mfa
                else if (userInfo.fa2 === true) {
                  //show mfa popup to send the mfa back to backend and verify
                  return handleMFA();
                }
              }
              //if the org has not enabled fa2
            } else if (!storeOrgData.fa2) {
              //show the user a text to verify his email addresss
            }
          } else if (
            userInfo.is_password_set === null ||
            userInfo.is_password_set === false
          ) {
            //ask user to put password in the password field and hit go button
            setButtonAction('new-password');
            setShowPassField(true);
          }
        }
        setLoading2(false);
        //handling the response when the status code is 202, email is verified that mean login
      } else if (response.status === 200) {
        //if the org has set passwordless so the user will also have passwordless
        if (userInfo.passwordless === true) {
          //if the org has set the mfa
          if (storeOrgData.fa2) {
            //show the mfa popup to put in the the mfa code in the field
            //handle rest of the process in the the handle mfa function
            return setShowMfaPopup(true);
          } else if (!storeOrgData.fa2) {
            //show user the text, check your email for the link
          }
          //if the org has not enabled passwordless
        } else if (userInfo.passwordless === false) {
          //show  the user the password input field and handle the later request in the password-login function
          setButtonAction('password-login');
        }
      } else if (response.status == 205) {
        //logic

        console.log(205);
      }
      setLoading2(false);
    } catch (error) {
      console.log(error);
      setLoading2(false);
    }
  };

  //change the action of the button based on what the user is doing
  const handleGo = () => {
    switch (buttonAction) {
      case 'verify_email':
        handleUserMfa();
        break;
      case 'new-password':
        handleNewPassword();
        break;
      case 'password-login':
        handlePasswordLogin();
        break;
      case 'mfa-login':
        handleMFA();
        break;
      case 'mfa-activation-signup':
        handleMFActivation(false);
        break;
      case 'mfa-activation-login':
        handleMFActivation(true);
        break;
      default:
        handleSubmit();
        break;
    }
  };

  return (
    <>
      {loading1 ? (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center ">
          <div className="border-t-transparent rounded-full border-solid animate-spin border-blue-400 border-8  h-20 w-20"></div>
        </div>
      ) : (
        <div className="top-1/2 flex justify-center items-center absolute  left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[350px]  bg-white border-[1px] border-gray-300 rounded-xl shadow-2xl ">
          <div className="flex flex-col items-center p-[20px] mr-0 !important ">
            <div className="flex flex-col justify-center items-center ">
              <Image
                width={60}
                height={60}
                src={
                  'https://flitchcoin.s3.eu-west-2.amazonaws.com/authxlogo.svg'
                }
                alt="AuthX logo"
              />
              {showMsg ? <span className="text-blue-400">{message}</span> : ''}

              <div className="mt-1">
                <span className="text-xl font-semibold">
                  {storeOrgData.widget.name}
                </span>
              </div>
              {!showMsgPanel ? (
                <div className="mt-4">
                  <span className="text-base text-4md text-slate-900">
                    {showMfaActivation ? 'Continue to register MFA' : 'Login'}
                  </span>
                </div>
              ) : (
                ''
              )}
            </div>
            {showMsgPanel ? (
              <div></div>
            ) : (
              <div
                className={`w-[260px] sm:w-[300px] mt-[30px] flex flex-col items-center`}
              >
                {showMfaActivation ? (
                  <div
                    id="mfaActivationPanel"
                    className="flex flex-col items-center"
                  >
                    <span className="mb-2 text-center">
                      Scan the code using Google authenticator
                    </span>

                    <QRCodeSVG value={qr} />
                    <span className="my-2">Enter OTP to turn on MFA</span>
                    <OtpInput
                      containerStyle="grid grid-cols-2 justify-center gap-1"
                      inputStyle="!w-8 h-8 md:!w-10 mt-4 border border-blue-400 focus:ring-blue-400 sm:h-8 md:h-10 p-0 text-center rounded-xl"
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderSeparator={<span></span>}
                      renderInput={props => <input {...props} />}
                    />
                  </div>
                ) : showMfaPopup ? (
                  <div id="mfaPopup" className="flex flex-col items-center">
                    <span className="mb-2 text-center">Enter the MFA code</span>

                    <OtpInput
                      containerStyle="grid grid-cols-2 justify-center gap-1"
                      inputStyle="!w-8 h-8 md:!w-10 mt-4 border border-blue-400 focus:ring-blue-400 sm:h-8 md:h-10 p-0 text-center rounded-xl"
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderSeparator={<span></span>}
                      renderInput={props => <input {...props} />}
                    />
                  </div>
                ) : showpassField ? (
                  <div className={`${widgetStyle.materialTextfield} w-full `}>
                    <input
                      className={`${widgetStyle.input}  `}
                      id="password"
                      type="password"
                      value={pass}
                      placeholder=" "
                      onChange={e => setPass(e.target.value)}
                    />
                    <label className={widgetStyle.label}>Password</label>
                  </div>
                ) : (
                  <div className={`${widgetStyle.materialTextfield} w-full  `}>
                    <input
                      className={`${widgetStyle.input}  `}
                      id="email"
                      type="email"
                      value={email}
                      placeholder=" "
                      onChange={e => setEmail(e.target.value)}
                    />
                    <label className={widgetStyle.label}>Email</label>
                  </div>
                )}

                {err ? <span className="text-red-500">{errMsg}</span> : ''}
                {showEnableMfaLink ? (
                  <span
                    className="text-blue-400 text-md cursor-pointer hover:text-blue-600 text-center"
                    onClick={() => setEnablUsereMfa(true)}
                  >
                    Do you want to enable MFA? Click here!
                  </span>
                ) : (
                  ''
                )}
                <div className="w-full mt-8">
                  <Button
                    className={`w-full h-12 text-white bg-black hover:bg-gray-800`}
                    onClick={loading2 ? undefined : handleGo}
                  >
                    <span className="ml-6 text-xl">
                      {loading2 ? (
                        <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-8 w-8"></div>
                      ) : (
                        'Go !!'
                      )}
                    </span>
                    {loading2 ? '' : <ChevronRightIcon className="ml-3" />}
                  </Button>
                </div>
              </div>
            )}
            {/* <div className="flex w-full justify-center mt-[60px]">
          <div className="mt-4 w-[136px] border-t-2 border-gray-900 "></div>
          <span className="p-1"> or </span>
          <div className="mt-4 w-[136px] border-t-2 border-gray-900 "></div>
        </div>
        <div className="flex mt-[60px] px-[6] justify-around">
          <form method="get" action={`${API_DOMAIN}/signup/github`}>
            <Button type="submit">
              <Icons.gitHub className=" h-9 w-9" />
            </Button>
          </form>
        </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
