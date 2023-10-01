'use client';
import React from 'react';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';

import { DialogContent } from '@/components/ui/Dialog';
import { Label } from '@/components/ui/Label';
import { IoCopy } from 'react-icons/io5';

type PasswordDialogueProp = {
  code: string | null;
};
export function CodeDialogue({ code }: PasswordDialogueProp) {
  const [loading, setLoading] = useState(false);
  const handleCopy = (keyValue: string) => {
    navigator.clipboard.writeText(keyValue);
  };
  return (
    <DialogContent>
      <div className="flex flex-col items-center py-4 sm:px-10 gap-y-5">
        <Label className="mb-2" htmlFor="code">
          Paste this code in your authenticator
        </Label>
        <div className="w-full flex flex-ro">
          <Input
            id="code"
            type="text"
            value={code ? code : ''}
            readOnly
            className="pr-10 text-black"
          />
          <button
            className="relative right-[30px] text-slate-400"
            onClick={e => {
              handleCopy(code ? code : '');
            }}
          >
            <IoCopy />
          </button>
        </div>
      </div>
    </DialogContent>
  );
}
