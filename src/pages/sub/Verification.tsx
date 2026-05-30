import { PageTransition } from '../../components/layout/PageTransition';
import { SubPageHeader } from '../../components/layout/SubPageHeader';

const steps = [
  {
    n: '01',
    title: 'Landlord submits the home',
    body: 'We collect ownership documents, photos, and lease terms. No listing goes live yet.',
  },
  {
    n: '02',
    title: 'Document review',
    body: 'Our team confirms the Certificate of Occupancy or registered title against state records. Forgeries are rejected.',
  },
  {
    n: '03',
    title: 'In-person inspection',
    body: 'An inspector visits the home, walks every room, tests utilities (power, water, security), and photographs everything in natural light.',
  },
  {
    n: '04',
    title: 'Tenant-readable report',
    body: "We publish what we saw — including what's broken. Every listing carries the inspector's name and date.",
  },
];

export const Verification = () => (
  <PageTransition>
    <SubPageHeader eyebrow="How it works" title="How verification works." />
    <div className="px-6 pb-10">
      <p className="-mt-3 text-[15px] leading-[1.6] text-ink-soft">
        Most rental scams in Nigeria succeed because nobody ever visits the home.
        Verification is the single most important thing we do.
      </p>

      <div className="mt-8 space-y-6">
        {steps.map((s) => (
          <div key={s.n} className="flex gap-5">
            <div className="w-[60px] flex-shrink-0">
              <span className="font-display text-[40px] italic leading-none text-umber">
                {s.n}
              </span>
            </div>
            <div className="flex-1 border-l border-sand/80 pl-5">
              <h3 className="font-display text-[18px] leading-tight">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-ink-soft">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-card bg-cream p-5">
        <div className="caption">Re-verification</div>
        <p className="mt-2 text-[14px] leading-[1.55] text-ink">
          Every home is re-inspected every 12 months. If conditions change, the listing
          is paused until it meets the checklist again.
        </p>
      </div>
    </div>
  </PageTransition>
);
