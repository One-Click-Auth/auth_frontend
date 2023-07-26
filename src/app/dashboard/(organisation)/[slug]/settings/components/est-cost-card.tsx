'use client';

import { Skeleton } from '@/components/ui/Skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { getOrgData } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function EstCostCard() {
  const { token } = useAuth();
  const { slug } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['est-cost'],
    queryFn: () => getOrgData(slug, token)
  });

  let price = 0;

  if (data) {
    if (data.DDoS) {
      price += 10;
    }
    if (data.bot_det) {
      price += 15;
    }
    if (data.brute_force) {
      price += 5;
    }
    if (data.breach_pass_det) {
      price += 25;
    }
    if (data.fa2) {
      price += 25;
    }
    if (data.consent) {
      price += 15;
    }
    if (data.callbacks) {
      price += 20;
    }
    // if (data.rtm) {
    //   price += 75
    // }
    if (data.passwordless) {
      price += 35;
    }
  }

  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Est. Cost</CardTitle>
        <Image
          src="/dashboard-icons/credit-card.svg"
          alt="multiple users icon"
          width={24}
          height={24}
        />
      </CardHeader>
      <CardContent className="space-y-2">
        {isLoading ? (
          <Skeleton className="w-full h-8" />
        ) : (
          <div className="text-2xl font-bold">${price}</div>
        )}
        <p className="text-xs text-disabled">Total Recurring Cost</p>
      </CardContent>
    </Card>
  );
}
