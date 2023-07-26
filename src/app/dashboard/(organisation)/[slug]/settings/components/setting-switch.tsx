'use client';

import { Switch } from '@/components/ui/Switch';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useAuth } from '@/Providers/AuthContext';
import { Organization } from '@/app/dashboard/orgDataStore';
import { useToast } from '@/components/ui/use-toast';
import { getOrgData } from '@/lib/utils';
import { PartialOrg } from '@/types';

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
  disabled?: boolean;
  name: string;
};

export function SettingSwitch({ id, disabled = false, name }: SwitchProps) {
  const { token } = useAuth();
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: queryData } = useQuery({
    queryKey: ['orgData', slug],
    queryFn: () => getOrgData(slug, token)
  });

  const updateHandler = async (status: { [key: string]: boolean }) => {
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
      await queryClient.cancelQueries({ queryKey: ['orgData', slug] });
      // Prev state snapshot
      const prevState = queryClient.getQueryData(['orgData', slug]);
      // Optimistically Update
      queryClient.setQueryData<PartialOrg>(['orgData', slug], oldData => ({
        ...oldData,
        ...updateState
      }));
      console.log(queryClient.getQueryData(['orgData', slug]));
      return { prevState };
    },
    onError: (err, newState, context) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
      queryClient.setQueryData(['orgData', slug], context?.prevState);
    },
    onSuccess: () => {
      const stateData = queryClient.getQueryData<PartialOrg>(['orgData', slug]);
      console.log(stateData);
      toast({
        title: 'Updated!',
        description: `${name} setting ${
          stateData?.[id] === true ? 'enabled' : 'disabled'
        }`
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['orgData', slug]);
    }
  });

  return (
    <Switch
      checked={queryData?.[id]}
      disabled={disabled}
      onCheckedChange={() => mutation.mutate({ [id]: !queryData?.[id] })}
    />
  );
}
