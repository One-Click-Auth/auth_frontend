'use client';
import { ColourInput } from './colour-input';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { LogoUpload } from './logo-upload';
import { useWidgetStore } from '../widgetStore';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
export interface WidgetBrandingRef {
  clearDisplayNameAndGreetings: () => void;
}

const WidgetBranding = forwardRef<WidgetBrandingRef>((_, ref) => {
  const displayNameRef = useRef<HTMLInputElement>(null);
  const greetingsRef = useRef<HTMLInputElement>(null);

  const {
    displayName,
    setDisplayName,
    greeting,
    setGreeting,
    button2Status,
    setButton2Status,
    button3Status,
    setButton3Status,
    color,
    color2,
    color3,
    setColor,
    setColor2,
    setColor3
  } = useWidgetStore();

  useImperativeHandle(
    ref,
    () => ({
      clearDisplayNameAndGreetings() {
        if (displayNameRef.current && greetingsRef.current) {
          displayNameRef.current.value = '';
          greetingsRef.current.value = '';
        }
      }
    }),
    []
  );
  useEffect(() => {
    // console.log(button2Status)
    if (!button3Status && !button2Status) {
      return setColor2(color), setColor3(color);
    }
    if (!button3Status && button2Status) {
      return setColor3(color2);
    }
    if (!button2Status && button3Status) {
      return setColor2(color3);
    }
  }, [color, color2, color3, button2Status, button3Status]);

  // useEffect(()=>{
  //   console.log("button2:",button2Status)
  //   console.log("button3:",button3Status)
  // },[button2Status,button3Status])

  const handleShowButton = () => {
    if (!button2Status) {
      setButton2Status(true);

      return;
    }

    if (!button3Status) {
      setButton3Status(true);
      return;
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div>
          <span className="text-sm pl-2 text-zinc-500">Button Colour</span>
          <ColourInput colorState={{ color, setColor }} />
        </div>
        <div className={`${!button2Status && 'hidden'}`}>
          <span className="text-sm pl-2 text-zinc-500">Button Colour 2</span>
          <ColourInput
            colorState={{ color: color2, setColor: setColor2 }}
            setButtonStatus={setButton2Status}
            removable
          />
        </div>
        <div className={`${!button3Status && 'hidden'}`}>
          <span className="text-sm pl-2 text-zinc-500">Button Colour 3</span>
          <ColourInput
            colorState={{ color: color3, setColor: setColor3 }}
            setButtonStatus={setButton3Status}
            removable
          />
        </div>
        <Button
          onClick={handleShowButton}
          className={`${
            button2Status && button3Status && 'hidden'
          } text-sm self-end bg-accent hover:bg-accent/80`}
        >
          <Plus className="w-3.5 h-3.5 mr-2" />
          Add Linear-gradient
        </Button>
      </div>
      <div>
        <span className="text-sm pl-2 text-zinc-500">Add Logo</span>
        <LogoUpload />
      </div>
      <Input
        ref={displayNameRef}
        className="h-11 shadow-none"
        value={displayName}
        onChange={e => setDisplayName(e.target.value)}
        type="text"
        placeholder="Change Display Name"
        maxLength={36}
      />
      <div>
        <span className="text-sm pl-2 text-zinc-500">
          Change Greetings Text
        </span>
        <Input
          ref={greetingsRef}
          value={greeting}
          onChange={e => setGreeting(e.target.value)}
          className="text-lg text-center py-14 shadow-none"
          type="text"
          placeholder="Continue to Log in to Flitchcoin"
          maxLength={100}
        />
      </div>
    </>
  );
});

export default WidgetBranding;
