'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { WidgetPreview } from './components/widget-preview';
import WidgetBranding from './components/widget-branding';
import { RefObject, useEffect, useRef, useState } from 'react';
import { WidgetFooter } from './components/widget-footer';
import { WidgetCustom } from './components/widget-custom';
import { Consent } from './components/consent';
import { DevSettings } from './components/dev-settings';
import { updateStoreWithFetch, useWidgetStore } from './widgetStore';
import { WidgetBrandingRef } from './components/widget-branding';
import { WIDGET_TABS as TABS } from '@/constants';
import { useAuth } from '@/Providers/AuthContext';
import { useParams } from 'next/navigation';
import { EmailSettings } from './components/email-settings';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/icons';
const WidgetSettings = () => {
  const { token } = useAuth();
  const brandingRef: RefObject<WidgetBrandingRef> = useRef(null);
  const [tab, setTab] = useState(TABS.branding);
  const [demoloading, setDemoloading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    if (token) updateStoreWithFetch(token, slug);
  }, []);

  const {
    logoImage,
    logo,
    setLogoImage,
    resetBranding,
    resetCustomisation,
    resetConsent,
    resetDevSettings,
    widgetBgColor,
    setWidgetBgColor,
    widgetBgColor2,
    setWidgetBgColor2,
    widgetBgColor3,
    setWidgetBgColor3,
    widgetBg2Status,
    setWidgetBg2Status,
    widgetBg3Status,
    setWidgetBg3Status,
    shadowColor,
    setShadowColor,
    widgetBoxRadius,
    widgetBorderWidth,
    widgetBorderColor,
    widgetColor,
    setWidgetColor,
    widgetColor2,
    setWidgetColor2,
    widget2Status
  } = useWidgetStore();

  useEffect(() => {
    if (logo) {
      setLogoImage(URL.createObjectURL(logo));
    }

    if (!logo) {
      setLogoImage(logoImage);
    }
  }, [logo]);

  //to show user the demo of widget by redirecting to the url
  const showDemo = () => {
    const currentURL = new URL(window.location.href);
    const baseUrl = `${currentURL.protocol}//${currentURL.host}`;
    const url = `${baseUrl}/widget/login?org_id=${slug}`;
    window.open(url, '_blank');
  };

  //Update box shadow as per background color dynamically
  // function calculateDynamicDropShadow(backgroundHex: string) {
  //   const shadowOpacity = 0.3;
  //   const shadowSpread = '0.2rem';

  //   const rgb = hexToRgb(backgroundHex);

  //   const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  //   const shadowColor =
  //     luminance > 0.5
  //       ? `rgba(0, 0, 0, ${shadowOpacity})`
  //       : `rgba(255, 255, 255, ${shadowOpacity})`;

  //   const boxShadow = `0px 0px 50px ${shadowSpread} ${shadowColor}`;
  //   return {
  //     boxShadow
  //   };
  // }

  // function hexToRgb(hex: string) {
  //   const bigint = parseInt(hex.slice(1), 16);
  //   const r = (bigint >> 16) & 255;
  //   const g = (bigint >> 8) & 255;
  //   const b = bigint & 255;
  //   return { r, g, b };
  // }

  const handleReset = () => {
    switch (tab) {
      case TABS.branding:
        if (brandingRef.current) {
          brandingRef.current.clearDisplayNameAndGreetings();
        }
        resetBranding();
        return;
      case TABS.consent:
        return resetConsent();
      case TABS.customization:
        return resetCustomisation();
      case TABS.dev_settings:
        return resetDevSettings();
      default:
        return;
    }
  };

  const updateWidgetColor = () => {
    if (!widget2Status) {
      return widgetColor.hex;
    } else if (widget2Status) {
      return `linear-gradient(to bottom, ${widgetColor.hex}, ${widgetColor2.hex})`;
    }
  };

  const updateWidgetBackground = () => {
    if (!widgetBg2Status && !widgetBg3Status) {
      return widgetBgColor.hex;
    }

    if (widgetBg2Status && widgetBg3Status) {
      return `linear-gradient(to bottom right, ${widgetBgColor.hex}, ${widgetBgColor2.hex}, ${widgetBgColor3.hex})`;
    }

    if (widgetBg2Status || widgetBg3Status) {
      if (!widget2Status) {
        return `linear-gradient(to bottom right, ${widgetBgColor.hex}, ${widgetBgColor3.hex}, ${widgetBgColor3.hex})`;
      }
      return `linear-gradient(to bottom right, ${widgetBgColor.hex}, ${widgetBgColor2.hex}, ${widgetBgColor2.hex})`;
    }
  };

  const [widgetCardColor, setWidgetCardColor] = useState(updateWidgetColor());
  const [widgetBackgroundColor, setWidgetBackgroundColor] = useState(
    updateWidgetBackground()
  );
  const [widgetShadowColor, setWidgetShadowColor] = useState(
    `${shadowColor.hex}`
  );

  useEffect(() => {
    setWidgetCardColor(updateWidgetColor());
  }, [widgetColor, widgetColor2, widget2Status]);

  useEffect(() => {
    setWidgetBackgroundColor(updateWidgetBackground());
  }, [
    widgetBgColor,
    widgetBgColor2,
    widgetBgColor3,
    widgetBg2Status,
    widgetBg3Status
  ]);

  useEffect(() => {
    setWidgetShadowColor(String(shadowColor.hex));
    console.log(shadowColor);
  }, [shadowColor]);

  useEffect(() => {
    // console.log(button2Status)
    if (!widget2Status) {
      return setWidgetColor2(widgetColor);
    }
    if (widget2Status) {
      return setWidgetColor2(widgetColor2);
    }
  }, [widgetColor, widgetColor2, widget2Status]);

  useEffect(() => {
    if (!widgetBg2Status && !widgetBg3Status) {
      return setWidgetBgColor2(widgetBgColor), setWidgetBgColor3(widgetBgColor);
    }
    if (!widgetBg2Status && widgetBg3Status) {
      return setWidgetBgColor2(widgetBgColor3);
    }
    if (!widgetBg3Status && widgetBg2Status) {
      return setWidgetBgColor3(widgetBgColor2);
    }
  }, [
    widgetBg2Status,
    widgetBg3Status,
    widgetBgColor,
    widgetBgColor2,
    widgetBgColor3
  ]);

  return (
    <div className="flex-1 space-y-4 p-6 pt-14 max-w-7xl mx-auto ">
      <Tabs
        defaultValue={TABS.branding}
        className="space-y-4"
        onValueChange={e => setTab(e)}
      >
        <div className="flex flex-wrap gap-3 justify-between ">
          <TabsList className="bg-gray-100 flex-wrap h-full">
            <TabsTrigger
              value={TABS.branding}
              className="px-8 text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
            >
              Branding
            </TabsTrigger>
            <TabsTrigger
              value={TABS.customization}
              className="px-8 text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
            >
              Customization
            </TabsTrigger>
            <TabsTrigger
              value={TABS.consent}
              className="px-8 text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
            >
              Consent
            </TabsTrigger>
            <TabsTrigger
              value={TABS.dev_settings}
              className="px-8 text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
            >
              Dev Settings
            </TabsTrigger>
            <TabsTrigger
              value={TABS.email_settings}
              className="px-8 text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
            >
              Email Settings
            </TabsTrigger>
          </TabsList>
          {/* <LanguageSwitcher /> */}
          <Button
            className="bg-accent hover:bg-accent/80 w-1/3 sm:w-1/4"
            onClick={showDemo}
          >
            {demoloading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Demo'
            )}
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <TabsContent
            value={TABS.branding}
            className="mt-0 space-y-4 col-span-1 lg:col-span-4"
          >
            <Card className="shadow-none">
              <CardContent className="p-10 space-y-7">
                <WidgetBranding ref={brandingRef} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value={TABS.customization}
            className="mt-0 space-y-4 col-span-1 lg:col-span-4"
          >
            <Card className="shadow-none">
              <CardContent className="p-10 space-y-7">
                <WidgetCustom />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value={TABS.consent}
            className="mt-0 space-y-4 col-span-1 lg:col-span-4"
          >
            <Card className="shadow-none min-h-[36rem]">
              <CardContent className="p-10">
                <Consent />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value={TABS.dev_settings}
            className="mt-0 space-y-4 col-span-1 lg:col-span-4"
          >
            <Card className="shadow-none min-h-[36rem]">
              <CardContent className="p-10">
                <DevSettings />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value={TABS.email_settings}
            className="mt-0 space-y-4 col-span-1 lg:col-span-4"
          >
            <Card className="shadow-none min-h-[36rem]">
              <CardContent className="p-10">
                <EmailSettings />
              </CardContent>
            </Card>
          </TabsContent>

          <Card
            style={{
              background: widgetBackgroundColor
            }}
            className="col-span-1 lg:col-span-3  shadow-none grid place-content-center"
          >
            <CardContent
              style={{
                borderRadius: Number(widgetBoxRadius),
                borderWidth: Number(widgetBorderWidth),
                borderColor: widgetBorderColor.hex,
                background: widgetCardColor,
                boxShadow: `0 10px 15px -3px ${widgetShadowColor}, 0 4px 6px -4px ${widgetShadowColor}`
              }}
              className={`p-10  m-4`}
            >
              <WidgetPreview />
            </CardContent>
          </Card>
        </div>
        <WidgetFooter reset={handleReset} />
      </Tabs>
    </div>
  );
};

export default WidgetSettings;
