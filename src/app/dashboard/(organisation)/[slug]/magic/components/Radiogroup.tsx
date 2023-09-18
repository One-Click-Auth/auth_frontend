import {
  RadioGroup as Radiogroupshadcn,
  RadioGroupItem
} from '@/components/ui/radio-group';

export function RadioGroup() {
  return (
    <Radiogroupshadcn
      defaultValue="comfortable "
      className="flex flex-col gap-5"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <label htmlFor="r1" className="font-medium">
          Shuffle Daily with same prompt
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <label htmlFor="r2" className="font-medium">
          Use the same Image every time
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <label htmlFor="r3" className="font-medium">
          Shuffle Weekly with same prompt
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <RadioGroupItem value="idk" id="r4" />
        <label htmlFor="r4" className="font-medium">
          Shuffle Weekly with any Random prompt
        </label>
      </div>
    </Radiogroupshadcn>
  );
}
