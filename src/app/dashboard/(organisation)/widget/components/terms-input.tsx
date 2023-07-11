import { Input } from '@/components/ui/Input';

export function TermsInput({
  heading,
  placeholder
}: {
  heading: string;
  placeholder: string;
}) {
  return (
    <div>
      <span className="text-sm pl-2 text-gray-600">{heading}</span>
      <Input type="text" placeholder={placeholder} />
      <small className="text-xs text-gray-600 block ml-1 mt-1">
        Your application’s T&C URL. Read our{' '}
        <a  
          className='underline'
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
