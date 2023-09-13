'use client';
import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { CheckSquareValid } from '@/assets/Svg/Account/Account';
import { ClipboardCopy } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/Providers/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { PasswordDialogue } from '@/app/dashboard/components/PasswordDialgue';

import {Dialog, DialogTrigger } from '@/components/ui/Dialog';
type Key = { keyValue: string };
function InputWithButtons({ keyValue }: Key) {
  const handleCopy = () => {
    navigator.clipboard.writeText(keyValue);
  };

  const [show, setShow] = useState(false);
  return (
    <div className="flex justify-center flex-wrap w-full items-center space-x-2 tracking-wide">
      <Input
        type={show ? 'text' : 'password'}
        disabled
        value={keyValue}
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

export default function KeysCard() {
  type Keys = {
    api_key: string;
    api_secret: string;
  };
  const { token } = useAuth();
  const { slug } = useParams();
  const { toast } = useToast();
  const [generated, setGenerated] = useState(false);
  const [keys, setKeys] = useState<Keys>({ api_key: '', api_secret: '' });

  const [loading, setLoading] = useState(false);

  async function generateKeys(pass: string) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.trustauthx.com/org/${slug}?change_keys=true`,
        {
          method: 'PUT',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            password: pass
          })
        }
      );
      if (response.status === 401) {
        setLoading(false);
        toast({
          title: 'Incorrect Password',
          description: 'Please enter the correct password',
          variant: 'destructive'
        });
        return;
      }
      if (response.status === 200) {
        const data = (await response.json()) as Keys;
        setKeys({ api_key: data.api_key, api_secret: data.api_secret });
        setGenerated(true);
        setLoading(false);
        return;
      }
      setLoading(false);
      return;
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

  return (
    <>
      {generated ? (
        <div className="flex  flex-col gap-8 max-w-3xl mt-14 p-14 border border-slate-300 text-[#2E2E2E] rounded-lg mx-auto">
          <div>
            <h2 className="text-3xl font-semibold tracking-wide mb-6">
              Your API Key & Secret Key
            </h2>
            <p className="text-lg font-extralight tracking-wide">
              <span className="font-semibold">*Note</span> : The secret key is a
              sensitive piece of information that is only shown once. You will
              not be able to see it again, so it is important to save it in a
              safe place. In the future, you can only change your API key and
              secret key.{' '}
            </p>
          </div>
          <div>
            <small className="font-semibold">*Your Organization API Key </small>
            <InputWithButtons keyValue={keys.api_key} />
          </div>
          <div>
            <small className="font-semibold">
              *Your Organization Secret Key{' '}
            </small>
            <InputWithButtons keyValue={keys.api_secret} />
          </div>
          <Button
            className="mx-auto max-w-[90%]"
            variant={'authx'}
            type="button"
            onClick={() => {
              setGenerated(false), setKeys({ api_key: '', api_secret: '' });
            }}
          >
            <CheckSquareValid />
            <span className="ml-3 p-2 ">
              I’ve Stored The Keys In Safe and Want To Proceed
            </span>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-8 max-w-3xl mt-14 p-14 border border-slate-300 text-[#2E2E2E] rounded-lg mx-auto">
          <div>
            <h2 className="text-3xl font-semibold tracking-wide mb-6">
              Create New API key & Secret Key
            </h2>
            <p className="text-lg font-extralight tracking-wide">
              <span className="font-semibold">*Note</span> : This will
              invalidate the existing set of{' '}
              <b className="font-semibold">API</b> and{' '}
              <b className="font-semibold">Secret</b> Keys and create a new pair
              of Keys.{' '}
            </p>
          </div>

          <Dialog>
            <DialogTrigger className="py-2 mx-auto text-sm px-8 bg-accent  text-black shadow hover:text-white hover:bg-black min-w-fit w-48 rounded-md flex items-start h-fit  ">
              {/* <Button className='bg-red-400 w-48' variant={'authx'}>
               
              </Button> */}
              Delete existing & generate a new Pair
            </DialogTrigger>
            <PasswordDialogue request={generateKeys} loading={loading} />
          </Dialog>
        </div>
      )}
    </>
  );
}
