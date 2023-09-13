'use client';

import { useAuth } from '@/Providers/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getOrgData } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

const WebhookForm = () => {
  const [inputUrl, setInputUrl] = useState('');
  const { token } = useAuth();
  const { slug } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['orgData', slug],
    queryFn: () => getOrgData(slug, token)
  });

  const checkPing = () => {
    const orgId = data?.org_id;
    if (inputUrl === '') return;
    if (orgId) {
      const url = `https://api.trustauthx.com/test/callback`;
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const data = {
        url: inputUrl,
        org_id: orgId
      };

      fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }
  };
  const setUrl = () => {
    const orgId = data?.org_id;
    if (inputUrl === '') return;
    if (orgId) {
      const url = `https://api.trustauthx.com/org/${orgId}`;
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const data = {
        callback_url: inputUrl
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
    <div className="flex flex-col md:flex-row gap-2">
      <Input
        className="w-full md:w-1/2 py-5 font-semibold text-xl placeholder:text-gray-300 "
        placeholder="https://www.example.me/now"
        onChange={e => setInputUrl(e.target.value)}
      />
      <div className="flex items-center justify-start w-full md:w-fit">
        <Button
          onClick={checkPing}
          className="bg-[#4338CA] text-white hover:bg-black text-sm px-4"
        >
          Check Ping
        </Button>
        <Button
          onClick={setUrl}
          variant={'authx'}
          className="text-sm px-4 ml-2"
        >
          + Set URL
        </Button>
      </div>
    </div>
  );
};

export default WebhookForm;
