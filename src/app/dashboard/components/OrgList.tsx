import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SearchBy } from './searchBy';
import { OrgTable } from './orgTable';

function OrgList() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/dashboard/new-organization');
  };

  return (
    <section className="max-w-[1180px] pt-9 p-6  mx-auto sm:p-10">
      <div className="flex flex-col lg:flex-row lg:items-center gap-y-4 justify-between">
        <div className="max-w-2xl">
          <h1 className="font-bold text-2xl sm:text-3xl">Your Organizations</h1>
          <p className="mt-1 sm:mt-2">
            Represent an individual organization containing teams, business
            customers, and partner companies that access your applications as
            organizations in Authx.
          </p>
        </div>
        <div className="hover:text-white">
          <Button variant={'authx'} onClick={handleNavigation}>
            <span className="mt-0.5 mr-1">
              <Plus />
            </span>
            Create New Organization
          </Button>
        </div>
      </div>

      <div className="mt-12">
        <p className="font-semibold">Search Organization</p>
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Input
            type="email"
            placeholder="Email"
            className="bg-transparent appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:border-black"
          />
          <Button className="px-12 md:w-[200px] py-2 bg-[#4338CA] text-white rounded-sm hover:bg-black hover:text-white">
            Search
          </Button>
          <SearchBy />
        </div>
      </div>

      <div className=" mt-12">
        <OrgTable />
      </div>
    </section>
  );
}

export default OrgList;
