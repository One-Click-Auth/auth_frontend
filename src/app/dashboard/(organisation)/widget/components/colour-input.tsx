'use client';
import { Color, ColorPicker } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Dispatch, SetStateAction } from 'react';

type ColorProps = {
  colorState: {
    color: Color;
    setColor: Dispatch<SetStateAction<Color>>;
  };
};

export function ColourInput({colorState: {color, setColor}}: ColorProps) {
  // const [color, setColor] = useColor('hex', '#121212');
  return (
    <div className="border py-1.5 px-2 gap-3 rounded-lg flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <button
            style={{ backgroundColor: color.hex }}
            className={`w-[3.625rem] h-[2.125rem] rounded-md`}
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
            onChangeComplete={e => {
              console.log(e);
              // setShow(false);
            }}
            hideHSV
            hideRGB
            dark
          />
        </PopoverContent>
      </Popover>
      <span className="text-xl text-zinc-500">{color.hex}</span>
    </div>
  );
}
