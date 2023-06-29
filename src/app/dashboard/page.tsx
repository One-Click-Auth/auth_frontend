import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { Overview } from "@/components/dashboard/overview";
import Image from "next/image";

const OrganisationDashboard = () => {
  const orgName = "Apple";
  return (
    <div className="flex-1 space-y-4 p-10 pt-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {orgName} Dashboard
        </h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-gray-100">
          <TabsTrigger
            value="overview"
            className="text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
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
              <CardContent>
                <div className="text-2xl font-bold">45,000</div>
                <p className="text-xs text-muted-foreground">
                  Last month's api calls
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
              <CardContent>
                <div className="text-2xl font-bold">55,650</div>
                <p className="text-xs text-muted-foreground">
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
              <CardContent>
                <div className="text-2xl font-bold">$4,500.54</div>
                <p className="text-xs text-muted-foreground">
                  Total Recurring Cost
                </p>
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
              <CardContent>
                <div className="text-2xl font-bold">45,000</div>
                <p className="text-xs text-muted-foreground">
                  Last month's api calls
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
              <CardContent>
                <div className="text-2xl font-bold">55,650</div>
                <p className="text-xs text-muted-foreground">
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
              <CardContent>
                <div className="text-2xl font-bold">$4,500.54</div>
                <p className="text-xs text-muted-foreground">
                  Total Recurring Cost
                </p>
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
};

export default OrganisationDashboard;
