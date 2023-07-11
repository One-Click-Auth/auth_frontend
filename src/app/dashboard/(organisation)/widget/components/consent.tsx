import { Input } from '@/components/ui/Input';
import { TermsInput } from './terms-input';

export function Consent() {
  return (
    <div className="flex flex-col space-y-10">
      <TermsInput heading="Add a Terms & Conditions URL" placeholder='http://app.trustauthx.com/tnc'/>
      <TermsInput heading="Add a Privacy Policy URL" placeholder='http://api.trustauthx.com/pp'/>
    </div>
  );
}
