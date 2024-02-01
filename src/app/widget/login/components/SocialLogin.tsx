import { Button } from '@/components/ui/Button';

export function SocialLogin({
  onClick,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      className="w-full gap-2 text-left items-center justify-start hover:bg-secondary font-normal text-xs leading-4"
      variant="outline"
      onClick={onClick}
      {...props}
    />
  );
}
