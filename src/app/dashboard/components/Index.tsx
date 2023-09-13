'use client';
import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import OrgList from './OrgList';
import { useAuth } from '@/Providers/AuthContext';
import useOrgdata, { Organization } from '../orgDataStore';
import PricingPage from './PricingPage';

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
      {hasOrg ? <OrgList /> : <PricingPage />}
    </section>
  );
}

export default AccountIndex;
