'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../../../../components/ui/Input';
import { Button } from '../../../../components/ui/Button';
import { Minus, Plus, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

function AddOrganization() {
  const router = useRouter();
  const [orgName, setOrgName] = useState('');
  const [err, setErr] = useState(false);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setOrgName(e.target.value);
  };

  const { token } = useAuth();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    //   fetch('https://api.trustauthx.com/org', {
    //     method: 'POST',
    //     headers: {
    //       accept: 'application/json',
    //       Authorization: `Bearer ${token}`,
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       name: orgName
    //     })
    //   })
    //     .then(response => {
    //       if (response.status === 412) {
    //         return setErr(true);
    //       }
    //       response.json();
    //       router.push('/dashboard/keys');
    //     })
    //     .then(data => {
    //       console.log('data', data);
    //     })
    //     .catch(error => {
    //       console.log('error', error);
    //       setErr(error);
    //     });
    // };

    fetch('https://api.trustauthx.com/create_checkout_session', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quantity: 0,
        new_org: true
      })
    })
      .then(response => {
        if (response.status === 412) {
          return setErr(true);
        }
        response.json();
        router.push('/dashboard/keys');
      })
      .then(data => {
        console.log('data', data);
      })
      .catch(error => {
        console.log('error', error);
        setErr(error);
      });
  };
  // ______________________________________PRICING TABLE ____________________________________________

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://js.stripe.com/v3/pricing-table.js';
  //   script.async = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  // React.createElement('stripe-pricing-table', {
  //   'pricing-table-id': 'prctbl_1NU7ryJBzkALt6nUsAwOQyrv',
  //   'publishable-key':
  //     'pk_live_51NKb26JBzkALt6nUUuWVM1q3UgNzlg4ERgvMmO2XWqQ8eR2xOrwtaL3M9eFRqcJAQYxgAhxbPJ1QoNvbQLvife9E00w02xIa33'
  // })

  // ______________________________________PRICING TABLE ____________________________________________

  return (
    <div className="max-w-4xl h-[calc(100vh-100px)] m-auto text-start flex items-center justify-center flex-col">
      <div className="max-w-6xl m-auto border-[1.5px] border-slate-300 p-8 sm:p-12 rounded-md">
        <h3 className="text-xl sm:text-3xl font-bold sm:mb-8 text-[#0f172a]">
          Create A New Organization
        </h3>
        <p className="mb-12 max-w-2xl text-slate-700 text-sm sm:text-base">
          <span className="font-semibold text-[#0f172a]">*Name: </span> This is
          the name that will be displayed to end-users for this orgnaization in
          any intractioin with them.{' '}
        </p>
        <label className="font-semibold mb-2 text-[#0f172a]">
          *Name your orgnaization
        </label>
        <form
          className="flex flex-col md:flex-row gap-2"
          onSubmit={checkForPayment}
        >
          <Input
            type="text"
            className="bg-transparent appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:border-black"
            placeholder="Your Organization Name"
            value={orgName}
            onChange={handleChange}
            required
          />
          <div>
            <Button type="submit" variant={'authx'} onSubmit={checkForPayment}>
              <Plus />
              Create New Organization
            </Button>
          </div>
        </form>
      </div>

      <Dialog>
        <DialogTrigger asChild>
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
                <PlusIcon />
              </Button>
              <Button
                variant="authx"
                className="ml-4"
                onClick={handleDecrement}
              >
                <Minus />
              </Button>
            </div>

            <Button variant="authx" className="w-full" onClick={handlePayment}>
              Procced
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddOrganization;
