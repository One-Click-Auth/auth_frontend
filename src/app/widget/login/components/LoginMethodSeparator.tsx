import { Separator } from '@/components/ui/seperator';

export function LoginMethodSeparator() {
  return (
    <div className="grid grid-cols-[1fr_0.5fr_1fr] place-items-center">
      <Separator />
      <span>or</span>
      <Separator />
    </div>
  );
}
