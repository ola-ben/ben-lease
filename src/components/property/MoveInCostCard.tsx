import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { formatNaira } from '../../lib/format';
import type { Property } from '../../lib/types';

const MOVING_ESTIMATE = 70_000;
const UTILITIES_SETUP = 30_000;

interface Props {
  property: Property;
}

export const MoveInCostCard = ({ property: p }: Props) => {
  const [open, setOpen] = useState(false);
  const caution = Math.round(p.pricePerYear / 12);
  const total = p.pricePerYear + p.serviceCharge + caution + MOVING_ESTIMATE + UTILITIES_SETUP;

  return (
    <div className="rounded-card bg-paper p-5 shadow-rest">
      <div className="caption">Cash-out, first year</div>
      <h3 className="mt-1.5 font-display text-[20px] leading-tight">Move-in cost</h3>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-[14px] text-ink-soft">Total to move in</span>
        <span className="font-display text-[24px] italic text-ink">{formatNaira(total)}</span>
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        className="no-tap mt-3 flex items-center gap-1 text-[12px] font-medium text-umber"
      >
        {open ? 'Hide breakdown' : 'See full breakdown'}
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`}
          strokeWidth={2}
        />
      </button>

      {open && (
        <div className="mt-4 divide-y divide-sand/60 border-t border-sand/60 text-[13px]">
          <Row label="Annual rent" value={formatNaira(p.pricePerYear)} />
          <Row label="Service charge" value={formatNaira(p.serviceCharge)} />
          <Row
            label="Caution deposit"
            value={formatNaira(caution)}
            aside="Refundable, ≈ one month's rent"
          />
          <Row
            label="Moving estimate"
            value={formatNaira(MOVING_ESTIMATE)}
            aside="Local movers, typical"
          />
          <Row
            label="Utilities setup"
            value={formatNaira(UTILITIES_SETUP)}
            aside="Power, water, internet activation"
          />
        </div>
      )}

      <p className="mt-4 text-[12px] leading-[1.55] text-ink-faint">
        Moving and utilities are estimates — adjust based on your situation.{' '}
        {p.isNegotiable && 'Annual rent is negotiable on this listing.'}
      </p>
    </div>
  );
};

const Row = ({
  label,
  value,
  aside,
}: {
  label: string;
  value: string;
  aside?: string;
}) => (
  <div className="flex items-start justify-between gap-3 py-3">
    <div>
      <div className="text-ink">{label}</div>
      {aside && <div className="mt-0.5 text-[11px] text-ink-faint">{aside}</div>}
    </div>
    <div className="font-medium text-ink">{value}</div>
  </div>
);
