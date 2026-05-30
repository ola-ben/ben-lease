import { ArrowRight } from 'lucide-react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SubPageHeader } from '../../components/layout/SubPageHeader';

const benefits = [
  {
    title: 'Verified tenants only',
    body: 'Every applicant has uploaded ID and proof of income before they reach you. No timewasters.',
  },
  {
    title: 'Direct payment',
    body: 'Rent goes from the tenant straight to your account. We never hold your money.',
  },
  {
    title: 'Legal docs included',
    body: "Our lawyers draft and witness the lease. You don't pay for it — it's part of our service fee.",
  },
  {
    title: 'Lower vacancy',
    body: 'Active listings see first inspection requests within 72 hours on average.',
  },
];

export const Landlords = () => (
  <PageTransition>
    <SubPageHeader eyebrow="For landlords" title="List a home with us." />
    <div className="px-6 pb-10">
      <p className="-mt-3 text-[15px] leading-[1.6] text-ink-soft">
        A small, simple commission. Tenants who've been verified. Lease drafted by
        lawyers. We do the parts most landlords hate.
      </p>

      <div className="mt-7 space-y-3">
        {benefits.map((b) => (
          <div key={b.title} className="rounded-card bg-paper p-5 shadow-rest">
            <h3 className="font-display text-[18px] leading-tight">{b.title}</h3>
            <p className="mt-1.5 text-[14px] leading-[1.55] text-ink-soft">{b.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-card bg-umber-soft p-5">
        <div className="caption text-umber">Our cut</div>
        <div className="mt-2 font-display text-[24px] italic leading-tight text-ink">
          One month of rent. Paid only when your home is leased.
        </div>
        <p className="mt-3 text-[13px] leading-[1.55] text-ink-soft">
          No listing fees. No monthly fees. If we don't find you a tenant, you owe us
          nothing.
        </p>
      </div>

      <button className="no-tap mt-8 inline-flex h-12 w-full items-center justify-between rounded-btn bg-ink px-5 text-[14px] font-medium text-paper">
        List a home with us
        <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
      </button>

      <p className="mt-4 text-center text-[12px] text-ink-faint">
        Or email landlords@benlease.ng — we reply within 24 hours.
      </p>
    </div>
  </PageTransition>
);
