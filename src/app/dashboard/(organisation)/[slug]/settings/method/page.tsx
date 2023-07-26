import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Switch } from '@/components/ui/Switch';
import { AiGenerate } from '@/assets/Svg/Account/Account';
import { Button } from '@/components/ui/Button';
import { SettingSwitch } from '../components/setting-switch';

const OrganisationDashboard = () => {
  return (
    <div className="grid gap-11">
      <Card className="shadow-none">
        <CardHeader className="px-10 pb-2">
          <CardTitle className="text-2xl font-medium">Password-less</CardTitle>
        </CardHeader>
        <CardContent className="flex px-10 gap-28">
          <p className="leading-tight text-slate-500 font-normal">
            Implement a password-less authentication mechanism within your
            Authx-powered platform, eliminating the need for traditional
            passwords. Leverage advanced authentication methods such as email
            magic links, SMS OTP (One-Time Password), or biometric
            authentication to provide a seamless and secure login experience for
            your users.
          </p>
          <SettingSwitch id="passwordless" name="Passwordless" />
        </CardContent>
      </Card>
      <Card className="shadow-none">
        <CardHeader className="px-10 pb-2">
          <CardTitle className="text-2xl font-medium">
            Machine-to-Machine Tokens
          </CardTitle>
        </CardHeader>
        <CardContent className="flex px-10 gap-28">
          <p className="leading-tight text-slate-500 font-normal">
            Implement machine-to-machine token authentication within your
            Authx-powered platform to enable secure communication and
            interaction between machines and APIs. Generate unique tokens
            specifically designed for machine authentication, ensuring that only
            authorized machines can access your platform's resources and
            services.
          </p>
          <Switch disabled />
        </CardContent>
      </Card>
      <Card className="shadow-none">
        <CardHeader className="px-10 pb-2">
          <CardTitle className="text-2xl font-medium">
            User Consent Management{' '}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex px-10 gap-28">
          <p className="leading-tight text-slate-500 font-normal">
            Implement comprehensive user consent management capabilities within
            your Authx-powered platform to ensure compliance with data
            protection regulations and empower users to have control over their
            personal information.
          </p>
          <Switch disabled />
        </CardContent>
      </Card>
      <Card className="shadow-none">
        <CardHeader className="px-10 pb-2">
          <CardTitle className="text-2xl font-medium">Callbacks</CardTitle>
        </CardHeader>
        <CardContent className="flex px-10 gap-28">
          <p className="leading-tight text-slate-500 font-normal">
            Utilize callbacks within your Authx integration to enable seamless
            and efficient communication between your platform and Authx.
            Callbacks are a mechanism that allows Authx to notify your platform
            about specific events or actions, enabling real-time updates and
            triggering custom logic or workflows.
          </p>
          <SettingSwitch id="callbacks" name="Callbacks" />
        </CardContent>
      </Card>
      <Card className="shadow-none">
        <CardHeader className="px-10 pb-2">
          <CardTitle className="text-2xl font-medium">
            Email Validation
          </CardTitle>
        </CardHeader>
        <CardContent className="flex px-10 gap-28">
          <p className="leading-tight text-slate-500 font-normal">
            Implement robust email validation within your Authx-powered platform
            to ensure the accuracy and legitimacy of user-provided email
            addresses. Email validation helps to mitigate the risk of accepting
            invalid or fake email addresses, improving the overall quality of
            user data and communication.
          </p>
          <Switch disabled />
        </CardContent>
      </Card>
      <Card className="shadow-none">
        <CardHeader className="px-10 pb-2">
          <AiGenerate />
          <CardTitle className="text-2xl !mt-2 font-medium">
            Single Sign-On
          </CardTitle>
        </CardHeader>
        <CardContent className="flex px-10 gap-8">
          <p className="leading-tight text-slate-500 font-normal">
            Implement Single Sign-On (SSO) functionality within your
            Authx-powered platform to streamline the authentication process and
            provide users with a seamless login experience across multiple
            applications and services. With SSO, users can access your platform
            and other integrated services using a single set of login
            credentials.
          </p>
          <Button className="bg-black hover:bg-black/80 text-white text-sm px-8">
            Upgrade to Enterprise
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganisationDashboard;
