import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Overview } from '@/components/dashboard/overview';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from './components/language-switcher';
import { WidgetPreview } from './components/widget-preview';

const OrganisationDashboard = async () => {
  return (
    <div className="flex-1 space-y-4 p-10 pt-14">
      <Tabs defaultValue="branding" className="space-y-4">
        <div className="flex justify-between">
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
              <CardContent className="p-10">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3 bg-[#EEF5F1] shadow-none grid place-content-center">
              <CardContent className="p-10 bg-primary rounded-lg drop-shadow-lg">
                <WidgetPreview/>
              </CardContent>
            </Card>
          </div>
          <div className='flex gap-4'>
            <span className='basis-3/5 text-slate-400 text-sm border rounded-lg pt-2 px-3'>Save the new widget Settings for this Organization  </span>
            <Button className='bg-black text-white hover:bg-black/80 basis-1/5'>Reset</Button>
            <Button className='bg-accent hover:bg-accent/80 basis-1/5'>Save</Button>
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
                <div>
                  Hello
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganisationDashboard;
