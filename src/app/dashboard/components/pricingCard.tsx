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

export function PricingCard({ ...props }) {
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
      console.log(response);
      const data = (await response.json()) as { url: string };
      console.log('data', data);
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
    <Card className="w-[300px] border-2 border-gray-500 shadow-lg">
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
        <CardDescription>Start your free trial</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border-2 p-4">
          **Some pricing details** $$
        </div>
        <div>**some more details pricing or services related**</div>
      </CardContent>
      <CardFooter>
        <PreferenceDialog
          triggerText="Start for Free"
          handlePayment={handlePayment}
          loading={loading}
        />
      </CardFooter>
    </Card>
  );
}

type PreferenceDialogProps = {
  triggerText: string;
  handlePayment: (freelance_discount: boolean) => Promise<void>;
  loading: boolean;
};

export function PreferenceDialog({
  triggerText,
  handlePayment,
  loading
}: PreferenceDialogProps) {
  const [freelance, setFreelance] = useState(false);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'authx'}>{triggerText}</Button>
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
              <div className="border-t-transparent border-solid mx-auto animate-spin rounded-full border-yellow-700  border-[3px] h-6 w-6"></div>
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
