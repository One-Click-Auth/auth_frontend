import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Button';

import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PreferenceDialog, PricingCard } from './pricingCard';
import { useAuth } from '@/Providers/AuthContext';
import UpgradeToEnterprise from '../upgradeToEnterprise';

function PricingPage() {
  const [blurStudents, setBlurStudents] = useState(false);
  const [blurBoth, setBlurBoth] = useState(false);
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(20);
  function editValue(e: any) {
    //if slider is max then hide both plans
    const api_calls = e[0];
    if (api_calls === 2000000) {
      setBlurBoth(true);

      return;
    }

    setPrice(api_calls * 0.00025);

    setBlurBoth(false);
  }

  const handlePayment = async (freelance_discount: boolean) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.trustauthx.com/create_checkout_session?freelance_discount=${freelance_discount}`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quantity: 1,
            new_org: true,
            tp: 7
          })
        }
      );

      const data = (await response.json()) as { url: string };
      if (response.status === 200) {
        router.push(data.url);
        return;
      }
      setLoading(false);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="mt-16  [&>div]:max-w-screen-xl  flex  items-center flex-col justify-center w-full">
      <p className="text-5xl text-center font-semibold">
        One pricing <br /> for everyone, everywhere{' '}
      </p>

      <div className="bg-gradient-to-r text-white flex  items-center flex-col justify-center   from-black p-8   to-[#9EFF00] w-full mt-12 rounded-xl">
        <p className="text-3xl font-bold ">Have a complex use case?</p>
        <p className="text-center mt-4 mb-6">
          We’ll ensure your company is set up for
          <br />
          success from day one.
        </p>
        <div className="flex gap-6 items-center">
          <Button
            variant={'authx'}
            className="text-black p-2 h-10 bg-slate-300"
          >
            Talk with an Expert →
          </Button>
          <PreferenceDialog
            disableButton={false}
            triggerText="Start for Free"
            handlePayment={handlePayment}
            loading={loading}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-20 gap-32   w-full items-center px-16  justify-between">
        <div className=" flex-1 relative ">
          <p className="text-2xl text-center">How many monthly API Calls?</p>
          <p className="text-muted-foreground text-center">
            MAU*8 (8 times of MAU)
          </p>
          <Slider
            onValueChange={e => editValue(e)}
            className="mt-4"
            max={2000000}
            step={10000}
          />
          <p className="absolute font-bold right-0 -bottom-8 ">2M+</p>
          <p className="absolute font-bold left-0 -bottom-8 ">0</p>
        </div>
        <div>
          <p className="text-2xl text-center mb-3">What is your use case?</p>
          <Tabs defaultValue="hobby" className="space-y-4 ">
            <TabsList className="bg-gray-100 py-6 [&>*]:py-2">
              <TabsTrigger
                onClick={() => setBlurStudents(false)}
                value="hobby"
                className="px-8  text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
              >
                Hobby
              </TabsTrigger>

              <TabsTrigger
                onClick={() => setBlurStudents(false)}
                value="small project"
                className="px-8  text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
              >
                Small project
              </TabsTrigger>

              <TabsTrigger
                onClick={() => setBlurStudents(true)}
                value="production"
                className="px-8  text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
              >
                Production
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex mt-20  w-full flex-col gap-8 lg:flex-row justify-between   ">
        <div className=" px-12 py-8 rounded-xl border-2 flex items-center flex-col  justify-center">
          <p className="font-bold text-3xl mb-3">Enterprise</p>
          <p className="text-muted-foreground">
            Best for production applications that need to scale.
          </p>
          <div className="w-8 bg-black h-[1px] my-8"></div>

          <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <p>White-Labeling</p>
            <p>Custom Domain</p>
            <p>99.99% SLA & Enterprise Support</p>
            <p>Advanced Deployment Options</p>
            <p>AI based Add-ons</p>
            <p>AI based Security Solution </p>
            <p>Unique Requirement Assessment </p>
            <UpgradeToEnterprise />
          </div>

          <p className="italic text-sm text-muted-foreground pt-4">
            Talk with an expert to discuss your unique needs.
          </p>
        </div>

        <PricingCard
          blurStudent={blurStudents}
          price={price}
          blurBoth={blurBoth}
        />
      </div>
    </div>
  );
}

export default PricingPage;
