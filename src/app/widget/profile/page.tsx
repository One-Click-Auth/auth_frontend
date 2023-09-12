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
import { useOrgData, OrgData, UserProfileData, useUserProfileData,  useProfileStore, useSecurityStore  } from '../login/widgetStore';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import profileImage from './profile.gif';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PasswordCheck } from '../login/components/PasswodCheck';
import OTPInput from 'react-otp-input';
import { useSearchParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { IoCloudUpload } from 'react-icons/io5';
import { create } from 'zustand';
import { toast, useToast } from '@/components/ui/use-toast';
import SkeletonProfile from './profileSkeleton';
import Spinner from '@/components/spinner';

type UseToken = {
  user_token: string,
  set_user_token:(token:string)=>void
}

const useToken = create<UseToken>((set) => ({
  user_token: '',
  set_user_token: (token:string) => set(() => ({ user_token: token}))
}))

//profile image
//username
//password
//mfa


export default function WidgetProfile() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const org_id = searchParams.get('org_id');
  const redirect_url = searchParams.get('redirect_url');


  const set_user_token = useToken(state=>state.set_user_token);
  const user_token = useToken(state=>state.user_token);
   //to fetch the org token from the store
   const storeOrg_token = useOrgData(state => state.org_token);
   //to fetch the org data from the store
   const storeOrgData = useOrgData(state => state.data);
   //to set the org Data
  const setOrgData = useOrgData(state => state.setOrgData);
  const setUserData = useUserProfileData(state => state.setProfileData);
  const UserData = useUserProfileData(state => state.data);
  const { username, image,email, setUsername, setImage,  setEmail, } = useProfileStore();
  const {password, mfa, setPassword, setMfa} =  useSecurityStore();
  const [loading1, setLoading1] = useState(true)



  const {toast} = useToast();

  
  useEffect(()  => {
     fetchOrgDetails()
     .then(()=> getUserToken())
     .then(()=>getUserData())
     .then(()=>setLoading1(false))
     .catch(error=>{
      const errMsg = (error as Error).message;
      toast({
        title:'Error!',
        description: `${errMsg}`,
        variant: 'destructive'
      });
      return;
     })
  },[])

  function fetchOrgDetails() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `https://api.trustauthx.com/settings/auth?org_id=${org_id}`,
          {
            method: 'GET'
          }
        );
  
        if (response.status === 406) {
       
          reject('Something went wrong');
          
        }
  
        if (response.status === 200) {
          const orgData = (await response.json()) as OrgData;
          const { org_token, ...rest } = orgData;
          const data = rest.data;
  
          //store the org token and data from the response to the zustand store
          setOrgData(org_token, data);
          
          resolve(true);
          
        }
      } catch (error) {
        const errMsg = (error as Error).message;
        reject(errMsg);
      }
    });
  }
  

  const getAccessToken = () :string => {
    const cookies = document.cookie.split(';');
    let token = '';
    for (const cookie of cookies) {
      // split the cookie into name and value
      const [key, value] = cookie.split('=');
      // if the key matches code, return the value
      if (key === code) {
        token = value;
      }
    }
    return token;
  };

function getUserToken() {
  const token = getAccessToken();
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `https://api.trustauthx.com/user/me/get/user-token?code=${code}`,
          {
            method: 'GET',
  
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json',
              Access_token:token
               
            }
          }
        );
        const data  = await response.json() as string
        set_user_token(data);
        resolve(true);
      } catch (error) {
        console.log(error);
        const errMsg = (error as Error).message; 
        reject(errMsg);
      }

    })
   
  }

 function getUserData(){
  return new Promise(async (resolve, reject)=>{

    try {
      const response = await fetch(`https://api.trustauthx.com/user/me/auth/data?userToken=${user_token}`,{
        method:'GET',
        headers:{
          accept: 'application/json'
        }
      })

      const userData = await response.json() as UserProfileData

       setUsername(userData.data.partner.org_id.full_name);
       setImage(userData.data.partner.org_id.img);
       setEmail(userData.email);
       setPassword(userData.data.partner.org_id.password)
       setMfa(userData.data.partner.org_id.fa2)
       setUserData(userData);
       resolve(true)
      
      
    } catch (error) {
      const errMsg = (error as Error).message;
      reject(errMsg)
    }
  })
  
  }

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
                disabled = {loading1}
                value="security"
                className="w-1/2 sm:w-full flex justify-start py-2  data-[state=active]:bg-slate-100 "
              >
                Security
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="sm:w-4/5">
              {loading1? <SkeletonProfile/>: <Profile />}
              
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



//Profile Component
function Profile() {
  type logoImage = string;
  type setLogoImage = (logoImage: string) => void;
  type setLogo = (logo: File | undefined) => void;
  type logo = URL;
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const org_id = searchParams.get('org_id');
  const redirect_url = searchParams.get('redirect_url');


  //from widget store
  const setOrgData = useOrgData(state => state.setOrgData);
  const setUserData = useUserProfileData(state => state.setProfileData);
  const userData = useUserProfileData(state => state.data);

  const userPartnerdata = userData.data.partner.org_id
  //created in this file only
  const user_token = useToken(state=>state.user_token);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);

  const [s3ImageUrl, setS3ImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File>();
  const [imagePrev, setImagePrev] = useState<string>('')
  const [imageUrl, setImageUrl] = useState('')
  const { username, image,email, setUsername, setImage,  setEmail } = useProfileStore();

  function getUserData(){
    return new Promise(async (resolve, reject)=>{
  
      try {
        const response = await fetch(`https://api.trustauthx.com/user/me/auth/data?userToken=${user_token}`,{
          method:'GET',
          headers:{
            accept: 'application/json'
          }
        })
  
        const userData = await response.json() as UserProfileData
  
         setUsername(userData.data.partner.org_id.full_name);
         setImage(userData.data.partner.org_id.img);
         setEmail(userData.email);
         setUserData(userData);
         resolve(true)
        
        
      } catch (error) {
        const errMsg = (error as Error).message;
        reject(errMsg)
      }
    })
    
    }


 async function updateUsername(){
  if(username.length === 0 || username === 'None'){
    toast({
      variant:'destructive',
      title:'Error!',
      description:`please put a username`
    })
    return;
  }
  setLoading2(true)
  try {
    const response = await fetch(`https://api.trustauthx.com/user/me/widget/settings?full_name=${username}&&code=${code}&&Access_token=${user_token}&&redirect_url=${redirect_url}`,{
      method:'GET',
      headers:{
        'content-type':'application/json',
        accept:'application/json'
      }
    })
    if(response.status === 307 || response.status === 200){
      toast({
        variant:'success',
        title:'Success!',
        description:'Profile Updated successfully'
      })
    setLoading2(false)
    await getUserData();
    return;
    }
    setLoading2(false)
    return;
  } catch (error) {
    console.log(error)
    const errMsg = (error as Error).message;
    toast({
      variant:'destructive',
      title:'Error!',
      description:`${errMsg}`
    })
    setLoading2(false)

  }
 } 
 //to save profile image
 async function updateProfileImage(){
  setLoading1(true);   
  try {
    if(!imageFile){
      if(imageUrl){
        setImage(imageUrl)
      }
      else{
        toast({
          variant:'destructive',
          title:'Error!',
          description:`Please add a file or URL first`
        })
      setLoading1(false);   

        return;
      }  
    }else{
      await uploadImageToS3();
    } 
    const response = await fetch(`https://api.trustauthx.com/user/me/widget/settings?img=${image}&&code=${code}&&Access_token=${user_token}&&redirect_url=${redirect_url}`,{
      method:'GET',
      headers:{
        'content-type':'application/json',
        accept:'application/json'
      }
    })
    if(response.status === 307 || response.status === 200){
      toast({
        variant:'success',
        title:'Success!',
        description:'Profile picture updated successfully'
      })
      setLoading1(false)
      await getUserData();
      return
    }
    return;
  } catch (error) {
    console.log(error)
    const errMsg = (error as Error).message;
    toast({
      variant:'destructive',
      title:'Error!',
      description:`${errMsg}`
    })
    setLoading1(false)
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
      ).catch(err => console.log(err));
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
        throw new Error('some error occured with the request')
      });

      if (res?.status === 200) {
        const imageUrl = url.split('?')[0];
        setImage(imageUrl);
      }

      if (res?.status === 500 || res?.status === 404) {
      throw new Error('some error occured with request')
      }
    }
  } catch (error) {
    throw new Error('some error occured with request')
  }
}

  const handleImageInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setImageFile(event.target.files[0]);
      setImage(URL.createObjectURL(event.target.files[0]))
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
              src={image?image:'https://openauthx.s3.ap-south-1.amazonaws.com/Group+39554+(1).svg'}
              alt="@shadcn"
              className="w-20 rounded-full"
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

            <Button variant={'black'} className="w-full sm:w-[140px] sm:min-w-[140px]"  disabled={loading1} onClick={updateProfileImage}>
              {loading1? <div className='flex gap-2 items-center text-gray-400'>
                <Spinner size={15} color='gray'/><span>...saving</span>
              </div>: 'Save Update '}  
            </Button>
          </div>
        </div>
        <div className="gap-2 flex flex-col items-start ">
          <Label htmlFor="username" className="text-md font-semibold">
            Username
          </Label>
          <div className="flex flex-col flex-wrap sm:flex-row gap-2 w-full">
            <Input
              value={username==='None'?'':username}
              onChange={(e)=>setUsername(e.target.value)}
              id="username"
              placeholder="username"
              className="sm:max-w-[480px] sm:min-w-[400px]"
            />
            <Button variant={'black'} className="w-full sm:w-[140px] sm:min-w-[140px]" onClick={updateUsername}>
            {loading2? <div className='flex gap-2 items-center text-gray-400'>
                <Spinner size={15} color='gray'/><span>...saving</span>
              </div>: 'Save Update '} 
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

//Security Component
function Security() {
  const user_token = useToken(state=>state.user_token);
  const [pass, setPass] = useState('');
  const [otp, setOtp] = useState('');
  const {password, mfa, setPassword, setMfa} =  useSecurityStore();


  const otpInputStyle = {
    borderRadius: '0.5rem',
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
              value="https://kqwhjskqwjhqkwjshedwqed=wswq"
              className=" mt-4 sm:mt-0"
              size={120}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
