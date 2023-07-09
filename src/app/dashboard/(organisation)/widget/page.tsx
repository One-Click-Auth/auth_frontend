'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { LanguageSwitcher } from './components/language-switcher';
import { WidgetPreview } from './components/widget-preview';
import { WidgetBranding } from './components/widget-branding';
import { useEffect, useState } from 'react';
import { useColor } from 'react-color-palette';
import { WidgetFooter } from './components/widget-footer';
import { WidgetCustom } from './components/widget-custom';

const OrganisationDashboard = () => {
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
  const [inputBorderColor, setInputBorderColor] = useColor('hex', '#121212');
  const [widgetBorderColor, setWidgetBorderColor] = useColor('hex', '#FFFFFF');
  const [widgetColor, setWidgetColor] = useColor('hex', '#FFFFFF');
  const [widgetBgColor, setWidgetBgColor] = useColor('hex', '#EEF5F1');
  const [inputBoxRadius, setInputBoxRadius] = useState('6');
  const [widgetBoxRadius, setWidgetBoxRadius] = useState('8');

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

  return (
    <div className="flex-1 space-y-4 p-10 pt-14 max-w-7xl mx-auto">
      <Tabs defaultValue="branding" className="space-y-4">
        <div className="flex flex-wrap gap-3 justify-between">
          <TabsList className="bg-gray-100 flex-wrap h-full">
            <TabsTrigger
              value="branding"
              className="px-8 text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
            >
              Branding
            </TabsTrigger>
            <TabsTrigger
              value="customization"
              className="px-8 text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
            >
              Customization
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="consent"
              className="px-8 text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
            >
              Consent
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="dev-settings"
              className="px-8 text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
            >
              Dev Settings
            </TabsTrigger>
          </TabsList>
          <LanguageSwitcher />
        </div>
        <TabsContent value="branding" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 shadow-none">
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
            <Card className="col-span-3 bg-[#EEF5F1] shadow-none grid place-content-center">
              <CardContent className="p-10 bg-primary rounded-lg drop-shadow-lg">
                <WidgetPreview
                  displayName={displayName}
                  greeting={greeting}
                  logoImage={logoImage}
                  buttonColor={{ color, color2, color3 }}
                  buttonStatus={{ button2Status, button3Status }}
                  inputBorderColor={inputBorderColor}
                  widgetBorderColor={widgetBorderColor}
                  widgetColor={widgetColor}
                  widgetBgColor={widgetBgColor}
                  inputBoxRadius={inputBoxRadius}
                  widgetBoxRadius={widgetBoxRadius}
                />
              </CardContent>
            </Card>
          </div>
          <WidgetFooter />
        </TabsContent>
        <TabsContent value="customization" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 shadow-none">
              <CardContent className="p-10 space-y-7">
                <WidgetCustom
                  inputBorderColor={{ inputBorderColor, setInputBorderColor }}
                  widgetBorderColor={{
                    widgetBorderColor,
                    setWidgetBorderColor
                  }}
                  widgetColor={{ widgetColor, setWidgetColor }}
                  widgetBgColor={{ widgetBgColor, setWidgetBgColor }}
                  inputBoxRadius={{ inputBoxRadius, setInputBoxRadius }}
                  widgetBoxRadius={{ widgetBoxRadius, setWidgetBoxRadius }}
                />
              </CardContent>
            </Card>
            <Card className="col-span-3 bg-[#EEF5F1] shadow-none grid place-content-center">
              <CardContent className="p-10 bg-primary rounded-lg drop-shadow-lg">
                <WidgetPreview
                  displayName={displayName}
                  greeting={greeting}
                  logoImage={logoImage}
                  buttonColor={{ color, color2, color3 }}
                  buttonStatus={{ button2Status, button3Status }}
                  inputBorderColor={inputBorderColor}
                  widgetBorderColor={widgetBorderColor}
                  widgetColor={widgetColor}
                  widgetBgColor={widgetBgColor}
                  inputBoxRadius={inputBoxRadius}
                  widgetBoxRadius={widgetBoxRadius}
                />
              </CardContent>
            </Card>
          </div>
          <WidgetFooter />
        </TabsContent>
        <TabsContent value="consent" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7 shadow-none">
              <CardContent className="pl-2">
                <div>Hello</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganisationDashboard;
