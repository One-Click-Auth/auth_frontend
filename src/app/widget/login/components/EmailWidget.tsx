import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Separator } from '@/components/ui/seperator';
import { getSocialLoginUrl } from '@/lib/utils';
import githubIcon from '../github-mark.svg';
import googleIcon from '../google.svg';
import { useOrgData } from '../widgetStore';
import Image from 'next/image';
import { ToastProps } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { $TsFixMe } from '@/types';

interface EmailWidgetProps {
  email: string;
  setEmail: (NewPass: string) => void;
  loading: boolean;
  handleSubmit: (e: { preventDefault: () => void }) => Promise<void>;
}

const initiateSocialLogin = async (
  social: string,
  orgToken: string,
  toast?: (props: ToastProps) => void
): Promise<void> => {
  try {
    const url = await getSocialLoginUrl({ provider: social, orgToken });
    window.location.href = url;
  } catch (error: $TsFixMe) {
    const message = `Social Login Failed: ${
      error?.message ?? 'Something Went Wrong'
    }`;
    toast?.({
      variant: 'destructive',
      title: message
    });
  }
};

function SocialLogin({
  onClick,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      className="w-full gap-2 text-left items-center justify-start hover:bg-secondary font-normal text-xs leading-4"
      variant="outline"
      onClick={onClick}
      {...props}
    />
  );
}

// INFO: email-login and social-login flow is not tested
export function EmailWidget({
  handleSubmit,
  email,
  setEmail,
  loading
}: EmailWidgetProps) {
  const { toast } = useToast();
  const orangizationData = useOrgData(state => state.data);
  const organizationToken = useOrgData(state => state.org_token);

  const organizationLogoURL = orangizationData.widget.logo_url;
  const organizationName = orangizationData.widget.name;

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="p-0 pb-4">
        <Avatar className="w-11 h-11">
          <AvatarImage src={organizationLogoURL} />
          <AvatarFallback>{organizationName}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="space-y-6 p-0 pb-4">
        <div className="text-left">
          <h2 className="font-semibold text-xl">Sign in</h2>
          <p className="font-medium text-base text-muted-foreground">
            to continue to{' '}
            <strong className="text-black">{organizationName}</strong>
          </p>
        </div>
        <div className="space-y-4">
          <SocialLogin
            onClick={() =>
              initiateSocialLogin('github', organizationToken, toast)
            }
          >
            <Image
              src={githubIcon}
              className="h-5 w-5 rounded-full"
              alt="Github Icon For Social Login"
            />
            <span>Continue with GitHub</span>
          </SocialLogin>
          <SocialLogin
            onClick={() =>
              initiateSocialLogin('google', organizationToken, toast)
            }
          >
            <Image
              src={googleIcon}
              className="h-5 w-5 rounded-full"
              alt="Google Icon For Social Login"
            />
            <span>Continue with Google</span>
          </SocialLogin>
        </div>
        <div className="grid grid-cols-[1fr_0.5fr_1fr] place-items-center">
          <Separator />
          <span>or</span>
          <Separator />
        </div>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="block text-xs leading-5 font-medium text-gray-700"
          >
            Email address
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            className="w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Button
            className="w-full bg-login hover:bg-login/90 text-white font-semibold text-[10px] leading-tight"
            disabled={loading}
          >
            CONTINUE
          </Button>
        </form>
      </CardContent>
      {/* Not handling pp and tnc because no response type available, `unknown` cannot be used.
      Ref: https://github.com/One-Click-Auth/auth_frontend/pull/265#issuecomment-1912395385
      */}
      <CardFooter className="p-0 pb-4">
        <p className="text-[10px] text-[#000000A6] leading-4">
          By proceeding, I acknowledge and agree to abide by the terms outlined
          in the&nbsp;
          <strong className="text-login">Privacy Policy</strong>and{' '}
          <strong className="text-login">Terms &amp; Conditions.</strong>
        </p>
      </CardFooter>
    </Card>
  );
}
