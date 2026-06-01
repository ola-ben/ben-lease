import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet } from '../ui/Sheet';

const navLinks = [
  {
    to: '/',
    label: 'Browse',
    match: (p: string) =>
      p === '/' || p.startsWith('/search') || p.startsWith('/listing'),
  },
  {
    to: '/saved',
    label: 'Saved',
    match: (p: string) => p.startsWith('/saved') || p.startsWith('/compare'),
  },
  {
    to: '/applications',
    label: 'Applications',
    match: (p: string) =>
      p.startsWith('/applications') ||
      p.startsWith('/apply') ||
      p.startsWith('/book'),
  },
  {
    to: '/landlords',
    label: 'For landlords',
    match: (p: string) => p.startsWith('/landlords'),
  },
];

type City = 'Lagos' | 'Abuja' | 'Ibadan';
const CITIES: City[] = ['Lagos', 'Abuja', 'Ibadan'];

export const TopNav = () => {
  const { pathname } = useLocation();
  const [city, setCity] = useState<City>('Lagos');
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 hidden border-b border-sand/70 bg-paper/95 backdrop-blur lg:block">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-10">
        <Link
          to="/"
          className="font-display text-[20px] font-medium leading-none tracking-wordmark text-ink"
        >
          ben lease
        </Link>

        <nav className="flex items-center gap-8">
          {navLinks.map(({ to, label, match }) => {
            const active = match(pathname);
            return (
              <Link
                key={to}
                to={to}
                className={`text-[14px] font-medium transition-colors ${
                  active ? 'text-ink' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="no-tap flex h-9 items-center gap-1 rounded-btn bg-cream px-3 text-[13px] font-medium text-ink"
          >
            {city}
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          <Link
            to="/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-umber-soft font-display text-[14px] font-medium text-umber"
            aria-label="Profile"
          >
            A
          </Link>
        </div>
      </div>

      <Sheet open={open} onClose={() => setOpen(false)} title="Choose your city">
        <div className="-mt-2 grid gap-2">
          {CITIES.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCity(c);
                setOpen(false);
              }}
              className={`no-tap flex h-14 items-center justify-between rounded-btn px-5 text-left text-[15px] font-medium transition-colors ${
                c === city ? 'bg-ink text-paper' : 'bg-cream text-ink'
              }`}
            >
              <span>{c}</span>
              <span
                className={`text-[11px] uppercase tracking-[0.08em] ${
                  c === city ? 'text-paper/70' : 'text-ink-faint'
                }`}
              >
                {c === 'Lagos' ? 'Most homes' : c === 'Abuja' ? 'Growing' : 'New'}
              </span>
            </button>
          ))}
        </div>
      </Sheet>
    </header>
  );
};
