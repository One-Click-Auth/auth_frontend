/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import OtpInput from 'react-otp-input';
import { testPass, passMsg, testOTP, convertToApproxTime } from './utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { OrgData, useOrgData, useUserData } from './widgetStore'; //import zustand store to store and update org data
import github from './github-mark.svg';
import microsoft from './microsoft.svg';
import google from './google.svg';
import discord from './discord.svg';
import Spinner from '@/components/spinner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { MdEmail } from 'react-icons/md';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { PasswordCheck } from './components/PasswodCheck';
import { useToast } from '@/components/ui/use-toast';
import { IoArrowBackCircle } from 'react-icons/io5';

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
  const [showpass, setShowpass] = useState(false);

  //state variable to store user_token temporarily
  const [currentUserToken, setCurrentUserToken] = useState('');
  //state variable to store mfa code

  //state variable to chnage the button actions
  const [mfaBtnAction, setMfaBtnAction] = useState<MfaActions>();
  const [newPassBtnAction, setNewPassBtnAction] = useState<NewPassActions>();
  const [passBtnAction, setPassBtnAction] = useState<PassActions>();
  const [disabled1, setDisabled1] = useState(true);
  const [showChecks, setShowChecks] = useState<boolean>(false);

  useEffect(() => {
    if (newPass.length > 0) {
      setShowChecks(true);
    } else {
      setShowChecks(false);
    }
    if (!testPass(newPass)) {
      setDisabled1(false);
    } else {
      setDisabled1(true);
    }
  }, [newPass]);

  //search the url for the param org_id to fetch details for that org
  const searchParams = useSearchParams();
  const org_id = searchParams.get('org_id');

  //fetch the org details as soon as page loads
  useEffect(() => {
    fetchOrgDetails();
  }, []);
  const { toast } = useToast();

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
            mfa_totp: otp ? otp : 0
          })
        }
      );
      // console.log(response);
      const data = (await response.json()) as any;
      setLoading2(false);

      const { user_token, callback_uri, msg } = data;
      console.log(response);
      console.log(currentUserToken);
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
            mfa_totp: otp ? otp : 0
          })
        }
      );
      // console.log(response);
      const data = (await response.json()) as any;
      setLoading2(false);

      const { user_token, callback_uri, msg } = data;
      console.log(response);
      console.log(currentUserToken);
      if (response.status === 200) {
        setCurrentUserToken(user_token);
        router.push(callback_uri);
        console.log(msg);
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

  //function for passwordless login without mfa
  const passwordlessLogin = async () => {
    setLoading2(true);

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
            mfa_totp: 0
          })
        }
      );
      // console.log(response);
      const data = (await response.json()) as any;
      setLoading2(false);

      const { user_token, msg } = data;
      console.log('login with password running...');

      setCurrentUserToken(user_token);
      console.log(currentUserToken);
      if (response.status === 201) {
        setMessage(msg);
        setShowMsgPanel(true);
        return;
      } else if (
        response.status === 401 ||
        response.status === 405 ||
        response.status === 402
      ) {
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
      console.log(currentUserToken);
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
  const handleSubmit = async () => {
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
            // if (userInfo.fa2 === null || userInfo.fa2 === false) {
            //   //when user has not activated MFA yet, because the org enabled strict mfa after the user signed up
            //   //user will have to activate the mfa first and then proceed to login if password is set
            //   try {
            //     const res = await fetch(
            //       `https://api.trustauthx.com/user/me/auth?UserToken=${user_token}`,
            //       {
            //         method: 'PUT',
            //         headers: {
            //           'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({
            //           switch_mfa: true
            //         })
            //       }
            //     );
            //     const resData = (await res.json()) as any;
            //     if (res.status === 203) {
            //       setCurrentUserToken(resData.user_token);
            //       setQr(decryptCode(resData.mfa_code));
            //       setShowEnableMfaLink(false);
            //       setBtnAction(ButtonAction.MfaActivationLogin);
            //       setButtonAction('mfa-activation-login');
            //       setShowMfaActivation(true);
            //       return;
            //     }
            //   } catch (error) {
            //     setLoading2(false);
            //     return console.log(
            //       'some error occured in sending the request for  mfa code',
            //       error
            //     );
            //   }
            // } else if (userInfo.fa2 === true) {
            //   //when user has set up the mfa
            //   //show the password input then the mfa popup and send the post request with both pass and mfa totp
            //   setShowPassField(true);
            //   setBtnAction(ButtonAction.ShowMfaPopup);
            //   setButtonAction('showMfaPopup');
            //   return;
            // }
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
  //functions for social login
  const socialLogin = (social: string) => {
    const url = `https://api.trustauthx.com/single/social/signup?provider=${social}&OrgToken=${storeOrg_token}`;
    // reset();
    window.location.href = url; //next router was creating a problem in routing back that's why window object is being used
  };

  const forgotPass = () => {
    setNewPassBtnAction(NewPassActions.NewPasswordRequest);
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
  const handleMfaActions = () => {
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

  const handleNewPassActions = () => {
    switch (newPassBtnAction) {
      case NewPassActions.NewPasswordRequest:
        newPasswordRequest();
        break;
      case NewPassActions.FirstPassword:
        handleNewPassword();
        break;
    }
  };
  const handlePassActions = () => {
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

  const socialValues = Object.keys(storeOrgData.social);
  const show = socialValues.length > 0;

  const widget = storeOrgData.widget;
  const goButtonStyle = {
    color: widget.color9,
    background: `linear-gradient(to right, ${widget.color0} 0%,${widget.color1} 50%,${widget.color2} 100% )`,
    border: `${widget.button.width}px solid`,
    borderRadius: `${widget.button.radius}px`,
    borderColor: widget.button.bc
  };
  const lineStyle = {
    borderColor: widget.color12,
    color: widget.color12
  };
  const cardStyle = {
    background: `linear-gradient(to bottom, ${widget.color6},${widget.color7})`,
    boxShadow: `0 10px 15px -3px ${widget.color8}, 0 4px 6px -4px ${widget.color8}`,
    border: `${widget.widget_border.width}px solid ${widget.widget_border.color}`,
    borderRadius: `${widget.widget_border.radius}px`
  };
  const bgStyle = {
    background: `linear-gradient(to bottom right,  ${widget.color3} 0%, ${widget.color4} 50%,${widget.color5} 100%)`
  };
  const orgNameStyle = {
    color: `${widget.color10}`
  };
  const greetingStyle = {
    color: `${widget.color11}`
  };
  const inputStyle = {
    borderColor: ` ${widget.input_border.color}`,
    borderRadius: `${widget.input_border.radius}px`
  };
  const placeholder = `placeholder:text-[${widget.input_border.color}]`;
  const otpInputStyle = {
    borderRadius: '0.75rem',
    border: '1.3px solid',
    borderColor: ` ${widget.input_border.color}`,
    // border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500
    background: 'transparent',
    height: '2.5rem',
    width: '2.5rem'
  };
  const labelStyle = {
    color: ` ${widget.input_border.color}`
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
                  <div>
                    <div className="w-full relative  flex mb-4 items-center justify-center">
                      <Avatar className="w-16 h-16 rounded-none">
                        <AvatarImage
                          src={widget.logo_url}
                          width={80}
                          alt="Organisation Logo"
                        />
                        <AvatarFallback delayMs={1000}>LOGO</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex flex-col gap-8  ">
                      <div className="flex items-center justify-center flex-col lg:px-4 gap-8">
                        <h1
                          className="text-3xl font-medium   text-center break-words w-44 mt-0.5 "
                          style={greetingStyle}
                        >
                          Hi !
                        </h1>
                        <p
                          className="w-full break-words text-center"
                          style={orgNameStyle}
                        >
                          {email}
                        </p>
                        <span className="relative">
                          {/* <FaPaperPlane style={{color:`${widget.input_border.color}`}} size={20} className='relative  -right-6'/> */}
                          <MdEmail
                            style={{ color: ` ${widget.input_border.color}` }}
                            size={50}
                          />
                        </span>
                      </div>

                      <div className="h-[1px] w-full bg-muted-foreground my-6" />

                      <div className="flex flex-col items-center gap-8 ">
                        <p
                          className="relative text-center text-lg w-full py-2"
                          style={{ color: widget.color11 }}
                        >
                          {message}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : showMfaPopup ? (
                  <>
                    <div className="flex flex-col gap-8  ">
                      <div className="flex items-center justify-center flex-col lg:px-4 gap-6">
                        <Avatar className="w-16 h-16 rounded-none">
                          <AvatarImage
                            src={widget.logo_url}
                            width={80}
                            alt="Organisation Logo"
                          />
                          <AvatarFallback delayMs={1000}>LOGO</AvatarFallback>
                        </Avatar>
                        <h1
                          className="text-3xl font-medium   text-center break-words w-44 mt-0.5 "
                          style={greetingStyle}
                        >
                          Hi !
                        </h1>
                        <p
                          className=" w-full break-words text-center"
                          style={orgNameStyle}
                        >
                          {email}
                        </p>
                      </div>

                      <div className="flex flex-col justify-center items-center mt-6 gap-8  ">
                        <p className="text-center ">Enter OTP to Continue</p>

                        <OtpInput
                          containerStyle="grid justify-center gap-1 sm:gap-[0.32rem] w-full"
                          inputStyle={otpInputStyle}
                          value={otp}
                          onChange={setOtp}
                          inputType="tel"
                          numInputs={6}
                          renderSeparator={<span></span>}
                          renderInput={props => <input {...props} />}
                        />

                        <Button
                          style={goButtonStyle}
                          className="w-full h-[2.8rem] mb-4"
                          disabled={loading2}
                          onClick={handleMfaActions}
                        >
                          {loading2 ? (
                            <div>
                              <Spinner size={20} color={widget.color9} />
                            </div>
                          ) : (
                            <span>Continue</span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </>
                ) : showNewPassword ? (
                  <div className="flex flex-col gap-6 sm:px-4">
                    <div className="flex items-center justify-center flex-col lg:px-4 gap-4">
                      <Avatar className="w-16 h-16 rounded-none">
                        <AvatarImage
                          src={widget.logo_url}
                          width={80}
                          alt="Organisation Logo"
                        />
                        <AvatarFallback delayMs={1000}>LOGO</AvatarFallback>
                      </Avatar>
                      <p
                        className=" w-full break-words text-center"
                        style={orgNameStyle}
                      >
                        {email}
                      </p>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-8  ">
                      <p className="text-center" style={greetingStyle}>
                        Create a new Password for your <br />{' '}
                        <b>{widget.name} </b>account{' '}
                      </p>
                      <div className="relative w-full">
                        <Input
                          name="newpass"
                          id="newPass"
                          value={newPass}
                          onChange={e => setNewPass(e.target.value)}
                          style={inputStyle}
                          className="w-full h-[2.8rem]  border-[1.4px] pl-4 pr-8 py-0 mb-2 focus-visible:ring-0 bg-transparent"
                          placeholder="password"
                          type={showpass ? 'text' : 'password'}
                        />

                        <button
                          className="absolute right-3 top-3 opacity-60"
                          onClick={() => setShowpass(!showpass)}
                        >
                          {showpass ? (
                            <VscEye size={20} />
                          ) : (
                            <VscEyeClosed size={20} />
                          )}
                        </button>
                        <div
                          className={`${
                            !showChecks
                              ? 'scale-y-0 h-0 opacity-0 overflow-hidden'
                              : 'scale-y-100 opacity-100 h-[185px]'
                          } transition-all ease-in-out`}
                        >
                          <PasswordCheck pass={newPass} />
                        </div>
                      </div>

                      <Button
                        style={goButtonStyle}
                        className="w-full h-[2.8rem] mb-4 transition-all "
                        disabled={loading2 || disabled1}
                        onClick={handleNewPassActions}
                      >
                        {loading2 ? (
                          <div>
                            <Spinner size={20} color={widget.color9} />
                          </div>
                        ) : (
                          <span>Continue</span>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : showPassword ? (
                  <div className="flex flex-col gap-8 sm:px-4">
                    <div className="flex items-center justify-center flex-col lg:px-4 gap-4">
                      <Avatar className="w-16 h-16 rounded-none">
                        <AvatarImage
                          src={widget.logo_url}
                          width={80}
                          alt="Organisation Logo"
                        />
                        <AvatarFallback delayMs={1000}>LOGO</AvatarFallback>
                      </Avatar>
                      <h1
                        className="text-3xl font-medium   text-center break-words w-44 mt-0.5 "
                        style={greetingStyle}
                      >
                        Hi !
                      </h1>
                      <p
                        className=" w-full break-words text-center"
                        style={orgNameStyle}
                      >
                        {email}
                      </p>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-8 mt-6 ">
                      <p className="text-center" style={greetingStyle}>
                        Enter your Password
                      </p>
                      <div className="relative w-full">
                        <Input
                          name="pass"
                          id="pass"
                          value={pass}
                          onChange={e => setPass(e.target.value)}
                          style={inputStyle}
                          className="w-full h-[2.8rem] border-[1.4px] pl-4 pr-8 py-0 mb-2 focus-visible:ring-0 bg-transparent"
                          placeholder="password"
                          type={showpass ? 'text' : 'password'}
                        />

                        <button
                          className="absolute right-3 top-3 opacity-60"
                          onClick={() => setShowpass(!showpass)}
                        >
                          {showpass ? (
                            <VscEye size={20} />
                          ) : (
                            <VscEyeClosed size={20} />
                          )}
                        </button>
                      </div>

                      <Button
                        style={goButtonStyle}
                        className="w-full h-[2.8rem] "
                        disabled={loading2}
                        onClick={handlePassActions}
                      >
                        {loading2 ? (
                          <div>
                            <Spinner size={20} color={widget.color9} />
                          </div>
                        ) : (
                          <span>Continue</span>
                        )}
                      </Button>
                      <div>
                        <Button
                          style={{ color: widget.input_border.color }}
                          className="bg-transparent shadow-none w-fit  h-fit p-0 hover:bg-transparent"
                          onClick={forgotPass}
                        >
                          Forgot password
                        </Button>
                      </div>
                    </div>
                    {/* <button className="relative top-0">Reset</button> */}
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col justify-center gap-2 items-center">
                      <Avatar className="w-16 h-16 rounded-none">
                        <AvatarImage
                          src={widget.logo_url}
                          width={80}
                          alt="Organisation Logo"
                        />
                        <AvatarFallback delayMs={1000}>LOGO</AvatarFallback>
                      </Avatar>
                      <h1
                        className="text-3xl font-medium text-center break-words w-44"
                        style={orgNameStyle}
                      >
                        {widget.name}
                      </h1>
                      <small
                        style={greetingStyle}
                        className="w-full text-[14px] break-words text-center"
                      >
                        {widget.greeting}
                      </small>
                    </div>
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-col lg:px-4 gap-10 mt-6">
                        <div className="flex flex-col">
                          <Input
                            name="email"
                            placeholder="Email"
                            id="email"
                            type="email"
                            style={inputStyle}
                            className={`w-full h-[2.8rem] border-[1.4px] px-4 py-0 focus-visible:ring-0 bg-transparent`}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                          />
                        </div>
                        <Button
                          style={goButtonStyle}
                          className="w-full h-[2.8rem]  mb-4 "
                          disabled={loading2}
                          onClick={handleSubmit}
                        >
                          {loading2 ? (
                            <div>
                              <Spinner size={20} color={widget.color9} />
                            </div>
                          ) : (
                            <span>Continue</span>
                          )}
                        </Button>
                      </div>
                      {show && (
                        <>
                          <div className="relative w-full py-2">
                            <div className="absolute w-full lg:px-4 inset-0 flex items-center">
                              <span className="w-full border-black border-t"></span>
                              <span className="px-2">or</span>
                              <span className="w-full border-black border-t"></span>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center justify-evenly gap-y-4 w-full">
                            {socialValues.includes('github') && (
                              <button onClick={() => socialLogin('github')}>
                                <div className={`h-fit w-fit rounded-full `}>
                                  <Image
                                    src={github}
                                    alt="github"
                                    width={30}
                                    className="cursor-pointer"
                                  />
                                </div>
                              </button>
                            )}

                            {socialValues.includes('microsoft') && (
                              <button onClick={() => socialLogin('microsoft')}>
                                {' '}
                                <div className={`h-fit w-fit`}>
                                  <Image
                                    src={microsoft}
                                    alt="microsoft"
                                    width={26}
                                    className="cursor-pointer "
                                  />
                                </div>
                              </button>
                            )}

                            {socialValues.includes('google') && (
                              <button onClick={() => socialLogin('google')}>
                                {' '}
                                <div className={`h-fit w-fit rounded-full`}>
                                  <Image
                                    src={google}
                                    alt="google"
                                    width={28}
                                    className="cursor-pointer"
                                  />
                                </div>
                              </button>
                            )}

                            {socialValues.includes('discord') && (
                              <button onClick={() => socialLogin('discord')}>
                                {' '}
                                <div className={`h-fit w-fit`}>
                                  <Image
                                    src={discord}
                                    alt="discord"
                                    width={34}
                                    className="cursor-pointer"
                                  />
                                </div>
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
