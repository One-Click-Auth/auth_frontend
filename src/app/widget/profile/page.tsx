'use client';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useOrgData } from '../login/widgetStore';

export default function WidgetProfile() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-fit min-h-[80vh] w-[90vw]  md:w-[80vw] lg:w-[70vw] border-2 border-slate-300 rounded-md text-center p-2">
        <div className="flex flex-col justify-center items-start pt-4 px-4">
          <h1 className="text-2xl font-medium">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Make changes to your account
          </p>
        </div>
        <Separator className="my-4" />
        <div>
          <Tabs
            defaultValue="account"
            className="w-full flex flex-col sm:flex-row sm:h-full"
          >
            <TabsList className="bg-transparent flex flex-row sm:flex-col justify-start items-start h-10 sm:h-full sm:w-1/5 sm:pr-4 ">
              <TabsTrigger
                value="account"
                className="w-1/2 sm:w-full flex justify-start py-2  data-[state=active]:bg-slate-100  sm:mb-4"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="w-1/2 sm:w-full flex justify-start py-2  data-[state=active]:bg-slate-100 "
              >
                Password
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="sm:w-4/5">
              <Card className="border-none shadow-none flex flex-col sm:items-start">
                <CardHeader className="sm:pt-0 flex flex-col sm:items-start">
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're
                    done.
                  </CardDescription>
                </CardHeader>
                <Separator className="mb-4 sm:w-2/3 sm:ml-4" />
                <CardContent className="space-y-2">
                  <div className="gap-2 flex flex-col items-start">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="gap-2 flex flex-col items-start">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password" className="sm:w-4/5">
              <Card className="border-none shadow-none flex flex-col sm:items-start">
                <CardHeader className="sm:pt-0 flex flex-col sm:items-start">
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you'll be logged
                    out.
                  </CardDescription>
                </CardHeader>
                <Separator className="mb-4 sm:w-2/3 sm:ml-4" />
                <CardContent className="space-y-2">
                  <div className="gap-2 flex flex-col items-start">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="gap-2 flex flex-col items-start">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
