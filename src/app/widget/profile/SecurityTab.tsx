'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Separator } from '@/components/ui/separator';
import {
  UserProfileData,
  useUserProfileData,
  useOrgData,
  useSecurityStore,
  useToken
} from '../login/widgetStore';
import { PasswordCheck } from '../login/components/PasswodCheck';
import OTPInput from 'react-otp-input';
import { QRCodeSVG } from 'qrcode.react';
import { Dialog, DialogTrigger } from '@/components/ui/Dialog';
import { CodeDialogue } from './codeDialogue';
import { useToast } from '@/components/ui/use-toast';
import {
  testPass,
  testOTP,
  decryptCode,
  convertToApproxTime
} from '../login/utils';
import { data } from 'autoprefixer';
import Spinner from '@/components/spinner';

//Security Component
export default function Security() {
  const { toast } = useToast();
  const { set_user_token, user_token } = useToken();
  const { password, mfa, setPassword, setMfa } = useSecurityStore();
  const storeOrgData = useOrgData(state => state.data);
  const setUserData = useUserProfileData(state => state.setProfileData);
  const [pass, setPass] = useState('');
  const [otp, setOtp] = useState('');
  const [otp2, setOtp2] = useState('');
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [showChecks, setShowChecks] = useState<boolean>(false);
  const [showQr, setShowQr] = useState(false);
  const [qrCode, setQrCode] = useState('');

  const [mfaCode, setMfaCode] = useState(''); //text code for mfa activation by using code
  const [showMfa, setShowMfa] = useState(false); //to show and hide the mfa activation section
  const [disabled1, setDisabled1] = useState(true);

  useEffect(() => {
    if (pass.length > 0) {
      setShowChecks(true);
    } else {
      setShowChecks(false);
    }
    if (!testPass(pass)) {
      setDisabled1(false);
    } else {
      setDisabled1(true);
    }
  }, [pass]);

  useEffect(() => {
    if (!testOTP(otp)) {
      handleMfa(true, otp);
    }
  }, [otp]);

  useEffect(() => {
    if (!testOTP(otp2)) {
      handleMfa(false, otp2);
    }
  }, [otp2]);

  async function mfaRequest() {
    setLoading2(true);
    try {
      const response = await fetch(
        `https://api.trustauthx.com/user/me/auth?UserToken=${user_token}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            switch_mfa: true
          })
        }
      );

      const data = (await response.json()) as {
        detail?: string;
        user_token: string;
        mfa_code: string;
      };
      setLoading2(false);
      if (data.detail) {
        toast({
          title: 'Error!',
          description: data.detail,
          variant: 'destructive'
        });
        return;
      }
      if (data.user_token) {
        set_user_token(data.user_token);
      }
      if (response.status === 203 || response.status == 200) {
        const code = decryptCode(data.mfa_code);
        setQrCode(code);
        setOtp('');
        setShowMfa(true);
        setShowQr(true);
        console.log(code);
        return;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Some error occured with the request',
        variant: 'destructive'
      });
      console.log(error);
      setLoading2(false);
      return;
    }
  }
  async function handleMfa(action: boolean, totp: string) {
    try {
      const response = await fetch(
        `https://api.trustauthx.com/user/me/auth?UserToken=${user_token}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            totp: totp,
            switch_mfa: action
          })
        }
      );
      const data = (await response.json()) as any;
      if (data.detail) {
        toast({
          title: 'Error!',
          description: data.detail,
          variant: 'destructive'
        });
        return;
      }
      if (data.user_token) {
        set_user_token(data.user_token);
      }
      if (response.status === 200) {
        toast({
          variant: 'success',
          description: action
            ? 'MFA Successfully Activated.'
            : 'MFA disabled Successfully.'
        });
        setOtp('');
        setOtp2('');
        setShowMfa(false);
        setShowQr(false);
        getUserData();
      } else if (response.status === 402) {
        //for incorrect otp
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
        //when maximum tries for otp has been reached by the user
        const timeRegex = /(\d+):(\d+):(\d+\.\d+)/;
        const matches = data.detail?.match(timeRegex);
        const time = convertToApproxTime(matches[0]);
        const msg = `maximum tries reached! Try again after ${
          time || 'some time'
        }`;
        toast({
          variant: 'destructive',
          description: msg
        });
        setOtp('');
        setOtp2('');
        setShowMfa(false);
        setShowQr(false);
        return;
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: 'Some error occured with the request'
      });
      return;
    }
  }
  async function disableMfa() {
    setOtp('');
    setOtp2('');
    setShowMfa(true);
    setShowQr(false);
  }
  // async function forgotMfa(){
  //   try {
  //     const response = await fetch(
  //       `https://api.trustauthx.com/user/me/auth?UserToken=${user_token}`,
  //       {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           "forget_totp": true
  //         })
  //       }
  //     );
  //     const data = (await response.json()) as any;
  //     if(data.detail){
  //       toast({
  //         title: 'Error!',
  //         description: data.detail,
  //         variant: 'destructive'
  //       });
  //       return;
  //     }
  //     if(data.user_token){
  //       set_user_token(data.user_token);
  //     }
  //     if( response.status === 200){
  //       toast({
  //         variant:'success',
  //         description:'MFA removed successfully. You can request for mfa again.'
  //      })
  //     }

  //   } catch (error) {

  //   }
  // }

  async function newPasswordRequest() {
    setLoading1(true);
    try {
      const response = await fetch(
        `https://api.trustauthx.com/user/me/auth?UserToken=${user_token}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            new_user_password: pass
          })
        }
      );
      const data = (await response.json()) as {
        detail?: string;
        user_token: string;
      };
      const token = data.user_token;
      if (token) {
        set_user_token(token);
      }
      if (data.detail) {
        toast({
          title: 'Error',
          description: data.detail,
          variant: 'destructive'
        });
        setLoading1(false);
        return;
      }
      if (response.status === 200) {
        toast({
          variant: 'success',
          title: 'Success!',
          description: 'Password set successfully'
        });
        setLoading1(false);
        setPass('');
        getUserData();
        return;
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
  }

  async function getUserData() {
    try {
      const response = await fetch(
        `https://api.trustauthx.com/user/me/auth/data?userToken=${user_token}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json'
          }
        }
      );

      const userData = (await response.json()) as UserProfileData;
      const org_id = Object.keys(userData.data.partner)[0];
      console.log(userData.data.partner[org_id]);
      setUserData(userData);
      setPassword(userData.data.partner[org_id].password);
      setMfa(userData.data.partner[org_id].fa2);
      return;
    } catch (error) {
      const errMsg = (error as Error).message;
      console.log(error);
      throw new Error(errMsg);
    }
  }

  const otpInputStyle = {
    borderRadius: '0.5rem',
    border: '1.3px solid',
    borderColor: `black`,
    background: 'transparent',
    height: '2.2rem',
    width: '2.2rem'
  };

  return (
    <Card className="border-none shadow-none flex flex-col sm:items-start ">
      <CardHeader className="sm:pt-0 flex flex-col sm:items-start">
        <CardTitle>Security</CardTitle>
        <CardDescription>
          Make changes to your account security.
        </CardDescription>
      </CardHeader>
      <Separator className="mb-4  sm:ml-6" />
      <CardContent className="space-y-10 w-full">
        <div
          className={`gap-2 flex flex-col items-start ${
            password ? 'cursor-not-allowed opacity-50' : ''
          } `}
        >
          <Label htmlFor="password" className="text-md font-semibold">
            Password
          </Label>
          <div className="flex flex-col flex-wrap sm:flex-row gap-2 w-full">
            <div>
              <Input
                disabled={password}
                id="password"
                type="password"
                placeholder="Password"
                className="sm:max-w-[450px] sm:min-w-[400px]"
                onChange={e => setPass(e.target.value)}
              />
              <div className="w-full sm:max-w-[450px] sm:min-w-[400px]">
                <p className="text-left text-muted-foreground">
                  {password
                    ? 'A password is already set for this account.'
                    : `
                     No password is currently set for this account, Set a new
                     password (optional).
                    `}
                </p>
                <div
                  className={`${
                    !showChecks
                      ? 'h-0 transition-all overflow-hidden'
                      : 'h-[200px] transition-all '
                  }`}
                >
                  <PasswordCheck pass={pass} />
                </div>
              </div>
            </div>
            <Button
              variant={'black'}
              className="w-full sm:w-[140px] sm:min-w-[140px]"
              disabled={password || loading1 || disabled1}
              onClick={newPasswordRequest}
            >
              Save Update
            </Button>
          </div>
        </div>
        {storeOrgData.fa2 && (
          <>
            <div className="gap-2 flex flex-col sm:items-start ">
              <h2 className="text-md text-left font-semibold">
                Multi Factor authentication
              </h2>

              <div className="flex flex-col sm:items-center flex-wrap sm:flex-row gap-4 w-full">
                {showMfa ? (
                  <>
                    <p className="text-left text-muted-foreground">
                      {showQr
                        ? 'Scan the QR and Enter the OTP from your Authentication App to Turn on MFA'
                        : 'Enter OTP from your Authentication App to Turn off MFA'}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-left text-muted-foreground">
                      {mfa
                        ? 'Multi Factor authentication (MFA) is enabled'
                        : 'Multi Factor authentication (MFA) is disabled'}
                    </p>
                    {mfa ? (
                      <Button
                        variant={'black'}
                        className="w-full sm:w-[140px] sm:min-w-[140px]"
                        onClick={disableMfa}
                      >
                        Disable MFA
                      </Button>
                    ) : (
                      <Button
                        variant={'black'}
                        disabled={loading2}
                        className="w-full sm:w-[140px] sm:min-w-[140px]"
                        onClick={mfaRequest}
                      >
                        {loading2 ? (
                          <div className="flex gap-2 items-center text-gray-400">
                            <Spinner size={15} color="gray" />
                            <span>...requesting</span>
                          </div>
                        ) : (
                          'Enable MFA'
                        )}
                      </Button>
                    )}
                  </>
                )}
              </div>
              <div
                className={` ${
                  !showMfa
                    ? 'h-0 overflow-hidden'
                    : showQr
                    ? 'h-[240px] sm:h-[160px]'
                    : 'h-[`100px] mt-6'
                } flex flex-col-reverse flecx-wrap sm:flex-row items-center w-full  p-0 gap-4 sm:gap-20 sm:mt-4`}
              >
                <div>
                  <OTPInput
                    containerStyle="grid gap-1 w-fit"
                    inputStyle={otpInputStyle}
                    value={showQr ? otp : otp2}
                    onChange={showQr ? setOtp : setOtp2}
                    numInputs={6}
                    inputType="text"
                    renderSeparator={<span></span>}
                    renderInput={props => <input {...props} />}
                  />
                  {/* {!showQr?<Button className='rounded-full bg-[#004B6A] text-white font-normal hover px-6 h-6 mt-4 hover:bg-slate-400'>Forgot Mfa</Button>:''} */}
                </div>

                <div className={` ${showQr ? '' : 'hidden'} `}>
                  <QRCodeSVG
                    value={qrCode}
                    className="mt-4 sm:mt-0"
                    size={120}
                  />
                  <Dialog>
                    <DialogTrigger className=" rounded-full bg-[#004B6A] text-white font-normal hover px-6 h-6 mt-4 hover:bg-slate-400  ">
                      Use code
                    </DialogTrigger>
                    <CodeDialogue code="wjkdehqkjdhqkj" />
                  </Dialog>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
