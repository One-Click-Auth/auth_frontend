'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Minus, Plus, PlusIcon } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useRouter } from 'next/navigation';
import OrgList from './OrgList';
import { useAuth } from '@/contexts/AuthContext';
import useOrgdata from '../orgDataStore';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import Image from 'next/image';

function AccountIndex() {
  const [hasOrg, setHasOrg] = useState(true);
  const router = useRouter();
  const { token } = useAuth();
  const addData = useOrgdata(state => state.addData);

  useEffect(() => {
    fetch('https://api.trustauthx.com/org/all', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.detail) {
          setHasOrg(false);
        } else {
          addData(data);
          setHasOrg(true);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleNavigation = () => {
    router.push('/dashboard/add-organization');
  };

  return (
    <section className="oveflow-x-auto flex-1">
      {hasOrg ? (
        <OrgList />
      ) : (
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
              Represent the teams, business customers, and partner companies
              that access your applications as organizations in AuthX.
            </p>
            <div className="hover:text-white">
              <Button onClick={handleNavigation} variant="authx">
                <Plus />
                Create New Organization
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AccountIndex;
