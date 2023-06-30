import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Switch } from "@/components/ui/Switch";
import { ShieldSpark, MagnifierZoom, AiNetwork } from "@/assets/Svg/Account/Account";
import { Button } from "@/components/ui/Button";

const OrganisationDashboard = ({ params }: { params: { slug: string } }) => {
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
              DDoS Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="flex px-10 gap-28">
            <p className="leading-tight text-slate-500 font-normal">
              Implement robust DDoS (Distributed Denial of Service) protection
              measures within your Authx-powered platform to safeguard against
              malicious traffic and ensure uninterrupted service availability.
            </p>
            <Switch />
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader className="px-10 pb-2">
            <CardTitle className="text-2xl font-medium">
              Bot Detection
            </CardTitle>
          </CardHeader>
          <CardContent className="flex px-10 gap-28">
            <p className="leading-tight text-slate-500 font-normal">
              Implement robust bot detection mechanisms within your
              Authx-powered platform to identify and mitigate the activities of
              malicious bots, ensuring a secure and reliable user experience for
              legitimate users.
            </p>
            <Switch />
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
              Implement robust brute force attack protection measures within
              your Authx-powered platform to safeguard against unauthorized
              access attempts and protect user accounts from being compromised.
            </p>
            <Switch />
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
              Enhance the security of your Authx-powered platform by
              implementing breached password detection. Breached password
              detection helps identify if a user's password has been compromised
              in previous data breaches, minimizing the risk of account takeover
              and unauthorized access.
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
              addresses. By detecting and limiting the activities of such IPs,
              you can protect your platform from various types of attacks and
              ensure a secure environment for legitimate users.
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
