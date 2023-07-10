import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface dataType {
  data: object[];
}
function OrgList({ data }: dataType) {
  const router = useRouter();
  const handleNavigation = () => {
    router.push('/dashboard/add-organization');
  };
  return (
    <section className="max-w-[1180px] pt-9 overflow-x-auto">
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
          <Button onClick={handleNavigation}>
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
          <Input type="email" placeholder="Email" className="w-full" />
          <button className="px-12 py-2 bg-[#4338CA] text-white rounded-sm">
            Search
          </button>
          {/* <button className="px-12 py-2 bg-[#fff] text-black border-2 border-gray-300 font-semibold rounded-sm max-w-max w-full" >Search by</button> */}
        </div>
      </div>

      <div className="max-h-[400px] overflow-hidden mt-12"></div>
    </section>
  );
}

export default OrgList;
