import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '../ui/Button';
import type { City, PropertyType } from '../../lib/types';

export interface FilterState {
  budgetMax: number | null;
  beds: number | null;
  type: PropertyType | null;
  furnished: boolean | null;
  city: City | null;
  lease: number | null;
  negotiable: boolean | null;
}

interface Props {
  open: boolean;
  draft: FilterState;
  onChange: (next: FilterState) => void;
  onApply: () => void;
  onClose: () => void;
  onClear: () => void;
  resultCount: number;
}

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <div>
    <div className="caption">{title}</div>
    <div className="mt-3 flex flex-wrap gap-2">{children}</div>
  </div>
);

interface PillProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const Pill = ({ label, selected, onClick }: PillProps) => (
  <button
    onClick={onClick}
    className={`no-tap h-10 rounded-btn px-4 text-[13px] font-medium transition-colors ${
      selected ? 'bg-ink text-paper' : 'bg-cream text-ink'
    }`}
  >
    {label}
  </button>
);

const budgets: { v: number | null; label: string }[] = [
  { v: null, label: 'Any' },
  { v: 5_000, label: 'Under ₦5k/yr' },
  { v: 10_000, label: 'Under ₦10k/yr' },
  { v: 15_000, label: 'Under ₦15k/yr' },
  { v: 20_000, label: 'Under ₦20k/yr' },
  { v: 30_000, label: 'Under ₦30k/yr' },
];

const negotiables: { v: boolean | null; label: string }[] = [
  { v: null, label: 'Any property' },
  { v: true, label: 'Negotiable only' },
];

const beds: { v: number | null; label: string }[] = [
  { v: null, label: 'Any' },
  { v: 1, label: '1' },
  { v: 2, label: '2' },
  { v: 3, label: '3' },
  { v: 4, label: '4+' },
];

const types: { v: PropertyType | null; label: string }[] = [
  { v: null, label: 'Any' },
  { v: 'apartment', label: 'Apartment' },
  { v: 'duplex', label: 'Duplex' },
  { v: 'self-con', label: 'Self-con' },
  { v: 'bungalow', label: 'Bungalow' },
  { v: 'mini-flat', label: 'Mini-flat' },
];

const furnished: { v: boolean | null; label: string }[] = [
  { v: null, label: 'Either' },
  { v: true, label: 'Furnished' },
  { v: false, label: 'Unfurnished' },
];

const cities: { v: City | null; label: string }[] = [
  { v: null, label: 'All cities' },
  { v: 'Lagos', label: 'Lagos' },
  { v: 'Abuja', label: 'Abuja' },
  { v: 'Ibadan', label: 'Ibadan' },
];

const leases: { v: number | null; label: string }[] = [
  { v: null, label: 'Any' },
  { v: 12, label: '12 months' },
  { v: 24, label: '24 months' },
];

export const AllFiltersSheet = ({
  open,
  draft,
  onChange,
  onApply,
  onClose,
  onClear,
  resultCount,
}: Props) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink/40"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88vh] max-w-phone flex-col rounded-t-[24px] bg-paper shadow-elevated"
          >
            <div className="flex items-center justify-between border-b border-sand/70 px-6 py-4">
              <h3 className="font-display text-[20px]">All filters</h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="no-tap -mr-2 p-2 text-ink"
              >
                <X className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>

            <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
              <Section title="Budget">
                {budgets.map((b) => (
                  <Pill
                    key={String(b.v)}
                    label={b.label}
                    selected={draft.budgetMax === b.v}
                    onClick={() => onChange({ ...draft, budgetMax: b.v })}
                  />
                ))}
              </Section>

              <Section title="Bedrooms">
                {beds.map((b) => (
                  <Pill
                    key={String(b.v)}
                    label={b.label}
                    selected={draft.beds === b.v}
                    onClick={() => onChange({ ...draft, beds: b.v })}
                  />
                ))}
              </Section>

              <Section title="Type">
                {types.map((t) => (
                  <Pill
                    key={String(t.v)}
                    label={t.label}
                    selected={draft.type === t.v}
                    onClick={() => onChange({ ...draft, type: t.v })}
                  />
                ))}
              </Section>

              <Section title="Furnished">
                {furnished.map((f) => (
                  <Pill
                    key={String(f.v)}
                    label={f.label}
                    selected={draft.furnished === f.v}
                    onClick={() => onChange({ ...draft, furnished: f.v })}
                  />
                ))}
              </Section>

              <Section title="Area">
                {cities.map((c) => (
                  <Pill
                    key={String(c.v)}
                    label={c.label}
                    selected={draft.city === c.v}
                    onClick={() => onChange({ ...draft, city: c.v })}
                  />
                ))}
              </Section>

              <Section title="Lease length">
                {leases.map((l) => (
                  <Pill
                    key={String(l.v)}
                    label={l.label}
                    selected={draft.lease === l.v}
                    onClick={() => onChange({ ...draft, lease: l.v })}
                  />
                ))}
              </Section>

              <Section title="Negotiable rent">
                {negotiables.map((n) => (
                  <Pill
                    key={String(n.v)}
                    label={n.label}
                    selected={draft.negotiable === n.v}
                    onClick={() => onChange({ ...draft, negotiable: n.v })}
                  />
                ))}
              </Section>
            </div>

            <div className="flex items-center gap-4 border-t border-sand/70 px-6 pb-6 pt-4">
              <button
                onClick={onClear}
                className="no-tap text-[13px] font-medium text-umber"
              >
                Clear all
              </button>
              <div className="flex-1">
                <Button full size="lg" onClick={onApply}>
                  See {resultCount} home{resultCount === 1 ? '' : 's'}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
