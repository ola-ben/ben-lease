import type { ReactNode } from 'react';

type Tone = 'neutral' | 'umber' | 'verified' | 'sand' | 'cream' | 'ink';

interface PillProps {
  children: ReactNode;
  tone?: Tone;
  size?: 'sm' | 'md';
  icon?: ReactNode;
}

const toneClasses: Record<Tone, string> = {
  neutral: 'bg-cream text-ink',
  umber: 'bg-umber-soft text-umber',
  verified: 'bg-verified text-paper',
  sand: 'bg-sand text-ink-soft',
  cream: 'bg-cream text-ink',
  ink: 'bg-ink text-paper',
};

export const Pill = ({ children, tone = 'neutral', size = 'md', icon }: PillProps) => {
  const sizeClasses =
    size === 'sm'
      ? 'h-6 px-2.5 text-[11px] tracking-[0.06em]'
      : 'h-7 px-3 text-[12px]';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-btn font-medium ${toneClasses[tone]} ${sizeClasses}`}
    >
      {icon}
      {children}
    </span>
  );
};
