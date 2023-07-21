import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Overview } from '@/components/dashboard/overview';
import Image from 'next/image';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { OrgObject } from './widget/widgetStore';
import { notFound, useRouter } from 'next/navigation';

type ErrorObject = {
  detail: string;
};

interface ParamsProp {
  params: {
    slug: string;
  };
}

type ApiResponse<T, E> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      data: E;
    };

type AccessToken = {
  token: {
    access_token: string;
  };
};

// eslint-disable-next-line react-refresh/only-export-components
// export async function generateStaticParams(context: any) {
//   const {token: { access_token }} = await getServerSession(authOptions) as Session & AccessToken;

//   const orgs = await fetch('https://api.trustauthx.com/org/all', {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer`
//     }
//   }).then((res) => res.json());
//   const data = orgs as { name: string }[]

//   return data.map((org) => ({
//     slug: org.name,
//   }))
// }

export default async function Page({ params: { slug } }: ParamsProp) {
  // const router = useRouter();
  const {
    token: { access_token }
  } = (await getServerSession(authOptions)) as Session & AccessToken;

  const res = await fetch(`https://api.trustauthx.com/org/${slug}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  });

  const apiResponse: ApiResponse<OrgObject, ErrorObject> = res.ok
    ? { success: res.ok, data: (await res.json()) as OrgObject }
    : { success: res.ok, data: (await res.json()) as ErrorObject };

  // If Response fails redirect to 404 page
  if (!apiResponse.success) {
    notFound();
  }

  if (apiResponse.success) {
    const { data } = apiResponse;
    return (
      <div className="flex-1 space-y-4 p-10 pt-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            <span className="capitalize">{data.name}</span> Dashboard
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-gray-100">
            <TabsTrigger
              value="overview"
              className="px-8 text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="px-8 text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
            >
              Analytics
            </TabsTrigger>
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
                  <div className="text-2xl font-bold">45,000</div>
                  <p className="text-xs text-disabled">
                    Last month's API calls
                  </p>
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
                  <div className="text-2xl font-bold">55,650</div>
                  <p className="text-xs text-disabled">
                    Total associated users
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Cost
                  </CardTitle>
                  <Image
                    src="/dashboard-icons/credit-card.svg"
                    alt="multiple users icon"
                    width={24}
                    height={24}
                  />
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold">$4,500.54</div>
                  <p className="text-xs text-disabled">Total Recurring Cost</p>
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
          <TabsContent value="analytics" className="space-y-4">
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
                  <div className="text-2xl font-bold">45,000</div>
                  <p className="text-xs text-disabled">
                    Last month's API calls
                  </p>
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
                  <div className="text-2xl font-bold">55,650</div>
                  <p className="text-xs text-disabled">
                    Total associated users
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Cost
                  </CardTitle>
                  <Image
                    src="/dashboard-icons/credit-card.svg"
                    alt="multiple users icon"
                    width={24}
                    height={24}
                  />
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold">$4,500.54</div>
                  <p className="text-xs text-disabled">Total Recurring Cost</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-7 shadow-none">
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
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
}
