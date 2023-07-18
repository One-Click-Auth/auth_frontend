'use client';

import { Button } from '@/components/ui/Button';
import { useWidgetStore } from '../widgetStore';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { Icons } from '@/components/icons';
import { useAuth } from '@/contexts/AuthContext';
import { Social } from '../widgetStore';
import '@total-typescript/ts-reset';

type FooterProps = {
  reset: () => void;
};

type WidgetObject = {
  name: string;
  host: string;
  widget: {
    name: string;
    logo_url: string;
    font: string;
    greeting: string;
    input_border: {
      radius: string;
      color: string;
    };
    widget_border: {
      radius: string;
      color: string;
      width: string;
    };
    color0: string;
    color1: string;
    color2: string;
    color3: string;
    color6: string;
    social: Social;
  };
  callback_url?: string;
  redirect_url?: string;
};

const ORG_ID =
  '73bbc4bf458a4f66acab0a8cfefa47d13aa33402120d11ee88069dc8f7663e88';

// TODO: Update server state on clicking save
// Object to update server state / push
export function WidgetFooter({ reset }: FooterProps) {
  const { token } = useAuth();
  const { toast } = useToast();
  const {
    logo,
    displayName,
    greeting,
    inputBorderColor,
    inputBoxRadius,
    widgetBorderWidth,
    widgetBoxRadius,
    widgetBorderColor,
    social,
    hostURL,
    callbackURL,
    redirectURL,
    color,
    color2,
    color3,
    widgetBgColor,
    widgetColor
  } = useWidgetStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [s3ImageUrl, setS3ImageUrl] = useState('');
  const [prevLogo, setPrevLogo] = useState<File>();

  const widgetObj: WidgetObject = {
    name: displayName,
    host: hostURL,
    widget: {
      name: displayName,
      logo_url: s3ImageUrl,
      font: 'inter',
      greeting,
      input_border: {
        radius: inputBoxRadius,
        color: inputBorderColor.hex
      },
      widget_border: {
        radius: widgetBoxRadius,
        color: widgetBorderColor.hex,
        width: widgetBorderWidth
      },
      color0: color.hex,
      color1: color2.hex,
      color2: color3.hex,
      color3: widgetBgColor.hex,
      color6: widgetColor.hex,
      social
    }
  };

  if (callbackURL) widgetObj.callback_url = callbackURL;
  if (redirectURL) widgetObj.redirect_url = redirectURL;

  const destructiveToast = () => {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.'
    });
  };

  // Save methods
  async function putObject() {
    try {
      console.log(JSON.stringify(widgetObj));
      const res = await fetch(`https://api.trustauthx.com/org/${ORG_ID}`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(widgetObj)
      });

      if (res.status === 200) {
        setIsLoading(false);
        toast({
          title: 'Success!',
          description: 'Your settings have been saved successfully'
        });
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

  async function uploadImageToS3() {
    setIsLoading(true);

    // Fetch Upload url
    const response = await fetch(
      `/api/preSignedUrl?fileName=${logo?.name}`
    ).catch(err => console.log(err));
    const data = await response?.json();
    const { url } = data as { url: string };

    // PUT file to s3 bucket
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: logo
    }).catch(err => {
      setIsLoading(false);
      destructiveToast();
      console.log(err);
    });

    if (res?.status === 200) {
      const imageUrl = url.split('?')[0];
      console.log({ imageUrl });
      widgetObj.widget.logo_url = imageUrl;
      setS3ImageUrl(imageUrl);
      setPrevLogo(logo);
    }

    if (res?.status === 500 || res?.status === 404) {
      setIsLoading(false);
      destructiveToast();
    }
  }

  // Call methods according to active tab
  const handleSave = async () => {
    // Attemp to upload logo only if it has been changed
    if (!checkLogoEquality(logo, prevLogo)) {
      await uploadImageToS3();
    }
    await putObject();
  };

  const checkLogoEquality = (
    logo: File | undefined,
    prevLogo: File | undefined
  ) => {
    return logo?.name === prevLogo?.name &&
      logo?.size === prevLogo?.size &&
      logo?.lastModified === prevLogo?.lastModified
      ? true
      : false;
  };

  return (
    <div className="flex gap-4">
      <span className="basis-3/5 text-slate-400 text-sm border rounded-lg pt-2 px-3">
        Save the new widget Settings for this Organization{' '}
      </span>
      <Button
        onClick={reset}
        className="bg-black text-white hover:bg-black/80 basis-1/5"
        disabled={isLoading}
      >
        Reset
      </Button>
      <Button
        onClick={handleSave}
        className="bg-accent hover:bg-accent/80 basis-1/5"
        disabled={isLoading}
      >
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Save
      </Button>
    </div>
  );
}
