import { Droplet, Wifi, Zap } from 'lucide-react';
import type { Utilities } from '../../lib/types';

interface Props {
  utilities: Utilities;
}

const backupLabel: Record<Utilities['generatorBackup'], string> = {
  none: 'No backup',
  partial: 'Partial backup',
  full: '24/7 backup',
};

export const UtilitiesPanel = ({ utilities }: Props) => {
  return (
    <div className="rounded-card bg-paper p-5 shadow-rest">
      <div className="caption">Day-to-day reality</div>
      <h3 className="mt-1.5 font-display text-[20px] leading-tight">
        Power, water & internet
      </h3>

      <div className="mt-4 space-y-3">
        <Row
          icon={<Zap className="h-4 w-4" strokeWidth={1.8} />}
          label="Mains power"
          value={`~${utilities.powerHoursDay} hr/day`}
          aside={backupLabel[utilities.generatorBackup]}
          tone={
            utilities.powerHoursDay >= 16
              ? 'verified'
              : utilities.powerHoursDay >= 12
                ? 'umber'
                : 'sand'
          }
        />
        <Row
          icon={<Droplet className="h-4 w-4" strokeWidth={1.8} />}
          label="Water"
          value={utilities.borehole ? 'Treated borehole' : 'Mains only'}
          aside={utilities.borehole ? 'On-site supply' : undefined}
          tone={utilities.borehole ? 'verified' : 'sand'}
        />
        <Row
          icon={<Wifi className="h-4 w-4" strokeWidth={1.8} />}
          label="Internet"
          value={utilities.internet.join(' · ')}
          aside={
            utilities.internet.length >= 3
              ? 'Multiple options'
              : utilities.internet.length === 2
                ? 'Two options'
                : 'Limited'
          }
          tone={utilities.internet.length >= 2 ? 'verified' : 'umber'}
        />
      </div>

      <p className="mt-4 text-[12px] leading-[1.55] text-ink-faint">
        Reported by our inspector during the last verification. Power figures are a
        rolling 30-day average for the building.
      </p>
    </div>
  );
};

const Row = ({
  icon,
  label,
  value,
  aside,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  aside?: string;
  tone: 'verified' | 'umber' | 'sand';
}) => {
  const dot =
    tone === 'verified' ? 'bg-verified' : tone === 'umber' ? 'bg-umber' : 'bg-sand';
  return (
    <div className="flex items-center gap-3 border-b border-sand/60 pb-3 last:border-b-0 last:pb-0">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-btn bg-cream text-ink-soft">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="caption">{label}</div>
        <div className="mt-0.5 truncate text-[14px] font-medium text-ink">{value}</div>
      </div>
      {aside && (
        <div className="flex items-center gap-1.5 text-[11px] text-ink-soft">
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
          {aside}
        </div>
      )}
    </div>
  );
};
