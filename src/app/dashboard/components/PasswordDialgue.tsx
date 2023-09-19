'use client';
import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import Spinner from '@/components/spinner';

import { DialogContent } from '@/components/ui/Dialog';

export type PasswordDialogueProp = {
  request: () => Promise<void>;
  loading: boolean;
};
export function PasswordDialogue({ request, loading }: PasswordDialogueProp) {
  // const [pass, setPass] = useState('');
  return (
    <DialogContent>
      <div className="flex flex-col items-center py-4 sm:px-10 gap-y-5">
        <label className="mb-2">Confirm to proceed</label>
        {/* <Input
          id="password"
          type="password"
          value={pass}
          placeholder="Password"
          onChange={e => setPass(e.target.value)}
        /> */}
        <Button
          variant="authx"
          className="w-[240px] mt-4 "
          disabled={loading}
          onClick={() => request()}
        >
          {loading ? (
            <div className="flex flex-row gap-2 items-center">
              <Spinner size={16} color="green" />
              <span>Processing...</span>
            </div>
          ) : (
            'Confirm'
          )}
        </Button>
      </div>
    </DialogContent>
  );
}
