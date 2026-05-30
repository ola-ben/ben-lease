import { Link } from 'react-router-dom';

const links = [
  { label: 'How verification works', to: '/verification' },
  { label: 'Lease terms explained', to: '/lease-terms' },
  { label: 'For landlords', to: '/landlords' },
  { label: 'Contact us', to: '/contact' },
];

export const Footer = () => (
  <footer className="mt-16 px-6 pb-8">
    <div className="font-display text-[16px] tracking-wordmark text-ink">ben lease</div>
    <div className="mt-1 text-[12px] text-ink-soft">Homes you can settle into.</div>

    <ul className="mt-6 space-y-3">
      {links.map((l) => (
        <li key={l.to}>
          <Link to={l.to} className="text-[13px] font-medium text-ink">
            {l.label}
          </Link>
        </li>
      ))}
    </ul>

    <div className="mt-6 border-t border-sand/70 pt-4 text-[11px] leading-[1.6] text-ink-faint">
      © 2026 Ben Lease &nbsp;·&nbsp; Lagos, Nigeria
    </div>
  </footer>
);
