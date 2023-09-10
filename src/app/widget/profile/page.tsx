'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useOrgData } from '../login/widgetStore';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import profileImage from './profile.gif';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PasswordCheck } from '../login/components/PasswodCheck';
import OTPInput from 'react-otp-input';
import { useSearchParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { IoCloudUpload } from 'react-icons/io5';
export default function WidgetProfile() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const getToken = () => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      // split the cookie into name and value
      const [name, value] = cookie.split('=');
      // if the name matches username, return the value
      if (name === code) {
        return value;
      }
    }
  };

  async function getData() {
    try {
      const res = await fetch(
        'https://api.trustauthx.com/user/me/get/user-token?code=19df7eb956a34372ae6a814d81208bff',
        {
          method: 'GET',

          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Access_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiXCJnQUFBQUFCa19NNjNTWWhPT1FxYlEwUVpkWjJMSUhNSEZXNkNQMmZqa1IzWWdLRV9IWS1IOUdZRHJwSnhiRmNCcGg0VXZydFZObUZEVlQ1aTRVa0hCWHI4QUtxRHpfREpWVE9hSGdOQzAwSDhXbVl0RnFTUVpUS05JSmpOaDVZZGQ3RDU3eUhEXzZyM0ZLa09FeGVxcDFENlRsYlQxaWQ0djVRS2EwVGxvdU5kam9LRFFXMTZaMVFVSHg5WERqdXNjdEJ6WDRrYzNTRDd0cXBuLWZlNjdONXRRYVlzbk5WQ25tT3pucV96REhnZEU5NGpqNTViZXVPMHFfZHJsSU9NOThfbjVkMUhzd1l0UE8wcXlyOGNPS2ptU0FxZnp6YlBuQkVoanFPSmlMQmJld1puYU5qTXNadVhmQ3haUFJnaF85VEVlWi1zY3ZjbE56Y01iaDYweWhkYU9JWGVBRTNETWF6UjRFc2N0dXJaQTdzYVg1RVJ6emNJNy03QzE4U04tRFNYOERXLVE1ejRrdEQ4alVBZUZKc0ZiVFNXYXdCMi1ES0JzZ0JEV3lTSXM1QnAxZWlZdWFpeWVMNTlTZG9iNDBEN1NqTkNVOG9ZdnlGRWtCUFZCWUNQTXNZTXZBR3VxLXFZWGZrcEJNRTZGT0JKbUxfdWdDdFJkYWJmS1UxVU4xeFZYbXRFM2xnUnpTMkt3cXh5N2IwNHUyNWVjSTNyaHZjVnFzM1NXQkMxV1J4VlotN1NTYVdhTjh4TWNVVHlqREZVWDRrVkxHZERcIiJ9.x088c6Iraqu6qkQkN7_gZVu2gLHvV7JB0Vn4Pu2vZqE'
          }
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  getData();

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-fit min-h-[80vh] w-[90vw]  md:w-[80vw] lg:w-[70vw] border-2 border-slate-300 rounded-md text-center p-2">
        <div className="flex flex-col justify-center items-start pt-4 px-4">
          <h1 className="text-2xl font-medium">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Make changes to your account
          </p>
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
                value="security"
                className="w-1/2 sm:w-full flex justify-start py-2  data-[state=active]:bg-slate-100 "
              >
                Security
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="sm:w-4/5">
              <Profile />
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

function Profile() {
  type logoImage = string;
  type setLogoImage = (logoImage: string) => void;
  type setLogo = (logo: File | undefined) => void;
  type logo = URL;

  const [logo, setLogo] = useState<string>(
    'https://openauthx.s3.ap-south-1.amazonaws.com/Group+39554+(1).svg'
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [s3ImageUrl, setS3ImageUrl] = useState();
  const [prevLogo, setPrevLogo] = useState<File>();

  // useEffect(()=>{
  // console.log(logo)
  // },[logo])

  const handleLogoInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event.target.files);
    if (event.target.files) {
      setLogo(URL.createObjectURL(event.target.files[0]));
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
              src={logo}
              alt="@shadcn"
              className="w-20 rounded-full"
            />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-wrap sm:flex-row gap-2 w-full items-center">
            <Input
              type="text"
              onChange={e => setLogo(e.target.value)}
              placeholder="Paste Image URL (Optional)"
              className="sm:max-w-[347px] sm:min-w-[367px]"
            />
            <Label
              htmlFor="picture"
              className="text-md font-semibold sm:mx-4 flex items-center justify-center"
            >
              <IoCloudUpload className="w-20 h-20 sm:w-[2.5rem] sm:h-[2.5rem] text-slate-400 cursor-pointer hover:text-slate-600" />
              <Input
                id="picture"
                type="file"
                onChange={handleLogoInput}
                className="sm:max-w-[220px] hidden"
              />
            </Label>

            <Button className="w-full sm:w-[140px] sm:min-w-[140px] ">
              Save Update
            </Button>
          </div>
        </div>
        <div className="gap-2 flex flex-col items-start ">
          <Label htmlFor="username" className="text-md font-semibold">
            Username
          </Label>
          <div className="flex flex-col flex-wrap sm:flex-row gap-2 w-full">
            <Input
              id="username"
              placeholder="username"
              className="sm:max-w-[596px] sm:min-w-[400px]"
            />
            <Button className="w-full sm:w-[140px] sm:min-w-[140px]">
              Save Update
            </Button>
          </div>
        </div>
        <div className="gap-2 flex flex-col items-start ">
          <h2 className="text-md font-semibold">Email</h2>
          <p className="text-muted-foreground">anyone@gmail.com</p>
        </div>
      </CardContent>
      {/* <CardFooter>
      <Button>Save changes</Button>
    </CardFooter> */}
    </Card>
  );
}

function Security() {
  const [pass, setPass] = useState('');
  const [otp, setOtp] = useState('');

  const otpInputStyle = {
    borderRadius: '0.75rem',
    border: '1.3px solid',
    borderColor: `black`,
    // "!w-10 h-10 border bg-transparent text-center rounded-xl"
    background: 'transparent',
    height: '2.2rem',
    width: '2.2rem'
  };
  return (
    <Card className="border-none shadow-none flex flex-col sm:items-start ">
      <CardHeader className="sm:pt-0 flex flex-col sm:items-start">
        <CardTitle>Security</CardTitle>
        <CardDescription>
          Make changes to your account security.
        </CardDescription>
      </CardHeader>
      <Separator className="mb-4  sm:ml-6" />
      <CardContent className="space-y-4 w-full">
        <div className="gap-2 flex flex-col items-start ">
          <Label htmlFor="password" className="text-md font-semibold">
            Password
          </Label>
          <div className="flex flex-col flex-wrap sm:flex-row gap-2 w-full">
            <div>
              <Input
                id="username"
                type="password"
                placeholder="Password"
                className="sm:max-w-[450px] sm:min-w-[400px]"
                onChange={e => setPass(e.target.value)}
              />
              <div className="w-full sm:max-w-[450px] sm:min-w-[400px]">
                <p className="text-left text-muted-foreground">
                  No password is currently set for this account, Set a new
                  password {'(optional)'}
                </p>
                <PasswordCheck pass={pass} />
              </div>
            </div>
            <Button className="w-full sm:w-[140px] sm:min-w-[140px]">
              Save Update
            </Button>
          </div>
        </div>
        <div className="gap-2 flex flex-col sm:items-start ">
          <h2 className="text-md text-left font-semibold">
            Multi Factor authentication
          </h2>
          <div className="flex flex-col sm:items-center flex-wrap sm:flex-row gap-4 w-full">
            <p className="text-left text-muted-foreground">
              Multi Factor authentication {'(MFA)'} is enabled
            </p>
            <Button className="w-full sm:w-[140px] sm:min-w-[140px]">
              Disable MFA
            </Button>
          </div>
          <div className="flex flex-col-reverse flecx-wrap sm:flex-row items-center w-full  p-0 gap-4 sm:gap-20 sm:mt-4">
            <OTPInput
              containerStyle="grid gap-1 w-fit"
              inputStyle={otpInputStyle}
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputType="text"
              renderSeparator={<span></span>}
              renderInput={props => <input {...props} />}
            />
            <QRCodeSVG
              value="kqwhjskqwjhqkwjsh"
              className=" mt-4 sm:mt-0"
              size={140}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
