'use client';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Overview } from '@/components/dashboard/overview';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/Providers/AuthContext';
import useOrgData, { Organization } from '../../orgDataStore';

export default function Page() {
  const setManageOrgData = useOrgData(state => state.setManageOrgData);
  const orgData = useOrgData(state => state.manageOrgData);
  const { slug } = useParams();
  const { token } = useAuth();
  async function getOrgData() {
    try {
      const response = await fetch(`https://api.trustauthx.com/org/${slug}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = (await response.json()) as Organization;
      if (response.status === 200) {
        setManageOrgData(data);
        console.log(data);

        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrgData();
  }, []);

  const apiCalls = Object.values(orgData.past_month_api_calls).splice(0, 12);
  return (
    <div className="flex-1 space-y-4 p-10 pt-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="capitalize">{orgData?.name}</span> Dashboard
        </h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-gray-100">
          <TabsTrigger
            value="overview"
            className="outline-none border-none shadow-none ring-offset-0"
          >
            Overview
          </TabsTrigger>
          {/* <TabsTrigger
              value="analytics"
              className="px-8 text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
            >
              Analytics
            </TabsTrigger> */}
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total API calls
                </CardTitle>
                <Image
                  src="/dashboard-icons/dollar-coin.svg"
                  alt="dollar icon"
                  width={24}
                  height={24}
                />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold">{orgData.act_cnt}</div>
                <p className="text-xs text-disabled">Last month's API calls</p>
              </CardContent>
            </Card>
            <Card className="shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Image
                  src="/dashboard-icons/user-multiple.svg"
                  alt="multiple users icon"
                  width={24}
                  height={24}
                />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold">{orgData.active_user}</div>
                <p className="text-xs text-disabled">Total associated users</p>
              </CardContent>
            </Card>
            <Card className="shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Emails Sent
                </CardTitle>
                <Image
                  src="/dashboard-icons/mail.svg"
                  alt="multiple users icon"
                  width={24}
                  height={24}
                />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold">{orgData.email_cnt}</div>
                <p className="text-xs text-disabled">Total Emails Sent</p>
              </CardContent>
            </Card>
          </div>
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
      </Tabs>
    </div>
  );
}
