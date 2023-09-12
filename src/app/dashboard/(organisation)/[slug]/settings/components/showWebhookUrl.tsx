'use client';
import { useAuth } from '@/Providers/AuthContext';
import { Button } from '@/components/ui/Button';
import { getOrgData } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

const ShowWebhookUrl = () => {
  const { token } = useAuth();
  const { slug } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['orgData', slug],
    queryFn: () => getOrgData(slug, token)
  });
  const removeURL = () => {
    const orgId = data?.org_id;
    if (orgId) {
      const url = `https://api.trustauthx.com/org/${orgId}`;
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const data = {
        callback_url: ''
      };

      fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }
  };
  return (
    <div className="flex items-stretch w-full gap-4">
      <Button
        variant={'destructive'}
        className="text-sm px-4 ml-2"
        onClick={removeURL}
      >
        Remove
      </Button>
      <div className="flex items-center p-1 justify-center rounded-md w-full  bg-slate-200">
        <p className="text-sm font-bold text-black/70">
          https://www.example.me/now
        </p>
      </div>
    </div>
  );
};

export default ShowWebhookUrl;
