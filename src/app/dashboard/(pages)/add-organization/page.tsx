'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { LuXCircle } from 'react-icons/lu';

import { Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/Providers/AuthContext';

import { useDispatch } from 'react-redux';
import { updateKeys } from '@/redux/Org/keySlice';
import Spinner from '@/components/spinner';

// Alert component
const AlertMessage = ({
  message,
  setAlert
}: {
  message: string;
  setAlert: React.Dispatch<boolean>;
}) => {
  return (
    <Alert className="fixed top-6 w-[22rem] left-[calc(50vw_-_11rem)] bg-red-400 z-[1100]">
      <ExclamationTriangleIcon className="w-4 h-4" />
      <AlertTitle>Notice!</AlertTitle>
      <button
        onClick={() => setAlert(false)}
        className="absolute right-2 top-2"
      >
        <LuXCircle className="w-5 h-5" />
      </button>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

function AddOrganization() {
  const router = useRouter();
  const [orgName, setOrgName] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setOrgName(e.target.value);
  };

  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  const { token } = useAuth();

  const [orgCount, setOrgCount] = useState(1);
  // const triggerRef = useRef<HTMLButtonElement>(null);

  const [queryState, setQueryState] = useState(false);

  useEffect(() => {
    if (orgCount <= 0) {
      setOrgCount(1);
    }
  }, [orgCount]);

  useEffect(() => {
    if (status === 'true') {
      setQueryState(true);
    } else {
      setQueryState(false);
    }
  }, []);

  interface OrgData {
    status: boolean;
    org_id: string;
    api_key: string;
    api_secret: string;
  }

  const checkForPayment = async () => {
    setLoading(true);
    if (queryState === false) {
      router.push('/dashboard/new-organization');
      return;
    }
    try {
      const response = await fetch('https://api.trustauthx.com/org', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: orgName
        })
      });
      if (response.status === 412) {
        const data = (await response.json()) as { detail: string };
        console.log(data.detail);
        router.push('/dashboard/new-organization');
        return;
      } else if (response.status === 200) {
        const data = (await response.json()) as OrgData;
        dispatch(updateKeys({ type: 'key', value: data.api_key }));
        dispatch(updateKeys({ type: 'secret', value: data.api_secret }));
        dispatch(updateKeys({ type: 'id', value: data.org_id }));

        router.push('/dashboard/keys');
        return;
      }
      setAlertMessage('Some error occured in fetching details');
      setAlert(true);
      setLoading(false);
      return;
    } catch (error) {
      console.log(error);
      setAlertMessage('Some error occured in fetching details');
      setAlert(true);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-4xl h-[calc(100vh-100px)] m-auto text-start flex items-center justify-center flex-col">
        <div className="max-w-6xl m-auto border-[1.5px] border-slate-300 p-8 sm:p-12 rounded-md">
          <h3 className="text-xl sm:text-3xl font-bold sm:mb-8 text-[#0f172a]">
            Create A New Organization
          </h3>
          <p className="mb-12 max-w-2xl text-slate-700 text-sm sm:text-base">
            <span className="font-semibold text-[#0f172a]">*Name: </span> This
            is the name that will be displayed to end-users for this
            orgnaization in any intractioin with them.{' '}
          </p>
          <label className="font-semibold mb-2 text-[#0f172a]">
            *Name your orgnaization
          </label>
          <div className="flex flex-col md:flex-row gap-2">
            <Input
              type="text"
              className="bg-transparent appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:border-black"
              placeholder="Your Organization Name"
              value={orgName}
              onChange={handleChange}
              required
            />
            <div>
              <Button
                type="submit"
                variant={'authx'}
                className="min-w-[160px]"
                onClick={() => {
                  loading ? console.log('loading...') : checkForPayment();
                }}
              >
                {loading ? (
                  <div className="flex flex-row gap-2 items-center">
                    <Spinner size={16} color="green" />
                    <span>Checking...</span>
                  </div>
                ) : (
                  <>
                    <Plus />
                    Create New Organization
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {alert && <AlertMessage message={alertMessage} setAlert={setAlert} />}
    </>
  );
}

export default AddOrganization;
