'use client';
import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import { CheckSquareValid } from '@/assets/Svg/Account/Account';
import { ClipboardCopy } from 'lucide-react';
import { useAuth } from '@/Providers/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { PasswordDialogue } from '@/app/dashboard/components/PasswordDialgue';

import { Dialog, DialogTrigger } from '@/components/ui/Dialog';

function InputWithButtons({ referralLink }: { referralLink: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
  };
  //   referralLink = "edwedwedewqdeded"

  const [show, setShow] = useState(false);
  console.log(referralLink);
  return (
    <div className="flex justify-center flex-wrap w-full items-center space-x-2 tracking-wide">
      <Input
        type={show ? 'text' : 'password'}
        value={referralLink}
        className="bg-transparent appearance-none border-2 border-gray-200 rounded max-w-[80%] sm:max-w-[65%] w-full min-w-fit py-2 px-3 text-black leading-tight focus:outline-none focus:border-black"
      />
      <div className="flex justify-center items-center gap-2">
        <Button
          variant={'authx'}
          className="w-20"
          type="button"
          onClick={() => setShow(!show)}
        >
          {show ? 'Hide' : 'Reveal'}
        </Button>
        <Button variant={'authx'} type="button" onClick={handleCopy}>
          <ClipboardCopy size={18} />

          <span className="ml-2">Copy</span>
        </Button>
      </div>
    </div>
  );
}

export default function Referral() {
  const { token } = useAuth();
  const { toast } = useToast();
  const [generated, setGenerated] = useState(false);
  const [referralLink, setReferralLink] = useState('');

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState('');
  useEffect(() => {
    getReferralCount();
  }, []);
  async function generateKeys() {
    setLoading(true);
    try {
      const response = await fetch(`https://api.trustauthx.com/ref/link`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        let { url } = (await response.json()) as { url: string };
        console.log(url);
        url = String(url);
        setReferralLink(url);
        setGenerated(true);
        setLoading(false);
        return;
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong with your request',
        description: error.message
      });
      setLoading(false);
      return;
    }
  }
  async function getReferralCount() {
    try {
      {
        const response = await fetch(`https://api.trustauthx.com/ref/stat`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const { total } = (await response.json()) as { total: string };
        setTotal(total);

        return;
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong with your request',
        description: error.message
      });
      return;
    }
  }

  return (
    <>
      {generated ? (
        <div className="flex  flex-col gap-8 max-w-3xl mt-14 p-14 border border-slate-300 text-[#2E2E2E] rounded-lg">
          <div>
            <h2 className="text-2xl font-semibold tracking-wide mb-6 ml-4">
              This is your referral Link
            </h2>
          </div>
          <div>
            <InputWithButtons referralLink={referralLink} />
          </div>

          <Button
            className="mx-auto max-w-[90%]"
            variant={'authx'}
            type="button"
            onClick={() => {
              setGenerated(false);
            }}
          >
            <CheckSquareValid />
            <span className="p-2 ">I’ve copied the Link</span>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-col gap-8 max-w-3xl mt-14 p-14 border border-slate-300 text-[#2E2E2E] rounded-lg ">
            <div>
              <h2 className="text-3xl font-semibold tracking-wide mb-6">
                Create Your Referral Link
              </h2>
              <p className="text-lg font-extralight tracking-wide">
                <span className="font-semibold">*Referral</span> : The Referral
                program is governed by Trustauthx's Referral policy, by
                continuing you agree to our terms.
              </p>
            </div>

            <Dialog>
              <DialogTrigger className="py-2 text-sm px-8 bg-accent  text-black shadow hover:text-white hover:bg-black min-w-fit w-48 rounded-md flex items-start h-fit  ">
                + Create and copy my referal link
              </DialogTrigger>
              <PasswordDialogue request={generateKeys} loading={loading} />
            </Dialog>
          </div>
          <div className="flex flex-col gap-8 max-w-3xl mt-8 p-14 border border-slate-300 text-[#2E2E2E] rounded-lg ">
            <div>
              <h2 className="text-3xl font-semibold tracking-wide mb-6">
                Your Referral Count
              </h2>
              <p className="text-lg font-extralight tracking-wide">
                <span className="font-semibold">*Note</span> : This number does
                not reflect the actual numbers of subscribers.
              </p>
            </div>

            <div className="py-2 flex  flex-col items-start h-fit  ">
              <h3 className=" text-2xl font-semibold">{total} Users</h3>
              <span className="text-sm text-slate-400">
                Accepted your Referral
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
