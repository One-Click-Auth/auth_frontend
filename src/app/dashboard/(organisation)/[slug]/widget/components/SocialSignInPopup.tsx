import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/Dialog';

import { QRCodeSVG } from 'qrcode.react';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/Providers/AuthContext';
import OTPInput from 'react-otp-input';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Plus } from 'lucide-react';
import { IconBase } from 'react-icons/lib';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { useParams } from 'next/navigation';
import Spinner from '@/components/spinner';
import { updateStoreWithFetch, useWidgetStore } from '../widgetStore';
import { spawn } from 'child_process';

function SocialSignInPopup({ socialName }: { socialName: string }) {
  const { toast } = useToast();
  const { slug: ORG_ID } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const [client_id, setClient_id] = useState('');
  const [client_secret, setClient_secret] = useState('');
  const { social } = useWidgetStore();
  const socialType = socialName.toLocaleLowerCase();

  const active = social[socialType] ? true : false;
  // const generic = !active ? false : (social[socialType]?.CLIENT_ID);
  const generic = !active ? false : !social[socialType].CLIENT_ID;
  console.log(generic);
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
        description: `Please put the client Id and client Secret`,
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

  return (
    <DialogContent
      className={cn(
        ' w-[1047px]  md:h-[666px] max-h-[85vh] md:p-16 !max-w-[90vw]  flex-col md:flex-row flex rounded-lg  overflow-hidden px-10 gap-12 md:gap-0       '
      )}
    >
      <div className=" flex-col h-min-[200px] gap-2 flex-1 md:border-r-2 md:flex no-scrollbar overflow-auto    md:pr-12 ">
        <ConfigText />
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
            <Input
              className="p-5 "
              placeholder="https://api.trustauthx.com/api/single/social/callback"
            />
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

function ConfigText() {
  return (
    <div className="[&>p]:py-[2px]">
      <h1 className="font-bold text-2xl">README: Google OAuth Config.</h1>
      <p className="mt-5 mb-5">
        It provides a guidance to configure your own Google’s OAuth 2.0
        authentication system for more customized experience and avoiding any
        rate limit levied by google via generic TrustAuthx application.
      </p>
      <p>Set up a project in the Google API Console</p>
      <ul className="list-disc px-7 py-1 ">
        <li>
          Visit the Google API Console and sign in with your Google account.
        </li>
        <li>
          Click the Select a project button on the top menu bar, and click the
          New
        </li>
        <li>
          Project button to create a project. In your newly created project,
          click the APIs & Services to enter the APIs & Services menu.
        </li>
      </ul>
      <p>Configure your consent screen</p>
      <p>Configure and register your application</p>
      <ul className="list-disc px-7 py-1 ">
        <li>
          On the left APIs & Services menu, click the OAuth consent screen
          button.{' '}
        </li>
        <li>
          Choose the User Type you want, and click the Create button. (Note: If
          you select External as your User Type, you will need to add test users
          later.)
        </li>
      </ul>
      <p>Now you will be on the Edit app registration page.</p>
      <p>Edit app registration</p>
      <p>Config OAuth consent screen</p>
      <ul className="list-disc px-7 py-1 ">
        <li>
          Follow the instructions to fill out the OAuth consent screen form.
        </li>
        <li>Click SAVE AND CONTINUE to continue.</li>
      </ul>
      <p>Config scopes</p>
      <ul className="list-disc px-7 py-1 ">
        <li>
          Click ADD OR REMOVE SCOPES and select ../auth/userinfo.email,
          ../auth/userinfo.profile and openid in the popup drawer, and click
          UPDATE to finish. It is recommended that you consider adding all the
          scopes you may use, otherwise some scopes you added in the
          configuration may not work.
        </li>
        <li>Fill out the form as you need.</li>
        <li>Click SAVE AND CONTINUE to continue.</li>

        <p>Add test users (External user type only)</p>

        <ul className="list-disc px-7 py-1 ">
          <li>
            Click ADD USERS and add test users to allow these users to access
            your application while testing.
          </li>
          <li>Click SAVE AND CONTINUE to continue.</li>
        </ul>

        <p>
          Now you should have the Google OAuth 2.0 consent screen configured.
        </p>

        <p>Obtain OAuth 2.0 credentials</p>

        <ul className="list-disc px-7 py-1 ">
          <li>
            On the left APIs & Services menu, click the Credentials button.
          </li>
          <li>
            On the Credentials page, click the + CREATE CREDENTIALS button on
            the top menu bar, and select OAuth client ID.
          </li>
          <li>
            On the Create OAuth client ID page, select Web application as the
            application type.
          </li>
          <li>Fill out the basic information for your application.</li>
          <li>
            Click + Add URI to add an authorized domain to the Authorized
            JavaScript origins section. This is the domain that your logto
            authorization page will be served from. In our case, this will be $
            your_logto_origin. e.g.https://logto.dev.
          </li>
          <li>
            Click + Add URI in the Authorized redirect URIs section to set up
            the Authorized redirect URIs, which redirect the user to the
            application after logging in. In our case, this will be $
            your_logto_endpoint/callback/connector_id. e.g.
            https://logto.dev/callback/connector_id. The connector_id can be
            found on the top bar of the Logto Admin Console connector details
            page.
          </li>
          <li>
            Click Create to finish and then you will get the Client ID and
            Client Secret.
          </li>
        </ul>

        <p>Configure your connector</p>

        <p>
          Fill out the clientId and clientSecret field with Client ID and Client
          Secret you've got from OAuth app detail pages mentioned in the
          previous section.
        </p>

        <p>
          scope is a space-delimited list of scopes. If not provided, scope
          defaults to be openid profile email.
        </p>

        <p>Config types</p>
        <p>NameTypeclientIdstringclientSecretstringscopestring</p>

        <p>References</p>

        <ul className="list-disc px-7 py-1 ">
          Google Identity: Setting up OAuth 2.0
        </ul>
      </ul>
    </div>
  );
}

export default SocialSignInPopup;
