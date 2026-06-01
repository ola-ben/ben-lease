import { Link } from 'react-router-dom';

const links = [
  { label: 'How verification works', to: '/verification' },
  { label: 'Lease terms explained', to: '/lease-terms' },
  { label: 'For landlords', to: '/landlords' },
  { label: 'Contact us', to: '/contact' },
];

export const Footer = () => (
  <footer className="mt-16 border-t border-sand/70 px-6 pb-8 pt-10 lg:mt-24 lg:pt-16">
    <div className="lg:mx-auto lg:flex lg:max-w-7xl lg:items-start lg:justify-between lg:px-10">
      <div className="lg:max-w-sm">
        <div className="font-display text-[18px] tracking-wordmark text-ink">ben lease</div>
        <div className="mt-1 text-[13px] text-ink-soft">Homes you can settle into.</div>
        <div className="mt-4 text-[12px] leading-[1.6] text-ink-faint">
          Verified long-term rentals across Lagos, Abuja and Ibadan. Direct landlord
          pay, lease drafted by lawyers, every home inspected by our team.
        </div>
      </div>

      <ul className="mt-6 space-y-3 lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-3 lg:space-y-0">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-[13px] font-medium text-ink hover:text-umber">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-8 border-t border-sand/70 pt-4 text-[11px] leading-[1.6] text-ink-faint lg:mx-auto lg:max-w-7xl lg:px-10">
      © 2026 Ben Lease &nbsp;·&nbsp; Lagos, Nigeria
    </div>
  </footer>
);
