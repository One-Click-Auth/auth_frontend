'use client';
import { Color, ColorPicker } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Dispatch, SetStateAction } from 'react';
import { Trash2 } from 'lucide-react';

type ColorProps = {
  colorState: {
    color: Color;
    setColor: (color: Color) => void;
  };
  removable?: boolean;
  setButtonStatus?: (buttonStatus: boolean) => void
};

export function ColourInput({
  colorState: { color, setColor },
  removable = false,
  setButtonStatus
}: ColorProps) {
  const handleButtonStatus = () => {
    if (setButtonStatus) {
      setButtonStatus(false)
    }
  }
  return (
    <div className="border py-1.5 px-2 rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <button
              style={{ backgroundColor: color.hex }}
              className={`w-[3.625rem] h-[2.125rem] border rounded-lg`}
            ></button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="shadow-none border-none bg-transparent p-0 pt-2 w-auto"
          >
            <ColorPicker
              width={256}
              height={128}
              color={color}
              onChange={setColor}
              hideHSV
              hideRGB
              dark
            />
          </PopoverContent>
        </Popover>
        <span className="text-xl text-zinc-500">{color.hex}</span>
      </div>
      {removable && <Trash2 onClick={handleButtonStatus} className="hover:stroke-red-500 cursor-pointer mr-1" />}
    </div>
  );
}
