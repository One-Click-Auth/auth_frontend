import { Input } from '@/components/ui/Input';

type InputProps = {
  heading: string;
  placeholder: string;
  changeHandler: (input: string) => void;
  value: string;
  type?: 'url' | 'email' | 'password' | 'text' | 'number';
};

export function WidgetInput({
  heading,
  placeholder,
  changeHandler,
  value,
  type = 'url'
}: InputProps) {
  return (
    <div>
      <span className="text-sm pl-2 text-gray-600">{heading}</span>
      <Input
        className="h-11 shadow-none"
        type={type}
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
