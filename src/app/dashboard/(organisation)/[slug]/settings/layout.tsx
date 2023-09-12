'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { ReactNode, useEffect } from 'react';
import EstCostCard from './components/est-cost-card';
import { usePathname, useParams } from 'next/navigation';
import useOrgData, { Organization } from '../../../orgDataStore';

export default function SettingLayout({ children }: { children: ReactNode }) {
  const orgData = useOrgData(state => state.manageOrgData);
  const pathname = usePathname();
  const { slug } = useParams();
  useEffect(() => {
    console.log(pathname);
    console.log(getCurrentMonth());
  }, [pathname]);

  const apiCalls = orgData.past_month_api_calls[getCurrentMonth()];
  return (
    <>
      {pathname === `/dashboard/${slug}/settings/webhooks` ? (
        <div className="flex-1 space-y-8 p-10 pt-4 lg:p-16">{children}</div>
      ) : (
        <div className="flex-1 space-y-8 p-10 pt-4 lg:p-16">
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
                <div className="text-2xl font-bold">{apiCalls}</div>
                <p className="text-xs text-disabled">This month's API calls</p>
              </CardContent>
            </Card>
            <EstCostCard />
          </div>
          {children}
        </div>
      )}
    </>
  );
}

const getCurrentMonth = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentMonthKey = `${currentYear}-${currentMonth
    .toString()
    .padStart(2, '0')}`;
  return currentMonthKey;
};
