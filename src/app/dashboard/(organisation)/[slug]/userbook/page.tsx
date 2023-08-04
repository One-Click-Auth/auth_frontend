'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/Skeleton';
import { getDate } from '@/helper/getDate';
import { useAuth } from '@/Providers/AuthContext';
import { Switch } from '@/components/ui/Switch';
import { Loader } from 'lucide-react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Button } from '@/components/ui/Button';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/Input';
import { useParams } from 'next/navigation';

interface User {
  email: string;
  s: boolean;
  ts: number;
  loading: boolean;
}

const Users: React.FC = () => {
  const SkeletonStyles = 'bg-gray-400 h-6 w-full';

  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState<User[]>([]);
  const org_id = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Number of items to show per page

  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${token}`
  };

  const getData = () => {
    fetch(
      `https://api.trustauthx.com/org/all/users?org_id=${org_id.slug}&start=${
        (currentPage - 1) * itemsPerPage
      }&limit=${itemsPerPage}`,
      {
        method: 'GET',
        headers: headers
      }
    )
      .then(res => res.json())
      .then(data => {
        const fetchedUsers = data as [User[]];
        const updatedUserList = fetchedUsers[0].map((user: User) => ({
          ...user,
          loading: false
        }));
        setUserList(updatedUserList);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (user: User) => {
    const updatedUserList = userList.map((u: User) =>
      u.email === user.email ? { ...u, loading: true } : u
    );
    setUserList(updatedUserList);
    const reqBody = JSON.stringify({
      email: user.email,
      is_ban: user.s,
      org_id: org_id.slug
    });
    fetch('https://api.trustauthx.com/org/forbid/user', {
      method: 'POST',
      headers: headers,
      body: reqBody
    })
      .then(response => response.json())
      .then(result => {
        getData();
        return result;
      })
      .catch(error => {
        console.log('error', error);
      })
      .finally(() => {
        const updatedUserList = userList.map((u: User) => ({
          ...u,
          loading: false
        }));
        setUserList(updatedUserList);
      });
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  const columns: ColumnDef<{
    s: boolean;
    ts: number;
    email: string;
    loading: boolean;
  }>[] = [
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase text-black">{row.getValue('email')}</div>
      )
    },
    {
      accessorKey: 's',
      header: 'Status',
      cell: ({ row }) => (
        <div className="capitalize ">
          {row.getValue('s') === true ? (
            <p className="text-green-500">Active</p>
          ) : (
            <p className="text-red-500">Banned</p>
          )}
        </div>
      )
    },

    {
      accessorKey: 'ts',
      header: ({ column }) => {
        return (
          <div
            className="capitalize"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Time
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{getDate(row.getValue('ts'))}</div>
      )
    },
    {
      id: 'actions',
      enableHiding: false,
      header: ({ column }) => {
        return (
          <div
            className="capitalize"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Ban/Unban
          </div>
        );
      },
      cell: ({ row }) => {
        interface User {
          loading: boolean;
          email: string;
          s: boolean;
          ts: number;
        }
        const user: User = row.original;
        return (
          <>
            {user.loading ? (
              <Loader className="w-5 h-5  animate-spin" />
            ) : (
              <Switch
                checked={user.s}
                onClick={() => handleChange(user)}
                className="data-[state=checked]:bg-green-400 data-[state=unchecked]:bg-red-500 duration-300"
              />
            )}
          </>
        );
      }
    }
  ];
  const table = useReactTable({
    data: userList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="border-2 rounded-xl overflow-hidden ">
        <Table className="max-h-screen h-full rounded-xl ">
          <TableHeader className="sticky top-0 bg-gray-100 z-50">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {loading ? (
            <TableBody>
              {[1, 2, 3].map(el => (
                <TableRow key={el}>
                  <TableCell>
                    <Skeleton className="bg-gray-400 h-10 w-[150px] my-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className={SkeletonStyles} />
                  </TableCell>
                  <TableCell>
                    <Skeleton className={SkeletonStyles} />
                  </TableCell>
                  <TableCell>
                    <Skeleton className={SkeletonStyles} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>

      <div className="flex items-center justify-start space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={userList.length < itemsPerPage} // Disable the "Next" button if there are no more items to show
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default Users;
