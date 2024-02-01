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
import { getSocialLoginUrl } from '@/lib/utils';
import { useOrgData } from '../widgetStore';
import { ToastProps } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import {
  SocialLoginCollection,
  SocialLoginLabel,
  SocialLoginValue
} from '@/types/social-logins';
import { Icons } from './icons';
import { SocialLogin } from './SocialLogin';
import { allSocialLogins } from './data';
import { $TsFixMe } from '@/types';
import { LoginMethodSeparator } from './LoginMethodSeparator';
import Link from 'next/link';

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

// TODO: test email-login and social-login flow
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

  //INFO: using filter because of lack of config typesaftey and data
  const allowedSocialLogins = Object.keys(orangizationData.social)
    .map(e => allSocialLogins[e as SocialLoginValue])
    .filter(e => e);
  const isLoginWithEmailEnabled = orangizationData.email_val;

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
          {allowedSocialLogins.map(item => {
            const Icon = Icons[item.icon];
            return (
              <SocialLogin
                key={item.value}
                onClick={() =>
                  initiateSocialLogin(item.value, organizationToken, toast)
                }
              >
                <Icon className="h-5 w-5" />
                <span>Continue with {item.label}</span>
              </SocialLogin>
            );
          })}
        </div>
        {isLoginWithEmailEnabled && (
          <>
            <LoginMethodSeparator />
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
          </>
        )}
      </CardContent>
      {/* Not handling pp and tnc because no response type available, `unknown` cannot be used.
      Ref: https://github.com/One-Click-Auth/auth_frontend/pull/265#issuecomment-1912395385
      */}
      <CardFooter className="p-0 pb-4">
        <p className="text-[10px] text-[#000000A6] leading-4">
          By proceeding, I acknowledge and agree to abide by the terms outlined
          in the&nbsp;
          <Link href="#">
            <strong className="text-login hover:text-login/85">
              Privacy Policy
            </strong>
          </Link>
          &nbsp;and{' '}
          <Link href="#">
            <strong className="text-login hover:text-login/85">
              Terms &amp; Conditions.
            </strong>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
