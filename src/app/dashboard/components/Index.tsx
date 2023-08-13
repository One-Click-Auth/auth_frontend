'use client';
import React, { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';
import OrgList from './OrgList';
import { useAuth } from '@/Providers/AuthContext';
import useOrgdata, { Organization } from '../orgDataStore';
import { PricingCard } from './pricingCard';
// import { DropdownMenu } from '@/components/ui/dropdown-menu';
// import { Input } from '@/components/ui/Input';

function AccountIndex() {
  const [hasOrg, setHasOrg] = useState(true);
  const router = useRouter();
  const { token } = useAuth();
  const addData = useOrgdata(state => state.addData);

  useEffect(() => {
    fetchOrgList();
  }, []);

  const fetchOrgList = async () => {
    try {
      const response = await fetch('https://api.trustauthx.com/org/all', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = (await response.json()) as Organization[];
      if (response.status === 406) {
        setHasOrg(false);

        return;
      } else if (response.status === 200) {
        addData(data);
        setHasOrg(true);
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <section className="oveflow-x-auto flex-1">
      {hasOrg ? (
        <OrgList />
      ) : (
        <div
          style={{ height: 'calc(100vh - 100px)' }}
          className="max-w-xl  flex mx-auto flex-col"
        >
          <h1 className="text-4xl font-bold my-6">
            Pricing plans for all use cases
          </h1>
          <div className="flex flex-col items-center justify-start sm:flex-row gap-8">
            <PricingCard />
          </div>
        </div>
      )}
    </section>
  );
}

export default AccountIndex;
