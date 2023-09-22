'use client';
import { Button } from '@/components/ui/Button';
export default function UpgradeToEnterprise() {
  function openPage() {
    const url = 'https://tally.so/r/n99VoY';
    window.open(url, '_blank');
  }
  return (
    <Button
      className="bg-black hover:bg-black/80 text-white text-sm px-8 min-w-[220px]"
      onClick={openPage}
    >
      Upgrade to Enterprise
    </Button>
  );
}
