'use client';

import { Button } from '@/components/ui/Button';
import { useWidgetStore } from '../widgetStore';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { Icons } from '@/components/icons';
import { WIDGET_TABS as TABS } from '@/constants';

type FooterProps = {
  reset: () => void;
  tab: string;
};

// TODO: Update server state on clicking save
// Clear text input when pressing reset in branding
// Object to update server state / push

export function WidgetFooter({ reset, tab }: FooterProps) {
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
    social
  } = useWidgetStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [s3ImageUrl, setS3ImageUrl] = useState('');

  const widgetObj = {
    widget: {
      name: displayName,
      logo_url: s3ImageUrl,
      font: 'string',
      greeting,
      input_border: {
        radius: inputBoxRadius,
        color: inputBorderColor
      },
      widget_border: {
        style: widgetBorderWidth,
        radius: widgetBoxRadius,
        color: widgetBorderColor,
      },
      color0: 'string',
      color1: 'string',
      color2: 'string',
      color3: 'string',
      color4: 'string',
      color5: 'string',
      color6: 'string',
      social,
      redirect_url: 'string'
    }
  };

  // Save methods
  async function uploadImageToS3() {
    setIsLoading(true);

    // Fetch Upload url
    const { url } = await fetch(`/api/preSignedUrl?fileName=${logo?.name}`)
      .then(res => res.json())
      .catch(err => console.log(err));

    // PUT file to s3 bucket
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: logo
    }).catch(err => {
      setIsLoading(false);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
      console.log(err);
    });

    if (res?.status === 200) {
      const imageUrl = url.split('?')[0];
      console.log({ imageUrl });
      setS3ImageUrl(imageUrl);
      setIsLoading(false);
      toast({
        title: 'Success!',
        description: 'Your image has been uploaded successfully'
      });
    }

    if (res?.status === 500 || res?.status === 404) {
      setIsLoading(false);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    }
  }

  // Call methods according to active tab
  const handleSave = () => {
    switch (tab) {
      case TABS.branding:
        return uploadImageToS3();
    }
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
