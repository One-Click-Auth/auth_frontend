import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { ReactNode } from 'react';
import EstCostCard from './components/est-cost-card';

export default function SettingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 space-y-8 p-10 pt-4 lg:p-16">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"></div>
      {children}
    </div>
  );
}
