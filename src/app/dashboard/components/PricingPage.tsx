import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SearchBy } from './searchBy';
import { OrgTable } from './orgTable';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PreferenceDialog, PricingCard } from './pricingCard';
import UpgradeAndPlansPage from './UpgradeAndPlansPage';

function PricingPage() {
  const [blurStudents, setBlurStudents] = useState(false);
  const [blurBoth, setBlurBoth] = useState(false);

  function editValue(e: any) {
    //if slider is max then hide both plans
    if (e[0] === 2000000) {
      setBlurBoth(true);

      return;
    }

    setBlurBoth(false);
  }

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

        <Button className="text-black ">Talk with an Expert →</Button>
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
            step={20000}
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
          </div>

          <Button className="bg-black hover:bg-black/80  w-56 h-11  mt-16  mb-3 text-white  px-8">
            Upgrade to Enterprise
          </Button>

          <p className="italic text-sm text-muted-foreground">
            Talk with an expert to discuss your unique needs.
          </p>
        </div>

        <PricingCard blurStudent={blurStudents} blurBoth={blurBoth} />
      </div>
    </div>
  );
}

export default PricingPage;
