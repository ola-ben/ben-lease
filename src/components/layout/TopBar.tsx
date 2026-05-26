import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const TopBar = ({ city = 'Lagos' }: { city?: string }) => {
  const [scrolled, setScrolled] = useState(false);
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
          <button className="no-tap flex h-9 items-center gap-1 rounded-btn bg-cream px-3 text-[13px] font-medium text-ink">
            {city}
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-umber-soft font-display text-[14px] font-medium text-umber"
            aria-label="Profile"
          >
            A
          </div>
        </div>
      </div>
    </header>
  );
};
