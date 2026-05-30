import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  List,
  Map as MapIcon,
  Search as SearchIcon,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { PropertyCard } from '../components/property/PropertyCard';
import { AllFiltersSheet } from '../components/search/AllFiltersSheet';
import type { FilterState } from '../components/search/AllFiltersSheet';
import { MapView } from '../components/search/MapView';
import { Sheet } from '../components/ui/Sheet';
import { EmptyDoorway } from '../icons/Empty';
import { formatNairaShort } from '../lib/format';
import { properties } from '../lib/mock-data';
import type { City, Property, PropertyType } from '../lib/types';

const defaultFilters: FilterState = {
  budgetMax: null,
  beds: null,
  type: null,
  furnished: null,
  city: null,
  lease: null,
  negotiable: null,
};

const budgetOptions: { value: number | null; label: string }[] = [
  { value: null, label: 'Any budget' },
  { value: 5_000, label: 'Under ₦5,000/year' },
  { value: 10_000, label: 'Under ₦10,000/year' },
  { value: 15_000, label: 'Under ₦15,000/year' },
  { value: 20_000, label: 'Under ₦20,000/year' },
  { value: 30_000, label: 'Under ₦30,000/year' },
];

const bedOptions: { value: number | null; label: string }[] = [
  { value: null, label: 'Any' },
  { value: 1, label: '1 bedroom' },
  { value: 2, label: '2 bedrooms' },
  { value: 3, label: '3 bedrooms' },
  { value: 4, label: '4+ bedrooms' },
];

const typeOptions: { value: PropertyType | null; label: string }[] = [
  { value: null, label: 'Any type' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'duplex', label: 'Duplex' },
  { value: 'self-con', label: 'Self-con' },
  { value: 'bungalow', label: 'Bungalow' },
  { value: 'mini-flat', label: 'Mini-flat' },
];

const furnishedOptions: { value: boolean | null; label: string }[] = [
  { value: null, label: 'Either' },
  { value: true, label: 'Furnished' },
  { value: false, label: 'Unfurnished' },
];

const cityOptions: { value: City | null; label: string }[] = [
  { value: null, label: 'All cities' },
  { value: 'Lagos', label: 'Lagos' },
  { value: 'Abuja', label: 'Abuja' },
  { value: 'Ibadan', label: 'Ibadan' },
];

const leaseOptions: { value: number | null; label: string }[] = [
  { value: null, label: 'Any length' },
  { value: 12, label: '12 months' },
  { value: 24, label: '24 months' },
];

const matches = (p: Property, f: FilterState, q: string): boolean => {
  if (f.budgetMax !== null && p.pricePerYear > f.budgetMax) return false;
  if (f.beds !== null) {
    if (f.beds === 4 ? p.bedrooms < 4 : p.bedrooms !== f.beds) return false;
  }
  if (f.type !== null && p.type !== f.type) return false;
  if (f.furnished !== null && p.furnished !== f.furnished) return false;
  if (f.city !== null && p.location.city !== f.city) return false;
  if (f.lease !== null && p.leaseMonthsMin !== f.lease) return false;
  if (f.negotiable === true && !p.isNegotiable) return false;
  if (q) {
    const ql = q.toLowerCase();
    const hay = `${p.name} ${p.location.area} ${p.location.city} ${p.type}`.toLowerCase();
    if (!hay.includes(ql)) return false;
  }
  return true;
};

export const Search = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [openFilter, setOpenFilter] = useState<keyof FilterState | null>(null);
  const [allOpen, setAllOpen] = useState(false);
  const [draft, setDraft] = useState<FilterState>(defaultFilters);
  const [view, setView] = useState<'list' | 'map'>('list');

  useEffect(() => {
    if (allOpen) setDraft(filters);
  }, [allOpen, filters]);

  const draftedCount = useMemo(
    () => properties.filter((p) => matches(p, draft, query)).length,
    [draft, query],
  );

  useEffect(() => {
    const next: FilterState = { ...defaultFilters };
    const max = params.get('max');
    const beds = params.get('beds');
    const type = params.get('type');
    const furnished = params.get('furnished');
    const city = params.get('city');
    const lease = params.get('lease');
    const negotiable = params.get('negotiable');
    if (max) next.budgetMax = Number(max);
    if (beds) next.beds = Number(beds);
    if (type) next.type = type as PropertyType;
    if (furnished === 'true') next.furnished = true;
    if (furnished === 'false') next.furnished = false;
    if (city) next.city = city as City;
    if (lease) next.lease = Number(lease);
    if (negotiable === 'true') next.negotiable = true;
    setFilters(next);
  }, [params]);

  const filtered = useMemo(
    () => properties.filter((p) => matches(p, filters, query)),
    [filters, query],
  );

  const activeCount = Object.values(filters).filter((v) => v !== null).length;
  const clearAll = () => setFilters(defaultFilters);

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
              placeholder="Lekki, Yaba, Bodija..."
              className="w-full bg-transparent text-[14px] outline-none placeholder:text-ink-faint"
            />
            {query && (
              <button onClick={() => setQuery('')} className="no-tap text-ink-soft">
                <X className="h-4 w-4" strokeWidth={1.8} />
              </button>
            )}
          </div>
          <button
            onClick={() => setAllOpen(true)}
            aria-label="All filters"
            className="no-tap relative flex h-10 w-10 items-center justify-center rounded-btn bg-cream"
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.8} />
            {activeCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-umber px-1 text-[10px] font-semibold text-paper">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto px-6 pb-3 pr-8 scroll-hide">
          <FilterChip
            label="Budget"
            value={filters.budgetMax ? `Under ${formatNairaShort(filters.budgetMax)}` : null}
            onClick={() => setOpenFilter('budgetMax')}
            onClear={() => setFilters({ ...filters, budgetMax: null })}
          />
          <FilterChip
            label="Bedrooms"
            value={
              filters.beds === null
                ? null
                : filters.beds === 4
                  ? '4+ bedrooms'
                  : `${filters.beds} bedroom${filters.beds > 1 ? 's' : ''}`
            }
            onClick={() => setOpenFilter('beds')}
            onClear={() => setFilters({ ...filters, beds: null })}
          />
          <FilterChip
            label="Type"
            value={filters.type ? (typeOptions.find((t) => t.value === filters.type)?.label ?? null) : null}
            onClick={() => setOpenFilter('type')}
            onClear={() => setFilters({ ...filters, type: null })}
          />
          <FilterChip
            label="Furnished"
            value={
              filters.furnished === null
                ? null
                : filters.furnished
                  ? 'Furnished'
                  : 'Unfurnished'
            }
            onClick={() => setOpenFilter('furnished')}
            onClear={() => setFilters({ ...filters, furnished: null })}
          />
          <FilterChip
            label="Area"
            value={filters.city ?? null}
            onClick={() => setOpenFilter('city')}
            onClear={() => setFilters({ ...filters, city: null })}
          />
          <FilterChip
            label="Lease"
            value={filters.lease ? `${filters.lease} months` : null}
            onClick={() => setOpenFilter('lease')}
            onClear={() => setFilters({ ...filters, lease: null })}
          />
          <NegotiableChip
            active={filters.negotiable === true}
            onToggle={() =>
              setFilters({
                ...filters,
                negotiable: filters.negotiable === true ? null : true,
              })
            }
          />
        </div>
      </header>

      <div className="flex items-center justify-between gap-3 px-6 pt-5">
        <div className="caption flex-1">
          {filtered.length} home{filtered.length === 1 ? '' : 's'}
          {filters.city && ` in ${filters.city}`}
        </div>
        <div className="flex h-8 items-center rounded-btn bg-cream p-0.5">
          <button
            onClick={() => setView('list')}
            className={`no-tap flex h-7 items-center gap-1 rounded-[10px] px-2.5 text-[11px] font-medium transition-colors ${
              view === 'list' ? 'bg-paper text-ink shadow-rest' : 'text-ink-soft'
            }`}
          >
            <List className="h-3.5 w-3.5" strokeWidth={1.8} />
            List
          </button>
          <button
            onClick={() => setView('map')}
            className={`no-tap flex h-7 items-center gap-1 rounded-[10px] px-2.5 text-[11px] font-medium transition-colors ${
              view === 'map' ? 'bg-paper text-ink shadow-rest' : 'text-ink-soft'
            }`}
          >
            <MapIcon className="h-3.5 w-3.5" strokeWidth={1.8} />
            Map
          </button>
        </div>
        {activeCount > 0 ? (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-[12px] font-medium text-umber"
          >
            Clear
          </button>
        ) : (
          <button className="flex items-center gap-1 text-[12px] font-medium text-ink-soft">
            <ChevronDown className="h-3 w-3" strokeWidth={2} />
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-20 text-center">
          <EmptyDoorway className="text-sand" />
          <p className="mt-6 max-w-[260px] text-[15px] leading-[1.5] text-ink-soft">
            No homes match. Loosen a filter to see more.
          </p>
          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="mt-5 rounded-btn bg-ink px-5 py-2.5 text-[13px] font-medium text-paper"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : view === 'map' ? (
        <div className="mt-4">
          <MapView properties={filtered} />
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

      <FilterOptionsSheet
        title="Budget"
        options={budgetOptions}
        selected={filters.budgetMax}
        open={openFilter === 'budgetMax'}
        onClose={() => setOpenFilter(null)}
        onSelect={(v) => setFilters({ ...filters, budgetMax: v as number | null })}
      />
      <FilterOptionsSheet
        title="Bedrooms"
        options={bedOptions}
        selected={filters.beds}
        open={openFilter === 'beds'}
        onClose={() => setOpenFilter(null)}
        onSelect={(v) => setFilters({ ...filters, beds: v as number | null })}
      />
      <FilterOptionsSheet
        title="Type"
        options={typeOptions}
        selected={filters.type}
        open={openFilter === 'type'}
        onClose={() => setOpenFilter(null)}
        onSelect={(v) => setFilters({ ...filters, type: v as PropertyType | null })}
      />
      <FilterOptionsSheet
        title="Furnished"
        options={furnishedOptions}
        selected={filters.furnished}
        open={openFilter === 'furnished'}
        onClose={() => setOpenFilter(null)}
        onSelect={(v) => setFilters({ ...filters, furnished: v as boolean | null })}
      />
      <FilterOptionsSheet
        title="Area"
        options={cityOptions}
        selected={filters.city}
        open={openFilter === 'city'}
        onClose={() => setOpenFilter(null)}
        onSelect={(v) => setFilters({ ...filters, city: v as City | null })}
      />
      <FilterOptionsSheet
        title="Lease length"
        options={leaseOptions}
        selected={filters.lease}
        open={openFilter === 'lease'}
        onClose={() => setOpenFilter(null)}
        onSelect={(v) => setFilters({ ...filters, lease: v as number | null })}
      />

      <AllFiltersSheet
        open={allOpen}
        draft={draft}
        onChange={setDraft}
        onClose={() => setAllOpen(false)}
        onClear={() => setDraft(defaultFilters)}
        onApply={() => {
          setFilters(draft);
          setAllOpen(false);
        }}
        resultCount={draftedCount}
      />
    </PageTransition>
  );
};

interface FilterChipProps {
  label: string;
  value: string | null;
  onClick: () => void;
  onClear: () => void;
}

const NegotiableChip = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className={`no-tap flex h-8 flex-shrink-0 items-center gap-1.5 rounded-btn px-3 text-[12px] font-medium transition-colors ${
      active ? 'bg-umber text-paper' : 'bg-paper text-ink ring-1 ring-sand'
    }`}
  >
    {active && (
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-paper" />
    )}
    Negotiable
  </button>
);

const FilterChip = ({ label, value, onClick, onClear }: FilterChipProps) => {
  const active = value !== null;
  return (
    <div className="flex flex-shrink-0">
      <button
        onClick={onClick}
        className={`no-tap flex h-8 items-center gap-1.5 rounded-btn px-3 text-[12px] font-medium transition-colors ${
          active
            ? 'bg-ink text-paper'
            : 'bg-paper text-ink ring-1 ring-sand'
        } ${active ? 'rounded-r-none pr-2' : ''}`}
      >
        {active ? value : label}
        {!active && <ChevronDown className="h-3 w-3" strokeWidth={2} />}
      </button>
      {active && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          aria-label={`Clear ${label}`}
          className="no-tap flex h-8 items-center justify-center rounded-r-btn bg-ink pl-1 pr-2 text-paper"
        >
          <X className="h-3 w-3" strokeWidth={2.2} />
        </button>
      )}
    </div>
  );
};

interface FilterOptionsSheetProps<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  options: { value: T; label: string }[];
  selected: T;
  onSelect: (value: T) => void;
}

function FilterOptionsSheet<T>({
  title,
  open,
  onClose,
  options,
  selected,
  onSelect,
}: FilterOptionsSheetProps<T>) {
  return (
    <Sheet open={open} onClose={onClose} title={title}>
      <div className="-mt-2 grid gap-2">
        {options.map((opt, i) => {
          const isOn = opt.value === selected;
          return (
            <button
              key={i}
              onClick={() => {
                onSelect(opt.value);
                onClose();
              }}
              className={`no-tap flex h-13 items-center justify-between rounded-btn px-5 py-3.5 text-left text-[15px] font-medium transition-colors ${
                isOn ? 'bg-ink text-paper' : 'bg-cream text-ink'
              }`}
            >
              <span>{opt.label}</span>
              {isOn && <Check className="h-4 w-4" strokeWidth={2.5} />}
            </button>
          );
        })}
      </div>
    </Sheet>
  );
}
