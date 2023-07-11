import { TermsInput } from './terms-input';

export function DevSettings() {
  return (
    <div className="flex flex-col space-y-10">
      <TermsInput
        heading="**Add a Host URL"
        placeholder="http://app.trustauthx.com/"
      />
      <TermsInput
        heading="Add a callback URL"
        placeholder="http://api.trustauthx.com/github/callback"
      />
      <TermsInput
        heading="**Add a Redirect URL"
        placeholder="http://api.trustauthx.com/login"
      />
    </div>
  );
}
