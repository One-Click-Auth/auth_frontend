'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Minus, Plus, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/Providers/AuthContext';

import Image from 'next/image';
import { PreferenceDialog } from '../../components/pricingCard';

const NewOrgRequest = () => {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (freelance_discount: boolean) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.trustauthx.com/create_checkout_session?freelance_discount=${freelance_discount}`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            new_org: true
          })
        }
      );
      console.log(response);
      const data = (await response.json()) as { url: string };
      console.log('data', data);
      if (response.status === 200) {
        router.push(data.url);
        return;
      }
      setLoading(false);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div
      style={{ height: 'calc(100vh - 100px)' }}
      className="max-w-xl m-auto text-center flex items-center justify-center flex-col"
    >
      <div>
        <div>
          <Image
            src="/dashboard-icons/no-org.svg"
            alt="No Org"
            width="100"
            height="100"
            className="m-auto max-w-[300px] w-full"
          />
        </div>
        <p className="text-center my-5">
          Represent the teams, business customers, and partner companies that
          access your applications as organizations in AuthX.
        </p>
        <div className="hover:text-white">
          <PreferenceDialog
            triggerText={`Create a New Organization`}
            handlePayment={handlePayment}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default NewOrgRequest;
