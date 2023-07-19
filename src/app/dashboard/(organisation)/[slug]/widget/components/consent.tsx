import { TermsInput } from './terms-input';
import { useWidgetStore } from '../widgetStore';

export function Consent() {
  const { tncURL, setTncURL, ppURL, setPpURL } = useWidgetStore();
  return (
    <div className="flex flex-col space-y-10">
      <TermsInput
        heading="Add a Terms & Conditions URL"
        placeholder="http://app.trustauthx.com/tnc"
        changeHandler={setTncURL}
        value={tncURL}
      />
      <TermsInput
        heading="Add a Privacy Policy URL"
        placeholder="http://api.trustauthx.com/pp"
        changeHandler={setPpURL}
        value={ppURL}
      />
    </div>
  );
}
