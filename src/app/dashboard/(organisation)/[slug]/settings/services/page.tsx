import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AiCloudSpark } from '@/assets/Svg/Account/Account';
import { Button } from '@/components/ui/Button';
import { SettingSwitch } from '../components/setting-switch';
import UpgradeToEnterprise from '@/app/dashboard/upgradeToEnterprise';

const OrganisationDashboard = () => {
  return (
    <div className="grid gap-11">
      <Card className="shadow-none">
        <CardHeader className="px-10 pb-2">
          <CardTitle className="text-2xl font-medium">
            Custom Email Address
          </CardTitle>
        </CardHeader>
        <CardContent className="flex px-10 gap-28">
          <p className="leading-tight text-slate-500 font-normal">
            Empower your Authx-powered platform to send emails from custom email
            addresses, enhancing brand identity and communication consistency.
            With Authx, you can configure and customize the email sending
            functionality to utilize your desired custom email addresses,
            providing a seamless and personalized email experience for your
            users.
          </p>
          <SettingSwitch
            id="custom_email"
            name="Custom Email Address"
            price={null}
          />
        </CardContent>
      </Card>
      <Card className="shadow-none">
        <CardHeader className="px-10 pb-2">
          <CardTitle className="text-2xl font-medium">Social Sign-On</CardTitle>
        </CardHeader>
        <CardContent className="flex px-10 gap-28">
          <p className="leading-tight text-slate-500 font-normal">
            Enable social sign-on functionality within your Authx-powered
            platform, allowing users to authenticate and access your platform
            using their social media accounts. Social sign-on simplifies the
            registration and login process, enhancing user convenience and
            streamlining the onboarding experience.
          </p>
          <SettingSwitch id="social_sign" name="Social Sign-On" price={null} />
        </CardContent>
      </Card>
      <Card className="shadow-none">
        <CardHeader className="px-10 pb-2">
          <span className="text-xl text-slate-500">$25.00</span>
          <CardTitle className="text-2xl font-medium">
            MFA - TOTP Based
          </CardTitle>
        </CardHeader>
        <CardContent className="flex px-10 gap-28">
          <p className="leading-tight text-slate-500 font-normal">
            Implement Time-based One-Time Password (TOTP) based Multi-Factor
            Authentication (MFA) within your Authx-powered platform to enhance
            the security of user accounts. TOTP MFA adds an additional layer of
            verification by requiring users to provide a time-sensitive,
            one-time password in addition to their regular credentials.
          </p>
          <SettingSwitch id="fa2" name="MFA" price="$25.00" />
        </CardContent>
      </Card>
      <Card className="shadow-none">
        <CardHeader className="px-10 pb-2">
          <AiCloudSpark />
          <CardTitle className="text-2xl !mt-2 font-medium">
            Private Cloud & Global Acceleration
          </CardTitle>
        </CardHeader>
        <CardContent className="flex px-10 gap-8">
          <p className="leading-tight text-slate-500 font-normal">
            Leverage the benefits of a private cloud infrastructure and global
            acceleration capabilities within your Authx-powered platform to
            ensure enhanced performance, scalability, and data security across
            geographically distributed locations.
          </p>
          <UpgradeToEnterprise />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganisationDashboard;
