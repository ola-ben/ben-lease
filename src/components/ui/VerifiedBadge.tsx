import { Check } from 'lucide-react';

interface Props {
  inverted?: boolean;
  size?: 'sm' | 'md';
}

export const VerifiedBadge = ({ inverted, size = 'sm' }: Props) => {
  const isLarge = size === 'md';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-btn font-medium ${
        inverted ? 'bg-verified text-paper' : 'bg-umber-soft text-umber'
      } ${isLarge ? 'h-7 px-2.5 text-[12px]' : 'h-6 px-2 text-[11px]'}`}
    >
      <Check className={isLarge ? 'h-3.5 w-3.5' : 'h-3 w-3'} strokeWidth={2.5} />
      Verified
    </span>
  );
};
