'use client';

import { use, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { useRouter } from 'next/navigation';

// import sample from './data.json';
import useOrgData from '../orgDataStore';

export const OrgTable = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [orgList, setOrgList] = useState<object[]>([]);

  console.log(orgList);
  const data = useOrgData(state => state.data);
  const setManageOrg = useOrgData(state => state.setManageOrg);
  const manageOrg = useOrgData(state => state.manageOrg);
  const setManageOrgData = useOrgData(state => state.setManageOrgData);

  const handleManageOrg = (id: string) => {
    setManageOrg(id);
    setManageOrgData(data.find(org => org.org_id === id) || {});
    router.push('/dashboard/apple');
  };

  console.log(manageOrg);
  useEffect(() => {
    if (data.length > 0) {
      setOrgList(data);
      setLoading(false);
    }
  }, [data]);

  const getDate = (timestamp: number) => {
    timestamp = timestamp * 1000; // Convert to milliseconds
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth(); // Months are zero-based, so we add 1
    const day = date.getDate();
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    const monthName = monthNames[month];
    return String(day) + '-' + monthName + '-' + String(year);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="W-[200px]"></TableHead>
          <TableHead>Organization</TableHead>
          <TableHead>Organization Name</TableHead>
          <TableHead>Organization Id</TableHead>
          <TableHead>Plan validity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <>
            {[1, 2, 3].map(el => (
              <TableRow key={el}>
                <TableCell>
                  <Skeleton className="bg-gray-400 h-10 w-[150px] my-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="bg-gray-400 h-6 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="bg-gray-400 h-6 w-full " />
                </TableCell>
                <TableCell>
                  <Skeleton className="bg-gray-400 h-6 w-full " />
                </TableCell>
                <TableCell>
                  <Skeleton className="bg-gray-400 h-6 w-full" />
                </TableCell>
              </TableRow>
            ))}
          </>
        ) : (
          data.map(org => (
            <TableRow key={org.org_id}>
              <TableCell className="py-[1.2rem] mr-2">
                <Button
                  className="px-10 py-2 bg-[#4338CA] text-white rounded-sm hover:bg-black hover:text-white"
                  onClick={() => handleManageOrg(org.org_id)}
                >
                  Manage
                </Button>
              </TableCell>
              <TableCell className="flex flex-row items-center">
                <Avatar className="my-2">
                  <AvatarImage
                    src={org.widget.logo_url || `https://github.com/shadcn.png`}
                    alt="@shadcn"
                  />
                  <AvatarFallback>Logo</AvatarFallback>
                </Avatar>
                <span className="ml-2">{org.name}</span>
              </TableCell>
              {}
              <TableCell>
                <Badge className="bg-[#EEE]" variant="secondary">
                  {org.name}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-[#EEE]" variant="secondary">
                  <p className="truncate w-[100px] hover:text-clip">
                    {org.org_id}
                  </p>
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-[#EEE]" variant="secondary">
                  {getDate(org.validity)}
                </Badge>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
