'use client';
import React, { useEffect, useState, useRef } from 'react';
import Modal from '@/components/Modal';
import OtpInput from 'react-otp-input';
import { API_DOMAIN, LOGIN_GRAPHIC, LOGO } from '@/constants';
import Image from 'next/image';
import LayoutBanner from '@/components/authForm/LayoutBanner';
import { signIn } from 'next-auth/react';
import { PasswordComponent } from '@/components/authForm/PasswordComponent';
import { EmailComponent } from '@/components/authForm/EmailComponent';
import Link from 'next/link';
import LoadingModal from '@/components/authForm/LoadingModal';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/icons';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { IoArrowBackOutline } from 'react-icons/io5';

type FormValues = {
  username?: string;
  password?: string;
  type?: string;
  otp?: string;
};

const Login = ({ searchParams }: { searchParams: Record<string, string> }) => {
  const [values, setValues] = useState<FormValues>({});
  const [fa2, setFa2] = useState<boolean>(false);
  // const [userRes, setUserRes] = useState({});
  // const [value, setValue] = useState('');
  // const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refId, setRefId] = useState('string');
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams['tnx'];
    const ref_id = searchParams['ref'];
    setRefId(ref_id);
    // console.log(ref_id)
    window.localStorage.setItem('ref_id', ref_id);

    if (token)
      signIn('credentials', {
        githubToken: token,
        callbackUrl: '/dashboard'
      });
  }, [searchParams]);

  const initiateLogin = async (data: Partial<FormValues>) => {
    const signinRes = await signIn('credentials', {
      ...values,
      ...data,
      redirect: false,
      callbackUrl: '/dashboard'
    });
    if (signinRes?.error) {
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Authentication Error!',
        description: 'Email, password mismatch. Please try again!',
        style: {
          left: 0
        }
      });
    }
    if (signinRes?.url) {
      router.push('/dashboard');
    }
  };

  // on submit handler
  const onSubmitHandler = async (pwd: string) => {
    try {
      return initiateLogin({ password: pwd });
    } catch (err) {
      setLoading(false);
      console.log('Error in onSubmitHandler ', err);
    }
  };

  const handlePasswordSubmit = ({ password }: { password: string }) => {
    setLoading(true);
    setValues(prev => ({ ...prev, password }));
    setTimeout(() => {
      onSubmitHandler(password);
    }, 100);
  };

  const handleEmailSubmit = (data: { username: string }) => {
    setValues(prev => ({ ...prev, username: data.username }));
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row justify-center">
      <div className="container sm:basis-3/5 flex flex-col min-h-screen">
        <div className="self-start mt-7">
          <Link
            href="https://www.trustauthx.com"
            className="flex flex-row items-center justify-center gap-2 group"
          >
            <IoArrowBackOutline
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back to Landing page</span>
            <Image width={30} height={30} src={LOGO} alt="AuthX logo" />
          </Link>
        </div>
        <div className="flex mt-36 mb-12 sm:mt-20 sm:mb-12 items-center justify-center grow sm:mr-12">
          <div className="-mt-32 w-fit max-w-lg">
            <Image
              className="mx-auto mb-8"
              width={62}
              height={62}
              src={LOGO}
              alt="AuthX logo"
            />
            <h1 className="scroll-m-20 text-4xl text-center pb-9 md:pb-11 font-semibold transition-colors first:mt-0">
              Login to your AuthX account
            </h1>
            <div>
              <GithubLogin ref_id={refId} />
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              {!values.username ? (
                <EmailComponent
                  ref_id={refId}
                  handleEmailSubmit={handleEmailSubmit}
                  setFa2={setFa2}
                />
              ) : (
                <PasswordComponent
                  handlePasswordSubmit={handlePasswordSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <LayoutBanner
        bannerText="AuthX: Ensure Security at every level"
        src={LOGIN_GRAPHIC}
      />

      <Modal show={show} onHide={() => setShow(false)}>
        <div className="bg-white rounded-3xl p-16 mt-[20vh] w-max self-center">
          <div>
            <div className="">
              <div className="text-3xl text-center mb-4">Enter MFA OTP</div>
              <p className="text-center mb-10 text-slate-600">
                Enter Multifactor OTP from your authentication app
              </p>
              <OtpInput
                containerStyle="flex justify-center gap-1"
                inputStyle="otp-input-width h-12 p-0 text-center rounded-xl"
                value={values.otp}
                onChange={otp => setValues(prev => ({ ...prev, otp }))}
                numInputs={6}
                renderSeparator={<span></span>}
                renderInput={props => <input {...props} />}
              />
            </div>
          </div>
        </div>
      </Modal>
      <LoadingModal show={loading} />
    </div>
  );
};

function GithubLogin({ ref_id }: { ref_id: string }) {
  const [loading, setLoading] = useState(false);
  const initiateLogin = () => {
    setLoading(true);
    // axios.get(`${API_DOMAIN}/signup/github`, {
    //   headers: {
    //     "X-APP-URI": window.location.origin
    //   }
    // })
  };
  console.log(ref_id);
  const url = `${API_DOMAIN}/signup/github/${ref_id}`;
  return (
    <Button
      asChild
      onClick={initiateLogin}
      className="w-full h-12 mb-6 text-md border-slate-500 hover:bg-black hover:text-white"
      variant="outline"
      type="submit"
    >
      <Link href={url}>
        <Icons.gitHub className="mr-2 h-4 w-4" />
        Login with Github
      </Link>
    </Button>
    // <LoadingModal show={loading} />
  );
}
export default Login;
