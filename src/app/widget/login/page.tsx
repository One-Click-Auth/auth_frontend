'use client';
import axios from 'axios'
import { Button } from '@/components/ui/Button';
import { ChevronRightIcon } from '@radix-ui/react-icons';

import { API_DOMAIN } from '@/constants';
import { Icons } from '@/components/icons';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {useOrgData, useUserData } from './widgetStore' //import zustand store to store and update org data

const Login = () => {
//store function to set the org data in the store. It takes two arguments org token and org data.
const setOrgData = useOrgData(state=>state.setOrgData)
//to fetch the org token from the store
const storeOrg_token = useOrgData(state=>state.org_token);
//to fetch the org data from the store 
const storeOrgData = useOrgData(state => state.data);

//to fetch the user data from store
const storeUserData = useUserData(state=>state.data);
//to set the user data in the store
const setUserData = useUserData(state=>state.setUserData);
  const router = useRouter();
  //state variables for loading
  const [loading1, setLoading1] = useState(true); //loading before the widget appears
  const [loading2, setLoading2] =  useState(false); //loading in the widget itself for subsequent reqs
  //state variables for erros
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  // state variable to show password input box
  const [showpassField, setShowPassField] =useState(false);
  //state variables to show certain messages
  const [message, setMessage] = useState('');
  const[showMsg, setShowMsg] = useState(false)
  //state varibale to show MFA activation panel where QR code along with an MFA code input field will be shown
  const [showMfaActivation, setShowMfaActivation] = useState(false)

  //state variable to show the OTP input modal if a user has already enabled MFA
  const [showMfaPopup, setShowMfaPopup] = useState(false);
  
  //state varibale to show the enable mfa link to take the user input whether he wants to enable mfa or not 
  const [showEnableMfaLink, setShowEnableMfaLink] =  useState(false)
  // state varibale to store whether the user has selected enable mfa or not
  const [enableUserMfa, setEnablUsereMfa] = useState(false);
  
// state varibale to store the value of email typed by the user
  const [email, setEmail] = useState('');
  
  //state variable to store password
  const [pass, setPass] = useState('');
//state variable to store user_token temporarily
const [currentUserToken, setCurrentUserToken] = useState('')
//state variable to storw mfa code
const [currentMfaCode, setCurrentMfaCode] = useState('')
  //state variable to chnage the button actions
const [buttonAction, setButtonAction] = useState('')
 
//search the url for the param org_id to fetch details for that org
  const searchParams = useSearchParams();
  const org_id = searchParams.get('org_id');

  //fetch the org details as soon as page loads
  useEffect(() => {
    fetchOrgDetails();
    
  }, []);


//function to handle when the user decides to enable mfa from his side
const handleUserMfa = ()=>{
  if(enableUserMfa){
  //display the panel for activating MFA which will have QR code to enable the authentication and the 6 didit mfa code input field
  //construct the MFA panel with QR code and input field
  setShowMfaActivation(true)
  }else if(!enableUserMfa){
    //email will be sent to the email id given by the user to verify the email address
    setMessage('Verify your email address to continue')

  }
}
//this fucntion is called when user is signing up and has to create a passeord and then go through further requests
const  handleNewPassword = async ( )=>{
  console.log(currentUserToken)
  //ask user to put the password in the password field and hit go button
  
  try {
  //   const response = await fetch(`https://api.trustauthx.com/user/me/auth?UserToken=${currentUserToken}`,{
  //      method: 'PUT',
  //      headers:{
  //       'accept':'application/json',
  //       'Content-Type': 'application/json'
  //      },
       
  //      body:JSON.stringify({
  //       new_user_password: pass
  //      })
  // });
  const response = await axios.put(`/api/user`, {
    new_user_password: pass
  }, {
    params: {
      UserToken:currentUserToken
    },
    maxBodyLength:Infinity,
    maxContentLength:Infinity
  });
  console.log(response)
  // const data = await response.json()
  const data = response.data
  const { status, user_token} = data
  setCurrentUserToken(user_token)
  
 //if the organization has enabled mfa which is checked by the fa2 key
 if(storeOrgData.fa2){
  //if the organization has enabled strict mfa
  

    if(storeOrgData.strict_mfa){
      //display the panel for activating MFA which will have QR code to enable the authentication and the 6 didit mfa code input field
      //construct the MFA panel with QR code and input field
      
       return handleMFActivation(currentMfaCode, user_token)
      

     //if the organization has not enabled strict mfa  
    }else if(!storeOrgData.strict_mfa){
      //if the user has not enbaled mfa  
        if(storeUserData.fa2 === null || storeUserData.fa2 === false){
              //display a text which will ask if the user wants to enable the mfa, clicking on it will set the enableUsermfa to true
              //if the user clicks on the enable mfa then show the user the otp activation panel
              //if user does not click on the enable mfa and proceeds to click on the go button, then ask 
              //user to verify the email
              //the handleUserMfa function will handle later requests
              setShowEnableMfaLink(true);
              setButtonAction('verify_email')        
        }
        //if the user has enabled mfa 
        else if(storeUserData.fa2 === true){
          //show mfa popup to send the mfa back to backend and verify
          return handleMFA()
        }
    }
//if the org has not enabled fa2 
}else if(!storeOrgData.fa2){

    //show the user a text to verify his email addresss
}


  } catch (error) {
    // console.log(error)
  }
  
}

//function to generate a qr code
const generateQR =(code:string)=>{
// generate a qr code and return
}

//function to be called when a user has to activate MFA
const handleMFActivation= async (code?:string, user_token?:string)=>{

//for status 203 when org has strict mfa enabled
if(code){
  const secret = "asjdhkasjdh"
  // decript 
   generateQR(code)
}
else if(user_token){
  const response = await fetch(`https://api.trustauthx.com/user/me/auth?UserToken?=${user_token}`,{
    method: 'PUT',
    headers:{
      'accept':'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      'switch_mfa': true
   })
  });
}
}
const handleMFA = ()=>{

}


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
      if(response.status === 406){
        //if the org id is wrong redirect to the trusauthx landing html page 
        return router.push("https://www.trustauthx.com");
      }
      if(response.status === 200){
        const orgData = await response.json();

        const {org_token, ...rest} = orgData
        const data = rest.data
        //store the org token and data from the response to the zustand store
        setOrgData(org_token , data);
        //set loading to false and display the widget, styled according to the org data for which can be found in the data.widget
        setLoading1(false)
      }
      
    } catch (err) {
      console.log(err);
      setLoading1(false)
      console.log('some error occured, not able to get the org response')
    } 
  };

  //when user clicks on the go button after putting in the email
  const handleSubmit = async () => {
  
    setErrMsg('')
    setErr(false)
    setLoading2(true)
    //checking if email field is empty
    if(email.length<1){
      setErrMsg('Email required!')
    setLoading2(false)
    return setErr(true)
    }
    try {
      //get the user response which has a user token and public details
      const response = await fetch(`https://api.trustauthx.com/user/me/auth?usr=${email}&OrgToken=${storeOrg_token}`,
      {
        method: 'GET'
      });
      // console.log(response)
      const data  = await response.json();
      // console.log(data)
      //if a 422 validation error occurs 
        if(response.status === 422){
          setErrMsg(data.detail[0].msg)
          setLoading2(false)
          return setErr(true)
        }
        //if some problem occur in verifying the org_token
        if(response.status ==401 || response.status ==406 ){
          setErrMsg(data.detail)
          setLoading2(false)
          return setErr(true) 
        }
        //seperating user token and user details from the response data json
      // console.log(user_token , publicInfo)
      //  console.log(orgDetail)
      // console.log(response)

      //handling the response when the status code is 202, email is not verified
      //203 code will come only when strict mfa is true from org
        if(response.status === 202 || response.status === 203){
          const {user_token, mfa_code, ...rest} = data;
          
          setCurrentUserToken(user_token);
          if(response.status ===203){
            setCurrentMfaCode(mfa_code);
          }
          const userInfo = rest.public
          console.log(userInfo)
          setUserData(userInfo)
          // console.log(userInfo)
          setLoading2(false)
          //if the org has enabled passwordless so the user will have passwordless already enabled because this is a signup route
          if(userInfo.passwordless === true){
          
            
            //if the organization has enabled mfa which is checked by the fa2 key
            if(storeOrgData.fa2){
              //if the organization has enabled strict mfa
              

                if(storeOrgData.strict_mfa){
                  //display the panel for activating MFA which will have QR code to enable the authentication and the 6 didit mfa code input field
                  //construct the MFA panel with QR code and input field
                  
                   return handleMFActivation(mfa_code, user_token)
                  

                 //if the organization has not enabled strict mfa  
                }else if(!storeOrgData.strict_mfa){
                  //if the user has not enbaled mfa  
                    if(userInfo.fa2 === null || userInfo.fa2 === false){
                          //display a text which will ask if the user wants to enable the mfa, clicking on it will set the enableUsermfa to true
                          //if the user clicks on the enable mfa then show the user the otp activation panel
                          //if user does not click on the enable mfa and proceeds to click on the go button, then ask 
                          //user to verify the email
                          //the handleUserMfa function will handle later requests
                          setShowEnableMfaLink(true);
                          setButtonAction('verify_email')        
                    }
                    //if the user has enabled mfa 
                    else if(userInfo.fa2 === true){
                      //show mfa popup to send the mfa back to backend and verify
                      return handleMFA()
                    }
                }
            //if the org has not enabled fa2 
            }else if(!storeOrgData.fa2){

                //show the user a text to verify his email addresss
            }
          

          }
          //if the org has not enabled passwordless so the user will not have passwordless enabled because this is a signup route
          else if(userInfo.passwordless === false){
            //ask user to put password in the password field and hit go button
            setButtonAction('new-password')
             setShowPassField(true)
              
          }
          setLoading2(false)
        //handling the response when the status code is 202, email is verified
        }else if(response.status === 200){
          //logic
          console.log(200)
          
        }else if(response.status ==205){
          //logic
          console.log(205)
        }
        setLoading2(false)
        

  }
    catch (error) {
      console.log(error)
      setLoading2(false)

    }
   
  };
  

  // const handleGithubClick = () => {
  //   fetch(
  //     'https://api.trustauthx.com/signup/github?org_id=ab8274e0906642ccb809e9b4c2898ab481e4bde820c911ee88069dc8f7663e88',
  //     {
  //       method: 'GET',
  //       headers: {
  //         accept: 'application/json'
  //       }
  //     }
  //   )
  //     .then(response => {
  //       console.log('res headers are ', response.headers);
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log(data);
  //     })
  //     .catch(error => {
  //       console.error('error is ', error);
  //     });
  // };


 const handleGo = ()=>{
  switch (buttonAction) {
    case 'verify_email':
      handleUserMfa()
      break;
    case 'new-password':
      handleNewPassword()
    default:
      handleSubmit()
      break;
  }
 }



  return ( 
    <>
    {loading1? <div className='mx-auto text-blue-500 text-2xl'>Loading...</div>:
    <div className="top-1/2 flex justify-center items-center absolute  left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[440px]  bg-white border-2 border-gray-300 rounded-2xl shadow-2xl ">
      <div className="flex flex-col items-center p-[70px] mr-0 !important ">
        <div className="flex flex-col justify-center items-center mt-7">
          <Image
            width={60}
            height={60}
            src={
              
              'https://flitchcoin.s3.eu-west-2.amazonaws.com/authxlogo.svg'
            }
            alt="AuthX logo"
          />
          {err? <span className='text-red-500' >{errMsg}</span>:'' }
          {showMsg?  <span className='text-blue-400'>{message}</span>:'' }
          <div className="mt-4">
            <span className="text-3xl font-semibold">Trust AUTHX</span>
          </div>
          <div className="mt-4">
            <span className="text-base text-slate-900">
              Continue to Log in to AuthX
            </span>
          </div>
        </div>
        <div
          
          className={`w-[300px] mt-[60px] flex flex-col items-center`}
        >
          {showpassField?
          
          <div className="grid grid-cols-1 w-full">
            <label
              htmlFor="password"
              className={`absolute translate-x-6 translate-y-[-12px] bg-white px-1`}
            >
              Password
            </label>
            <input
              id="password"
              type="text"
              value = {pass}
              className=" p-1 pl-2.5  h-12 border-2 border-gray-500 bg-white text-gray-900 rounded-lg focus:ring-gray-900 focus:border-gray-900 "
              onChange={(e)=>setPass(e.target.value)}
            />
          </div>:
          <div className="grid grid-cols-1 w-full">
          <label
            htmlFor="email"
            className={`absolute translate-x-6 translate-y-[-12px] bg-white px-1`}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value = {email}
            className=" p-1 pl-2.5  h-12 border-2 border-gray-500 bg-white text-gray-900 rounded-lg focus:ring-gray-900 focus:border-gray-900 "
            placeholder="name@example.com"
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
      
        }
           
          <div className="w-full mt-12">
            <Button
              style={{
                background: 'black',
                backgroundImage: 'linear-gradient(to right)'
              }}
              className={`w-full h-12 text-white`}
              onClick={loading2?undefined:handleGo}
            >
              <span className="ml-6 text-xl">{loading2?'Loading...':'Go !!'}</span>
              <ChevronRightIcon className="ml-3" />
            </Button>
          </div>
          {showEnableMfaLink? <span className='text-blue-400' onClick={()=>setEnablUsereMfa(true)}>Do you want to enable MFA? Click here to enable!</span>:'' }
        </div>
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
    
    }
    </>
  );
};

export default Login;
