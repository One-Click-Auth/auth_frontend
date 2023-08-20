'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useAuth } from '@/Providers/AuthContext';

export function PricingCard({
  blurStudent,
  blurBoth,
  ...props
}: {
  blurStudent: boolean;
  blurBoth: boolean;
}) {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    <Card className=" px-12 py-8 rounded-xl  border-2 ">
      <div className={`flex ${blurBoth ? 'blur-md' : ''} `}>
        <div
          className={`${
            blurStudent ? 'blur-md' : ''
          } flex-col flex-1  flex border-r pr-12 mr-12  items-center  px-3 py-2 `}
        >
          <span className="bg-black  text-sm rounded-full items-center text-white uppercase py-1 px-3">
            students & freelancers
          </span>

          <p className="text-center mt-1 ">
            Best for simple projects or
            <br /> applications.
          </p>

          <p className="text-4xl font-bold text-center my-5">$20/mo</p>

          <div className="flex-col gap-3 flex items-center  text-muted-foreground">
            <p>Unlimited MAU</p>
            <p>Unlimited Social Connections</p>
            <p>Pro MFA</p>
            <p>**Add-ons</p>
            <p>Consolidated User Stores</p>
          </div>
        </div>

        <div className="flex-col flex  flex-1  items-center justify-center px-3 py-2 ">
          <span className="bg-accent  text-sm rounded-full items-center text-black uppercase py-1 px-3">
            B2C & b2b - Professional
          </span>

          <p className="text-center mt-1 ">
            Best for teams and projects that need added security.
          </p>

          <p className="text-4xl font-bold text-center my-5">$40/mo</p>

          <div className="flex-col gap-3 flex items-center  text-muted-foreground">
            <p>Unlimited MAU</p>
            <p>Unlimited Social Connections</p>
            <p>Pro MFA</p>
            <p>**Add-ons</p>
            <p>Consolidated User Stores</p>
            <p className="text-sm text-muted-foreground">
              **Higher resource allocation, Faster response time
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex mt-20 justify-center">
        <PreferenceDialog
          disableButton={blurBoth}
          triggerText="Start for Free"
          handlePayment={handlePayment}
          loading={loading}
        />
      </div>
    </Card>
  );
}

type PreferenceDialogProps = {
  triggerText: string;
  handlePayment: (freelance_discount: boolean) => Promise<void>;
  loading: boolean;
  disableButton: boolean;
};

export function PreferenceDialog({
  triggerText,
  disableButton,
  handlePayment,
  loading
}: PreferenceDialogProps) {
  const [freelance, setFreelance] = useState(false);

  return (
    <Dialog>
      <DialogTrigger
        disabled={disableButton}
        className={`py-2 px-4 rounded-md bg-accent text-black shadow hover:text-white hover:bg-black w-max inline-flex items-center justify-center transition-colors disabled:pointer-events-none disabled:opacity-50  ${
          disableButton ? 'blur-md' : ''
        }`}
      >
        {triggerText}
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center py-4 sm:px-10 gap-y-5">
          <h1 className="text-3xl mb-4">My Use-Case</h1>
          <p className="text-sm  text-center text-gray-500">
            We would like to know your use case to better assist you with your
            organization
          </p>
          <div className="w-full">
            <span className="text-sm text-gray-500">My use-case:</span>
            <SelectPrefrence
              freelance={freelance}
              setFreelance={setFreelance}
            />
          </div>

          <Button
            variant="authx"
            className="w-[240px] mt-4 "
            onClick={() => {
              loading ? console.log('loading...') : handlePayment(freelance);
            }}
          >
            {loading ? (
              <div className="flex flex-row gap-2">
                <div className="border-t-transparent border-solid mx-auto animate-spin rounded-full border-yellow-700  border-[3px] h-4 w-4"></div>
                <span>Processing...</span>
              </div>
            ) : (
              'Proceed'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type Select = {
  freelance: boolean;
  setFreelance: React.Dispatch<React.SetStateAction<boolean>>;
};

function SelectPrefrence({ freelance, setFreelance }: Select) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full border-2 justify-between hover:bg-black hover:text-white text-md"
        >
          {freelance ? 'Freelance' : 'Business'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 text-md">
        <Command>
          <CommandGroup>
            <CommandItem
              className="hover:bg-black aria-selected:bg-black aria-selected:text-white hover:text-white hover:cursor-pointer"
              onSelect={() => {
                setFreelance(false);
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  !freelance ? 'opacity-100' : 'opacity-0'
                )}
              />
              Business
            </CommandItem>
            <CommandItem
              className="hover:bg-black aria-selected:bg-black aria-selected:text-white hover:text-white hover:cursor-pointer"
              onSelect={() => {
                setFreelance(true);
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  freelance ? 'opacity-100' : 'opacity-0'
                )}
              />
              Freelance
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
