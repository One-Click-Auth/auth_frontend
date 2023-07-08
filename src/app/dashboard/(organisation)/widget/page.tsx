'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Overview } from '@/components/dashboard/overview';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from './components/language-switcher';
import { WidgetPreview } from './components/widget-preview';
import { WidgetControl } from './components/widget-control';
import { useEffect, useState } from 'react';
import { useColor } from 'react-color-palette';

const OrganisationDashboard = () => {
  const [displayName, setDisplayName] = useState<string>('Flitchcoin');
  const [greeting, setGreeting] = useState<string>(
    'Continue to Log in to Flitchcoin'
  );
  const [logo, setLogo] = useState<File>();
  const [logoImage, setLogoImage] = useState<string>('/ellipse-flitchcoin.svg');
  const [color, setColor] = useColor('hex', '#121212');
  const [color2, setColor2] = useColor('hex', '#121212');
  const [color3, setColor3] = useColor('hex', '#121212');
  const [button2Status, setButton2Status] = useState(false);
  const [button3Status, setButton3Status] = useState(false);

  // Set values back to default when input is empty
  useEffect(() => {
    if (displayName === '') {
      setDisplayName('Flitchcoin');
    }

    if (greeting === '') {
      setGreeting('Continue to Log in to Flitchcoin');
    }
  }, [displayName, greeting]);

  return (
    <div className="flex-1 space-y-4 p-10 pt-14 max-w-7xl mx-auto">
      <Tabs defaultValue="branding" className="space-y-4">
        <div className="flex flex-wrap gap-3 justify-between">
          <TabsList className="bg-gray-100">
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
          </TabsList>
          <LanguageSwitcher />
        </div>
        <TabsContent value="branding" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 shadow-none">
              <CardContent className="p-10 space-y-7">
                <WidgetControl
                  setDisplayName={setDisplayName}
                  setGreeting={setGreeting}
                  logoState={{ logo, setLogo, logoImage, setLogoImage }}
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
                />
              </CardContent>
            </Card>
          </div>
          <div className="flex gap-4">
            <span className="basis-3/5 text-slate-400 text-sm border rounded-lg pt-2 px-3">
              Save the new widget Settings for this Organization{' '}
            </span>
            <Button className="bg-black text-white hover:bg-black/80 basis-1/5">
              Reset
            </Button>
            <Button className="bg-accent hover:bg-accent/80 basis-1/5">
              Save
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="customization" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7 shadow-none">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
          </div>
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
