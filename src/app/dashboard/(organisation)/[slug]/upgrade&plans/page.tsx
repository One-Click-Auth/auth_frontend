'use client';
import { AiCloudSpark } from '@/assets/Svg/Account/Account';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/Providers/AuthContext';
import useOrgData, { Organization } from '../../../orgDataStore';
// import { Subscript } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Spinner from '@/components/spinner';
import { PasswordDialogue } from '@/app/dashboard/components/PasswordDialgue';
import { Dialog } from '@radix-ui/react-dialog';
import { DialogTrigger } from '@/components/ui/Dialog';
import { useToast } from '@/components/ui/use-toast';

function UpgradeAndPlansPage() {
  const router = useRouter();
  const { toast } = useToast();
  //sups_id
  const { token } = useAuth();
  const { slug } = useParams();
  const orgId = slug;
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  //   const getOrgData = async ()=>{
  //     const response = await fetch(`https://api.trustauthx.com/org/${orgId}`, {
  //       method: 'GET',
  //       headers: {
  //         accept: 'application/json',
  //         Authorization: `Bearer ${token}`
  //       }
  //   })
  //   const data = await response.json() as Organization;
  //   return data.subs_id;

  // }
  //to manage sunscription plan
  async function managePlan() {
    if (loading1) return;
    setLoading1(true);
    try {
      const response = await fetch(`https://api.trustauthx.com/org/${orgId}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = (await response.json()) as Organization;
      if (response.status === 200) {
        const subscription_id = data.subs_id;
        // console.log(subscription_id);
        const url = `https://api.trustauthx.com/create-customer-portal-session?subscription_id=${subscription_id}&redirect_url=${encodeURIComponent(
          window.location.href
        )}`;

        window.location.href = url;
        // setLoading1(false);
        return;
      }

      setLoading1(false);
      return;

      // console.log(url)
      // next router was creating a problem in routing back that's why window object is being used
    } catch (error) {
      console.log(error);
      return;
    }
  }
  //to cancel the subscription
  async function cancelSub(pass: string) {
    setLoading2(true);
    try {
      const response = await fetch(`https://api.trustauthx.com/subscriptions`, {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          org_id: slug,
          password: pass
          // totp: 0
        })
      });
      if (response.status === 401) {
        setLoading2(false);
        toast({
          title: 'Incorrect Password',
          description: 'Please enter the correct password',
          variant: 'destructive'
        });
        return;
      }
      if (response.status === 200) {
        const data = await response.json();
        toast({
          variant: 'success',
          title: 'Subscription Cancelled successfully'
          // description: 'Subscription Cancelled successfully'
        });
        router.push(`/dashboard`);
        setLoading2(false);

        return;
      }
      setLoading2(false);
      return;
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong with your request',
        description: error.message
      });
      setLoading2(false);
      return;
    }
  }

  const date = new Date().toDateString();
  return (
    <div className="mt-16  [&>div]:max-w-screen-xl flex items-center   flex-col justify-center w-full">
      <div className="mb-12  max-w-screen-xl w-full">
        <div className="flex items-center gap-1">
          <CheckMarkSvg />
          <span>Updated on {`${date}`}</span>
        </div>

        <h1 className="text-4xl">Manage Subscription</h1>
      </div>

      <div className="flex-col  flex gap-8">
        {/* <Card className="shadow-none">
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
        </Card> */}

        <Card className="shadow-none">
          <CardHeader className="px-10 pb-2">
            <Image alt="dollar" src="/credit-card.svg" width={35} height={35} />

            <CardTitle className="text-2xl !mt-2 font-medium">
              Manage Payment Method & Invoices
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
            <Button variant={'authx'} className="w-48" onClick={managePlan}>
              {loading1 ? (
                <div className="flex flex-row gap-2 items-center">
                  <Spinner size={16} color="green" />
                  <span>redirecting...</span>
                </div>
              ) : (
                'Manage Plan'
              )}
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

            <Dialog>
              <DialogTrigger className="py-2 text-sm px-8 bg-red-400  text-black shadow hover:text-white hover:bg-black min-w-fit w-48 rounded-md flex items-start h-fit  ">
                {/* <Button className='bg-red-400 w-48' variant={'authx'}>
               
              </Button> */}
                Cancel Subscription
              </DialogTrigger>
              <PasswordDialogue request={cancelSub} loading={loading2} />
            </Dialog>
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
      width="20"
      height="20"
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
