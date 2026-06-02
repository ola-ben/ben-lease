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
      <section className="relative overflow-hidden">
        {/* Background image + paper gradient overlay */}
        <div className="pointer-events-none absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1800&q=80"
            alt=""
            className="h-full w-full object-cover opacity-80 lg:opacity-100"
            loading="eager"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-paper/60 via-paper/55 to-paper lg:bg-gradient-to-r lg:from-paper/90 lg:via-paper/40 lg:to-transparent"
          />
        </div>

        {/* Content */}
        <div className="relative px-6 pb-12 pt-10 lg:mx-auto lg:max-w-7xl lg:px-10 lg:pb-24 lg:pt-28">
          <div className="lg:max-w-[680px]">
            <div className="caption">Find a home</div>
            <h1 className="mt-3 font-display text-hero font-medium text-ink lg:text-[80px] lg:leading-[1.02] lg:tracking-[-0.03em]">
              Homes you can{' '}
              <em className="font-display font-medium italic">settle</em> into.
            </h1>
            <p className="mt-4 max-w-[320px] text-[15px] leading-[1.55] text-ink-soft lg:mt-6 lg:max-w-[520px] lg:text-[18px] lg:leading-[1.5]">
              Verified apartments and duplexes across Lagos, Abuja, and Ibadan. No agent
              runaround.
            </p>
            <button
              onClick={() => setCalcOpen(true)}
              className="no-tap mt-5 inline-flex h-9 items-center gap-1.5 rounded-btn bg-umber-soft px-3.5 text-[12px] font-medium text-umber lg:mt-7 lg:h-11 lg:px-4 lg:text-[13px]"
            >
              Calculate what you can afford
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </button>

            {/* Search bar — inside the hero */}
            <button
              onClick={() => navigate('/search')}
              className="no-tap mt-8 flex h-14 w-full items-center rounded-btn bg-paper/95 px-4 text-left shadow-rest backdrop-blur-sm lg:mt-10 lg:h-16"
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
                  <span className="text-[13px] text-ink-soft">₦5k – ₦25k</span>
                </div>
              </div>
              <SlidersHorizontal
                className="ml-2 h-[18px] w-[18px] flex-shrink-0 text-ink-soft"
                strokeWidth={1.8}
              />
            </button>
          </div>

          {/* Desktop floating credit pill */}
          <div className="absolute right-10 top-28 hidden lg:flex lg:items-center lg:gap-2 lg:rounded-full lg:bg-paper/85 lg:px-3.5 lg:py-2 lg:shadow-rest lg:backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-verified" />
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-soft">
              Lekki Phase 1, Lagos
            </span>
          </div>
        </div>
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
      <section className="mt-12 lg:mx-auto lg:mt-20 lg:max-w-7xl lg:px-10">
        <div className="px-6 lg:px-0">
          <div className="caption">Verified this week</div>
          <h2 className="mt-2 font-display text-section font-medium lg:text-[34px]">
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
            className="mt-5 flex gap-4 overflow-x-auto px-6 pb-2 pr-8 scroll-hide lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pr-0"
          >
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} variant="feature" />
            ))}
          </motion.div>
        ) : (
          <p className="mt-4 px-6 text-[14px] text-ink-soft lg:px-0">
            Fresh homes in {city} drop weekly. Check back soon.
          </p>
        )}
      </section>

      {/* Coming soon (Abuja / Ibadan if limited) */}
      {city !== 'Lagos' && featured.length < 3 && <ComingSoon city={city} />}

      {/* Three things */}
      <section className="mt-12 px-6 lg:mx-auto lg:mt-24 lg:max-w-7xl lg:px-10">
        <div className="caption">How it works</div>
        <h2 className="mt-2 font-display text-section font-medium lg:text-[34px]">
          Three things we get right.
        </h2>

        <div className="mt-6 divide-y divide-sand/70 lg:mt-10 lg:grid lg:grid-cols-3 lg:gap-10 lg:divide-y-0">
          {threeThings.map(({ n, text, reverse }) => (
            <div
              key={n}
              className={`flex min-h-[100px] items-center gap-5 py-6 lg:block lg:py-0 ${reverse ? 'flex-row-reverse lg:flex-row' : ''}`}
            >
              <div className="w-[80px] flex-shrink-0 text-center lg:w-auto lg:text-left">
                <span className="font-display text-[64px] font-medium italic leading-none text-umber lg:text-[80px]">
                  {n}
                </span>
              </div>
              <p className={`max-w-[280px] text-[15px] leading-[1.5] text-ink lg:mt-4 lg:max-w-none lg:text-left lg:text-[16px] lg:leading-[1.55] ${reverse ? 'text-right' : ''}`}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Neighborhood */}
      <section className="mt-12 px-6 lg:mx-auto lg:mt-24 lg:max-w-7xl lg:px-10">
        <div className="caption">Where to live</div>
        <h2 className="mt-2 font-display text-section font-medium lg:text-[34px]">
          Lagos by neighborhood
        </h2>

        <div className="mt-5 space-y-3 lg:mt-10 lg:grid lg:grid-cols-4 lg:gap-5 lg:space-y-0">
          {neighborhoods
            .filter((n) => n.size === 'large')
            .map((n) => (
              <Link
                key={n.name}
                to={n.slug ? `/neighborhood/${n.slug}` : '/search'}
                className="no-tap relative block h-[200px] w-full overflow-hidden rounded-card bg-cream lg:col-span-2 lg:h-[280px]"
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

          <div className="grid grid-cols-2 gap-3 lg:contents">
            {neighborhoods
              .filter((n) => n.size === 'small')
              .map((n) => (
                <Link
                  key={n.name}
                  to={n.slug ? `/neighborhood/${n.slug}` : '/search'}
                  className="no-tap relative block h-[140px] overflow-hidden rounded-card bg-cream lg:h-[280px]"
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
      <section className="mt-12 px-6 lg:mx-auto lg:mt-24 lg:max-w-7xl lg:px-10">
        <div className="rounded-card bg-cream lg:py-4">
          <TrustBlocks />
        </div>
      </section>

      <Footer />

      <LeaseCalculatorSheet open={calcOpen} onClose={() => setCalcOpen(false)} />
    </PageTransition>
  );
};
