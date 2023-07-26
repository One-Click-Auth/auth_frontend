import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Switch } from '@/components/ui/Switch';
import {
  ShieldSpark,
  MagnifierZoom,
  AiNetwork
} from '@/assets/Svg/Account/Account';
import { Button } from '@/components/ui/Button';
import { SettingSwitch } from '../components/setting-switch';

const OrganisationDashboard = () => {
  return (
    <div className="grid gap-11">
      <Card className="shadow-none">
        <CardHeader className="px-10 pb-2">
          <CardTitle className="text-2xl font-medium">
            DDoS Protection
          </CardTitle>
        </CardHeader>
        <CardContent className="flex px-10 gap-28">
          <p className="leading-tight text-slate-500 font-normal">
            Implement robust DDoS (Distributed Denial of Service) protection
            measures within your Authx-powered platform to safeguard against
            malicious traffic and ensure uninterrupted service availability.
          </p>
          <SettingSwitch id="DDoS" name="DDoS Protection" />
        </CardContent>
      </Card>
      <Card className="shadow-none">
        <CardHeader className="px-10 pb-2">
          <CardTitle className="text-2xl font-medium">Bot Detection</CardTitle>
        </CardHeader>
        <CardContent className="flex px-10 gap-28">
          <p className="leading-tight text-slate-500 font-normal">
            Implement robust bot detection mechanisms within your Authx-powered
            platform to identify and mitigate the activities of malicious bots,
            ensuring a secure and reliable user experience for legitimate users.
          </p>
          <SettingSwitch id="bot_det" name="Bot Detection" />
        </CardContent>
      </Card>
      <Card className="shadow-none">
        <CardHeader className="px-10 pb-2">
          <CardTitle className="text-2xl font-medium">
            Brute Force Attack Protection
          </CardTitle>
        </CardHeader>
        <CardContent className="flex px-10 gap-28">
          <p className="leading-tight text-slate-500 font-normal">
            Implement robust brute force attack protection measures within your
            Authx-powered platform to safeguard against unauthorized access
            attempts and protect user accounts from being compromised.
          </p>
          <SettingSwitch
            id="brute_force"
            name="Brute Force Attack Protection"
          />
        </CardContent>
      </Card>
      <Card className="shadow-none">
        <CardHeader className="px-10 pb-2">
          <AiNetwork />
          <CardTitle className="text-2xl !mt-2 font-medium">
            Breached Password Detection
          </CardTitle>
        </CardHeader>
        <CardContent className="flex px-10 gap-8">
          <p className="leading-tight text-slate-500 font-normal">
            Enhance the security of your Authx-powered platform by implementing
            breached password detection. Breached password detection helps
            identify if a user's password has been compromised in previous data
            breaches, minimizing the risk of account takeover and unauthorized
            access.
          </p>
          <Button className="bg-black hover:bg-black/80 text-white text-sm px-8">
            Upgrade to Enterprise
          </Button>
        </CardContent>
      </Card>
      <Card className="shadow-none">
        <CardHeader className="px-10 pb-2">
          <ShieldSpark />
          <CardTitle className="text-2xl !mt-2 font-medium">
            AI based Security System
          </CardTitle>
        </CardHeader>
        <CardContent className="flex px-10 gap-8">
          <p className="leading-tight text-slate-500 font-normal">
            Implement an AI-based security system within your Authx-powered
            platform to enhance threat detection, response, and overall
            cybersecurity capabilities. By leveraging artificial intelligence
            and machine learning algorithms, you can bolster your platform's
            security defenses and adapt to evolving threats effectively.
          </p>
          <Button className="bg-black hover:bg-black/80 text-white text-sm px-8">
            Upgrade to Enterprise
          </Button>
        </CardContent>
      </Card>
      <Card className="shadow-none">
        <CardHeader className="px-10 pb-2">
          <MagnifierZoom />
          <CardTitle className="text-2xl !mt-2 font-medium">
            Suspicious IP Throttling
          </CardTitle>
        </CardHeader>
        <CardContent className="flex px-10 gap-8">
          <p className="leading-tight text-slate-500 font-normal">
            Implement suspicious IP throttling within your Authx-powered
            platform to mitigate the risks posed by suspicious or malicious IP
            addresses. By detecting and limiting the activities of such IPs, you
            can protect your platform from various types of attacks and ensure a
            secure environment for legitimate users.
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
