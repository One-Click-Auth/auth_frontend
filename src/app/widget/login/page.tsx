/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import { testPass, passMsg, testOTP, convertToApproxTime } from './utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { OrgData, useOrgData, useUserData } from './widgetStore'; //import zustand store to store and update org data
import Spinner from '@/components/spinner';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { IoArrowBackCircle } from 'react-icons/io5';
import MessagePanel from './components/MessagePanel';
import MfaPopup from './components/MfaPopup';
import NewPassword from './components/NewPassword';
import Password from './components/Password';
import EmailComponent from './components/Email';

declare global {
  interface Window {
    grecaptcha: any;
  }
}
export default function Widget() {
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
  const [loading2, setLoading2] = useState(false); //loading in the widget go button for subsequent reqs
  // const [loading3, setLoading3] = useState(false); //loading in mfa request button
  //state variables for erros
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //state variables to show certain messages
  const [message, setMessage] = useState('');
  const [showMsg, setShowMsg] = useState(false);

  //state variable to show the OTP input modal if a user has already enabled MFA
  const [showMfaPopup, setShowMfaPopup] = useState(false);
  //state variable to show and hide dead end message panel
  const [showMsgPanel, setShowMsgPanel] = useState(false);
  const [showBack, setShowBack] = useState(false);

  // state varibale to store the value of email typed by the user
  const [email, setEmail] = useState('');

  //state variable to store password
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');

  //state variable to store user_token temporarily
  const [currentUserToken, setCurrentUserToken] = useState('');

  //state variable to chnage the button actions
  const [mfaBtnAction, setMfaBtnAction] = useState<MfaActions>();
  const [newPassBtnAction, setNewPassBtnAction] = useState<NewPassActions>();
  const [passBtnAction, setPassBtnAction] = useState<PassActions>();

  //search the url for the param org_id to fetch details for that org
  const searchParams = useSearchParams();
  const org_id = searchParams.get('org_id');
  const { toast } = useToast();

  //fetch the org details as soon as page loads
  useEffect(() => {
    fetchOrgDetails();
  }, []);

  const loadScriptByURL = (id: string, url: string, callback: any) => {
    const isScriptExist = document.getElementById(id);
    if (!isScriptExist) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.id = id;
      script.onload = function () {
        if (callback) callback();
      };
      document.body.appendChild(script);
    }

    if (isScriptExist && callback) callback();
  };

  const getCaptchaToken = () => {
    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_CS_CAPTCHA_SECRET, {
            action: 'submit'
          })
          .then((token: string) => {
            resolve(token);
          })
          .catch((error: Error) => {
            reject(error);
          });
      });
    });
  };

  //function to create a newpassword while logging in
  const newPasswordRequest = async () => {
    setErr(false);
    setLoading2(true);
    if (testPass(newPass)) {
      setLoading2(false);
      toast({
        title: 'Invalid Passsword',
        description: passMsg,
        variant: 'destructive'
      });
      return;
    }

    try {
      const response = await fetch(
        `https://api.trustauthx.com/user/me/auth?UserToken=${currentUserToken}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            forget_password: true,
            new_password: newPass
          })
        }
      );

      const data = (await response.json()) as {
        detail?: string;
        user_token: string;
      };
      setLoading2(false);

      if (data.detail) {
        toast({
          title: 'Invalid Passsword',
          description: data.detail,
          variant: 'destructive'
        });
        return;
      }
      const { user_token } = data;
      setLoading2(false);
      if (response.status === 200) {
        setCurrentUserToken(user_token);
        setMessage('Please check your email to confirm the new password');
        setShowMsgPanel(true);
        return;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Some error occured in request, try again',
        variant: 'destructive'
      });
      setLoading2(false);
      return;
    }
  };
  //this fucntion is called when user is signing up and has to create a password and then go through further requests
  const handleNewPassword = async () => {
    setLoading2(true);
    if (testPass(newPass)) {
      setLoading2(false);
      toast({
        title: 'Invalid Passsword',
        description: passMsg,
        variant: 'destructive'
      });
      return;
    }
    try {
      const response = await fetch(
        `https://api.trustauthx.com/user/me/auth?UserToken=${currentUserToken}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            new_user_password: newPass
          })
        }
      );

      const data = (await response.json()) as any;
      setLoading2(false);
      if (data.detail) {
        //show the message of password already set
        toast({
          description: data.detail,
          variant: 'destructive'
        });
        return;
      }
      const { user_token } = data;
      if (response.status === 200) {
        setCurrentUserToken(user_token);
        //if the organization has enabled mfa which is checked by the fa2 key
        if (storeOrgData.fa2) {
          //if the organization has enabled strict mfa

          if (storeOrgData.strict_mfa) {
            //display the panel for activating MFA which will have QR code to enable the authentication and the 6 didit mfa code input field
            //construct the MFA panel with QR code and input field
            //if the user hase already enabled mf but still email is not verified
            if (storeUserData.fa2 === true) {
              //login user by putting in mfa
              //show mfa popup and make a post request by sending the mfa otp
              // setBtnAction(ButtonAction.MfaLogin);

              // setButtonAction('mfa-login');
              // setLoading2(false);
              //setShowMfaPopup(true);
              //if user has not taken any action or has not enabled fa2
              return;
            } else if (
              storeUserData.fa2 === null ||
              storeUserData.fa2 === false
            ) {
              // setBtnAction(ButtonAction.MfaActivationSignup);

              // setButtonAction('mfa-activation-signup');
              // setLoading2(false);
              //setShowMfaActivation(true);
              return;
            }

            //if the organization has not enabled strict mfa
          } else if (!storeOrgData.strict_mfa) {
            //if the user has enabled mfa
            if (storeUserData.fa2 === false || storeUserData.fa2 === null) {
              setLoading2(false);
              // setMfaInProcess(false);
              // setShowEnableMfaLink(true);
              //to handle user action after the choice to activate mfa is given
              setMessage('Please Check Your Email To Verify!');
              setShowMsgPanel(true);
              return;
            } else if (storeUserData.fa2 === true) {
              //show mfa popup to send the mfa back to backend and verify
              setMfaBtnAction(MfaActions.MfaLogin);
              setShowMfaPopup(true);
              return;
            }
          }
          //if the org has not enabled fa2
        } else if (!storeOrgData.fa2) {
          //show the user a text to verify his email addresss
          setLoading2(false);
          setMessage('Please Check Your Email To Verify!');
          setShowMsgPanel(true);
          return;
        }
      }
    } catch (error) {
      setLoading2(false);
      const errMsg = (error as Error).message;
      toast({
        description: `${errMsg}`,
        variant: 'destructive'
      });
      return;
    }
  };

  //function to handle submit mfa
  const handleMFA = async () => {
    setLoading2(true);
    if (testOTP(otp)) {
      toast({
        variant: 'destructive',
        description: 'Please put a valid OTP'
      });
      setLoading2(false);
      return;
    }
    try {
      const response = await fetch(
        `https://api.trustauthx.com/user/me/auth?UserToken=${currentUserToken}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            totp: otp
          })
        }
      );
      const data = (await response.json()) as any;
      if (response.status === 202 || response.status === 203) {
        setLoading2(false);
        setMessage('Email not verified! please check your email to verify');
        setShowMsgPanel(true);
        return;
      } else if (response.status === 200) {
        setCurrentUserToken(data.user_token);
        return router.push(data.callback_uri);
      } else if (response.status == 402) {
        setCurrentUserToken(data.user_token);
        const msg =
          data.msg +
          ',  ' +
          (data.trials < 5 ? `${data.trials} trials remaining` : 'last trial');
        toast({
          variant: 'destructive',
          description: msg
        });
        return;
      } else if (response.status === 429) {
        const timeRegex = /(\d+):(\d+):(\d+\.\d+)/;
        const matches = data.detail?.match(timeRegex);
        const time = convertToApproxTime(matches[0]);
        toast({
          variant: 'destructive',
          description: `maximum tries reached! Try again after ${
            time || 'some time'
          }`
        });
        return;
      }
    } catch (error) {
      setLoading2(false);
      const errMsg = (error as Error).message;
      toast({
        description: `${errMsg}`,
        variant: 'destructive'
      });
      return;
    }
  };

  //function to log in with password
  const loginWithPassword = async () => {
    setLoading2(true);
    if (testPass(pass)) {
      setLoading2(false);
      toast({
        title: 'Invalid Passsword',
        description: passMsg,
        variant: 'destructive'
      });
      return;
    }

    try {
      let rcToken = '';
      if (storeOrgData.bot_det) {
        rcToken = (await getCaptchaToken()) as string;
      }
      const response = await fetch(
        `https://api.trustauthx.com/user/me/auth?UserToken=${currentUserToken}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: pass,
            mfa_totp: otp ? otp : 0,
            rc_token: rcToken
          })
        }
      );
      // console.log(response);
      const data = (await response.json()) as any;
      setLoading2(false);

      const { user_token, callback_uri, redirect_url, msg } = data;

      if (response.status === 201) {
        setMessage('Kindly check your email for the Login Link');
        setShowMsgPanel(true);
        setShowMsg(true);
        return;
      }
      if (response.status === 423) {
        router.push(redirect_url);
        return;
      }
      if (response.status === 200) {
        setCurrentUserToken(user_token);
        router.push(callback_uri);
        return;
      } else if (
        response.status === 405 ||
        response.status === 402 ||
        response.status === 401
      ) {
        setCurrentUserToken(user_token);
        // console.log('401 or 405 occured');
        const msg =
          data.msg +
          ', ' +
          (data.trials < 5 ? `${data.trials} trials remaining` : 'last trial');
        toast({
          variant: 'destructive',
          description: msg
        });
        return;
      } else if (response.status === 429) {
        const timeRegex = /(\d+):(\d+):(\d+\.\d+)/;
        const matches = data.detail?.match(timeRegex);
        const time = convertToApproxTime(matches[0]);
        toast({
          variant: 'destructive',
          description: `maximum tries reached! Try again after ${
            time || 'some time'
          }`
        });
        return;
      }
    } catch (error) {
      setLoading2(false);
      const errMsg = (error as Error).message;
      toast({
        description: `${errMsg}`,
        variant: 'destructive'
      });
      return;
    }
  };
  //function to login with password and mfa
  const loginWithPasswordMFA = async () => {
    setLoading2(true);
    if (testOTP(otp)) {
      toast({
        variant: 'destructive',
        description: 'Please put a valid OTP'
      });
      setLoading2(false);
      return;
    }

    try {
      let rcToken = '';
      if (storeOrgData.bot_det) {
        rcToken = (await getCaptchaToken()) as string;
      }
      const response = await fetch(
        `https://api.trustauthx.com/user/me/auth?UserToken=${currentUserToken}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: pass,
            mfa_totp: otp ? otp : 0,
            rc_token: rcToken
          })
        }
      );
      // console.log(response);
      const data = (await response.json()) as any;
      setLoading2(false);

      const { user_token, callback_uri, redirect_url, msg } = data;
      if (response.status === 201) {
        setMessage('Kindly check your email for the Login Link');
        setShowMsgPanel(true);
        setShowMsg(true);
        return;
      }
      if (response.status === 423) {
        router.push(redirect_url);
        return;
      }
      if (response.status === 200) {
        setCurrentUserToken(user_token);
        router.push(callback_uri);
        return;
      } else if (response.status === 405 || response.status === 401) {
        setCurrentUserToken(user_token);
        // console.log('401 or 405 occured');
        const msg =
          data.msg +
          ', ' +
          (data.trials < 5 ? `${data.trials} trials remaining` : 'last trial');
        toast({
          variant: 'destructive',
          description: msg
        });
        return;
      } else if (response.status === 402) {
        const msg =
          data.msg +
          ', ' +
          (data.trials < 5 ? `${data.trials} trials remaining` : 'last trial');
        toast({
          variant: 'destructive',
          description: msg
        });
        setCurrentUserToken(user_token);
        setShowMfaPopup(false);
        // setShowMfaActivation(false);
        setShowPassword(true);
        setPassBtnAction(PassActions.ShowMfaPopup);
        return;
      } else if (response.status === 429) {
        const timeRegex = /(\d+):(\d+):(\d+\.\d+)/;
        const matches = data.detail?.match(timeRegex);
        const time = convertToApproxTime(matches[0]);
        toast({
          variant: 'destructive',
          description: `maximum tries reached! Try again after ${
            time || 'some time'
          }`
        });
        return;
      }
    } catch (error) {
      setLoading2(false);
      const errMsg = (error as Error).message;
      toast({
        description: `${errMsg}`,
        variant: 'destructive'
      });
      return;
    }
  };

  //function for passwordless login with mfa
  const passwordlessLoginMfa = async () => {
    setLoading2(true);
    if (testOTP(otp)) {
      toast({
        variant: 'destructive',
        description: 'Please put a valid OTP'
      });
      setLoading2(false);
      return;
    }
    try {
      const response = await fetch(
        `https://api.trustauthx.com/user/me/auth?UserToken=${currentUserToken}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            mfa_totp: otp ? otp : 0
          })
        }
      );
      // console.log(response);
      const data = (await response.json()) as any;
      setLoading2(false);

      const { user_token, msg } = data;
      // console.log('login with password running...');

      setCurrentUserToken(user_token);
      if (response.status === 201) {
        setMessage('Kindly check your email for the passwordless login link');
        setShowMsgPanel(true);
        setShowMsg(true);
        return;
      } else if (
        response.status === 401 ||
        response.status === 405 ||
        response.status === 402
      ) {
        const msg =
          data.msg +
          ', ' +
          (data.trials < 5 ? `${data.trials} trials remaining` : 'last trial');
        toast({
          variant: 'destructive',
          description: msg
        });
        return;
      } else if (response.status === 409) {
        const timeRegex = /(\d+):(\d+):(\d+\.\d+)/;
        const matches = data.detail?.match(timeRegex);
        const time = convertToApproxTime(matches[0]);
        toast({
          variant: 'destructive',
          description: `maximum tries reached! Try again after ${
            time || 'some time'
          }`
        });
        return;
      }
    } catch (error) {
      setLoading2(false);
      const errMsg = (error as Error).message;
      toast({
        description: `${errMsg}`,
        variant: 'destructive'
      });
      return;
    }
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
        // setShowSocial(true);

        const orgData = (await response.json()) as OrgData;

        const { org_token, ...rest } = orgData;
        const data = rest.data;

        //store the org token and data from the response to the zustand store
        setOrgData(org_token, data);
        //set loading to false and display the widget, styled according to the org data for which can be found in the data.widget
        setLoading1(false);
        if (data.bot_det) {
          loadScriptByURL(
            'recaptcha-key',
            `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CS_CAPTCHA_SECRET}`,
            () => {
              console.log('Script loaded!');
            }
          );
        }
      }
    } catch (error) {
      setLoading1(false);
      const errMsg = (error as Error).message;
      toast({
        description: `${errMsg}`,
        variant: 'destructive'
      });
      return;
    }
  };

  //first action by the user, when the user clicks on the go button after putting in the email id
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrMsg('');
    setErr(false);
    setLoading2(true);
    setOtp('');
    setPass('');
    //checking if email field is empty
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // setErrMsg('Enter a valid Email!');
      toast({
        variant: 'destructive',
        title: 'Enter a valid Email!'
      });
      setLoading2(false);
      return;
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
      const data = (await response.json()) as any;
      setLoading2(false);

      //if a 422 validation error occurs
      if (response.status === 422) {
        // setErrMsg(data.detail[0].msg);
        toast({
          description: data.detail[0].msg,
          variant: 'destructive'
        });
        return;
      }
      //if some problem occur in verifying the org_token
      if (response.status == 401 || response.status == 406) {
        setErrMsg(data.detail);
        toast({
          description: data.detail,
          variant: 'destructive'
        });
        return;
      }
      if (response.status == 403) {
        // setErrMsg('This account has been banned by the organization');
        toast({
          description: 'This account has been banned by the organization',
          variant: 'destructive'
        });
        return;
      }

      //seperating user token and user details from the response data json
      const { user_token, mfa_code, ...rest } = data;
      const userInfo = rest.public;
      setUserData(userInfo);
      setCurrentUserToken(user_token);
      //handling the response when the status code is 202, email is not verified that means signup
      //203 code will come only when strict mfa is true from org
      setShowBack(true);
      if (response.status === 202 || response.status === 203) {
        if (response.status === 203) {
          // setQr(decryptCode(mfa_code));
        }
        //set user data to the zustand store
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
                setMfaBtnAction(MfaActions.MfaLogin);
                setShowMfaPopup(true);
                return;
              } else if (userInfo.fa2 === null || userInfo.fa2 === false) {
                //if user has not taken any action
                // setBtnAction(ButtonAction.MfaActivationSignup);
                // setButtonAction('mfa-activation-signup');
                //  setShowMfaActivation(true);
                return;
              }
            } else if (!storeOrgData.strict_mfa) {
              //if the organization has not enabled strict mfa

              if (userInfo.fa2 === null || userInfo.fa2 === false) {
                //if the user has not enbaled mfa
                // setMfaInProcess(false);
                // setShowEnableMfaLink(true);
                //to handle user action after the choice to activate mfa is given
                setMessage('Please Check Your Email To Verify!');
                setShowMsgPanel(true);
                return;
              }
              //if the user has enabled mfa
              else if (userInfo.fa2 === true) {
                //show mfa popup to send the mfa back to backend and verify
                setMfaBtnAction(MfaActions.MfaLogin);
                setShowMfaPopup(true);
                return;
              }
            }
            //if the org has not enabled fa2
          } else if (!storeOrgData.fa2) {
            //show the user a text to verify his email addresss
            setMessage('Please Check Your Email To Verify!');
            setShowMsgPanel(true);
            return;
          }
        } else if (userInfo.passwordless === false) {
          //if the org has not enabled passwordless so the user will not have passwordless enabled because this is a signup route
          //if the user has already set a password before
          if (userInfo.is_password_set === true) {
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
                  // setBtnAction(ButtonAction.MfaLogin);

                  // setShowMfaPopup(true);
                  return;
                  //if user has not taken any action or has not enabled fa2
                } else if (userInfo.fa2 === null || userInfo.fa2 === false) {
                  // setBtnAction(ButtonAction.MfaActivationSignup);
                  // setButtonAction('mfa-activation-signup');

                  //  setShowMfaActivation(true);
                  return;
                }

                //if the organization has not enabled strict mfa
              } else if (!storeOrgData.strict_mfa) {
                //if the user has not enbaled mfa
                if (userInfo.fa2 === null || userInfo.fa2 === false) {
                  // setMfaInProcess(false);
                  // setShowEnableMfaLink(true);
                  //to handle user action after the choice to activate mfa is given
                  setMessage('Please Check Your Email To Verify!');
                  setShowMsgPanel(true);
                  return;
                }
                //if the user has enabled mfa
                else if (userInfo.fa2 === true) {
                  //show mfa popup to send the mfa back to backend and verify
                  setMfaBtnAction(MfaActions.MfaLogin);
                  setShowMfaPopup(true);
                  return;
                }
              }
              //if the org has not enabled fa2
            } else if (!storeOrgData.fa2) {
              //show the user a text to verify his email addresss
              setMessage('Please Check Your Email To Verify!');
              setShowMsgPanel(true);
              return;
            }
          } else if (
            userInfo.is_password_set === null ||
            userInfo.is_password_set === false
          ) {
            //ask user to put password in the for the first time in the password field and hit go button
            setNewPassBtnAction(NewPassActions.FirstPassword);
            setShowNewPassword(true);
            return;
          }
        }
      } else if (response.status === 200) {
        //handling the response when the status code is 200, email is verified and passwordless is false that means login with password
        if (storeOrgData.fa2) {
          if (storeOrgData.strict_mfa) {
            //when org has enabled strict mfa
          } else if (!storeOrgData.strict_mfa) {
            //when org has disabled strict mfa but fa2 is there, so user may choose fa2
            if (userInfo.fa2 === true) {
              //is user has enabled fa2
              setShowPassword(true);
              setPassBtnAction(PassActions.ShowMfaPopup);
              return;
            } else if (userInfo.fa2 === null || userInfo.fa2 === false) {
              setPassBtnAction(PassActions.LoginPassword);
              setShowPassword(true);
              // setMfaInProcess(true);
              // setShowEnableMfaLink(true);
              //to handle user action after the choice to activate mfa is given
              return;
            }
          }
        } else if (!storeOrgData.fa2) {
          //when MFA is disabled by thre org, just show the password field and make a post request by sending the password
          setPassBtnAction(PassActions.LoginPassword);
          setShowPassword(true);
          return;
        }
      } else if (response.status === 206) {
        // when a user is verified but has not set a password when passwordless is false maybe because org turned off passwordless
        // after user signed up
        setShowNewPassword(true);
        setNewPassBtnAction(NewPassActions.NewPasswordRequest);
        return;
      } else if (response.status == 205) {
        //when organization has set passwordless true and user is verified, means passwordless login.
        //everything is same as 200, just don't take password input and don't redirect user to callbacl_uri, instead, show the mesaage
        //on the msg panel to check the email for the login link
        setOtp('');
        if (storeOrgData.fa2) {
          if (storeOrgData.strict_mfa) {
            //when org has enabled strict mfa
            if (userInfo.fa2 === null || userInfo.fa2 === false) {
              //when user has not activated MFA yet, because the org enabled strict mfa after the user signed up
              //user will have to activate the mfa first and then proceed to login if password is set
              // }
              return;
            } else if (userInfo.fa2 === true) {
              //when user has set up the mfa
              //show the password input then the mfa popup and send the post request with both pass and mfa totp

              setShowMfaPopup(true);
              setMfaBtnAction(MfaActions.PasswordlessLoginMfa);
              return;
            }
          } else if (!storeOrgData.strict_mfa) {
            //when org has disabled strict mfa but fa2 is there, so user may choose fa2
            if (userInfo.fa2 === true) {
              //is user has enabled fa2
              setShowMfaPopup(true);
              setMfaBtnAction(MfaActions.PasswordlessLoginMfa);
              return;
            } else if (userInfo.fa2 === null || userInfo.fa2 === false) {
              // setMfaInProcess(true);
              // setShowEnableMfaLink(true);
              //to handle user action after the choice to activate mfa is given
              setMessage(
                'Kindly check your Email for the passwordless login link.'
              );
              setShowMsgPanel(true);
              return;
            }
          }
        } else if (!storeOrgData.fa2) {
          //when MFA is disabled by thre org, just show the password field and make a post request by sending the password
          setMessage(
            'Kindly check your Email for the passwordless login link.'
          );
          setShowMsgPanel(true);
          return;
        }
      }
    } catch (error) {
      const errMsg = (error as Error).message;
      toast({
        description: `${errMsg}`,
        variant: 'destructive'
      });
      setLoading2(false);
    }
  };

  const forgotPass = () => {
    setNewPassBtnAction(NewPassActions.NewPasswordRequest);
    setNewPass('');
    setShowPassword(false);
    setShowMfaPopup(false);
    setShowMsgPanel(false);
    setShowNewPassword(true);
  };

  const reset = () => {
    setPass('');
    setNewPass('');
    setOtp('');
    setShowPassword(false);
    setShowMfaPopup(false);
    setShowMsgPanel(false);
    setShowNewPassword(false);
    setShowBack(false);
  };
  //function to show mfa popup for login with password and mfa after a user puts in password and hits the button
  const showMfaPopupForLogin = () => {
    if (testPass(pass)) {
      setLoading2(false);
      toast({
        title: 'Invalid Passsword',
        description: passMsg,
        variant: 'destructive'
      });
      return;
    }
    setShowMfaPopup(true);
    setMfaBtnAction(MfaActions.LoginPasswordMfa);
  };

  enum MfaActions {
    MfaLogin,
    LoginPasswordMfa,
    PasswordlessLoginMfa
  }
  enum NewPassActions {
    NewPasswordRequest,
    FirstPassword
  }
  enum PassActions {
    LoginPassword,
    LoginPasswordMfa,
    ShowMfaPopup
  }
  const handleMfaActions = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    switch (mfaBtnAction) {
      case MfaActions.MfaLogin:
        handleMFA();
        break;
      case MfaActions.LoginPasswordMfa:
        loginWithPasswordMFA();
        break;
      case MfaActions.PasswordlessLoginMfa:
        passwordlessLoginMfa();
        break;
    }
  };

  const handleNewPassActions = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    switch (newPassBtnAction) {
      case NewPassActions.NewPasswordRequest:
        newPasswordRequest();
        break;
      case NewPassActions.FirstPassword:
        handleNewPassword();
        break;
    }
  };
  const handlePassActions = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    switch (passBtnAction) {
      case PassActions.LoginPassword:
        loginWithPassword();
        break;
      case PassActions.LoginPasswordMfa:
        loginWithPasswordMFA();
        break;
      case PassActions.ShowMfaPopup:
        showMfaPopupForLogin();
        break;
    }
  };

  const widget = storeOrgData.widget;

  const cardStyle = {
    background: `linear-gradient(to bottom, ${widget.color6},${widget.color7})`,
    boxShadow: `0 10px 15px -3px ${widget.color8}, 0 4px 6px -4px ${widget.color8}`,
    border: `${widget.widget_border.width}px solid ${widget.widget_border.color}`,
    borderRadius: `${widget.widget_border.radius}px`
  };
  const bgStyle = {
    background: `linear-gradient(to bottom right,  ${widget.color3} 0%, ${widget.color4} 50%,${widget.color5} 100%)`
  };

  return (
    <>
      {loading1 ? (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-slate-300">
          <Spinner color="#1058de" opacity={0.6} size={100} />
        </div>
      ) : (
        <div
          style={bgStyle}
          className="w-[100vw] h-[100vh] min-h-fit flex items-center justify-center"
        >
          <div
            className={` h-full w-full flex ${
              storeOrgData.decor_img ? 'flex-col 2md:flex-row' : ''
            } items-center`}
          >
            <div
              className={`flex items-center justify-center w-full ${
                storeOrgData.decor_img ? '2md:w-2/3 ' : ''
              } my-4`}
            >
              <Card
                className="h-fit  w-[390px] max-w-[90vw] max-h-[90vh] pt-14 pb-10 px-4 relative"
                style={cardStyle}
              >
                {showBack && (
                  <button
                    className="absolute top-4 opacity-50 hover:opacity-80 transition-opacity"
                    onClick={reset}
                  >
                    <IoArrowBackCircle size={30} color={widget.color11} />
                  </button>
                )}
                <CardContent>
                  <div className="space-y-10 flex-1 h-full justify-center flex flex-col">
                    {showMsgPanel ? (
                      <MessagePanel email={email} message={message} />
                    ) : showMfaPopup ? (
                      <MfaPopup
                        otp={otp}
                        setOtp={setOtp}
                        email={email}
                        handleMfaActions={handleMfaActions}
                        loading={loading2}
                      />
                    ) : showNewPassword ? (
                      <NewPassword
                        email={email}
                        loading={loading2}
                        newPass={newPass}
                        setNewPass={setNewPass}
                        handleNewPassActions={handleNewPassActions}
                      />
                    ) : showPassword ? (
                      <Password
                        email={email}
                        loading={loading2}
                        pass={pass}
                        setPass={setPass}
                        handlePassActions={handlePassActions}
                        forgotPass={forgotPass}
                      />
                    ) : (
                      <EmailComponent
                        email={email}
                        setEmail={setEmail}
                        loading={loading2}
                        handleSubmit={handleSubmit}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            {storeOrgData.decor_img && (
              <div className="flex justify-center items-center w-full h-full mt-6 2md:w-auto 2md:mt-0">
                <Image
                  className="h-full w-full 2md:w-auto"
                  src={storeOrgData.decor_img}
                  alt="Image"
                  width={1000}
                  height={1000}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
