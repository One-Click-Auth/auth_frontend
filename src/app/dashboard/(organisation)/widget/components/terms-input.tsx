import { Input } from '@/components/ui/Input';
import { Dispatch, SetStateAction } from 'react';

type InputProps = {
  heading: string;
  placeholder: string;
  changeHandler: Dispatch<SetStateAction<string>>;
  value: string;
};

export function TermsInput({
  heading,
  placeholder,
  changeHandler,
  value
}: InputProps) {
  return (
    <div>
      <span className="text-sm pl-2 text-gray-600">{heading}</span>
      <Input
        type="url"
        placeholder={placeholder}
        onChange={e => changeHandler(e.target.value)}
        value={value}
      />
      <small className="text-xs text-gray-600 block ml-1 mt-1">
        Your application’s T&C URL. Read our{' '}
        <a
          className="underline"
          href="https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps"
          target="_blank"
        >
          OAuth documentation
        </a>{' '}
        for more info.
      </small>
    </div>
  );
}
