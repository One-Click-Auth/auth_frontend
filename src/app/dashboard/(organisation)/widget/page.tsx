'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { LanguageSwitcher } from './components/language-switcher';
import { WidgetPreview } from './components/widget-preview';
import { WidgetBranding } from './components/widget-branding';
import { useEffect, useState } from 'react';
import { useColor, toColor } from 'react-color-palette';
import { WidgetFooter } from './components/widget-footer';
import { WidgetCustom } from './components/widget-custom';
import { Consent } from './components/consent';
import { DevSettings } from './components/dev-settings';

export type Social = {
  [key: string]: boolean;
};

const socialDefaults: Social = {
  github: false,
  microsoft: false,
  google: false,
  apple: false,
  whatsapp: false,
  tiktok: false,
  facebook: false,
  linkedin: false,
  twitter: false
};

const TABS = {
  consent: 'consent',
  branding: 'branding',
  customization: 'customization',
  dev_settings: 'dev_settings'
};

const widgetObj = {
  widget: {
    name: 'string',
    logo_url: 'string',
    font: 'string',
    greeting: 'string',
    input_border: {
      radius: 0,
      color: 'string'
    },
    widget_border: {
      style: 0,
      radius: 0,
      color: 'string'
    },
    color0: 'string',
    color1: 'string',
    color2: 'string',
    color3: 'string',
    color4: 'string',
    color5: 'string',
    color6: 'string',
    social: {
      google: 'string'
    },
    redirect_url: 'string'
  }
};

const OrganisationDashboard = () => {
  // Branding
  const [displayName, setDisplayName] = useState<string>('Flitchcoin');
  const [greeting, setGreeting] = useState<string>(
    'Continue to Log in to Flitchcoin'
  );
  const [logo, setLogo] = useState<File>();
  const [logoImage, setLogoImage] = useState<string>('/flitchcoin-logo.svg');
  const [color, setColor] = useColor('hex', '#121212');
  const [color2, setColor2] = useColor('hex', '#121212');
  const [color3, setColor3] = useColor('hex', '#121212');
  const [button2Status, setButton2Status] = useState(false);
  const [button3Status, setButton3Status] = useState(false);
  // Customization
  const [inputBorderColor, setInputBorderColor] = useColor('hex', '#121212');
  const [widgetBorderColor, setWidgetBorderColor] = useColor('hex', '#FFFFFF');
  const [widgetColor, setWidgetColor] = useColor('hex', '#FFFFFF');
  const [widgetBgColor, setWidgetBgColor] = useColor('hex', '#EEF5F1');
  const [inputBoxRadius, setInputBoxRadius] = useState('6');
  const [widgetBoxRadius, setWidgetBoxRadius] = useState('8');
  const [widgetBorderWidth, setWidgetBorderWidth] = useState('1');
  // Consent
  const [tncURL, setTncURL] = useState('');
  const [ppURL, setPpURL] = useState('');
  // Dev-settings
  const [hostURL, setHostURL] = useState('');
  const [callbackURL, setCallbackURL] = useState('');
  const [redirectURL, setRedirectURL] = useState('');
  const [social, setSocial] = useState<Social>(socialDefaults);

  // Reset Methods
  const resetBranding = () => {
    setDisplayName('Flitchcoin');
    setGreeting('Continue to Log in to Flitchcoin');
    setLogoImage('/flitchcoin-logo.svg');
    // Reset Button State
    setButton2Status(false);
    setButton3Status(false);
    setColor(toColor('hex', '#121212'));
    setColor2(toColor('hex', '#121212'));
    setColor3(toColor('hex', '#121212'));
  };

  const resetCustomization = () => {
    setInputBorderColor(toColor('hex', '#121212'));
    setWidgetBorderColor(toColor('hex', '#FFFFFF'));
    setWidgetColor(toColor('hex', '#FFFFFF'));
    setWidgetBgColor(toColor('hex', '#EEF5F1'));
    setInputBoxRadius('6');
    setWidgetBoxRadius('8');
    setWidgetBorderWidth('1');
  };

  const resetConsent = () => {
    setTncURL('');
    setPpURL('');
  };

  const resetDevSettings = () => {
    setCallbackURL('');
    setHostURL('');
    setRedirectURL('');
    setSocial(socialDefaults);
  };

  // Set values back to default when input is empty
  useEffect(() => {
    if (displayName === '') {
      setDisplayName('Flitchcoin');
    }

    if (greeting === '') {
      setGreeting('Continue to Log in to Flitchcoin');
    }
  }, [displayName, greeting]);

  // Set or reset logo
  useEffect(() => {
    if (logo) {
      setLogoImage(URL.createObjectURL(logo));
    }

    if (!logo) {
      setLogoImage('/flitchcoin-logo.svg');
    }
  }, [logo]);
  const [tabs, setTabs] = useState(TABS.branding);
  const handleReset = () => {
    switch (tabs) {
      case TABS.branding:
        return resetBranding();
      case TABS.consent:
        return resetConsent();
      case TABS.customization:
        return resetCustomization();
      case TABS.dev_settings:
        return resetDevSettings();
    }
  };
  return (
      <div className="flex-1 space-y-4 p-10 pt-14 max-w-7xl mx-auto">
        <Tabs
          // value={tabs}
          defaultValue={TABS.branding}
          className="space-y-4"
          onValueChange={e => setTabs(e)}
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
            </TabsList>
            <LanguageSwitcher />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <TabsContent
              value={TABS.branding}
              className="mt-0 space-y-4 col-span1 lg:col-span-4"
            >
              <Card className="shadow-none">
                <CardContent className="p-10 space-y-7">
                  <WidgetBranding
                    setDisplayName={setDisplayName}
                    setGreeting={setGreeting}
                    logoState={{ logo, setLogo, logoImage }}
                    colorState={{ color, setColor }}
                    colorState2={{ color2, setColor2 }}
                    colorState3={{ color3, setColor3 }}
                    buttonStatus={{
                      button2Status,
                      button3Status,
                      setButton2Status,
                      setButton3Status
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
              value={TABS.customization}
              className="mt-0 space-y-4 col-span1 lg:col-span-4"
            >
              <Card className="shadow-none">
                <CardContent className="p-10 space-y-7">
                  <WidgetCustom
                    inputBorderColor={{
                      inputBorderColor,
                      setInputBorderColor
                    }}
                    widgetBorderColor={{
                      widgetBorderColor,
                      setWidgetBorderColor
                    }}
                    widgetColor={{ widgetColor, setWidgetColor }}
                    widgetBgColor={{ widgetBgColor, setWidgetBgColor }}
                    inputBoxRadius={{ inputBoxRadius, setInputBoxRadius }}
                    widgetBoxRadius={{ widgetBoxRadius, setWidgetBoxRadius }}
                    widgetBorderWidth={{
                      widgetBorderWidth,
                      setWidgetBorderWidth
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
              value={TABS.consent}
              className="mt-0 space-y-4 col-span1 lg:col-span-4"
            >
              <Card className="shadow-none min-h-[36rem]">
                <CardContent className="p-10">
                  <Consent
                    setters={{ setTncURL, setPpURL }}
                    inputValues={{ tncURL, ppURL }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
              value={TABS.dev_settings}
              className="mt-0 space-y-4 col-span1 lg:col-span-4"
            >
              <Card className="shadow-none min-h-[36rem]">
                <CardContent className="p-10">
                  <DevSettings
                    socials={{ social, setSocial }}
                    setters={{ setCallbackURL, setHostURL, setRedirectURL }}
                    inputValues={{ callbackURL, hostURL, redirectURL }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            {/* Widget Preview */}
            <Card
              style={{
                backgroundColor: widgetBgColor.hex
              }}
              className="col-span-1 lg:col-span-3 bg-[#EEF5F1] shadow-none grid place-content-center"
            >
              <CardContent
                style={{
                  borderRadius: Number(widgetBoxRadius),
                  borderWidth: Number(widgetBorderWidth),
                  borderColor: widgetBorderColor.hex,
                  backgroundColor: widgetColor.hex
                }}
                className="p-10 bg-primary m-4 rounded-lg drop-shadow-lg"
              >
                <WidgetPreview
                  displayName={displayName}
                  greeting={greeting}
                  logoImage={logoImage}
                  buttonColor={{ color, color2, color3 }}
                  buttonStatus={{ button2Status, button3Status }}
                  inputBorderColor={inputBorderColor}
                  widgetColor={widgetColor}
                  inputBoxRadius={inputBoxRadius}
                  social={social}
                />
              </CardContent>
            </Card>
          </div>
          <WidgetFooter reset={handleReset} />
        </Tabs>
      </div>
  );
};

export default OrganisationDashboard;
