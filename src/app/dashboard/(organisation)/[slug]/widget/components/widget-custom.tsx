'use client';

import { Input } from '@/components/ui/Input';
import { ColourInput } from './colour-input';
import { useWidgetStore } from '../widgetStore';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export function WidgetCustom() {
  const {
    inputBorderColor,
    setInputBorderColor,
    buttonBorderColor,
    setButtonBorderColor,
    widgetBorderColor,
    setWidgetBorderColor,
    widgetColor,
    setWidgetColor,
    widgetColor2,
    setWidgetColor2,
    widget2Status,
    setWidget2Status,
    widgetBgColor,
    setWidgetBgColor,
    widgetBgColor2,
    setWidgetBgColor2,
    widgetBgColor3,
    setWidgetBgColor3,
    widgetBg2Status,
    setWidgetBg2Status,
    widgetBg3Status,
    setWidgetBg3Status,
    shadowColor,
    setShadowColor,
    inputBoxRadius,
    setInputBoxRadius,
    buttonRadius,
    setButtonRadius,
    buttonBorderWidth,
    setButtonBorderWidth,
    widgetBoxRadius,
    setWidgetBoxRadius,
    widgetBorderWidth,
    setWidgetBorderWidth,
    nameFontColor,
    setNameFontColor,
    greetingFontColor,
    setGreetingFontColor
  } = useWidgetStore();

  const handleShowButtonWidget = () => {
    if (!widget2Status) {
      setWidget2Status(true);
      return;
    }
  };

  const handleShowButton = () => {
    if (!widgetBg2Status) {
      setWidgetBg2Status(true);

      return;
    }

    if (!widgetBg3Status) {
      setWidgetBg3Status(true);

      return;
    }
  };

  return (
    <div className="flex flex-col px-2 space-y-4 overflow-y-scroll max-h-[500px]">
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
        <span className="text-sm pl-2 text-zinc-500">Button Border Colour</span>
        <ColourInput
          colorState={{
            color: buttonBorderColor,
            setColor: setButtonBorderColor
          }}
        />
      </div>
      <div>
        <span className="text-sm pl-2 text-zinc-500">Button Border Size</span>
        <Input
          className="h-11 shadow-none"
          type="number"
          min={0}
          max={8}
          value={buttonBorderWidth}
          onChange={e => setButtonBorderWidth(e.target.value)}
        />
      </div>
      <div>
        <span className="text-sm pl-2 text-zinc-500">Button Radius</span>
        <Input
          className="h-11 shadow-none"
          type="number"
          min={0}
          max={100}
          value={buttonRadius}
          onChange={e => setButtonRadius(e.target.value)}
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
      <div className="flex flex-col space-y-4">
        <div>
          <span className="text-sm pl-2 text-zinc-500">Widget Color</span>
          <ColourInput
            colorState={{ color: widgetColor, setColor: setWidgetColor }}
          />
        </div>
        <div className={`${!widget2Status && 'hidden'}`}>
          <span className="text-sm pl-2 text-zinc-500">Widget Color 2</span>
          <ColourInput
            colorState={{ color: widgetColor2, setColor: setWidgetColor2 }}
            setButtonStatus={setWidget2Status}
            removable
          />
        </div>
        <Button
          onClick={handleShowButtonWidget}
          className={`${
            widget2Status && 'hidden'
          } text-sm self-end bg-accent hover:bg-accent/80`}
        >
          <Plus className="w-3.5 h-3.5 mr-2" />
          Add Linear-gradient
        </Button>
      </div>
      <div className="flex flex-col space-y-4">
        <div>
          <span className="text-sm pl-2 text-zinc-500">
            Widget Background Color
          </span>
          <ColourInput
            colorState={{ color: widgetBgColor, setColor: setWidgetBgColor }}
          />
        </div>
        <div className={`${!widgetBg2Status && 'hidden'}`}>
          <span className="text-sm pl-2 text-zinc-500">
            Widget Background Color 2
          </span>
          <ColourInput
            colorState={{ color: widgetBgColor2, setColor: setWidgetBgColor2 }}
            setButtonStatus={setWidgetBg2Status}
            removable
          />
        </div>
        <div className={`${!widgetBg3Status && 'hidden'}`}>
          <span className="text-sm pl-2 text-zinc-500">
            Widget Background Color 3
          </span>
          <ColourInput
            colorState={{ color: widgetBgColor3, setColor: setWidgetBgColor3 }}
            setButtonStatus={setWidgetBg3Status}
            removable
          />
        </div>
        <Button
          onClick={handleShowButton}
          className={`${
            widgetBg2Status && widgetBg3Status && 'hidden'
          } text-sm self-end bg-accent hover:bg-accent/80`}
        >
          <Plus className="w-3.5 h-3.5 mr-2" />
          Add Linear-gradient
        </Button>
      </div>
      <div>
        <span className="text-sm pl-2 text-zinc-500">Widget Shadow Color</span>
        <ColourInput
          colorState={{
            color: shadowColor,
            setColor: setShadowColor
          }}
        />
      </div>

      <div>
        <span className="text-sm pl-2 text-zinc-500">
          Display Name Font Color
        </span>
        <ColourInput
          colorState={{
            color: nameFontColor,
            setColor: setNameFontColor
          }}
        />
      </div>
      <div>
        <span className="text-sm pl-2 text-zinc-500">
          Display Greeting Font Color
        </span>
        <ColourInput
          colorState={{
            color: greetingFontColor,
            setColor: setGreetingFontColor
          }}
        />
      </div>
    </div>
  );
}
