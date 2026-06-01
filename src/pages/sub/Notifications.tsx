import { useState } from 'react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SubPageHeader } from '../../components/layout/SubPageHeader';

const groups = [
  {
    label: 'Applications',
    items: [
      { id: 'app-update', name: 'Application status updates', on: true },
      { id: 'inspection', name: 'Inspection reminders', on: true },
      { id: 'lease-ready', name: 'Lease ready to sign', on: true },
    ],
  },
  {
    label: 'New listings',
    items: [
      { id: 'saved-area', name: 'Homes in areas you saved', on: true },
      { id: 'price-drop', name: 'Price drops on saved homes', on: false },
    ],
  },
  {
    label: 'Marketing',
    items: [
      { id: 'newsletter', name: 'Weekly Ben Lease digest', on: false },
      { id: 'partners', name: 'Partner offers (movers, cleaners)', on: false },
    ],
  },
];

const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`no-tap relative h-6 w-11 rounded-full transition-colors ${
      on ? 'bg-ink' : 'bg-sand'
    }`}
    aria-pressed={on}
  >
    <span
      className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper shadow-sm transition-all ${
        on ? 'left-[22px]' : 'left-0.5'
      }`}
    />
  </button>
);

export const Notifications = () => {
  const [state, setState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.flatMap((g) => g.items.map((i) => [i.id, i.on]))),
  );
  return (
    <PageTransition>
      <SubPageHeader eyebrow="Your account" title="Notifications" />
      <div className="px-6 pb-8 lg:mx-auto lg:max-w-2xl lg:pb-16">
        <p className="-mt-4 mb-6 text-[14px] leading-[1.55] text-ink-soft">
          You're in control. We'll only message you about things you've turned on.
        </p>
        <div className="space-y-6">
          {groups.map((g) => (
            <div key={g.label}>
              <div className="caption mb-2">{g.label}</div>
              <div className="overflow-hidden rounded-card bg-paper shadow-rest">
                {g.items.map((item, i) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between px-5 py-4 ${
                      i < g.items.length - 1 ? 'border-b border-sand/70' : ''
                    }`}
                  >
                    <div className="text-[14px]">{item.name}</div>
                    <Toggle
                      on={state[item.id]}
                      onChange={() => setState((s) => ({ ...s, [item.id]: !s[item.id] }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
