'use client';

import { Button } from "@/components/ui/Button";

export function WidgetFooter() {
  return (
    <div className="flex gap-4">
      <span className="basis-3/5 text-slate-400 text-sm border rounded-lg pt-2 px-3">
        Save the new widget Settings for this Organization{' '}
      </span>
      <Button className="bg-black text-white hover:bg-black/80 basis-1/5">
        Reset
      </Button>
      <Button className="bg-accent hover:bg-accent/80 basis-1/5">Save</Button>
    </div>
  );
}
