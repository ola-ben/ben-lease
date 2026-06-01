import { ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SubPageHeader } from '../../components/layout/SubPageHeader';

const faqs = [
  {
    q: 'How are homes verified?',
    a: 'A Ben Lease inspector visits each property in person, photographs every room, confirms ownership documents, and signs off only when the home meets our checklist. We re-verify every 12 months.',
  },
  {
    q: 'Do I pay any agent or caution fees?',
    a: 'No. Ben Lease is direct landlord pay. You see one annual rent figure and one transparent service charge — nothing else.',
  },
  {
    q: 'How long does an application take?',
    a: 'Landlords have 24 hours to respond. Inspections are usually scheduled within 3 days, and signed leases are typically ready within a week of approval.',
  },
  {
    q: 'Can I pay rent monthly?',
    a: 'Most Nigerian landlords require yearly payment. Some accept 6-month splits. We surface payment options on each listing.',
  },
  {
    q: 'What if I need to leave before my lease ends?',
    a: "We help you find a replacement tenant. If we find one within 30 days, you're released from the lease with no penalty.",
  },
];

export const Help = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <PageTransition>
      <SubPageHeader eyebrow="Help center" title="How can we help?" />
      <div className="px-6 pb-8 lg:mx-auto lg:max-w-2xl lg:pb-16">
        <div className="space-y-2">
          <div className="caption mb-2">Frequent questions</div>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <button
                key={f.q}
                onClick={() => setOpen(isOpen ? null : i)}
                className="no-tap block w-full rounded-card bg-paper text-left shadow-rest"
              >
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="pr-3 font-medium text-[14px]">{f.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 flex-shrink-0 text-ink-soft transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    strokeWidth={1.8}
                  />
                </div>
                {isOpen && (
                  <p className="px-5 pb-5 text-[14px] leading-[1.6] text-ink-soft">
                    {f.a}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <a
            href="https://wa.me/2348000000000"
            className="no-tap flex flex-col items-start gap-2 rounded-card bg-cream p-5"
          >
            <MessageCircle className="h-5 w-5 text-umber" strokeWidth={1.6} />
            <div>
              <div className="font-medium text-[14px]">WhatsApp</div>
              <div className="text-[12px] text-ink-soft">Mon–Sat, 9am–7pm</div>
            </div>
          </a>
          <a
            href="tel:+2348000000000"
            className="no-tap flex flex-col items-start gap-2 rounded-card bg-cream p-5"
          >
            <Phone className="h-5 w-5 text-umber" strokeWidth={1.6} />
            <div>
              <div className="font-medium text-[14px]">Call us</div>
              <div className="text-[12px] text-ink-soft">0800 LEASE NG</div>
            </div>
          </a>
        </div>
      </div>
    </PageTransition>
  );
};
