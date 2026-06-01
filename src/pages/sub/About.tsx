import { PageTransition } from '../../components/layout/PageTransition';
import { SubPageHeader } from '../../components/layout/SubPageHeader';

export const About = () => (
  <PageTransition>
    <SubPageHeader eyebrow="Our story" title="Homes you can settle into." />
    <div className="px-6 pb-10 lg:mx-auto lg:max-w-2xl lg:pb-16">
      <p className="-mt-3 text-[16px] leading-[1.6] text-ink">
        Ben Lease was started in 2026 by a small team in Lagos who were tired of paying
        agency fees, caution fees, and inspection fees just to see a flat that turned
        out to be a scam.
      </p>
      <p className="mt-5 text-[15px] leading-[1.6] text-ink-soft">
        We thought renting a long-term home should feel like the slow, considered
        decision it is — not a sales funnel. So we built one platform with three
        promises: every home physically verified, rent paid directly to the landlord,
        and a lease drafted by lawyers.
      </p>

      <div className="mt-10 grid grid-cols-3 gap-3">
        <div className="rounded-card bg-cream py-5 text-center">
          <div className="font-display text-[24px] italic leading-none text-umber">
            200+
          </div>
          <div className="caption mt-2">Homes verified</div>
        </div>
        <div className="rounded-card bg-cream py-5 text-center">
          <div className="font-display text-[24px] italic leading-none text-umber">3</div>
          <div className="caption mt-2">Cities live</div>
        </div>
        <div className="rounded-card bg-cream py-5 text-center">
          <div className="font-display text-[24px] italic leading-none text-umber">
            12mo
          </div>
          <div className="caption mt-2">Minimum lease</div>
        </div>
      </div>

      <div className="mt-10">
        <div className="caption">What we believe</div>
        <ul className="mt-3 space-y-3 text-[15px] leading-[1.55] text-ink">
          <li>— A home should be earned with trust, not gatekept with fees.</li>
          <li>— Landlords and tenants both deserve a written record.</li>
          <li>— Every promise on a listing should be checked by a human.</li>
        </ul>
      </div>

      <div className="mt-10 border-t border-sand/70 pt-5 text-[12px] leading-[1.6] text-ink-faint">
        Ben Lease
        <br />
        Lagos, Nigeria
      </div>
    </div>
  </PageTransition>
);
