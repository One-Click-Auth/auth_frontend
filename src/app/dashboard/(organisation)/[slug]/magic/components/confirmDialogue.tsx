import React from 'react';
import { Button } from '@/components/ui/Button';
import Spinner from '@/components/spinner';

import { DialogContent } from '@/components/ui/Dialog';

export type PasswordDialogueProp = {
  request: () => Promise<void>;
  loading: boolean;
  remove: boolean;
};
export function ConfirmDialogue({
  request,
  loading,
  remove
}: PasswordDialogueProp) {
  // const [pass, setPass] = useState('');
  return (
    <DialogContent>
      <div className="flex flex-col items-center py-4 sm:px-10 gap-y-5">
        <p className="text-slate-500">
          {remove
            ? "Please confirm if you don't want to display image on the widget."
            : 'Please confirm If you want to display this image on the widget.'}
        </p>
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
