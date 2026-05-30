import { PageTransition } from '../../components/layout/PageTransition';
import { SubPageHeader } from '../../components/layout/SubPageHeader';

const terms = [
  {
    term: 'Annual rent',
    body: 'The full year of rent, usually paid up front in Nigeria. We negotiate split payment options with willing landlords.',
  },
  {
    term: 'Service charge',
    body: 'Covers shared costs — security, common-area maintenance, generator diesel, waste. Always shown on the listing.',
  },
  {
    term: 'Caution / damage deposit',
    body: 'A refundable amount held against any damage at the end of your lease. Typical: one month of rent.',
  },
  {
    term: 'Agency fee',
    body: '0% on Ben Lease. Most agents charge 10% of annual rent. We removed it entirely.',
  },
  {
    term: 'Legal fee',
    body: 'Covers drafting the lease. Included in your Ben Lease service charge — never an extra line item.',
  },
  {
    term: 'C of O (Certificate of Occupancy)',
    body: 'Proof the landlord legally owns the land. Required before we list a home.',
  },
  {
    term: 'Inspection',
    body: 'A scheduled visit to the home before you sign. Always free and never optional on Ben Lease.',
  },
  {
    term: 'Lease length',
    body: 'How long you commit to staying. Ben Lease starts at 12 months — short-term stays are not what we do.',
  },
];

export const LeaseTerms = () => (
  <PageTransition>
    <SubPageHeader eyebrow="The basics" title="Lease terms, explained." />
    <div className="px-6 pb-10">
      <p className="-mt-3 text-[15px] leading-[1.6] text-ink-soft">
        Renting in Nigeria comes with its own vocabulary. Here's what each line on your
        lease actually means.
      </p>

      <div className="mt-8 divide-y divide-sand/70">
        {terms.map((t) => (
          <div key={t.term} className="py-5">
            <h3 className="font-display text-[18px] leading-tight">{t.term}</h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-ink-soft">{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  </PageTransition>
);
