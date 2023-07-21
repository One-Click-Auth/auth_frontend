'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Minus, Plus, PlusIcon } from 'lucide-react';
import { DatabaseSvg } from '../../../assets/Svg/Account/Account';
import { Button } from '../../../components/ui/Button';
import { useRouter } from 'next/navigation';
import OrgList from './OrgList';
import { useAuth } from '@/contexts/AuthContext';
import useOrgdata from '../orgDataStore';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import Image from 'next/image';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/Input';

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

  const [paymentPage, setPaymentPage] = useState(true);
  const [orgCount, setOrgCount] = useState(1);
  const triggerRef = useRef(null);

  const handleIncrement = () => {
    setOrgCount(e => e + 1);
  };
  const handleDecrement = () => {
    setOrgCount(e => e - 1);
  };

  const handlePayment = () => {
    fetch('https://api.trustauthx.com/create_checkout_session', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quantity: orgCount,
        new_org: true
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('data', data);
        router.push(data.url);
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  const handleNavigation = () => {
    // router.push('/dashboard/add-organization');
    setPaymentPage(true);
    if (triggerRef.current !== null) triggerRef.current.click();
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

      <Dialog>
        <DialogTrigger asChild={paymentPage}>
          <button ref={triggerRef}></button>
        </DialogTrigger>
        <DialogContent>
          <div className="min-h-[300px] flex items-center justify-center flex-col gap-y-5">
            <div>
              <Image
                src="/logo.svg"
                alt="AuthX Logo"
                width="100"
                height="100"
                className="m-auto max-w-[80px] max-h-24 w-full"
              />
            </div>

            <h3 className="text-xl font-semibold text-center ">
              Choose the Number of Organization's
            </h3>

            <div className="px-4 text-center">
              <p className=" border-2  border-black max-w-max m-auto px-8 py-2 rounded-sm mb-3 ">
                {orgCount}
              </p>
              <Button variant="authx" onClick={handleIncrement}>
                {' '}
                <PlusIcon />{' '}
              </Button>
              <Button
                variant="authx"
                className="ml-4"
                onClick={handleDecrement}
              >
                {' '}
                <Minus />{' '}
              </Button>
            </div>

            <Button variant="authx" className="w-full" onClick={handlePayment}>
              Procced
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default AccountIndex;
