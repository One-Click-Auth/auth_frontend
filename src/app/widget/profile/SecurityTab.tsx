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
import { useOrgData, useSecurityStore, useToken } from '../login/widgetStore';

import { PasswordCheck } from '../login/components/PasswodCheck';
import OTPInput from 'react-otp-input';
import { QRCodeSVG } from 'qrcode.react';
import { create } from 'zustand';
import { Dialog, DialogTrigger } from '@/components/ui/Dialog';
import { CodeDialogue } from './codeDialogue';

//Security Component
export default function Security() {
  const { set_user_token, user_token } = useToken();

  const { password, mfa, setPassword, setMfa } = useSecurityStore();
  const storeOrgData = useOrgData(state => state.data);
  const [pass, setPass] = useState('');
  const [otp, setOtp] = useState('');
  const [otp2, setOtp2] = useState('');
  // const [loading1, setLoading1] = useState(false)
  // const [loading2, setLoading2] = useState(false)
  const [showChecks, setShowChecks] = useState<boolean>(false);
  const [showQr, setShowQr] = useState(false);
  const [showMfa, setShowMfa] = useState(false);
  const [loading1, setLoading1] = useState(false);
  // const [disabled1, setDisabled1] = useState(false);

  useEffect(() => {
    if (pass.length > 0) {
      setShowChecks(true);
    } else {
      setShowChecks(false);
    }
  }, [pass]);

  async function registerMfa() {
    setOtp2('');
    setOtp('');
    setShowMfa(state => !state);
    setShowQr(true);
  }
  async function disableMfa() {
    setOtp('');
    setOtp2('');
    setShowMfa(state => !state);
    setShowQr(false);
  }
  // async function passwordRequest(){

  // }

  const otpInputStyle = {
    borderRadius: '0.5rem',
    border: '1.3px solid',
    borderColor: `black`,
    // "!w-10 h-10 border bg-transparent text-center rounded-xl"
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
              disabled={password || loading1}
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
                        className="w-full sm:w-[140px] sm:min-w-[140px]"
                        onClick={registerMfa}
                      >
                        Enable MFA
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
                    value="https://kqwhjskqwjhqkwjshedwqed=wswq"
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
