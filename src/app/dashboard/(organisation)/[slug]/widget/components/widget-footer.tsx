'use client';

import { Button } from '@/components/ui/Button';
import { updateStoreWithFetch, useWidgetStore } from '../widgetStore';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { Icons } from '@/components/icons';
import { useAuth } from '@/Providers/AuthContext';
import { OrgObject } from '../widgetStore';
import '@total-typescript/ts-reset';
import { useParams } from 'next/navigation';
import { Spinnaker } from 'next/font/google';
import Spinner from '@/components/spinner';

type FooterProps = {
  reset: () => void;
};

// const ORG_ID =
//   '73bbc4bf458a4f66acab0a8cfefa47d13aa33402120d11ee88069dc8f7663e88';

// TODO: Update server state on clicking save
// Object to update server state / push
// Logo string defaults to ""
export function WidgetFooter({ reset }: FooterProps) {
  const { slug: ORG_ID } = useParams();
  const { token } = useAuth();
  const { toast } = useToast();
  const {
    logo,
    displayName,
    greeting,
    inputBorderColor,
    inputBoxRadius,
    buttonBorderColor,
    buttonRadius,
    widgetBorderWidth,
    widgetBoxRadius,
    widgetBorderColor,
    ppURL,
    tncURL,
    hostURL,
    callbackURL,
    social,
    redirectURL,
    logoImage,
    color,
    color1,
    color2,
    color9,
    widgetBgColor,
    widgetBgColor2,
    widgetBgColor3,
    shadowColor,
    widgetColor,
    widgetColor2,
    nameFontColor,
    greetingFontColor
  } = useWidgetStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [s3ImageUrl, setS3ImageUrl] = useState(logoImage);
  const [prevLogo, setPrevLogo] = useState<File>();

  useEffect(() => {
    setS3ImageUrl(logoImage);
  }, [logoImage]);

  const widgetObj: OrgObject = {
    name: displayName,
    host: hostURL,
    social: social,
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
      button: {
        radius: buttonRadius,
        bc: buttonBorderColor.hex
      },
      color0: color.hex,
      color1: color1.hex,
      color2: color2.hex,
      color3: widgetBgColor.hex,
      color4: widgetBgColor2.hex,
      color5: widgetBgColor3.hex,
      color6: widgetColor.hex,
      color7: widgetColor2.hex,
      color8: shadowColor.hex,
      color9: color9.hex,
      color10: nameFontColor.hex,
      color11: greetingFontColor.hex
    }
  };

  if (callbackURL) widgetObj.callback_url = callbackURL;
  if (redirectURL) widgetObj.widget.redirect_url = redirectURL;
  if (tncURL) widgetObj.tnc_url = tncURL;
  if (ppURL) widgetObj.pp_url = ppURL;

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
      // console.log(JSON.stringify(widgetObj));
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
          description: 'Your settings have been saved successfully',
          variant: 'success'
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
    // Check filename extension
    try {
      if (logo) {
        const splitName = logo?.name.split('.');
        const fileExtension = splitName?.slice(-1);
        const contentType =
          fileExtension[0] === 'svg' ? 'image/svg+xml' : 'image/*';

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
            'Content-Type': contentType
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

      // if (!logo) {
      //   setIsLoading(false);
      //   toast({
      //     variant: 'destructive',
      //     title: 'Logo not found!',
      //     description: 'Please select a logo file to upload'
      //   });
      // }
    } catch (error) {
      setIsLoading(false);
      destructiveToast();
    }
  }

  // Call methods according to active tab
  const handleSave = async () => {
    if (isLoading) return;
    setIsLoading(true);
    // Attemp to upload logo only if it has been changed
    if (!checkLogoEquality(logo, prevLogo)) {
      await uploadImageToS3();
    }
    await putObject();
    if (token) await updateStoreWithFetch(token, ORG_ID);
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
    <div className="flex gap-5">
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
