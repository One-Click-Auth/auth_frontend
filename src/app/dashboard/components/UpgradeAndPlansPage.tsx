import { AiCloudSpark } from '@/assets/Svg/Account/Account';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

function UpgradeAndPlansPage() {
  return (
    <div className="mt-16  [&>div]:max-w-screen-xl flex items-center   flex-col justify-center w-full">
      <div className="mb-12 pl-12  max-w-screen-xl w-full">
        <div className="flex items-center gap-1">
          <CheckMarkSvg />
          <p className="text-muted-foreground text-sm">
            Updated at May 4, 2022
          </p>
        </div>

        <p className="text-4xl">User Book</p>
      </div>

      <div className="flex-col  flex gap-8">
        <Card className="shadow-none">
          <CardHeader className="px-10 pb-2">
            <Image alt="dollar" src="/dollar.svg" width={35} height={35} />
            <CardTitle className="text-2xl !mt-2 font-medium">
              Pay Upcoming Invoices Immediately
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row  px-10 gap-8">
            <p className="leading-tight text-slate-500 font-normal">
              Implement suspicious IP throttling within your Authx-powered
              platform to mitigate the risks posed by suspicious or malicious IP
              addresses. By detecting and l imiting the activities of such IPs,
              you can protect your platform from various types of attacks and
              ensure a secure environment for legitimate users.
            </p>
            <Button variant={'authx'} className="w-48 ">
              Pay Invoices Now
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="px-10 pb-2">
            <Image alt="dollar" src="/credit-card.svg" width={35} height={35} />

            <CardTitle className="text-2xl !mt-2 font-medium">
              Check Billing Details & Invoices
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row  px-10 gap-8">
            <p className="leading-tight text-slate-500 font-normal">
              Implement an AI-based security system within your Authx-powered
              platform to enhance threat detection, response, and overall
              cybersecurity capabilities. By leveraging artificial intelligence
              and machine learning algorithms, you can bolster your platform's
              security defenses and adapt to evolving threats effectively.
            </p>
            <Button variant={'authx'} className="w-48 ">
              Upgrade to Enterprise
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="px-10 pb-2">
            <AiCloudSpark />
            <CardTitle className="text-2xl !mt-2 font-medium">
              Change Plan & Upgrade to Enterprise
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row  px-10 gap-8">
            <p className="leading-tight text-slate-500 font-normal">
              Implement an AI-based security system within your Authx-powered
              platform to enhance threat detection, response, and overall
              cybersecurity capabilities. By leveraging artificial intelligence
              and machine learning algorithms, you can bolster your platform's
              security defenses and adapt to evolving threats effectively.
            </p>
            <Button variant={'black'} className="w-48 ">
              Upgrade to Enterprise
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="px-10 pb-2">
            <CardTitle className="text-2xl !mt-2 font-medium">
              Cancel Subscription & Pause Organization
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row  px-10 gap-8">
            <p className="leading-tight text-slate-500 font-normal">
              Implement suspicious IP throttling within your Authx-powered
              platform to mitigate the risks posed by suspicious or malicious IP
              addresses. By detecting and limiting the activities of such IPs,
              you can protect your platform from various types of attacks and
              ensure a secure environment for legitimate users.
            </p>
            <Button variant={'destructive'} className="w-48 ">
              Cancel Subscription{' '}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CheckMarkSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.0571 21.7292C17.4302 21.7292 21.7861 17.3734 21.7861 12.0002C21.7861 6.62705 17.4302 2.27124 12.0571 2.27124C6.68393 2.27124 2.32812 6.62705 2.32812 12.0002C2.32812 17.3734 6.68393 21.7292 12.0571 21.7292ZM11.9112 15.7443L17.7486 9.90695L16.0976 8.25589L11.0857 13.2677L8.01966 10.2017L6.3686 11.8527L10.2602 15.7443L11.0857 16.5699L11.9112 15.7443Z"
        fill="#1AB76C"
      />
    </svg>
  );
}

export default UpgradeAndPlansPage;
