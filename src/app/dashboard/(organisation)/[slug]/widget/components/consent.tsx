import { WidgetInput } from './widget-input';
import { useWidgetStore } from '../widgetStore';

export function Consent() {
  const { tncURL, setTncURL, ppURL, setPpURL } = useWidgetStore();
  return (
    <div className="flex flex-col space-y-10">
      <WidgetInput
        heading="Add a Terms & Conditions URL"
        placeholder="http://app.trustauthx.com/tnc"
        changeHandler={setTncURL}
        value={tncURL}
      />
      <WidgetInput
        heading="Add a Privacy Policy URL"
        placeholder="http://api.trustauthx.com/pp"
        changeHandler={setPpURL}
        value={ppURL}
      />
    </div>
  );
}
