'use client';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  useOrgData,
  OrgData,
  UserProfileData,
  useUserProfileData,
  useProfileStore,
  useSecurityStore,
  useToken
} from '../login/widgetStore';

import { ScrollArea } from '@/components/ui/scroll-area';
import { redirect, useSearchParams } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';
import SkeletonProfile from './profileSkeleton';
import Profile from './ProfileTab';
import Security from './SecurityTab';
import { getAccessToken } from './utils';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

export default function WidgetProfile() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const org_id = searchParams.get('org_id');
  const redirect_url = searchParams.get('redirect_url');
  // const ac_token = searchParams.get('ac');

  const { set_user_token, user_token } = useToken();
  const setOrgData = useOrgData(state => state.setOrgData);
  const storeOrgData = useOrgData(state => state.data);
  const setUserData = useUserProfileData(state => state.setProfileData);
  const UserData = useUserProfileData(state => state.data);
  const { username, image, email, setUsername, setImage, setEmail } =
    useProfileStore();
  const { password, mfa, setPassword, setMfa } = useSecurityStore();
  const [loading1, setLoading1] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    console.log('USER TOKEN UPDATED BY zustand', user_token);
  }, [user_token]);

  // useEffect(() => {
  //   fetchOrgDetails()
  //     .then(() => getUserToken())
  //     .then(userToken => getUserDetails(userToken))
  //     .then(() => setLoading1(false))
  //     .catch(error => {
  //       const errMsg = (error as Error).message;
  //       toast({
  //         title: 'Error!',
  //         description: `${errMsg}`,
  //         variant: 'destructive'
  //       });
  //       return;
  //     });
  // }, []);

  async function fetchOrgDetails() {
    try {
      const response = await fetch(
        `https://api.trustauthx.com/settings/auth?org_id=${org_id}`,
        {
          method: 'GET'
        }
      );

      if (response.status === 406) {
        throw new Error('Some error occured with the request');
      }

      if (response.status === 200) {
        const orgData = (await response.json()) as OrgData;
        const { org_token, ...rest } = orgData;
        const data = rest.data;

        //store the org token and data from the response to the zustand store
        setOrgData(org_token, data);
        return;
      }
    } catch (error) {
      const errMsg = (error as Error).message;
      throw new Error(errMsg);
    }
  }

  async function getUserToken() {
    const token = getAccessToken(code ? code : '');

    try {
      const response = await fetch(
        `https://api.trustauthx.com/user/me/get/user-token?code=${code}&Access_token=${token}`,
        {
          method: 'GET',

          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }
      );
      if (response.status === 406) {
        throw new Error('Some error occured with the request');
      }
      const data = (await response.json()) as string;
      set_user_token(data);
      return data;
    } catch (error) {
      console.log(error);
      const errMsg = (error as Error).message;
      throw new Error(errMsg);
    }
  }
  async function getUserDetails(userToken: string) {
    try {
      const response = await fetch(
        `https://api.trustauthx.com/user/me/auth/data?UserToken=${userToken}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json'
          }
        }
      );

      const userData = (await response.json()) as UserProfileData;
      const org_id = Object.keys(userData.data.partner)[0];
      console.log(userData.data.partner[org_id]);
      setUserData(userData);
      setUsername(userData.data.partner[org_id].full_name);
      setImage(userData.data.partner[org_id].img);
      setEmail(userData.email);
      setPassword(userData.data.partner[org_id].password);
      setMfa(userData.data.partner[org_id].fa2);

      return;
    } catch (error) {
      const errMsg = (error as Error).message;
      console.log(error);
      throw new Error(errMsg);
    }
  }
  function returnToOrg() {
    return router.push(
      `https://api.trustauthx.com/user/me/widget/settings?code=${code}&UserToken=${user_token}&redirect_url=${redirect_url}`
    );
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-fit min-h-[80vh] w-[90vw]  md:w-[80vw] lg:w-[70vw] border-2 border-slate-300 rounded-md text-center p-2">
        <div className="flex  flex-col-reverse sm:flex-row   sm:justify-between">
          <div className="flex flex-col justify-center items-start pt-4 px-4">
            <h1 className="text-2xl font-medium">Settings</h1>
            <p className="text-sm text-muted-foreground">
              Make changes to your account
            </p>
          </div>
          <button
            className="flex flex-row items-center gap-1 group"
            onClick={returnToOrg}
          >
            <IoArrowBackOutline
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Return to {storeOrgData.widget.name}</span>
            <Avatar>
              <AvatarImage
                src={storeOrgData.widget.logo_url}
                alt="@shadcn"
                className="w-8 rounded-full"
              />
              <AvatarFallback>Logo</AvatarFallback>
            </Avatar>
          </button>
        </div>
        <Separator className="my-4" />
        <ScrollArea className="h-[70vh]">
          <Tabs
            defaultValue="profile"
            className="w-full flex flex-col sm:flex-row sm:h-full"
          >
            <TabsList className="bg-transparent flex flex-row sm:flex-col justify-start items-start h-10 sm:h-full sm:w-1/5 sm:pr-4 ">
              <TabsTrigger
                value="profile"
                className="w-1/2 sm:w-full flex justify-start py-2  data-[state=active]:bg-slate-100  sm:mb-4"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                disabled={loading1}
                value="security"
                className="w-1/2 sm:w-full flex justify-start py-2  data-[state=active]:bg-slate-100 "
              >
                Security
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="sm:w-4/5">
              {loading1 ? <SkeletonProfile /> : <Profile />}
            </TabsContent>
            <TabsContent value="security" className="sm:w-4/5">
              <Security />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
    </div>
  );
}
