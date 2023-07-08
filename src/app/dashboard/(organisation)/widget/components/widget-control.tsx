'use client';
import { Dispatch, SetStateAction } from 'react';
import { ColourInput } from './colour-input';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { LogoUpload } from './logo-upload';
import { Color } from 'react-color-palette';

type WidgetProp = {
  setDisplayName: Dispatch<SetStateAction<string>>;
  setGreeting: Dispatch<SetStateAction<string>>;
  logoState: {
    logo: File | undefined;
    setLogo: Dispatch<SetStateAction<File | undefined>>;
    logoImage: string;
    setLogoImage: Dispatch<SetStateAction<string>>;
  };
  colorState: {
    color: Color;
    setColor: Dispatch<SetStateAction<Color>>;
  };
  colorState2: {
    color2: Color;
    setColor2: Dispatch<SetStateAction<Color>>;
  };
  colorState3: {
    color3: Color;
    setColor3: Dispatch<SetStateAction<Color>>;
  };
};

export function WidgetControl({
  setDisplayName,
  setGreeting,
  logoState,
  colorState,
  colorState2: { color2, setColor2 },
  colorState3: { color3, setColor3 }
}: WidgetProp) {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div>
          <span className="text-sm pl-2 text-zinc-500">Button Colour</span>
          <ColourInput colorState={colorState} />
        </div>
        <div>
          <span className="text-sm pl-2 text-zinc-500">Button Colour 2</span>
          <ColourInput colorState={{ color: color2, setColor: setColor2 }} />
        </div>
        <div>
          <span className="text-sm pl-2 text-zinc-500">Button Colour 3</span>
          <ColourInput colorState={{ color: color3, setColor: setColor3 }} />
        </div>
        <Button className="text-sm self-end bg-accent hover:bg-accent/80">
          <Plus className="w-3.5 h-3.5 mr-2" />
          Add Linear-gradient
        </Button>
      </div>
      <div>
        <span className="text-sm pl-2 text-zinc-500">Add Logo</span>
        <LogoUpload logoState={logoState} />
      </div>
      <Input
        onChange={e => setDisplayName(e.target.value)}
        type="text"
        placeholder="Change Display Name"
      />
      <div>
        <span className="text-sm pl-2 text-zinc-500">
          Change Greetings Text
        </span>
        <Input
          onChange={e => setGreeting(e.target.value)}
          className="text-lg text-center py-14"
          type="text"
          placeholder="Continue to Log in to Flitchcoin"
        />
      </div>
    </>
  );
}
