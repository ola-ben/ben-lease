import { motion } from 'framer-motion';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { TopBar } from '../components/layout/TopBar';
import { PropertyCard } from '../components/property/PropertyCard';
import {
  IconApartment,
  IconBungalow,
  IconDuplex,
  IconMiniFlat,
  IconSelfCon,
} from '../icons/CategoryIcons';
import { neighborhoods, properties } from '../lib/mock-data';
import type { PropertyType } from '../lib/types';

const categories: { key: PropertyType; label: string; Icon: typeof IconApartment }[] = [
  { key: 'apartment', label: 'Apartment', Icon: IconApartment },
  { key: 'duplex', label: 'Duplex', Icon: IconDuplex },
  { key: 'self-con', label: 'Self-con', Icon: IconSelfCon },
  { key: 'bungalow', label: 'Bungalow', Icon: IconBungalow },
  { key: 'mini-flat', label: 'Mini-flat', Icon: IconMiniFlat },
];

const featured = properties.filter((p) => p.isFeatured);

export const Home = () => {
  const [activeCategory, setActiveCategory] = useState<PropertyType | null>(null);
  const navigate = useNavigate();

  return (
    <PageTransition>
      <TopBar />

      {/* Hero */}
      <section className="px-6 pb-8 pt-8">
        <div className="caption">Find a home</div>
        <h1 className="mt-3 font-display text-hero font-medium text-ink">
          Homes you can{' '}
          <em className="font-display font-medium italic">settle</em> into.
        </h1>
        <p className="mt-4 max-w-[320px] text-[15px] leading-[1.6] text-ink-soft">
          Verified apartments and duplexes across Lagos, Abuja, and Ibadan. No agent
          runaround.
        </p>
      </section>

      {/* Search bar */}
      <section className="px-6">
        <button
          onClick={() => navigate('/search')}
          className="no-tap flex h-14 w-full items-center rounded-btn bg-cream px-4 text-left"
        >
          <SearchIcon className="h-[18px] w-[18px] flex-shrink-0 text-ink-soft" strokeWidth={1.8} />
          <div className="ml-3 flex flex-1 items-center">
            <div className="flex flex-1 flex-col">
              <span className="caption text-[10px] tracking-[0.1em]">Area</span>
              <span className="text-[13px] text-ink-soft">Lekki, Yaba, Maitama...</span>
            </div>
            <div className="divider-v mx-3 h-8" />
            <div className="flex flex-1 flex-col">
              <span className="caption text-[10px] tracking-[0.1em]">Budget</span>
              <span className="text-[13px] text-ink-soft">₦500k – ₦5M</span>
            </div>
          </div>
          <SlidersHorizontal
            className="ml-2 h-[18px] w-[18px] flex-shrink-0 text-ink-soft"
            strokeWidth={1.8}
          />
        </button>
      </section>

      {/* Category row */}
      <section className="mt-8">
        <div className="flex gap-3 overflow-x-auto px-6 pb-1 scroll-hide">
          {categories.map(({ key, label, Icon }) => {
            const active = activeCategory === key;
            return (
              <motion.button
                key={key}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(active ? null : key)}
                className={`no-tap flex w-[88px] flex-shrink-0 flex-col items-center justify-center gap-1.5 rounded-card py-3 transition-colors ${
                  active ? 'bg-ink text-paper' : 'bg-cream text-ink'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-[11px] font-medium uppercase tracking-[0.08em]">
                  {label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="mt-12">
        <div className="px-6">
          <div className="caption">Verified this week</div>
          <h2 className="mt-2 font-display text-section font-medium">
            New listings in Lagos
          </h2>
        </div>
        <motion.div
          variants={{
            hidden: {},
            show: { transition: { delayChildren: 0.1, staggerChildren: 0.05 } },
          }}
          initial="hidden"
          animate="show"
          className="mt-5 flex gap-4 overflow-x-auto px-6 pb-2 scroll-hide"
        >
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} variant="feature" />
          ))}
          <div className="w-1 flex-shrink-0" />
        </motion.div>
      </section>

      {/* Why Ben Lease */}
      <section className="mt-16 px-6">
        <div className="caption">How it works</div>
        <h2 className="mt-2 font-display text-section font-medium">
          Three things we get right.
        </h2>

        <div className="mt-8 space-y-10">
          {[
            {
              n: '01',
              text: 'Every home is physically verified by our team before listing.',
              right: true,
            },
            {
              n: '02',
              text: 'Pay rent directly. No agency fees, no caution fees, no surprises.',
              right: false,
            },
            {
              n: '03',
              text: 'Lease drafted by our legal partners. Signed digitally. Yours to keep.',
              right: true,
            },
          ].map(({ n, text, right }) => (
            <div
              key={n}
              className={`flex items-center gap-5 ${right ? '' : 'flex-row-reverse'}`}
            >
              <div className="flex-shrink-0">
                <span className="font-display text-[64px] italic leading-none text-umber">
                  {n}
                </span>
              </div>
              <p className={`text-[16px] leading-[1.5] text-ink ${right ? '' : 'text-right'}`}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Neighborhood */}
      <section className="mt-16 px-6">
        <div className="caption">Where to live</div>
        <h2 className="mt-2 font-display text-section font-medium">
          Lagos by neighborhood
        </h2>

        <div className="mt-5 space-y-3">
          {/* Large */}
          {neighborhoods
            .filter((n) => n.size === 'large')
            .map((n) => (
              <Link
                key={n.name}
                to="/search"
                className="no-tap relative block h-[200px] w-full overflow-hidden rounded-card bg-cream"
              >
                <img
                  src={n.image}
                  alt={n.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-paper">
                  <div className="font-display text-[22px] font-medium leading-tight">
                    {n.name}
                  </div>
                  <div className="mt-1 text-[12px] uppercase tracking-[0.1em] opacity-80">
                    {n.listingCount} homes
                  </div>
                </div>
              </Link>
            ))}

          {/* Small grid */}
          <div className="grid grid-cols-2 gap-3">
            {neighborhoods
              .filter((n) => n.size === 'small')
              .map((n) => (
                <Link
                  key={n.name}
                  to="/search"
                  className="no-tap relative block h-[140px] overflow-hidden rounded-card bg-cream"
                >
                  <img
                    src={n.image}
                    alt={n.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-paper">
                    <div className="font-display text-[18px] font-medium leading-tight">
                      {n.name}
                    </div>
                    <div className="mt-0.5 text-[11px] uppercase tracking-[0.1em] opacity-80">
                      {n.listingCount} homes
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="mt-16 px-6">
        <div className="flex items-center justify-center gap-4 py-8 text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          <span>200+ verified homes</span>
          <span className="h-3 w-px bg-sand" />
          <span>Direct landlord pay</span>
          <span className="h-3 w-px bg-sand" />
          <span>Legal docs included</span>
        </div>
      </section>
    </PageTransition>
  );
};
