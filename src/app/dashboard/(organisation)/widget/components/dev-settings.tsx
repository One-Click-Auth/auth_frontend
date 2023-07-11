import { Dispatch, SetStateAction } from 'react';
import { TermsInput } from './terms-input';

type DevProps = {
  setters: {
    setCallbackURL: Dispatch<SetStateAction<string>>;
    setHostURL: Dispatch<SetStateAction<string>>;
    setRedirectURL: Dispatch<SetStateAction<string>>;
  };
  inputValues: {
    callbackURL: string;
    hostURL: string;
    redirectURL: string;
  };
};

export function DevSettings({
  setters: { setCallbackURL, setHostURL, setRedirectURL },
  inputValues: {callbackURL, hostURL, redirectURL}
}: DevProps) {
  return (
    <div className="flex flex-col space-y-10">
      <TermsInput
        heading="**Add a Host URL"
        placeholder="http://app.trustauthx.com/"
        changeHandler={setHostURL}
        value={hostURL}
      />
      <TermsInput
        heading="Add a callback URL"
        placeholder="http://api.trustauthx.com/github/callback"
        changeHandler={setCallbackURL}
        value={callbackURL}
      />
      <TermsInput
        heading="**Add a Redirect URL"
        placeholder="http://api.trustauthx.com/login"
        changeHandler={setRedirectURL}
        value={redirectURL}
      />
    </div>
  );
}
