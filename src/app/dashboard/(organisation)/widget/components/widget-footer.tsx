'use client';

import { Button } from '@/components/ui/Button';
import { useWidgetStore } from '../widgetStore';
import { TABS } from '../page';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { Icons } from '@/components/icons';

type FooterProps = {
  reset: () => void;
  tabs: string;
};

export function WidgetFooter({ reset, tabs }: FooterProps) {
  const { toast } = useToast();
  const { logo } = useWidgetStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Save methods
  async function saveBranding() {
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

    console.log({ res });
    if (res?.status === 200) {
      const imageUrl = url.split('?')[0];
      console.log({ imageUrl });
      setIsLoading(false);
      toast({
        title: 'Success!',
        description: 'Your image has been uploaded successfully'
      });
    }
  }

  const handleSave = () => {
    switch (tabs) {
      case TABS.branding:
        return saveBranding();
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
