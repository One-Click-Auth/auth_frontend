'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { ColourInput } from './colour-input';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { LogoUpload } from './logo-upload';

type WidgetProp = {
  setDisplayName: Dispatch<SetStateAction<string>>;
  setGreeting: Dispatch<SetStateAction<string>>;
}

export function WidgetControl({setDisplayName, setGreeting}: WidgetProp) {
  // const [displayName, setDisplayName] = useState<string>('');
  // const [greeting, setGreeting] = useState<string>('Continue to Log in to Flitchcoin');

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
      <div>
        <span className="text-sm pl-2 text-zinc-500">Add Logo</span>
        <LogoUpload />
      </div>
      <Input
        onChange={e => setDisplayName(e.target.value)}
        // value={displayName}
        type="text"
        placeholder="Change Display Name"
      />
      <div>
        <span className="text-sm pl-2 text-zinc-500">
          Change Greetings Text
        </span>
        <Input
          onChange={e => setGreeting(e.target.value)}
          // value={greeting}
          className="text-lg text-zinc-500 text-center py-14"
          type="text"
          placeholder="Continue to Log in to Flitchcoin"
        />
      </div>
    </>
  );
}
