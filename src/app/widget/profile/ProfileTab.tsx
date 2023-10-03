'use client';
import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

import { Separator } from '@/components/ui/separator';
import {
  useUserProfileData,
  useProfileStore,
  useToken
} from '../login/widgetStore';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

import { useSearchParams } from 'next/navigation';
import { IoCloudUpload } from 'react-icons/io5';
import { useToast } from '@/components/ui/use-toast';
import Spinner from '@/components/spinner';

//Profile Component
export default function Profile() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const org_id = searchParams.get('org_id');
  const redirect_url = searchParams.get('redirect_url');

  //from widget store
  // const setOrgData = useOrgData(state => state.setOrgData);
  const setUserData = useUserProfileData(state => state.setProfileData);
  const userData = useUserProfileData(state => state.data);
  const { set_user_token, user_token } = useToken();

  const [loading1, setLoading1] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState('');
  const { username, image, email, setUsername, setImage, setEmail } =
    useProfileStore();

  //to update username
  async function updateUsername() {
    if (username.length === 0 || username === 'None') {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: "please put a username first"
      });
      return;
    }
    setLoading2(true);
    try {
      const response = await fetch(
        `https://api.trustauthx.com/user/me/auth?UserToken=${user_token}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Upd: {
              full_name: username
            }
          })
        }
      );
      const data = (await response.json()) as {
        detail?: string;
        user_token: string;
      };

      const token = data.user_token;
      if (token) {
        // console.log(data, data.user_token);
        set_user_token(token);
      }
      if (data.detail) {
        toast({
          title: 'Error',
          description: data.detail,
          variant: 'destructive'
        });
        setLoading2(false);
        return;
      }
      if (response.status === 200) {
        toast({
          variant: 'success',
          title: 'Success!',
          description: 'Username Updated successfully'
        });
        setLoading2(false);
        // getUserData();
        return;
      } else if (response.status !== 200) {
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: "Some error occured with the request"
        });
        setLoading2(false);
        return;
      }
    } catch (error) {
      console.log(error);
      const errMsg = (error as Error).message;
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: `${errMsg}`
      });
      setLoading2(false);
      return;
    }
  }
  //to save profile image
  async function handleImageUpdate() {
    setLoading1(true);
    if (!imageFile) {
      if (imageUrl) {
        updateImage(imageUrl);
        return;
      } else {
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: "Please add a file or URL first"
        });
        setLoading1(false);
        return;
      }
    } else {
      uploadImageToS3()
        .then(imageUrl => {
          if (imageUrl) {
            updateImage(imageUrl);
          }
        })
        .catch(error => {
          toast({
            variant: 'destructive',
            title: 'Error!',
            description: error
          });
          setLoading1(false);
          return;
        });
      return;
    }
  }

  async function uploadImageToS3() {
    // Check filename extension
    try {
      if (imageFile) {
        const splitName = imageFile?.name.split('.');
        const fileExtension = splitName?.slice(-1);
        const contentType =
          fileExtension[0] === 'svg' ? 'image/svg+xml' : 'image/*';

        // Fetch Upload url
        const response = await fetch(
          `/api/preSignedUrl?fileName=${imageFile?.name}`
        );
        const data = await response?.json();
        const { url } = data as { url: string };
        // PUT file to s3 bucket
        const res = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': contentType
          },
          body: imageFile
        }).catch(err => {
          console.log(err);
          throw new Error('some error occured with the request');
        });

        if (res.status === 200) {
          const imageUrl = url.split('?')[0];
          return imageUrl;
        }

        if (res?.status === 500 || res?.status === 404) {
          throw new Error('some error occured with request');
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error('some error occured with request');
    }
  }
  //request to save image
  async function updateImage(url: string) {
    try {
      const response = await fetch(
        `https://api.trustauthx.com/user/me/auth?UserToken=${user_token}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Upd: {
              img: url
            }
          })
        }
      );
      const data = (await response.json()) as {
        detail?: string;
        user_token: string;
      };
      setLoading1(false);
      if (data.user_token) {
        // console.log(data, data.user_token);
        set_user_token(data.user_token);
      }
      if (data.detail) {
        toast({
          title: 'Error',
          description: data.detail,
          variant: 'destructive'
        });
      }
      if (response.status === 200) {
        toast({
          variant: 'success',
          title: 'Success!',
          description: 'Profile picture updated successfully'
        });
        // getUserData();
        return;
      }
      return;
    } catch (error) {
      console.log(error);
      const errMsg = (error as Error).message;
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: `${errMsg}`
      });
      setLoading1(false);
      return;
    }
  }

  const handleImageInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setImageFile(event.target.files[0]);
      setImage(URL.createObjectURL(event.target.files[0]));
    }
    // uploadImageToS3()
  };

  return (
    <Card className="border-none shadow-none flex flex-col sm:items-start">
      <CardHeader className="sm:pt-0 flex flex-col sm:items-start">
        <CardTitle>Profile</CardTitle>
        <CardDescription>Make changes to your account.</CardDescription>
      </CardHeader>
      <Separator className="mb-4 sm:ml-6" />
      <CardContent className="space-y-4 w-full">
        <div className="gap-2 flex flex-col items-start w-full">
          <h2 className="text-md font-semibold">Profile Picture</h2>
          <Avatar>
            <AvatarImage
              src={
                image
                  ? image
                  : 'https://openauthx.s3.ap-south-1.amazonaws.com/Group+39554+(1).svg'
              }
              alt="@shadcn"
              className="w-20 h-20 overflow-hidden rounded-full"
            />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-wrap sm:flex-row gap-2 w-full items-center">
            <Input
              type="text"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="Paste Image URL (Optional)"
              className="sm:max-w-[347px] sm:min-w-[400px]"
            />
            <Label
              htmlFor="picture"
              className="text-md font-semibold sm:mx-4 flex items-center justify-center"
            >
              <IoCloudUpload className="w-20 h-20 sm:w-[2.5rem] sm:h-[2.5rem] text-slate-400 cursor-pointer hover:text-slate-600" />
              <Input
                id="picture"
                type="file"
                onChange={handleImageInput}
                className="sm:max-w-[220px] hidden"
              />
            </Label>

            <Button
              variant={'black'}
              className="w-full sm:w-[140px] sm:min-w-[140px]"
              disabled={loading1}
              onClick={handleImageUpdate}
            >
              {loading1 ? (
                <div className="flex gap-2 items-center text-gray-400">
                  <Spinner size={15} color="gray" />
                  <span>...saving</span>
                </div>
              ) : (
                'Save Update '
              )}
            </Button>
          </div>
        </div>
        <div className="gap-2 flex flex-col items-start ">
          <Label htmlFor="username" className="text-md font-semibold">
            Username
          </Label>
          <div className="flex flex-col flex-wrap sm:flex-row gap-2 w-full">
            <Input
              value={username === 'None' ? '' : username}
              onChange={e => setUsername(e.target.value)}
              id="username"
              placeholder="username"
              className="sm:max-w-[480px] sm:min-w-[400px]"
            />
            <Button
              variant={'black'}
              className="w-full sm:w-[140px] sm:min-w-[140px]"
              onClick={updateUsername}
            >
              {loading2 ? (
                <div className="flex gap-2 items-center text-gray-400">
                  <Spinner size={15} color="gray" />
                  <span>...saving</span>
                </div>
              ) : (
                'Save Update '
              )}
            </Button>
          </div>
        </div>
        <div className="gap-2 flex flex-col items-start ">
          <h2 className="text-md font-semibold">Email</h2>
          <p className="text-muted-foreground">{email}</p>
        </div>
      </CardContent>
    </Card>
  );
}
