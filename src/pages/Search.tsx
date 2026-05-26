import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { PropertyCard } from '../components/property/PropertyCard';
import { EmptyDoorway } from '../icons/Empty';
import { properties } from '../lib/mock-data';

const chips = ['Budget', 'Bedrooms', 'Type', 'Furnished', 'Area', 'Lease length'];

export const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (!query) return properties;
    const q = query.toLowerCase();
    return properties.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.location.area.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q),
    );
  }, [query]);

  const toggle = (c: string) =>
    setActive((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));

  return (
    <PageTransition>
      <header className="sticky top-0 z-30 blur-bar bg-paper/85">
        <div className="flex h-14 items-center gap-3 px-6">
          <button onClick={() => navigate(-1)} className="no-tap -ml-2 p-2">
            <ArrowLeft className="h-5 w-5" strokeWidth={1.8} />
          </button>
          <div className="flex h-10 flex-1 items-center gap-2 rounded-btn bg-cream px-3">
            <SearchIcon className="h-4 w-4 text-ink-soft" strokeWidth={1.8} />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Lekki, Yaba, Maitama..."
              className="w-full bg-transparent text-[14px] outline-none placeholder:text-ink-faint"
            />
          </div>
          <button className="no-tap flex h-10 w-10 items-center justify-center rounded-btn bg-cream">
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto px-6 pb-3 scroll-hide">
          {chips.map((c) => {
            const isOn = active.includes(c);
            return (
              <button
                key={c}
                onClick={() => toggle(c)}
                className={`no-tap flex h-8 flex-shrink-0 items-center gap-1.5 rounded-btn px-3 text-[12px] font-medium transition-colors ${
                  isOn ? 'bg-ink text-paper' : 'bg-paper text-ink ring-1 ring-sand'
                }`}
              >
                {c}
                <ChevronDown className="h-3 w-3" strokeWidth={2} />
              </button>
            );
          })}
        </div>
      </header>

      <div className="flex items-center justify-between px-6 pt-5">
        <div className="caption">{filtered.length} homes</div>
        <button className="flex items-center gap-1 text-[12px] font-medium text-ink-soft">
          Newest first <ChevronDown className="h-3 w-3" strokeWidth={2} />
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-20 text-center">
          <EmptyDoorway className="text-sand" />
          <p className="mt-6 max-w-[260px] text-[15px] leading-[1.5] text-ink-soft">
            No homes match. Loosen a filter to see more.
          </p>
        </div>
      ) : (
        <motion.div
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.04 } },
          }}
          initial="hidden"
          animate="show"
          className="space-y-4 px-6 py-5"
        >
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <PropertyCard property={p} variant={i % 3 === 0 ? 'wide' : 'compact'} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </PageTransition>
  );
};
