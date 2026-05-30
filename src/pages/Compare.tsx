import { ArrowLeft, Check, MapPin, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { findProperty, properties as allProperties, savedIds } from '../lib/mock-data';
import { formatNaira, formatSize } from '../lib/format';
import { useSaved } from '../lib/storage';
import type { Property } from '../lib/types';

const MAX_ITEMS = 3;

export const Compare = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { ids: liveSavedIds } = useSaved();

  // Pre-select from URL ?ids=bl001,bl002 or fall back to first 2 saved
  const initialIds = useMemo(() => {
    const fromUrl = params.get('ids');
    if (fromUrl) return fromUrl.split(',').slice(0, MAX_ITEMS);
    const merged = [...new Set([...liveSavedIds, ...savedIds])];
    return merged.slice(0, 2);
  }, [params, liveSavedIds]);

  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds);

  const selected = selectedIds
    .map((id) => findProperty(id))
    .filter((p): p is Property => Boolean(p));

  const candidatePool = useMemo(() => {
    const merged = [...new Set([...liveSavedIds, ...savedIds])];
    return allProperties.filter((p) => merged.includes(p.id));
  }, [liveSavedIds]);

  const remove = (id: string) =>
    setSelectedIds((s) => s.filter((x) => x !== id));

  const add = (id: string) => {
    if (selectedIds.length >= MAX_ITEMS) return;
    if (selectedIds.includes(id)) return;
    setSelectedIds([...selectedIds, id]);
  };

  return (
    <PageTransition>
      <header className="sticky top-0 z-30 h-14 blur-bar bg-paper/85">
        <div className="flex h-full items-center justify-between px-6">
          <button onClick={() => navigate(-1)} className="no-tap -ml-2 p-2">
            <ArrowLeft className="h-5 w-5" strokeWidth={1.8} />
          </button>
          <h1 className="font-display text-[18px]">Compare</h1>
          <div className="w-9" />
        </div>
      </header>

      <div className="px-6 pb-6 pt-2">
        <div className="caption">{selected.length} of {MAX_ITEMS} selected</div>
        <p className="mt-2 text-[14px] leading-[1.55] text-ink-soft">
          Side-by-side the things tenants actually argue about.
        </p>
      </div>

      {selected.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="text-[15px] text-ink-soft">
            Save a few homes first, then come back to compare them here.
          </p>
          <Link
            to="/"
            className="no-tap mt-5 inline-flex h-11 items-center rounded-btn bg-ink px-5 text-[13px] font-medium text-paper"
          >
            Browse homes
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div
            className="grid gap-3 pl-6 pr-6 pb-6"
            style={{
              gridTemplateColumns: `repeat(${selected.length}, minmax(240px, 1fr))`,
            }}
          >
            {selected.map((p) => (
              <CompareColumn key={p.id} property={p} onRemove={() => remove(p.id)} />
            ))}
          </div>
        </div>
      )}

      {selected.length < MAX_ITEMS && candidatePool.length > selected.length && (
        <div className="border-t border-sand/70 px-6 py-5">
          <div className="caption mb-3">Add another</div>
          <div className="space-y-2">
            {candidatePool
              .filter((p) => !selectedIds.includes(p.id))
              .map((p) => (
                <button
                  key={p.id}
                  onClick={() => add(p.id)}
                  className="no-tap flex w-full items-center gap-3 rounded-btn bg-cream px-3 py-2 text-left"
                >
                  <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-btn bg-paper">
                    <img
                      src={p.images[0]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium">{p.name}</div>
                    <div className="text-[11px] text-ink-soft">
                      {p.location.area} · {formatNaira(p.pricePerYear)}
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-umber">Add</span>
                </button>
              ))}
          </div>
        </div>
      )}
    </PageTransition>
  );
};

const CompareColumn = ({
  property: p,
  onRemove,
}: {
  property: Property;
  onRemove: () => void;
}) => {
  const rows = [
    { label: 'Annual rent', value: formatNaira(p.pricePerYear), bold: true },
    {
      label: 'Service charge',
      value: `${formatNaira(p.serviceCharge)}/yr`,
    },
    { label: 'Total Year 1', value: formatNaira(p.pricePerYear + p.serviceCharge) },
    { label: 'Bedrooms', value: String(p.bedrooms) },
    { label: 'Bathrooms', value: String(p.bathrooms) },
    { label: 'Size', value: formatSize(p.sizeSqm) },
    { label: 'Furnished', value: p.furnished ? 'Yes' : 'No' },
    { label: 'Lease min', value: `${p.leaseMonthsMin} months` },
    { label: 'Negotiable', value: p.isNegotiable ? 'Yes' : 'No' },
    {
      label: 'Power',
      value: p.utilities ? `~${p.utilities.powerHoursDay} hr/day` : '—',
    },
    {
      label: 'Generator',
      value: p.utilities ? capitalize(p.utilities.generatorBackup) : '—',
    },
  ];
  return (
    <div className="rounded-card bg-paper shadow-rest">
      <div className="relative h-32 w-full overflow-hidden rounded-t-card bg-cream">
        <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
        <button
          onClick={onRemove}
          aria-label="Remove from compare"
          className="no-tap absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-paper/90 text-ink"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>
      <div className="p-3">
        <Link to={`/listing/${p.id}`} className="block">
          <h3 className="line-clamp-2 font-display text-[15px] leading-tight">
            {p.name}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-ink-soft">
            <MapPin className="h-3 w-3" strokeWidth={1.8} />
            <span className="truncate">{p.location.area}, {p.location.city}</span>
          </div>
        </Link>

        <div className="mt-3 space-y-2 text-[12px]">
          {rows.map((r) => (
            <div key={r.label} className="flex items-start justify-between gap-2">
              <span className="text-ink-soft">{r.label}</span>
              <span
                className={`text-right ${
                  r.bold ? 'font-semibold text-ink' : 'text-ink'
                }`}
              >
                {r.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="caption">Amenities</div>
          <div className="mt-2 flex flex-wrap gap-1">
            {p.amenities.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1 rounded-btn bg-cream px-2 py-0.5 text-[10px] text-ink"
              >
                <Check className="h-2.5 w-2.5 text-verified" strokeWidth={2.5} />
                {a}
              </span>
            ))}
          </div>
        </div>

        <Link
          to={`/listing/${p.id}`}
          className="no-tap mt-4 inline-flex h-9 w-full items-center justify-center rounded-btn bg-ink text-[12px] font-medium text-paper"
        >
          View home
        </Link>
      </div>
    </div>
  );
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
