import type { Availability } from '../../lib/availability';

const dotColor: Record<Availability['tone'], string> = {
  verified: 'bg-verified',
  umber: 'bg-umber',
  sand: 'bg-sand',
};

const textColor: Record<Availability['tone'], string> = {
  verified: 'text-verified',
  umber: 'text-umber',
  sand: 'text-ink-faint',
};

export const AvailabilityDot = ({ availability }: { availability: Availability }) => (
  <div className="flex items-center gap-1.5">
    <span className={`h-1.5 w-1.5 rounded-full ${dotColor[availability.tone]}`} />
    <span
      className={`text-[10px] font-medium uppercase tracking-[0.08em] ${textColor[availability.tone]}`}
    >
      {availability.label}
    </span>
  </div>
);
