import { Skeleton } from "@/components/ui/Skeleton"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from '@/components/ui/card';
import { Label } from '@/components/ui/Label';
import { Separator } from '@/components/ui/separator';

export default function SkeletonProfile() {
  return (
    <Card className="border-none shadow-none flex flex-col sm:items-start">
    <CardHeader className="sm:pt-0 flex flex-col sm:items-start">
      <CardTitle>Profile</CardTitle>
      <CardDescription>Make changes to your account.</CardDescription>
    </CardHeader>
    <Separator className="mb-4 sm:ml-6" />
    <CardContent className="space-y-4 w-full">
      <div className="gap-2 flex flex-col items-start w-full">

        <Skeleton className="h-14 w-14 rounded-full bg-slate-300 " />
        
        <div className="flex flex-col flex-wrap sm:flex-row gap-2 w-full items-center">
        <Skeleton className="h-6  w-full sm:w-[60%] bg-slate-300" />
        </div>
      </div>
      <div className="gap-2 flex flex-col items-start ">
        <div className="flex flex-col flex-wrap sm:flex-row gap-2 w-full">
        <Skeleton className="h-4  w-full sm:w-[70%] bg-slate-200" />
        </div>
      </div>
      <div className="gap-2 flex flex-col items-start ">
      <Skeleton className="h-4 w-full sm:w-[50%] sm:max-w-[600px] bg-slate-100" />
      </div>
    </CardContent>
    </Card>
  )
}


