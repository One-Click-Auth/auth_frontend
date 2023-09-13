'use client';
import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import Spinner from '@/components/spinner';

import { DialogContent } from '@/components/ui/Dialog';

// export type PasswordDialogueProp = {
//   request: (pass: string) => Promise<void>;
//   loading: boolean;
// };
export function CodeDialogue() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false)
  return (
    <DialogContent>
      <div className="flex flex-col items-center py-4 sm:px-10 gap-y-5">
        <label className="mb-2" htmlFor="password">
          Please enter the code from the authenticator app
        </label>
        <Input
          id="code"
          type="text"
          value={code}
          placeholder="code"
          onChange={e => setCode(e.target.value)}
        />
        <Button
          variant="black"
          className="w-[240px] mt-4 "
        >
          {loading ? (
            <div className="flex flex-row gap-2 items-center">
              <Spinner size={16} color="gray" />
              <span>Processing...</span>
            </div>
          ) : (
            'Proceed'
          )}
        </Button>
      </div>
    </DialogContent>
  );
}