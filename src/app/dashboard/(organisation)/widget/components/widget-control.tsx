'use client';
import { useState } from 'react';
import { ColourInput } from './colour-input';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export function WidgetControl() {
  // const [show, setShow] = useState(false);

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div>
          <span className="text-sm pl-2 text-zinc-500">Button Colour</span>
          <ColourInput />
        </div>
        <div>
          <span className="text-sm pl-2 text-zinc-500">Button Colour 2</span>
          <ColourInput />
        </div>
        <div>
          <span className="text-sm pl-2 text-zinc-500">Button Colour 3</span>
          <ColourInput />
        </div>
        <Button className="text-sm self-end bg-accent hover:bg-accent/80">
          <Plus className="w-3.5 h-3.5 mr-2" />
          Add Linear-gradient
        </Button>
      </div>
      <div>Add Logo</div>
      <input type="text" placeholder="Change Display Name" />
      <div>Change Greetings Text</div>
    </>
  );
}
