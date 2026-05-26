import { ChevronDown, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { TopBar } from '../components/layout/TopBar';
import { VerifiedBadge } from '../components/ui/VerifiedBadge';
import { properties, savedIds } from '../lib/mock-data';
import { formatNaira } from '../lib/format';

export const Saved = () => {
  const saved = properties.filter((p) => savedIds.includes(p.id));

  return (
    <PageTransition>
      <TopBar />
      <div className="px-6 pb-4 pt-6">
        <div className="caption">Your shortlist</div>
        <h1 className="mt-2 font-display text-section font-medium">Saved homes</h1>
      </div>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-16 text-center">
          <Heart className="h-10 w-10 text-sand" strokeWidth={1.5} />
          <p className="mt-4 max-w-[260px] text-[15px] text-ink-soft">
            Nothing saved yet. Tap the heart on any home you like.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-6 pb-3">
            <div className="caption">{saved.length} homes</div>
            <button className="flex items-center gap-1 text-[12px] font-medium text-ink-soft">
              Recently saved <ChevronDown className="h-3 w-3" strokeWidth={2} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 px-6 pb-6">
            {saved.map((p) => (
              <Link
                key={p.id}
                to={`/listing/${p.id}`}
                className="no-tap flex flex-col overflow-hidden rounded-card bg-paper shadow-rest"
              >
                <div className="relative h-[140px] w-full overflow-hidden bg-cream">
                  <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                  <div className="absolute right-2 top-2">
                    <VerifiedBadge />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-3">
                  <h3 className="line-clamp-2 font-display text-[15px] leading-tight">
                    {p.name}
                  </h3>
                  <div className="mt-1 text-[11px] text-ink-soft">{p.location.area}</div>
                  <div className="mt-auto pt-2">
                    <span className="font-semibold text-[13px]">{formatNaira(p.pricePerYear)}</span>
                    <span className="ml-1 text-[10px] text-ink-faint">/yr</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </PageTransition>
  );
};
