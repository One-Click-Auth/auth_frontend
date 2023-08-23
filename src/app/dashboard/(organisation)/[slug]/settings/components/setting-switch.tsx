'use client';

import { Switch } from '@/components/ui/Switch';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useAuth } from '@/Providers/AuthContext';
import { Organization } from '@/app/dashboard/orgDataStore';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
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
    | 'callbacks'
    | 'email_val'
    | 'ipat'
    | 'social_sign'
    | 'custom_email'
    | 'rtm';
  disabled?: boolean;
  name: string;
  price: string | null;
};

export function SettingSwitch({
  id,
  disabled = false,
  name,
  price
}: SwitchProps) {
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

    // console.log('Updated', data);
    if (res.status === 405) {
      const data = (await res.json()) as { detail: string };
      throw new Error(data.detail);
    }
    const data = await res.json();
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
      // console.log(queryClient.getQueryData(['orgData', slug]));
      return { prevState };
    },
    onError: (err: Error, newState, context) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: err.message
      });
      queryClient.setQueryData(['orgData', slug], context?.prevState);
    },
    onSuccess: () => {
      const stateData = queryClient.getQueryData<PartialOrg>(['orgData', slug]);
      toast({
        title: 'Updated!',
        description: `${name} setting ${
          stateData?.[id] === true ? 'enabled' : 'disabled'
        }`,
        variant: 'success'
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['orgData', slug]);
    }
  });

  // return (
  //   <Switch
  //     checked={queryData?.[id]}
  //     disabled={disabled}
  //     onCheckedChange={() => mutation.mutate({ [id]: !queryData?.[id] })}
  //   />
  // );
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-transparent" asChild>
        <Switch
          className={`${queryData?.[id] ? 'bg-black' : 'bg-slate-300'}`}
          checked={queryData?.[id]}
          disabled={disabled}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          {/* <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle> */}
          <AlertDialogDescription className="leading-relaxed">
            {queryData?.[id] ? (
              `Are you sure you want to disable ${name}?`
            ) : (
              <div>
                {`Are you sure you want enable ${name}? `}
                <p>
                  {price ? (
                    <>
                      {' '}
                      <p>{`This charges ${price}`}</p> <b>Note:</b>
                      {` Once enabled, you will not be able to disable this for 14 days.`}
                    </>
                  ) : (
                    ''
                  )}
                </p>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-red-300  hover:bg-black hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-accent hover:bg-black hover:text-white"
            onClick={() => mutation.mutate({ [id]: !queryData?.[id] })}
          >
            {queryData?.[id] ? `Disable` : `Enable`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
