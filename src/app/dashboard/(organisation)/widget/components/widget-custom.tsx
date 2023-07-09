'use client';

import { Input } from '@/components/ui/Input';
import { ColourInput } from './colour-input';
import { Color } from 'react-color-palette';
import { Dispatch, SetStateAction } from 'react';

type WidgetCustomProps = {
  inputBorderColor: {
    inputBorderColor: Color;
    setInputBorderColor: Dispatch<SetStateAction<Color>>;
  };
  widgetBorderColor: {
    widgetBorderColor: Color;
    setWidgetBorderColor: Dispatch<SetStateAction<Color>>;
  };
  widgetColor: {
    widgetColor: Color;
    setWidgetColor: Dispatch<SetStateAction<Color>>;
  };
  widgetBgColor: {
    widgetBgColor: Color;
    setWidgetBgColor: Dispatch<SetStateAction<Color>>;
  };
  inputBoxRadius: {
    inputBoxRadius: string;
    setInputBoxRadius: Dispatch<SetStateAction<string>>;
  };
  widgetBoxRadius: {
    widgetBoxRadius: string;
    setWidgetBoxRadius: Dispatch<SetStateAction<string>>;
  };
  widgetBorderWidth: {
    widgetBorderWidth: string;
    setWidgetBorderWidth: Dispatch<SetStateAction<string>>;
  };
};

export function WidgetCustom({
  inputBorderColor: { inputBorderColor, setInputBorderColor },
  widgetBorderColor: { widgetBorderColor, setWidgetBorderColor },
  widgetColor: { widgetColor, setWidgetColor },
  widgetBgColor: { widgetBgColor, setWidgetBgColor },
  inputBoxRadius: { inputBoxRadius, setInputBoxRadius },
  widgetBoxRadius: { widgetBoxRadius, setWidgetBoxRadius },
  widgetBorderWidth: { widgetBorderWidth, setWidgetBorderWidth }
}: WidgetCustomProps) {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div>
          <span className="text-sm pl-2 text-zinc-500">
            Input Box Border Colour
          </span>
          <ColourInput
            colorState={{
              color: inputBorderColor,
              setColor: setInputBorderColor
            }}
          />
        </div>
        <div>
          <span className="text-sm pl-2 text-zinc-500">Input Box Radius</span>
          <Input
            type="number"
            min={0}
            max={100}
            value={inputBoxRadius}
            onChange={e => setInputBoxRadius(e.target.value)}
          />
        </div>
        <div>
          <span className="text-sm pl-2 text-zinc-500">
            Widget Border Colour
          </span>
          <ColourInput
            colorState={{
              color: widgetBorderColor,
              setColor: setWidgetBorderColor
            }}
          />
        </div>
        <div>
          <span className="text-sm pl-2 text-zinc-500">Widget Border Size</span>
          <Input
            type="number"
            min={0}
            max={100}
            value={widgetBorderWidth}
            onChange={e => setWidgetBorderWidth(e.target.value)}
          />
        </div>
        <div>
          <span className="text-sm pl-2 text-zinc-500">Widget Box Radius</span>
          <Input
            type="number"
            min={0}
            max={100}
            value={widgetBoxRadius}
            onChange={e => setWidgetBoxRadius(e.target.value)}
          />
        </div>
        <div>
          <span className="text-sm pl-2 text-zinc-500">Widget Colour</span>
          <ColourInput
            colorState={{ color: widgetColor, setColor: setWidgetColor }}
          />
        </div>
        <div>
          <span className="text-sm pl-2 text-zinc-500">
            Widget Background Colour
          </span>
          <ColourInput
            colorState={{ color: widgetBgColor, setColor: setWidgetBgColor }}
          />
        </div>
      </div>
    </>
  );
}
