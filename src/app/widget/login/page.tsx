'use client';
import { Button } from '@/components/ui/Button';
import { ChevronRightIcon } from '@radix-ui/react-icons';

import { API_DOMAIN } from '@/constants';
import { Icons } from '@/components/icons';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [widget, setWidget] = useState<any>('');
  const params = new URLSearchParams(window.location.search);
  //   const router=useRouter()
  const searchParams = useSearchParams();

  console.log('searchParams.get(org_id)', searchParams.get('org_id'));
  const org_id =
    searchParams.get('org_id') ||
    '2876350533bf401eafebbce9c9aaa642ef61bb561c1e11eea5b3244bfebae8ec';

  useEffect(() => {
    fetchOrgDetails();
  }, []);

  const fetchOrgDetails = async () => {
    try {
      setLoading(true);
      const orgData = await fetch('https://api.trustauthx.com/settings/auth', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'org-id': org_id
        }
      });
      const OrgDataRes = await orgData.json();
      console.log('OrgDataRes ', OrgDataRes);
      setWidget(OrgDataRes?.data?.widget);
    } catch (err) {
      console.log('Error inside fetch orgaization details', err);
    } finally {
      setLoading(false);
    }
  };
  //   const handleGithubClick = () => {
  //     fetch(
  //       'https://api.trustauthx.com/signup/github?org_id=2876350533bf401eafebbce9c9aaa642ef61bb561c1e11eea5b3244bfebae8ec',
  //       {
  //         method: 'GET',
  //         headers: {
  //           accept: 'application/json',
  //           'Access-Control-Expose-Headers': 'Location'
  //         }
  //       }
  //     )
  //       .then(response => {
  //         console.log('res headers are ', response.headers);
  //         return response.json();
  //       })
  //       .then(data => {
  //         console.log(data);
  //       })
  //       .catch(error => {
  //         console.error('error is ', error);
  //       });
  //   };

  const handleSubmit = () => {
    console.log('submit called');
  };
  return (
    <div className="top-1/2 flex justify-center items-center absolute  left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[440px]  bg-white border-2 border-gray-300 rounded-2xl shadow-2xl ">
      <div className="flex flex-col items-center p-[70px] mr-0 !important ">
        <div className="flex flex-col justify-center items-center mt-7">
          <Image
            width={87}
            height={87}
            src={
              widget?.logo_url ||
              'https://flitchcoin.s3.eu-west-2.amazonaws.com/authxlogo.svg'
            }
            alt="AuthX logo"
          />
          <div className="mt-4">
            <span className="text-3xl font-semibold">Trust AUTHX</span>
          </div>
          <div className="mt-4">
            <span className="text-base text-slate-900">
              Continue to Log in to AuthX
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`w-[300px] mt-[60px] flex flex-col items-center`}
        >
          <div className="grid grid-cols-1 w-full">
            <label
              htmlFor="email"
              className={`absolute translate-x-6 translate-y-[-12px] bg-white px-1`}
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              className=" p-1 pl-2.5  h-12 border-2 border-gray-500 bg-white text-gray-900 rounded-lg focus:ring-gray-900 focus:border-gray-900 "
              placeholder="name@example.com"
            />
          </div>
          <div className="w-full mt-12">
            <Button
              style={{
                background: 'black',
                backgroundImage: 'linear-gradient(to right)'
              }}
              className={`w-full h-12 text-white`}
            >
              <span className="ml-6">Go !!</span>
              <ChevronRightIcon className="ml-3" />
            </Button>
          </div>
        </form>
        <div className="flex w-full justify-center mt-[60px]">
          <div className="mt-4 w-[136px] border-t-2 border-gray-900 "></div>
          <span className="p-1"> or </span>
          <div className="mt-4 w-[136px] border-t-2 border-gray-900 "></div>
        </div>
        <div className="flex mt-[60px] px-[6] justify-around">
          <form method="get" action={`${API_DOMAIN}/signup/github`}>
            <Button type="submit">
              <Icons.gitHub className=" h-9 w-9" />
            </Button>
          </form>
          <form method="get" action={`${API_DOMAIN}/signup/github`}>
            <Button type="submit">
              <Icons.gitHub className=" h-9 w-9" />
            </Button>
          </form>
          <form method="get" action={`${API_DOMAIN}/signup/github`}>
            <Button type="submit">
              <Icons.gitHub className=" h-9 w-9" />
            </Button>
          </form>
          <form method="get" action={`${API_DOMAIN}/signup/github`}>
            <Button type="submit">
              <Icons.gitHub className=" h-9 w-9" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
