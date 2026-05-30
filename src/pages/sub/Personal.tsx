import { ChevronRight } from 'lucide-react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SubPageHeader } from '../../components/layout/SubPageHeader';

const rows = [
  { label: 'Full name', value: 'Adekunle Ojo' },
  { label: 'Phone', value: '0803 000 0000' },
  { label: 'Email', value: 'olaben09@gmail.com' },
  { label: 'Date of birth', value: '14 March 1992' },
  { label: 'Current employer', value: 'Freelance designer' },
  { label: 'Home address', value: '14 Bourdillon Road, Ikoyi' },
];

export const Personal = () => (
  <PageTransition>
    <SubPageHeader eyebrow="Your account" title="Personal details" />
    <div className="px-6 pb-8">
      <p className="-mt-4 mb-5 text-[14px] leading-[1.55] text-ink-soft">
        We share only the details a landlord needs to evaluate your lease — never your
        full record.
      </p>
      <div className="overflow-hidden rounded-card bg-paper shadow-rest">
        {rows.map((r, i) => (
          <button
            key={r.label}
            className={`no-tap flex w-full items-center justify-between px-5 py-4 text-left ${
              i < rows.length - 1 ? 'border-b border-sand/70' : ''
            }`}
          >
            <div>
              <div className="caption">{r.label}</div>
              <div className="mt-1 text-[14px] text-ink">{r.value}</div>
            </div>
            <ChevronRight className="h-4 w-4 text-ink-faint" strokeWidth={1.8} />
          </button>
        ))}
      </div>
    </div>
  </PageTransition>
);
