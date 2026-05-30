import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatNaira, formatNairaShort } from '../../lib/format';
import { Button } from '../ui/Button';
import { Sheet } from '../ui/Sheet';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const LeaseCalculatorSheet = ({ open, onClose }: Props) => {
  const navigate = useNavigate();
  const [monthly, setMonthly] = useState(5_000);

  const maxYearlyRent = useMemo(
    () => Math.min(Math.round(monthly * 12 * 0.3), 30_000),
    [monthly],
  );

  const handleSee = () => {
    onClose();
    navigate(`/search?max=${maxYearlyRent}`);
  };

  return (
    <Sheet open={open} onClose={onClose} title="What can you afford?">
      <p className="-mt-2 text-[13px] text-ink-soft">
        A safe lease in Nigeria takes no more than 30% of your annual income. Drag the
        slider to see homes that fit.
      </p>

      <div className="mt-6">
        <span className="caption">Monthly income (₦)</span>
        <div className="mt-2 flex h-12 items-center rounded-btn bg-cream px-4">
          <span className="text-ink-soft">₦</span>
          <input
            type="number"
            value={monthly}
            min={500}
            step={500}
            onChange={(e) => setMonthly(Math.max(0, Number(e.target.value)))}
            className="ml-1 w-full bg-transparent text-[16px] font-medium outline-none"
          />
          <span className="text-[12px] text-ink-faint">/mo</span>
        </div>
      </div>

      <div className="mt-5">
        <input
          type="range"
          min={1_000}
          max={10_000}
          step={500}
          value={monthly}
          onChange={(e) => setMonthly(Number(e.target.value))}
          className="bl-range w-full"
        />
        <div className="mt-1 flex justify-between text-[10px] uppercase tracking-[0.08em] text-ink-faint">
          <span>{formatNairaShort(1_000)}</span>
          <span>{formatNairaShort(10_000)}</span>
        </div>
      </div>

      <div className="mt-7 rounded-card bg-umber-soft p-4">
        <div className="caption text-umber">You can afford homes up to</div>
        <div className="mt-1 font-display text-[26px] italic leading-tight text-ink">
          {formatNaira(maxYearlyRent)}/year
        </div>
        <div className="mt-1 text-[12px] text-ink-soft">
          That's about {formatNairaShort(Math.round(maxYearlyRent / 12))}/month equivalent.
        </div>
      </div>

      <Button full size="lg" onClick={handleSee} className="mt-5">
        See homes in this range
      </Button>
    </Sheet>
  );
};
