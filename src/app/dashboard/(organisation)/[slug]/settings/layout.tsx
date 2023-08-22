'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { ReactNode, useEffect } from 'react';
import EstCostCard from './components/est-cost-card';
import { usePathname, useParams } from 'next/navigation';

export default function SettingLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { slug } = useParams();
  useEffect(() => {
    console.log(pathname);
  }, [pathname]);
  return (
    <>
      {pathname === `/dashboard/${slug}/settings/webhooks` ? (
        <>{children}</>
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
                <div className="text-2xl font-bold">45,000</div>
                <p className="text-xs text-disabled">Last month's API calls</p>
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
