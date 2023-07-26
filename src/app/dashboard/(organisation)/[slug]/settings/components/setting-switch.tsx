'use client';

import { Switch } from '@/components/ui/Switch';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Organization } from '@/app/dashboard/orgDataStore';

type PartialOrg = Partial<Organization>;
type SwitchProps = {
  id:
    | 'passwordless'
    | 'DDoS'
    | 'bot_det'
    | 'brute_force'
    | 'breach_pass_det'
    | 'fa2'
    | 'consent'
    | 'callbacks';
  // | 'rtm';
};

export function SettingSwitch({ id }: SwitchProps) {
  const { token } = useAuth();
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const { data: queryData, isSuccess } = useQuery({
    queryKey: ['settings', slug, id],
    queryFn: async () => {
      const res = await fetch(`https://api.trustauthx.com/org/${slug}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = (await res.json()) as PartialOrg;
      return data;
    }
  });

  const updateHandler = async (status : { [key: string]: boolean }) => {
    const res = await fetch(`https://api.trustauthx.com/org/${slug}`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...status })
    });
    const data = await res.json();
    console.log('Updated', data);
    return data;
  };

  const mutation = useMutation({
    mutationFn: updateHandler,
    onMutate: async updateState => {
      await queryClient.cancelQueries({ queryKey: ['settings', slug, id] });
      // Prev state snapshot
      const prevState = queryClient.getQueryData(['settings', slug, id]);
      // Optimistically Update
      queryClient.setQueryData<PartialOrg>(['settings', slug, id], oldData => ({
        ...oldData,
        ...updateState
      }));
      console.log(queryClient.getQueryData(['settings', slug, id]))
      return { prevState };
    },
    onError: (err, newState, context) => {
      queryClient.setQueryData(['settings', slug, id], context?.prevState);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['settings', slug, id]);
    }
  });

  if (isSuccess) {
    console.log('Query', queryData[id]);
  }

  return (
    <Switch
      checked={queryData?.[id]}
      onCheckedChange={() =>
        mutation.mutate({ [id]: !queryData?.[id] })
      }
    />
  );
}
