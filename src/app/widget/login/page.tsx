// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';
// import { QRCodeSVG } from 'qrcode.react';
// import OtpInput from 'react-otp-input';

// import { decryptCode, testPass, passMsg, testOTP } from './utils';
// import { Button } from '@/components/ui/Button';
// import { ChevronRightIcon } from '@radix-ui/react-icons';

// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';
// import { useOrgData, useUserData } from './widgetStore'; //import zustand store to store and update org data
// import widgetStyle from './widget.module.css';
// import convertToApproxTime from './approxTime';
// const Login = () => {
//   //store function to set the org data in the store. It takes two arguments org token and org data.
//   const setOrgData = useOrgData(state => state.setOrgData);
//   //to fetch the org token from the store
//   const storeOrg_token = useOrgData(state => state.org_token);
//   //to fetch the org data from the store
//   const storeOrgData = useOrgData(state => state.data);

//   //to fetch the user data from store
//   const storeUserData = useUserData(state => state.data);
//   //to set the user data in the store
//   const setUserData = useUserData(state => state.setUserData);
//   const router = useRouter();
//   //state variable to set otp
//   const [otp, setOtp] = useState('');
//   //state variables for loading
//   const [loading1, setLoading1] = useState(true); //loading before the widget appears
//   const [loading2, setLoading2] = useState(false); //loading in the widget itself for subsequent reqs
//   //state variables for erros
//   const [err, setErr] = useState(false);
//   const [errMsg, setErrMsg] = useState('');
//   // state variable to show password input box
//   const [showpassField, setShowPassField] = useState(false);
//   //state variables to show certain messages
//   const [message, setMessage] = useState('');
//   const [showMsg, setShowMsg] = useState(false);
//   //state varibale to show MFA activation panel where QR code along with an MFA code input field will be shown
//   const [showMfaActivation, setShowMfaActivation] = useState(false);

//   //state variable to show the OTP input modal if a user has already enabled MFA
//   const [showMfaPopup, setShowMfaPopup] = useState(false);
//   //state variable to show and hide dead end message panel
//   const [showMsgPanel, setShowMsgPanel] = useState(false);

//   //state varibale to show the enable mfa link to take the user input whether he wants to enable mfa or not
//   const [showEnableMfaLink, setShowEnableMfaLink] = useState(false);
//   // state varibale to store whether the user has selected enable mfa or not
//   const [enableUserMfa, setEnablUsereMfa] = useState(false);

//   // state varibale to store the value of email typed by the user
//   const [email, setEmail] = useState('');

//   //state variable to store password
//   const [pass, setPass] = useState('');
//   //state variable to store user_token temporarily
//   const [currentUserToken, setCurrentUserToken] = useState('');
//   //state variable to store mfa code

//   //state variable to set encoded qr code
//   const [qr, setQr] = useState('');
//   //state variable to chnage the button actions
//   const [buttonAction, setButtonAction] = useState('');

//   //checkbox varibale
//   const [checked, setChecked] = useState(false);
//   //search the url for the param org_id to fetch details for that org
//   const searchParams = useSearchParams();
//   const org_id = searchParams.get('org_id');

//   //fetch the org details as soon as page loads
//   useEffect(() => {
//     fetchOrgDetails();
//   }, []);
//   useEffect(()=>{
//     console.log(currentUserToken)
//   },[currentUserToken])

//   //function to handle when the user decides to enable mfa from his side
//   const handleUserMfa = () => {
//     if (enableUserMfa) {
//       //display the panel for activating MFA which will have QR code to enable the authentication and the 6 didit mfa code input field
//       //construct the MFA panel with QR code and input field
//       setButtonAction('mfa-activation-signup');
//       setShowMfaActivation(true);
//     } else if (!enableUserMfa) {
//       //email will be sent to the email id given by the user to verify the email address
//       setShowMsgPanel(true);
//       setMessage('Verify your email address to continue');
//       return setShowMsg(true);
//     }
//   };
//   //function to create a newpassword while logging in
//   const newPasswordRequest = async () => {
//     setErr(false);
//     setShowMsg(false);
//     setLoading2(true);
//     if (testPass(pass)) {
//       setLoading2(false);
//       setErrMsg(passMsg);
//       return setErr(true);
//     }

//     try {
//       const response = await fetch(
//         `https://api.trustauthx.com/user/me/auth?UserToken=${currentUserToken}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             new_user_password: pass
//           })
//         }
//       );
//       console.log(response);

//       const data = (await response.json()) as any;
//       if (data.detail) {
//         //show the message of password already set
//         setErrMsg(data.detail);
//         setErr(true);
//         return setErr(true);
//       }
//       const { user_token, msg } = data;
//       if (response.status === 200) {
//         setCurrentUserToken(user_token);
//         console.log(msg);
//         return;
//       }
//       setLoading2(false);
//     } catch (error) {
//       //
//     }
//   };
//   //this fucntion is called when user is signing up and has to create a passeord and then go through further requests
//   const handleNewPassword = async () => {
//     setErr(false);
//     setShowMsg(false);
//     setLoading2(true);
//     if (testPass(pass)) {
//       setLoading2(false);
//       setErrMsg(passMsg);
//       return setErr(true);
//     }
//     console.log(currentUserToken);
//     //ask user to put the password in the password field and hit go button

//     try {
//       const response = await fetch(
//         `https://api.trustauthx.com/user/me/auth?UserToken=${currentUserToken}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             new_user_password: pass
//           })
//         }
//       );
//       console.log(response);

//       const data = (await response.json()) as any;
//       setLoading2(false);
//       if (data.detail) {
//         //show the message of password already set
//         setErrMsg(data.detail);
//         setErr(true);
//         return setErr(true);
//       }
//       const { user_token } = data;
//       if (response.status === 200) {
//         setCurrentUserToken(user_token);
//         //if the organization has enabled mfa which is checked by the fa2 key
//         if (storeOrgData.fa2) {
//           //if the organization has enabled strict mfa

//           if (storeOrgData.strict_mfa) {
//             //display the panel for activating MFA which will have QR code to enable the authentication and the 6 didit mfa code input field
//             //construct the MFA panel with QR code and input field
//             //if the user hase already enabled mf but still email is not verified
//             if (storeUserData.fa2 === true) {
//               //login user by putting in mfa
//               //show mfa popup and make a post request by sending the mfa otp

//               setButtonAction('mfa-login');
//               setLoading2(false);
//               return setShowMfaPopup(true);
//               //if user has not taken any action or has not enabled fa2
//             } else if (
//               storeUserData.fa2 === null ||
//               storeUserData.fa2 === false
//             ) {
//               setButtonAction('mfa-activation-signup');
//               setLoading2(false);
//               return setShowMfaActivation(true);
//             }

//             //if the organization has not enabled strict mfa
//           } else if (!storeOrgData.strict_mfa) {
//             //if the user has not enbaled mfa
//             if (storeUserData.fa2 === null || storeUserData.fa2 === false) {
//               if (enableUserMfa) {
//                 try {
//                   const res = await fetch(
//                     `https://api.trustauthx.com/user/me/auth?UserToken=${user_token}`,
//                     {
//                       method: 'PUT',
//                       headers: {
//                         'Content-Type': 'application/json'
//                       },
//                       body: JSON.stringify({
//                         switch_mfa: true
//                       })
//                     }
//                   );

//                   const resData = (await res.json()) as any;
//                   if (res.status === 203) {
//                     setCurrentUserToken(resData.user_token);
//                     setQr(decryptCode(resData.mfa_code));
//                     setShowEnableMfaLink(false);
//                     setButtonAction('mfa-activation-signup');
//                     setShowMfaActivation(true);
//                     setLoading2(false);
//                     return;
//                   }
//                 } catch (error) {
//                   setLoading2(false);

//                   return console.log(
//                     'some error occured in sending the request for  mfa code',
//                     error
//                   );
//                 }
//               } else if (!enableUserMfa) {
//                 setShowEnableMfaLink(false);
//                 setMessage('Please Check Your Email To Verify!');
//                 setShowMsgPanel(true);
//                 setShowMsg(true);
//                 return;
//               }
//             }
//             //if the user has enabled mfa
//             else if (storeUserData.fa2 === true) {
//               //show mfa popup to send the mfa back to backend and verify
//               setShowEnableMfaLink(false);
//               setButtonAction('mfa-login');
//               setShowMfaPopup(true);
//               return;
//             }
//           }
//           //if the org has not enabled fa2
//         } else if (!storeOrgData.fa2) {
//           //show the user a text to verify his email addresss
//           setLoading2(false);
//           setMessage('Please Check Your Email To Verify!');
//           setShowMsg(true);
//           setShowMsgPanel(true);
//           return;
//         }
//       }
//     } catch (error) {
//       setLoading2(false);
//       setErrMsg('some error occured in the request');
//       console.log(error);
//       setErr(true);
//       return;
//     }
//   };
//   //function to request for mfa activation while logging in
//   const mfaRequest = async () => {
//     //
//   };

//   //function to be called when a user has to activate MFA
//   const handleMFActivation = async (login: boolean) => {
//     setErr(false);
//     setShowMsg(false);
//     setLoading2(true);

//     if (testOTP(otp)) {
//       setErrMsg('Please put a valid OTP');
//       setLoading2(false);
//       return setErr(true);
//     }
//     try {
//       const response = await fetch(
//         `https://api.trustauthx.com/user/me/auth?UserToken=${currentUserToken}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             totp: otp,
//             switch_mfa: true
//           })
//         }
//       );
//       const data = (await response.json()) as any;
//       setLoading2(false);
//       console.log(data);
//       const { user_token } = data;
//       setCurrentUserToken(user_token);
//       if (response.status === 200) {

//         //if the the mfa activation is coming from the login loop
//         if (login) {
//           setLoading2(false);
//           setMessage('MFA Successfully Activated!');
//           setShowMsg(true);
//           setShowMfaActivation(false);
//           setTimeout(() => setShowMsg(false), 3000);
//           // setShowPassField(true);
//           // setButtonAction('showMfaPopup');
//           handleSubmit();
//           return;
//         } else {
//           setMessage('MFA Successfully Activated! Check your Email.');
//           setShowMsgPanel(true);
//           return setShowMsg(true);
//         }
//       } else if (response.status === 402) {
//         setCurrentUserToken(data.user_token);
//         setErrMsg(data.msg);
//         return setErr(true);
//         //when maximum tries for otp has been reached by the user
//       } else if (response.status === 429) {
//         const timeRegex = /(\d+):(\d+):(\d+\.\d+)/;
//         const matches = data.detail?.match(timeRegex);
//         const time = convertToApproxTime(matches[0]);
//         setErrMsg(
//           `maximum tries reached! Try again after ${time || 'some time'}`
//         );
//         return setErr(true);
//       }
//     } catch (error) {
//       console.log(error);
//       setLoading2(false);
//       //errors which are not handled
//       setErrMsg(`Some error occured in request`);
//       return setErr(true);
//     }
//   };

//   //function to handle submit mfa
//   const handleMFA = async () => {
//     setShowEnableMfaLink(false);
//     setErr(false);
//     setShowMsg(false);
//     setLoading2(true);
//     if (testOTP(otp)) {
//       setErrMsg('Please put a valid OTP');
//       setLoading2(false);
//       return setErr(true);
//     }
//     try {
//       const response = await fetch(
//         `https://api.trustauthx.com/user/me/auth?UserToken=${currentUserToken}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             totp: otp
//           })
//         }
//       );
//       console.log(response);
//       console.log(otp);
//       const data = (await response.json()) as any;
//       if (response.status === 202 || response.status === 203) {
//         setLoading2(false);
//         setMessage('Email not verified! please check your email to verify');
//         setShowMsgPanel(true);
//         setShowMsg(true);
//         return;
//       } else if (response.status === 200) {
//         setCurrentUserToken(data.user_token);
//         return router.push(data.callback_uri);
//       } else if (response.status == 402) {
//         setCurrentUserToken(data.user_token);
//         setErrMsg(data.msg);
//         return setErr(true);
//       } else if (response.status === 429) {
//         const timeRegex = /(\d+):(\d+):(\d+\.\d+)/;
//         const matches = data.detail?.match(timeRegex);
//         const time = convertToApproxTime(matches[0]);
//         setErrMsg(
//           `maximum tries reached! Try again after ${time || 'some time'}`
//         );
//         return setErr(true);
//       }
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //function to log in with password
//   const loginWithPassword = async () => {
//     setErr(false);
//     setShowMsg(false);
//     console.log(otp, pass, email);
//     console.log(currentUserToken)
//     setLoading2(true);
//     if (testPass(pass)) {
//       setLoading2(false);
//       setErrMsg(passMsg);
//       return setErr(true);
//     }

//     try {
//       const response = await fetch(
//         `https://api.trustauthx.com/user/me/auth?UserToken=${currentUserToken}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             email: email,
//             password: pass,
//             mfa_totp: otp ? otp : 0
//           })
//         }
//       );
//       console.log(response);
//       const data = (await response.json()) as any;
//       setLoading2(false);

//       const { user_token, callback_uri, msg } = data;

//       setCurrentUserToken(user_token);
//       console.log(currentUserToken)
//       if (response.status === 200) {
//         router.push(callback_uri);
//         console.log(msg);
//         return;
//       } else if (response.status === 401 || response.status === 405) {
//         console.log('401 or 405 occured')

//         setErrMsg(msg);
//         setErr(true);
//         return;
//       }
//     } catch (error) {
//       console.log(error);
//       setLoading2(false);
//       return;
//     }
//   };

//   //to fetch organization detail before widget appears to style the widget based on the styles applied by the org
//   //and get the services and settings set by the org.
//   const fetchOrgDetails = async () => {
//     try {
//       setLoading1(true);
//       const response = await fetch(
//         `https://api.trustauthx.com/settings/auth?org_id=${org_id}`,
//         {
//           method: 'GET'
//         }
//       );
//       // console.log(response);
//       if (response.status === 406) {
//         //if the org id is wrong redirect to the trusauthx landing html page
//         return router.push('https://www.trustauthx.com');
//       }
//       if (response.status === 200) {
//         const orgData = (await response.json()) as any;

//         const { org_token, ...rest } = orgData;
//         const data = rest.data;

//         //store the org token and data from the response to the zustand store
//         setOrgData(org_token, data);
//         //set loading to false and display the widget, styled according to the org data for which can be found in the data.widget
//         setLoading1(false);
//         if (data.fa2 === true && data.strict_mfa === false) {
//           setShowEnableMfaLink(true);
//         }
//       }
//     } catch (err) {
//       console.log(err);
//       setLoading1(false);
//       console.log('some error occured, not able to get the org response');
//     }
//   };

//   //first action by the user, when the user clicks on the go button after putting in the email
//   const handleSubmit = async () => {
//     setErrMsg('');
//     setErr(false);
//     setLoading2(true);
//     //checking if email field is empty
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setErrMsg('Enter a valid Email!');
//       setLoading2(false);
//       return setErr(true);
//     }
//     try {
//       //get the user response which has a user token and public details
//       const response = await fetch(
//         `https://api.trustauthx.com/user/me/auth?usr=${email}&OrgToken=${storeOrg_token}`,
//         {
//           method: 'GET'
//         }
//       );
//       // console.log(response)
//       const data = (await response.json()) as any;
//       console.log(data)

//       //if a 422 validation error occurs
//       if (response.status === 422) {
//         setErrMsg(data.detail[0].msg);
//         setLoading2(false);
//         return setErr(true);
//       }
//       //if some problem occur in verifying the org_token
//       if (response.status == 401 || response.status == 406) {
//         setErrMsg(data.detail);
//         setLoading2(false);
//         return setErr(true);
//       }
//       //seperating user token and user details from the response data json
//       const { user_token, mfa_code, ...rest } = data;
//       const userInfo = rest.public;
//       console.log(userInfo);
//       setUserData(userInfo);

//       setCurrentUserToken(user_token);
//       //handling the response when the status code is 202, email is not verified that means signup
//       //203 code will come only when strict mfa is true from org
//       if (response.status === 202 || response.status === 203) {
//         if (response.status === 203) {
//           setQr(decryptCode(mfa_code));
//         }
//         //set user data to the zustand store
//         //if the org has enabled passwordless so the user will have passwordless already enabled because this is a signup route
//         if (userInfo.passwordless === true) {
//           //if the organization has enabled mfa which is checked by the fa2 key
//           if (storeOrgData.fa2) {
//             //if the organization has enabled strict mfa

//             if (storeOrgData.strict_mfa) {
//               //display the panel for activating MFA which will have QR code to enable the authentication and the 6 didit mfa code input field
//               //construct the MFA panel with QR code and input field
//               //if the user hase already enabled mf but still email is not verified
//               if (userInfo.fa2 === true) {
//                 //login user by putting in mfa
//                 //show mfa popup and make a post request by sending the mfa otp

//                 setButtonAction('mfa-login');
//                 setLoading2(false);
//                 return setShowMfaPopup(true);
//                 //if user has not taken any action or has not enabled fa2
//               } else if (userInfo.fa2 === null || userInfo.fa2 === false) {
//                 setButtonAction('mfa-activation-signup');
//                 setLoading2(false);
//                 return setShowMfaActivation(true);
//               }

//               //if the organization has not enabled strict mfa
//             } else if (!storeOrgData.strict_mfa) {
//               //if the user has not enbaled mfa
//               if (userInfo.fa2 === null || userInfo.fa2 === false) {
//                 if (enableUserMfa) {
//                   try {
//                     const res = await fetch(
//                       `https://api.trustauthx.com/user/me/auth?UserToken=${user_token}`,
//                       {
//                         method: 'PUT',
//                         headers: {
//                           'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify({
//                           switch_mfa: true
//                         })
//                       }
//                     );

//                     const resData = (await res.json()) as any;
//                     if (res.status === 203) {
//                       setCurrentUserToken(resData.user_token);
//                       setQr(decryptCode(resData.mfa_code));
//                       setShowEnableMfaLink(false);
//                       setButtonAction('mfa-activation-signup');
//                       setShowMfaActivation(true);
//                       setLoading2(false);
//                       return;
//                     }
//                   } catch (error) {
//                     setLoading2(false);

//                     return console.log(
//                       'some error occured in sending the request for  mfa code',
//                       error
//                     );
//                   }
//                 } else if (!enableUserMfa) {
//                   setShowEnableMfaLink(false);
//                   setMessage('Please Check Your Email To Verify!');
//                   setShowMsgPanel(true);
//                   setShowMsg(true);
//                   return;
//                 }
//               }
//               //if the user has enabled mfa
//               else if (userInfo.fa2 === true) {
//                 //show mfa popup to send the mfa back to backend and verify
//                 setShowEnableMfaLink(false);
//                 setButtonAction('mfa-login');
//                 setLoading2(false);
//                 setShowMfaPopup(true);
//                 return;
//               }
//             }
//             //if the org has not enabled fa2
//           } else if (!storeOrgData.fa2) {
//             //show the user a text to verify his email addresss
//             setMessage('Please Check Your Email To Verify!');
//             setShowMsgPanel(true);
//             return;
//           }
//         } else if (userInfo.passwordless === false) {
//           //if the org has not enabled passwordless so the user will not have passwordless enabled because this is a signup route
//           //if the user has already set a password before
//           if (userInfo.is_password_set === true) {
//             //if the organization has enabled mfa which is checked by the fa2 key
//             if (storeOrgData.fa2) {
//               //if the organization has enabled strict mfa

//               if (storeOrgData.strict_mfa) {
//                 //display the panel for activating MFA which will have QR code to enable the authentication and the 6 didit mfa code input field
//                 //construct the MFA panel with QR code and input field
//                 //if the user hase already enabled mf but still email is not verified
//                 if (userInfo.fa2 === true) {
//                   //login user by putting in mfa
//                   //show mfa popup and make a post request by sending the mfa otp

//                   setButtonAction('mfa-login');
//                   setLoading2(false);
//                   return setShowMfaPopup(true);
//                   //if user has not taken any action or has not enabled fa2
//                 } else if (userInfo.fa2 === null || userInfo.fa2 === false) {
//                   setButtonAction('mfa-activation-signup');
//                   setLoading2(false);
//                   return setShowMfaActivation(true);
//                 }

//                 //if the organization has not enabled strict mfa
//               } else if (!storeOrgData.strict_mfa) {
//                 //if the user has not enbaled mfa
//                 if (userInfo.fa2 === null || userInfo.fa2 === false) {
//                   if (enableUserMfa) {
//                     try {
//                       const res = await fetch(
//                         `https://api.trustauthx.com/user/me/auth?UserToken=${user_token}`,
//                         {
//                           method: 'PUT',
//                           headers: {
//                             'Content-Type': 'application/json'
//                           },
//                           body: JSON.stringify({
//                             switch_mfa: true
//                           })
//                         }
//                       );

//                       const resData = (await res.json()) as any;
//                       if (res.status === 203) {
//                         setCurrentUserToken(resData.user_token);
//                         setQr(decryptCode(resData.mfa_code));
//                         setShowEnableMfaLink(false);
//                         setButtonAction('mfa-activation-signup');
//                         setShowMfaActivation(true);
//                         setLoading2(false);
//                         return;
//                       }
//                     } catch (error) {
//                       setLoading2(false);

//                       return console.log(
//                         'some error occured in sending the request for  mfa code',
//                         error
//                       );
//                     }
//                   } else if (!enableUserMfa) {
//                     setShowEnableMfaLink(false);
//                     setMessage('Please Check Your Email To Verify!');
//                     setShowMsgPanel(true);
//                     setShowMsg(true);
//                     return;
//                   }
//                 }
//                 //if the user has enabled mfa
//                 else if (userInfo.fa2 === true) {
//                   //show mfa popup to send the mfa back to backend and verify
//                   setLoading2(false);
//                   setShowEnableMfaLink(false);
//                   setButtonAction('mfa-login');
//                   setShowMfaPopup(true);
//                   return;
//                 }
//               }
//               //if the org has not enabled fa2
//             } else if (!storeOrgData.fa2) {
//               //show the user a text to verify his email addresss
//               setMessage('Please Check Your Email To Verify!');
//               setShowMsgPanel(true);
//               setShowMsg(true);
//               return;
//             }
//           } else if (
//             userInfo.is_password_set === null ||
//             userInfo.is_password_set === false
//           ) {
//             //ask user to put password in the for the first time in the password field and hit go button
//             setLoading2(false);
//             setButtonAction('first-password');
//             setShowPassField(true);
//             return;
//           }
//         }
//         setLoading2(false);
//         //handling the response when the status code is 200, email is verified and passwordless is false that means login with password
//       } else if (response.status === 200) {
//         setPass('');
//         setOtp('');
//         if (storeOrgData.fa2) {
//           if (storeOrgData.strict_mfa) {
//             //when org has enabled strict mfa
//             if (userInfo.fa2 === null || userInfo.fa2 === false) {
//               //when user has not activated MFA yet, because the org enabled strict mfa after the user signed up
//               //user will have to activate the mfa first and then proceed to login if password is set
//             } else if (userInfo.fa2 === true) {
//               //when user has set up the mfa
//               //show the password input then the mfa popup and send the post request with both pass and mfa totp
//             }
//           } else if (!storeOrgData.strict_mfa) {
//             //when org has disabled strict mfa but fa2 is there, so user may choose fa2
//             if (userInfo.fa2 === true) {

//               //is user has enabled fa2
//               setShowEnableMfaLink(false)
//               setLoading2(false);
//               setShowPassField(true);
//               setButtonAction('showMfaPopup');
//               return;
//             } else if (userInfo.fa2 === null || userInfo.fa2 === false) {
//               setLoading2(false);
//               setShowPassField(true);

//               if (enableUserMfa) {
//                 try {
//                   const res = await fetch(
//                     `https://api.trustauthx.com/user/me/auth?UserToken=${user_token}`,
//                     {
//                       method: 'PUT',
//                       headers: {
//                         'Content-Type': 'application/json'
//                       },
//                       body: JSON.stringify({
//                         switch_mfa: true
//                       })
//                     }
//                   );

//                   const resData = (await res.json()) as any;
//                   if (res.status === 203) {
//                     setCurrentUserToken(resData.user_token);
//                     setQr(decryptCode(resData.mfa_code));
//                     setShowEnableMfaLink(false);
//                     setButtonAction('mfa-activation-login');
//                     setShowMfaActivation(true);
//                     setLoading2(false);
//                     return;
//                   }
//                 } catch (error) {
//                   setLoading2(false);

//                   return console.log(
//                     'some error occured in sending the request for  mfa code',
//                     error
//                   );
//                 }
//               } else if (!enableUserMfa) {
//                 setLoading2(false)
//                 setButtonAction('loginWithPassword');
//                 return setShowPassField(true);
//               }
//             }
//           }
//         } else if (!storeOrgData.fa2) {
//           //when MFA is disabled, just show the password field and make a post request by sending the password
//           setLoading2(false);
//           setButtonAction('loginWithPassword');
//           return setShowPassField(true);
//         }
//       } else if (response.status === 206) {
//         // when a user is verified but has not set a password when passwordless is false maybe because org turned off passwordless
//         // after user signed up
//         setLoading2(false);
//         setMessage(
//           'You have not set a password yet, please set a new password'
//         );
//         setShowMsg(true);
//         setShowPassField(true);
//         setButtonAction('newPasswordRequest');
//         return;
//       } else if (response.status == 205) {
//         //when organization has set passwordless true and user is verified, means passwordless login.
//         //everything is same as 200, just don't take password input and don't redirect user the callbacl_url, instead, show the mesaage
//         //on the msg panel to check the email for the link
//         console.log(205);
//       }
//     } catch (error) {
//       console.log(error);
//       setLoading2(false);
//     }
//   };
//   //functions for social login
//   const socialLogin = (social: string) => {
//     const url = `https://api.trustauthx.com/single/social/signup?provider=${social}&OrgToken=${storeOrg_token}`;
//     router.push(url);
//   };

//   // resend email
//   const sendEmailAgain = async () => {
//     // const response = await fetch(
//     //   `https://api.trustauthx.com/user/me/auth?usr=${email}&OrgToken=${storeOrg_token}`,
//     //   {
//     //     method: 'GET'
//     //   }
//     // );
//   };
//   const showMfaPopupForLogin=()=>{
//     setShowMfaPopup(true);
//     setButtonAction('loginWithPassword');
//   }

//   //change the action of the button based on responses
//   const handleGo = () => {
//     switch (buttonAction) {
//       case 'showMfaPopup':
//         showMfaPopupForLogin()

//         break;
//       case 'mfa-request-password':
//         mfaRequest();
//         break;
//       case 'newPasswordRequest':
//         newPasswordRequest();
//         break;
//       case 'verify_email':
//         handleUserMfa();
//         break;
//       case 'first-password':
//         handleNewPassword();
//         break;
//       case 'loginWithPassword':
//         loginWithPassword();
//         break;
//       case 'mfa-login':
//         handleMFA();
//         break;
//       case 'mfa-activation-signup':
//         handleMFActivation(false);
//         break;
//       case 'mfa-activation-login':
//         handleMFActivation(true);
//         break;
//       default:
//         handleSubmit();
//         break;
//     }
//   };

//   return (
//     <>
//       {loading1 ? (
//         <div className="w-[100vw] h-[100vh] flex justify-center items-center ">
//           <div className="border-t-transparent rounded-full border-solid animate-spin border-blue-400 border-8  h-20 w-20"></div>
//         </div>
//       ) : (
//         <div className="top-1/2 flex justify-center items-center absolute  left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[350px]  bg-white border-[1px] border-gray-300 rounded-xl shadow-2xl ">
//           <div className="flex flex-col items-center p-[20px] mr-0 !important ">
//             <div className="flex flex-col justify-center items-center ">
//               <Image
//                 width={60}
//                 height={60}
//                 src={
//                   'https://flitchcoin.s3.eu-west-2.amazonaws.com/authxlogo.svg'
//                 }
//                 alt="AuthX logo"
//               />

//               <div className="mt-1">
//                 <span className="text-xl font-semibold">
//                   {storeOrgData.widget.name}
//                 </span>
//               </div>
//               {showMsg ? (
//                 <span
//                   className={`text-blue-400 text-center ${
//                     showMsgPanel ? 'my-20' : ''
//                   } `}
//                 >
//                   {message}
//                 </span>
//               ) : (
//                 ''
//               )}
//               {!showMsgPanel ? (
//                 <div className="mt-4">
//                   <span className="text-base text-4md text-slate-900">
//                     {showMfaActivation
//                       ? 'Continue to register MFA'
//                       : `Login to ${storeOrgData.widget.name || 'TrustAuthX'}`}
//                   </span>
//                 </div>
//               ) : (
//                 ''
//               )}
//             </div>
//             {showMsgPanel ? (
//               <div>
//                 <span
//                   className="text-blue-400 hover:text-blue-600 cursor-pointer"
//                   onClick={sendEmailAgain}
//                 >
//                   Didn't receive email? Try again.
//                 </span>
//               </div>
//             ) : (
//               <div
//                 className={`w-[260px] sm:w-[300px] mt-[30px] flex flex-col items-center`}
//               >
//                 {showMfaActivation ? (
//                   <div
//                     id="mfaActivationPanel"
//                     className="flex flex-col items-center"
//                   >
//                     <span className="mb-2 text-center">
//                       Scan the code using Google authenticator
//                     </span>

//                     <QRCodeSVG value={qr} />
//                     <span className="my-2">Enter OTP to turn on MFA</span>
//                     <OtpInput
//                       containerStyle="grid grid-cols-2 justify-center gap-1"
//                       inputStyle="!w-8 h-8 md:!w-10 mt-4 border border-blue-400 focus:ring-blue-400 sm:h-8 md:h-10 p-0 text-center rounded-xl"
//                       value={otp}
//                       onChange={setOtp}
//                       numInputs={6}
//                       renderSeparator={<span></span>}
//                       renderInput={props => <input {...props} />}
//                     />
//                   </div>
//                 ) : showMfaPopup ? (
//                   <div id="mfaPopup" className="flex flex-col items-center">
//                     <span className="mb-2 text-center">Enter the MFA code</span>

//                     <OtpInput
//                       containerStyle="grid grid-cols-2 justify-center gap-1"
//                       inputStyle="!w-8 h-8 md:!w-10 mt-4 border border-blue-400 focus:ring-blue-400 sm:h-8 md:h-10 p-0 text-center rounded-xl"
//                       value={otp}
//                       onChange={setOtp}
//                       numInputs={6}
//                       renderSeparator={<span></span>}
//                       renderInput={props => <input {...props} />}
//                     />
//                   </div>
//                 ) : showpassField ? (
//                   <>
//                     <div className={`${widgetStyle.materialTextfield} w-full `}>
//                       <input
//                         className={`${widgetStyle.input}  `}
//                         id="password"
//                         type="password"
//                         value={pass}
//                         placeholder=" "
//                         onChange={e => setPass(e.target.value)}
//                       />
//                       <label className={widgetStyle.label}>Password</label>
//                     </div>
//                   </>
//                 ) : (
//                   <div className={`${widgetStyle.materialTextfield} w-full  `}>
//                     <input
//                       className={`${widgetStyle.input}  `}
//                       id="email"
//                       type="email"
//                       value={email}
//                       placeholder=" "
//                       onChange={e => setEmail(e.target.value)}
//                     />
//                     <label className={widgetStyle.label}>Email</label>
//                   </div>
//                 )}

//                 {err ? (
//                   <span className="text-red-500 text-center">{errMsg}</span>
//                 ) : (
//                   ''
//                 )}
//                 {showEnableMfaLink ? (
//                   <div className="flex justify-start w-full">
//                     <div
//                       className="flex items-center space-x-2  bg-blue-300 mt-2  px-2 py-1 rounded-sm"
//                       onClick={() => setChecked(!checked)}
//                     >
//                       <input
//                         type="checkbox"
//                         id="enable-mfa"
//                         checked={enableUserMfa}
//                         onChange={() => setEnablUsereMfa(!enableUserMfa)}
//                       />
//                       <label
//                         htmlFor="enable-mfa"
//                         className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                       >
//                         Enable MFA
//                       </label>
//                     </div>
//                   </div>
//                 ) : (
//                   ''
//                 )}

//                 <div className="w-full mt-8">
//                   <Button
//                     className={`w-full h-12 text-white bg-black hover:bg-gray-800`}
//                     onClick={loading2 ? undefined : handleGo}
//                   >
//                     <span className="ml-6 text-xl">
//                       {loading2 ? (
//                         <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-8 w-8"></div>
//                       ) : (
//                         'Go !!'
//                       )}
//                     </span>
//                     {loading2 ? '' : <ChevronRightIcon className="ml-3" />}
//                   </Button>
//                 </div>
//               </div>
//             )}
//             <div className="flex w-full justify-center mt-2">
//               <div className="mt-2 w-[136px] border-t-2 border-gray-900 "></div>
//               <span className="px-1"> or </span>
//               <div className="mt-2 w-[136px] border-t-2 border-gray-900 "></div>
//             </div>
//             <div className="flex mt-4 justify-around">
//               <button
//                 className="bg-black p-2  text-white"
//                 onClick={() => socialLogin('github')}
//               >
//                 GITHUB
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Login;
