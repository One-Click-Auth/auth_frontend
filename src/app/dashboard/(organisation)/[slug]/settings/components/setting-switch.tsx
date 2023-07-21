'use client';

import { Switch } from '@/components/ui/Switch';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Organization } from '@/app/dashboard/orgDataStore';

export function SettingSwitch() {
  const { token } = useAuth();
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const { data: queryData, isSuccess } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await fetch(`https://api.trustauthx.com/org/${slug}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = (await res.json()) as Organization;
      return data;
    }
  });

  const updateHandler = async ({ passwordless }: { passwordless: boolean }) => {
    const res = await fetch(`https://api.trustauthx.com/org/${slug}`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ passwordless })
    });
    const data = await res.json();
    console.log(JSON.stringify({ passwordless }));
    console.log('Updated', data);
    return data;
  };

  const mutation = useMutation({
    mutationFn: updateHandler,
    onMutate: async updateState => {
      await queryClient.cancelQueries({ queryKey: ['settings'] });
      // Prev state snapshot
      const prevState = queryClient.getQueryData(['settings']);
      // Optimistically Update
      queryClient.setQueryData(['settings'], (oldData: any) => ({
        ...oldData,
        ...updateState
      }));
      return { prevState };
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries(['settings']);
    //   queryClient.setQueryData(['settings'], (oldData: any) => ({
    //     ...oldData,
    //     passwordless: !oldData.passwordless
    //   }));
    // },
    onError: (err, newState, context) => {
      queryClient.setQueryData(['settings'], context?.prevState);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['settings']);
    }
  });

  if (isSuccess) {
    console.log('Query', queryData);
  }

  return (
    <Switch
      checked={queryData?.passwordless}
      onCheckedChange={() =>
        mutation.mutate({ passwordless: !queryData?.passwordless })
      }
    />
  );
}
