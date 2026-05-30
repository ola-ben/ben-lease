import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sheet } from '../ui/Sheet';

interface Props {
  city?: string;
  onCityChange?: (city: 'Lagos' | 'Abuja' | 'Ibadan') => void;
}

const CITIES: Array<'Lagos' | 'Abuja' | 'Ibadan'> = ['Lagos', 'Abuja', 'Ibadan'];

export const TopBar = ({ city = 'Lagos', onCityChange }: Props) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 h-14 transition-colors ${
        scrolled ? 'blur-bar bg-paper/80' : 'bg-paper'
      }`}
    >
      <div className="mx-auto flex h-full max-w-phone items-center justify-between px-6">
        <Link
          to="/"
          className="font-display text-[18px] font-medium leading-none tracking-wordmark text-ink"
        >
          ben lease
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onCityChange && setOpen(true)}
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

      {onCityChange && (
        <Sheet open={open} onClose={() => setOpen(false)} title="Choose your city">
          <div className="-mt-2 grid gap-2">
            {CITIES.map((c) => (
              <button
                key={c}
                onClick={() => {
                  onCityChange(c);
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
      )}
    </header>
  );
};
