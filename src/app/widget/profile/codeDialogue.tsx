'use client';
import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import Spinner from '@/components/spinner';

import { DialogContent } from '@/components/ui/Dialog';
import { Label } from '@/components/ui/Label';

export type PasswordDialogueProp = {
  code: string;
};
export function CodeDialogue({ code }: PasswordDialogueProp) {
  const [loading, setLoading] = useState(false);
  return (
    <DialogContent>
      <div className="flex flex-col items-center py-4 sm:px-10 gap-y-5">
        <Label className="mb-2" htmlFor="code">
          Use the code
        </Label>
        <Input id="code" type="text" value={code} />
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
