'use client';
import { useEffect, useState } from 'react';
import { useWidgetStore, updateStoreWithFetch } from '../widgetStore';
import { WidgetInput } from './widget-input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/Providers/AuthContext';
import { OrgObject } from '../widgetStore';
import { useToast } from '@/components/ui/use-toast';
import Spinner from '@/components/spinner';
import '@total-typescript/ts-reset';
import { useParams } from 'next/navigation';
export function EmailSettings() {
  const { slug: ORG_ID } = useParams();
  const { token } = useAuth();
  const { toast } = useToast();
  const destructiveToast = () => {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.'
    });
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    smtpProvider,
    smtpPort,
    userOrEmail,
    password,
    setSmtpPort,
    setSmtpProvider,
    setUserOrEmail,
    setPassword
  } = useWidgetStore();

  const emailObj = {
    email_provider: {
      smtp: {
        password: password,
        username: userOrEmail,
        smtp_server: smtpProvider,
        smtp_port: smtpPort
      }
    }
  };
  async function handleSave() {
    setIsLoading(true);
    try {
      // console.log(JSON.stringify(widgetObj));
      const res = await fetch(`https://api.trustauthx.com/org/${ORG_ID}`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(emailObj)
      });

      if (res.status === 200) {
        setIsLoading(false);
        toast({
          title: 'Success!',
          description: 'Your settings have been saved successfully',
          variant: 'success'
        });
        if (token) await updateStoreWithFetch(token, ORG_ID);
      } else {
        setIsLoading(false);
        destructiveToast();
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      destructiveToast();
    }
  }
  return (
    <div className="flex flex-col space-y-10">
      <WidgetInput
        heading="SMTP Provider"
        placeholder="smtppro.zoho.in"
        changeHandler={setSmtpProvider}
        value={smtpProvider}
        type="text"
      />
      <WidgetInput
        heading="SMTP Port"
        placeholder="465"
        changeHandler={setSmtpPort}
        value={smtpPort}
      />
      <WidgetInput
        heading="Username or email id"
        placeholder="login@trustauthx.com"
        changeHandler={setUserOrEmail}
        value={userOrEmail}
        type="email"
      />
      <WidgetInput
        heading="Password"
        placeholder="******************"
        changeHandler={setPassword}
        value={password}
        type="password"
      />
      <Button variant={'authx'} className="w-40" onClick={handleSave}>
        {isLoading ? (
          <div className="flex flex-row gap-1 items-center">
            <Spinner size={16} color="green" />

            <span>Saving...</span>
          </div>
        ) : (
          'Save'
        )}
      </Button>
    </div>
  );
}
