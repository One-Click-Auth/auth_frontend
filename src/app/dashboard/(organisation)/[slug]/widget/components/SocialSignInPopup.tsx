'use client';
import React, { useState } from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/Dialog';

import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/Providers/AuthContext';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useParams } from 'next/navigation';
import Spinner from '@/components/spinner';
import { updateStoreWithFetch, useWidgetStore } from '../widgetStore';
import Link from 'next/link';
import { MdFileCopy } from 'react-icons/md';
import { Badge } from '@/components/ui/Badge';
function SocialSignInPopup({ socialName }: { socialName: string }) {
  const { toast } = useToast();
  const { slug: ORG_ID } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const [client_id, setClient_id] = useState('');
  const [client_secret, setClient_secret] = useState('');
  const [copied, setCopied] = useState(false);
  const { social } = useWidgetStore();
  const socialType = socialName.toLocaleLowerCase();

  const active = social[socialType] ? true : false;
  // const generic = !active ? false : (social[socialType]?.CLIENT_ID);
  const generic = !active ? false : !social[socialType].CLIENT_ID;
  const destructiveToast = () => {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.'
    });
  };

  async function addSocial() {
    if (client_id.length === 0 || client_secret.length === 0) {
      toast({
        title: 'Client details required',
        description: 'Please put the client Id and client Secret',
        variant: 'destructive'
      });
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`https://api.trustauthx.com/org/${ORG_ID}`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          social: {
            [socialType]: {
              CLIENT_ID: client_id,
              CLIENT_SECRET: client_secret
            }
          }
        })
      });
      if (response.status === 200) {
        setLoading(false);
        if (token) await updateStoreWithFetch(token, ORG_ID);
        toast({
          title: 'Success!',
          description: `${socialType} has been added successfully`,
          variant: 'success'
        });
      } else {
        setLoading(false);
        destructiveToast();
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      destructiveToast();
    }
  }
  async function addSocialGeneric() {
    setLoading2(true);
    try {
      const response = await fetch(
        `https://api.trustauthx.com/org/${ORG_ID}?SocialConnecterName=${socialType}`,
        {
          method: 'PUT',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            social: {
              [socialType]: {}
            }
          })
        }
      );
      if (response.status === 200) {
        setLoading2(false);
        if (token) await updateStoreWithFetch(token, ORG_ID);
        toast({
          title: 'Success!',
          description: `${socialType} generic has been added successfully`,
          variant: 'success'
        });
      } else {
        setLoading2(false);
        destructiveToast();
      }
    } catch (error) {
      console.log((error as Error).message);
      setLoading2(false);
      destructiveToast();
    }
  }
  async function removeSocial() {
    setLoading3(true);
    try {
      const response = await fetch(
        `https://api.trustauthx.com/org/${ORG_ID}?RemoveSocial=true&SocialConnecterName=${socialType}`,
        {
          method: 'PUT',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({})
        }
      );
      if (response.status === 200) {
        setLoading3(false);
        if (token) await updateStoreWithFetch(token, ORG_ID);
        toast({
          title: 'Success!',
          description: `${socialType} has been removed successfully`,
          variant: 'success'
        });
      } else {
        setLoading3(false);
        destructiveToast();
      }
    } catch (err) {
      console.log(err);
      setLoading3(false);
      destructiveToast();
    }
  }
  const handleClipBoardCopy = () => {
    navigator.clipboard.writeText(
      'https://api.trustauthx.com/api/single/social/callback'
    );
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 4000);
  };

  return (
    <DialogContent
      className={cn(
        ' w-[1047px]  md:h-[666px] max-h-[85vh] md:p-16 !max-w-[90vw]  flex-col md:flex-row flex rounded-lg  overflow-hidden px-10 gap-12 md:gap-0       '
      )}
    >
      <div className=" flex-col h-min-[200px] gap-2 flex-1 md:border-r-2 md:flex no-scrollbar overflow-auto    md:pr-12 ">
        <h1 className="font-bold text-2xl">README: Google OAuth Config.</h1>
        <p className="my-5">
          It provides a guidance to configure your own Google’s OAuth 2.0
          authentication system for more customized experience and avoiding any
          rate limit levied by google via generic TrustAuthx application.
        </p>
        <Button variant={'authx'}>
          <Link
            target="_blank"
            href={`https://docs.trustauthx.com/Social-Signup/Registering-your-own-OAuth-application/${socialName}`}
          >
            How to Configure {socialName} OAuth
          </Link>
        </Button>
      </div>

      <div className=" flex flex-col subtle-scrollbar justify-between    flex-1   md:ml-12 ">
        <DialogHeader className="">
          <DialogTitle className="text-3xl text-muted-foreground font-medium">
            Parameter config{' '}
          </DialogTitle>
          {generic ? (
            <span className="text-blue-400">
              {socialName} Generic is being used currently
            </span>
          ) : (
            ''
          )}
        </DialogHeader>

        <div
          className="flex flex-col 
         rounded-md py-2 px-4 gap-4 sm:gap-11"
        >
          <div>
            <p className="text-muted-foreground mb-1 text-left">
              **Callback URI
            </p>
            <div className="relative flex flex-row items-center w-full">
              <Input
                className="p-5 text-muted-foreground pr-10 w-full"
                readOnly
                value="https://api.trustauthx.com/api/single/social/callback"
              />
              <Badge
                variant="secondary"
                className={`absolute right-0 bottom-14 transition-opacity ${
                  copied ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Copied!
              </Badge>
              <button
                className="relative right-6 py-5 hover:text-accent"
                onClick={handleClipBoardCopy}
              >
                <MdFileCopy />
              </button>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-left">**Client ID</p>
            <Input
              className="p-5"
              value={client_id ? client_id : ''}
              onChange={e => setClient_id(e.target.value)}
            />
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-left">
              **Client Secret
            </p>
            <Input
              className="p-5"
              value={client_secret ? client_secret : ''}
              onChange={e => setClient_secret(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 md:mt-0 mt-8 ">
          {!generic ? (
            <div className="flex-col flex">
              <Button
                variant={'outline'}
                className="bg-slate-900 w-full sm:w-40 hover:text-black text-white "
                onClick={
                  loading2 ? () => console.log('loading...') : addSocialGeneric
                }
              >
                {loading2 ? (
                  <div className="flex flex-row gap-1 items-center">
                    <Spinner size={16} color="green" />

                    <span>Adding...</span>
                  </div>
                ) : (
                  <div className="flex flex-row gap-2 justify-center items-center w-40">
                    <Plus size={16} />
                    Use Generic
                  </div>
                )}
              </Button>
              <span className="text-sm text-right text-muted-foreground">
                **Not Recommended
              </span>
            </div>
          ) : (
            ''
          )}

          {!active || generic ? (
            <Button
              className="w-full sm:w-40"
              variant={'authx'}
              onClick={addSocial}
            >
              {loading ? (
                <div className="flex flex-row gap-1 items-center">
                  <Spinner size={16} color="green" />

                  <span>Adding...</span>
                </div>
              ) : (
                `Add ${socialType}`
              )}
            </Button>
          ) : (
            ''
          )}
          {active ? (
            <Button
              className="w-full sm:w-40 bg-red-300"
              variant={'authx'}
              onClick={removeSocial}
            >
              {loading3 ? (
                <div className="flex flex-row gap-1 items-center">
                  <Spinner size={16} color="green" />

                  <span>removing...</span>
                </div>
              ) : (
                `Remove ${socialType}`
              )}
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
    </DialogContent>
  );
}

export default SocialSignInPopup;
