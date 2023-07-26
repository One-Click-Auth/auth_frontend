import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Switch } from "@/components/ui/Switch";
import {
  AiCloudSpark,
} from "@/assets/Svg/Account/Account";
import { Button } from "@/components/ui/Button";
import { SettingSwitch } from "../components/setting-switch";

const OrganisationDashboard = () => {
  return (
    <div className="flex-1 space-y-8 p-10 pt-4 lg:p-16">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total API calls
            </CardTitle>
            <Image
              src="/dashboard-icons/dollar-coin.svg"
              alt="dollar icon"
              width={24}
              height={24}
            />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold">45,000</div>
            <p className="text-xs text-disabled">Last month's API calls</p>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Est. Cost
            </CardTitle>
            <Image
              src="/dashboard-icons/credit-card.svg"
              alt="multiple users icon"
              width={24}
              height={24}
            />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold">$4,500.54</div>
            <p className="text-xs text-disabled">Total Recurring Cost</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-11">
        <Card className="shadow-none">
          <CardHeader className="px-10 pb-2">
            <CardTitle className="text-2xl font-medium">
              Custom Email Address
            </CardTitle>
          </CardHeader>
          <CardContent className="flex px-10 gap-28">
            <p className="leading-tight text-slate-500 font-normal">
              Empower your Authx-powered platform to send emails from custom
              email addresses, enhancing brand identity and communication
              consistency. With Authx, you can configure and customize the email
              sending functionality to utilize your desired custom email
              addresses, providing a seamless and personalized email experience
              for your users.
            </p>
            <Switch disabled/>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader className="px-10 pb-2">
            <CardTitle className="text-2xl font-medium">
              Social Sign-On
            </CardTitle>
          </CardHeader>
          <CardContent className="flex px-10 gap-28">
            <p className="leading-tight text-slate-500 font-normal">
              Enable social sign-on functionality within your Authx-powered
              platform, allowing users to authenticate and access your platform
              using their social media accounts. Social sign-on simplifies the
              registration and login process, enhancing user convenience and
              streamlining the onboarding experience.
            </p>
            <Switch disabled/>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader className="px-10 pb-2">
            <CardTitle className="text-2xl font-medium">
              MFA - TOTP Based
            </CardTitle>
          </CardHeader>
          <CardContent className="flex px-10 gap-28">
            <p className="leading-tight text-slate-500 font-normal">
              Implement Time-based One-Time Password (TOTP) based Multi-Factor
              Authentication (MFA) within your Authx-powered platform to enhance
              the security of user accounts. TOTP MFA adds an additional layer
              of verification by requiring users to provide a time-sensitive,
              one-time password in addition to their regular credentials.
            </p>
            <SettingSwitch id="fa2" name="MFA"/>
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
            <Button className="bg-black hover:bg-black/80 text-white text-sm px-8">
              Upgrade to Enterprise
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganisationDashboard;
