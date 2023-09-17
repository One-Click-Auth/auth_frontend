import React from 'react';
import {
  RadioGroup as Radiogroupshadcn,
  RadioGroupItem
} from '@/components/ui/radio-group';

export function RadioGroup({
  apiURL,
  setApiURL
}: {
  apiURL: string;
  setApiURL: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Radiogroupshadcn
      defaultValue="comfortable "
      className="flex flex-col gap-5"
      value={apiURL}
      onValueChange={value => {
        setApiURL(value);
      }}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="https://api-inference.huggingface.co/models/moonlightnexus/RealityCreation"
          id="r1"
        />
        <label htmlFor="r1" className="font-medium">
          RealityCreation
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="https://api-inference.huggingface.co/models/moonlightnexus/wonder-anime"
          id="r2"
        />
        <label htmlFor="r2" className="font-medium">
          WonderAnime
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="      https://api-inference.huggingface.co/models/moonlightnexus/realize
"
          id="r3"
        />
        <label htmlFor="r3" className="font-medium">
          Realize
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="https://api-inference.huggingface.co/models/moonlightnexus/shaper"
          id="r4"
        />
        <label htmlFor="r4" className="font-medium">
          Shaper
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="https://api-inference.huggingface.co/models/moonlightnexus/ubiquity"
          id="r5"
        />
        <label htmlFor="r5" className="font-medium">
          Ubiquity
        </label>
      </div>
    </Radiogroupshadcn>
  );
}
