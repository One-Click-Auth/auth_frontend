'use client';
import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import Spinner from '@/components/spinner';

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
          Use the code
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

        <Button variant="black" className="w-[240px] mt-4 ">
          {loading ? (
            <div className="flex flex-row gap-2 items-center">
              <Spinner size={16} color="gray" />
              <span>Processing...</span>
            </div>
          ) : (
            'Done'
          )}
        </Button>
      </div>
    </DialogContent>
  );
}
