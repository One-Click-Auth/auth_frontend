'use client';

import { Input } from '@/components/ui/Input';
import { ColourInput } from './colour-input';
import { useWidgetStore } from '../widgetStore';

export function WidgetCustom() {
  const {
    inputBorderColor,
    setInputBorderColor,
    widgetBorderColor,
    setWidgetBorderColor,
    widgetColor,
    setWidgetColor,
    widgetBgColor,
    setWidgetBgColor,
    inputBoxRadius,
    setInputBoxRadius,
    widgetBoxRadius,
    setWidgetBoxRadius,
    widgetBorderWidth,
    setWidgetBorderWidth
  } = useWidgetStore();
  return (
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
          className="h-11 shadow-none"
          type="number"
          min={0}
          max={100}
          value={inputBoxRadius}
          onChange={e => setInputBoxRadius(e.target.value)}
        />
      </div>
      <div>
        <span className="text-sm pl-2 text-zinc-500">Widget Border Colour</span>
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
          className="h-11 shadow-none"
          type="number"
          min={1}
          max={100}
          value={widgetBorderWidth}
          onChange={e => setWidgetBorderWidth(e.target.value)}
        />
      </div>
      <div>
        <span className="text-sm pl-2 text-zinc-500">Widget Box Radius</span>
        <Input
          className="h-11 shadow-none"
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
  );
}
