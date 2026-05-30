import { motion } from 'framer-motion';
import { ArrowRight, Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ComingSoon } from '../components/home/ComingSoon';
import { LeaseCalculatorSheet } from '../components/home/LeaseCalculatorSheet';
import { QuickFiltersMarquee } from '../components/home/QuickFilters';
import { RecentlyViewed } from '../components/home/RecentlyViewed';
import { TrustBlocks } from '../components/home/TrustBlocks';
import { Marquee } from '../components/ui/Marquee';
import { Footer } from '../components/layout/Footer';
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
import type { City, PropertyType } from '../lib/types';

const categories: { key: PropertyType; label: string; Icon: typeof IconApartment }[] = [
  { key: 'apartment', label: 'Apartment', Icon: IconApartment },
  { key: 'duplex', label: 'Duplex', Icon: IconDuplex },
  { key: 'self-con', label: 'Self-con', Icon: IconSelfCon },
  { key: 'bungalow', label: 'Bungalow', Icon: IconBungalow },
  { key: 'mini-flat', label: 'Mini-flat', Icon: IconMiniFlat },
];

const threeThings = [
  {
    n: '01',
    text: 'Every home is physically verified by our team before listing.',
    reverse: false,
  },
  {
    n: '02',
    text: 'Pay rent directly. No agency fees, no caution fees, no surprises.',
    reverse: true,
  },
  {
    n: '03',
    text: 'Lease drafted by our legal partners. Signed digitally. Yours to keep.',
    reverse: false,
  },
];

export const Home = () => {
  const [activeCategory, setActiveCategory] = useState<PropertyType | null>(null);
  const [city, setCity] = useState<City>('Lagos');
  const [calcOpen, setCalcOpen] = useState(false);
  const navigate = useNavigate();

  const featured = useMemo(
    () => properties.filter((p) => p.location.city === city && p.isFeatured),
    [city],
  );

  return (
    <PageTransition>
      <TopBar city={city} onCityChange={setCity} />

      {/* Hero */}
      <section className="px-6 pb-10 pt-8">
        <div className="caption">Find a home</div>
        <h1 className="mt-3 font-display text-hero font-medium text-ink">
          Homes you can{' '}
          <em className="font-display font-medium italic">settle</em> into.
        </h1>
        <p className="mt-4 max-w-[320px] text-[15px] leading-[1.55] text-ink-soft">
          Verified apartments and duplexes across Lagos, Abuja, and Ibadan. No agent
          runaround.
        </p>
        <button
          onClick={() => setCalcOpen(true)}
          className="no-tap mt-5 inline-flex h-9 items-center gap-1.5 rounded-btn bg-umber-soft px-3.5 text-[12px] font-medium text-umber"
        >
          Calculate what you can afford
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
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

      {/* Category row (auto-scroll left to right) */}
      <section className="mt-7">
        <Marquee direction="right" duration={42} gap={12}>
          {categories.map(({ key, label, Icon }) => {
            const active = activeCategory === key;
            return (
              <motion.button
                key={key}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15 }}
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
        </Marquee>
      </section>

      {/* Quick filters (auto-scroll right to left) */}
      <section className="mt-3">
        <QuickFiltersMarquee />
      </section>

      {/* Featured */}
      <section className="mt-12">
        <div className="px-6">
          <div className="caption">Verified this week</div>
          <h2 className="mt-2 font-display text-section font-medium">
            New listings in {city}
          </h2>
        </div>
        {featured.length > 0 ? (
          <motion.div
            variants={{
              hidden: {},
              show: { transition: { delayChildren: 0.1, staggerChildren: 0.05 } },
            }}
            initial="hidden"
            animate="show"
            className="mt-5 flex gap-4 overflow-x-auto px-6 pb-2 pr-8 scroll-hide"
          >
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} variant="feature" />
            ))}
          </motion.div>
        ) : (
          <p className="mt-4 px-6 text-[14px] text-ink-soft">
            Fresh homes in {city} drop weekly. Check back soon.
          </p>
        )}
      </section>

      {/* Coming soon (Abuja / Ibadan if limited) */}
      {city !== 'Lagos' && featured.length < 3 && <ComingSoon city={city} />}

      {/* Three things */}
      <section className="mt-12 px-6">
        <div className="caption">How it works</div>
        <h2 className="mt-2 font-display text-section font-medium">
          Three things we get right.
        </h2>

        <div className="mt-6 divide-y divide-sand/70">
          {threeThings.map(({ n, text, reverse }) => (
            <div
              key={n}
              className={`flex min-h-[100px] items-center gap-5 py-6 ${reverse ? 'flex-row-reverse' : ''}`}
            >
              <div className="w-[80px] flex-shrink-0 text-center">
                <span className="font-display text-[64px] font-medium italic leading-none text-umber">
                  {n}
                </span>
              </div>
              <p className={`max-w-[280px] text-[15px] leading-[1.5] text-ink ${reverse ? 'text-right' : ''}`}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Neighborhood */}
      <section className="mt-12 px-6">
        <div className="caption">Where to live</div>
        <h2 className="mt-2 font-display text-section font-medium">
          Lagos by neighborhood
        </h2>

        <div className="mt-5 space-y-3">
          {neighborhoods
            .filter((n) => n.size === 'large')
            .map((n) => (
              <Link
                key={n.name}
                to={n.slug ? `/neighborhood/${n.slug}` : '/search'}
                className="no-tap relative block h-[200px] w-full overflow-hidden rounded-card bg-cream"
              >
                <img
                  src={n.image}
                  alt={n.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,20,16,0.55)] to-transparent" />
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-paper">
                  <div className="font-display text-[18px] font-medium leading-tight">
                    {n.name}
                  </div>
                  <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.08em] opacity-70">
                    {n.listingCount} homes
                  </div>
                </div>
              </Link>
            ))}

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
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,20,16,0.55)] to-transparent" />
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-paper">
                    <div className="font-display text-[18px] font-medium leading-tight">
                      {n.name}
                    </div>
                    <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.08em] opacity-70">
                      {n.listingCount} homes
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Recently viewed (hides itself if empty) */}
      <RecentlyViewed />

      {/* Trust */}
      <section className="mt-12 px-6">
        <div className="rounded-card bg-cream">
          <TrustBlocks />
        </div>
      </section>

      <Footer />

      <LeaseCalculatorSheet open={calcOpen} onClose={() => setCalcOpen(false)} />
    </PageTransition>
  );
};
