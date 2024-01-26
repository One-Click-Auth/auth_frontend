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

interface EmailWidgetProps {
  email: string;
  setEmail: (NewPass: string) => void;
  loading: boolean;
  handleSubmit: (e: { preventDefault: () => void }) => Promise<void>;
}

const socialLogin = async (
  social: string,
  orgToken: string,
  setLoading?: (loading: boolean) => void
): Promise<void> => {
  try {
    setLoading?.(true);
    const url = await getSocialLoginUrl({ provider: social, orgToken });
    window.location.href = url;
  } catch (error) {
    console.error('Social login failed:', error);
    // Handle error as needed
  } finally {
    setLoading?.(false);
  }
};

// TODO:
export function EmailWidget({
  handleSubmit,
  email,
  setEmail,
  loading
}: EmailWidgetProps) {
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
          {/* TODO: change socialbutton to accept string content as child */}
          {/* TODO: implement social logins */}
          <Button
            className="w-full gap-2 text-left items-center justify-start hover:bg-secondary font-normal text-xs leading-4"
            variant="outline"
            onClick={() => socialLogin('github', organizationToken)}
          >
            <Image
              src={githubIcon}
              className="h-5 w-5 rounded-full"
              alt="Github Icon For Social Login"
            />
            <span>Continue with GitHub</span>
          </Button>
          <Button
            className="w-full gap-2 text-left items-center justify-start hover:bg-secondary font-normal text-xs leading-4"
            variant="outline"
            onClick={() => socialLogin('google', organizationToken)}
          >
            <Image
              src={googleIcon}
              className="h-5 w-5 rounded-full"
              alt="Google Icon For Social Login"
            />
            <span>Continue with Google</span>
          </Button>
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
          {/* TODO: use widget button or change widget button styles */}
          <Button
            className="w-full bg-login hover:bg-login/90 text-white font-semibold text-[10px] leading-tight"
            disabled={loading}
          >
            CONTINUE
          </Button>
        </form>
      </CardContent>
      <CardFooter className="p-0 pb-4">
        <p className="text-[10px] text-[#000000A6] leading-4">
          By proceeding, I acknowledge and agree to abide by the terms outlined
          in the&nbsp;
          <strong className="text-login">
            Privacy Policy and Terms &amp; Conditions.
          </strong>
        </p>
      </CardFooter>
    </Card>
  );
}
