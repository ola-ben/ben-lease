import { motion } from 'framer-motion';
import { MapPin, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAvailability } from '../../lib/availability';
import { formatNaira } from '../../lib/format';
import type { Property } from '../../lib/types';
import { LazyImage } from '../ui/LazyImage';
import { VerifiedBadge } from '../ui/VerifiedBadge';
import { AvailabilityDot } from './AvailabilityDot';
import { SaveButton } from './SaveButton';

interface Props {
  property: Property;
  variant?: 'feature' | 'wide' | 'compact' | 'mini';
}

const press = { whileTap: { scale: 0.98 }, transition: { duration: 0.15 } };

export const PropertyCard = ({ property: p, variant = 'feature' }: Props) => {
  const availability = getAvailability(p);

  if (variant === 'mini') {
    return (
      <motion.div {...press} className="flex-shrink-0">
        <Link
          to={`/listing/${p.id}`}
          className="no-tap relative block h-[220px] w-[180px] overflow-hidden rounded-card bg-cream"
        >
          <LazyImage
            src={p.images[0]}
            alt={p.name}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent" />
          <div className="absolute left-3 top-3">
            <SaveButton id={p.id} size="sm" floating />
          </div>
          <div className="absolute bottom-3 left-3 right-3 text-paper">
            <div className="line-clamp-2 font-display text-[14px] leading-tight">
              {p.name}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.08em] opacity-80">
              {p.location.area}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div {...press}>
        <Link
          to={`/listing/${p.id}`}
          className="no-tap flex gap-4 rounded-card bg-paper p-3 shadow-rest"
        >
          <div className="relative h-24 w-24 flex-shrink-0">
            <LazyImage
              src={p.images[0]}
              alt={p.name}
              className="h-full w-full rounded-image"
            />
            <div className="absolute right-1.5 top-1.5">
              <SaveButton id={p.id} size="sm" />
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
            <div>
              <h3 className="truncate font-display text-[17px] leading-tight">{p.name}</h3>
              <div className="mt-1 flex items-center gap-1 text-[12px] text-ink-soft">
                <MapPin className="h-3 w-3" strokeWidth={1.8} />
                <span className="truncate">
                  {p.location.area}, {p.location.city}
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold text-[14px] text-ink">
                {formatNaira(p.pricePerYear)}
              </span>
              <span className="text-[11px] text-ink-faint">/year</span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === 'wide') {
    return (
      <motion.div {...press}>
        <Link
          to={`/listing/${p.id}`}
          className="no-tap block overflow-hidden rounded-card bg-paper shadow-rest"
        >
          <div className="relative h-56 w-full">
            <LazyImage
              src={p.images[0]}
              alt={p.name}
              className="h-full w-full"
            />
            <div className="absolute left-3 top-3">
              <SaveButton id={p.id} size="sm" floating />
            </div>
            <div className="absolute right-3 top-3 flex gap-1.5">
              {p.isFeatured && (
                <span className="inline-flex h-6 items-center rounded-full bg-verified px-2.5 text-[11px] font-medium text-paper">
                  Featured
                </span>
              )}
              <VerifiedBadge />
              {p.isNegotiable && (
                <span className="inline-flex h-6 items-center rounded-full bg-paper/95 px-2.5 text-[11px] font-medium text-umber shadow-rest">
                  Negotiable
                </span>
              )}
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-display text-[20px] leading-tight">{p.name}</h3>
            <div className="mt-1.5 flex items-center gap-1 text-[13px] text-ink-soft">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
              <span>
                {p.location.area}, {p.location.city}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3 text-[12px] text-ink-soft">
              <span>{p.bedrooms} bed</span>
              <span className="h-1 w-1 rounded-full bg-sand" />
              <span>{p.bathrooms} bath</span>
              <span className="h-1 w-1 rounded-full bg-sand" />
              <span>{p.sizeSqm}sqm</span>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="font-semibold text-[16px] text-ink">
                  {formatNaira(p.pricePerYear)}
                </span>
                <span className="text-[12px] text-ink-faint">/year</span>
              </div>
              <AvailabilityDot availability={availability} />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // feature (default carousel card)
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
      }}
      className="flex-shrink-0"
    >
      <motion.div {...press}>
        <Link
          to={`/listing/${p.id}`}
          className="no-tap flex h-[380px] w-[280px] flex-col overflow-hidden rounded-card bg-paper shadow-rest lg:h-auto lg:w-full"
        >
          <div className="relative h-[260px] w-full overflow-hidden rounded-t-card">
            <LazyImage
              src={p.images[0]}
              alt={p.name}
              className="h-full w-full"
            />
            <div className="absolute left-3 top-3">
              <SaveButton id={p.id} size="sm" floating />
            </div>
            <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
              {p.isFeatured && (
                <span className="inline-flex h-[22px] items-center rounded-full bg-verified px-2.5 text-[11px] font-medium text-paper">
                  Featured
                </span>
              )}
              <span className="inline-flex h-[22px] items-center rounded-full bg-umber-soft px-2.5 text-[11px] font-medium text-ink">
                Verified
              </span>
              {p.isNegotiable && (
                <span className="inline-flex h-[22px] items-center rounded-full bg-paper/95 px-2.5 text-[11px] font-medium text-umber shadow-rest">
                  Negotiable
                </span>
              )}
            </div>
            {p.videoId && (
              <span className="pointer-events-none absolute bottom-3 left-3 inline-flex h-[22px] items-center gap-1 rounded-full bg-ink/75 px-2 text-[11px] font-medium text-paper backdrop-blur-sm">
                <Play className="h-2.5 w-2.5 fill-paper" strokeWidth={0} />
                Video tour
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="line-clamp-2 font-display text-[20px] leading-[1.15]">
              {p.name}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-[13px] text-ink-soft">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
              <span className="truncate">
                {p.location.area}, {p.location.city}
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="font-semibold text-[16px] text-ink">
                {formatNaira(p.pricePerYear)}
              </span>
              <span className="text-[13px] text-ink-faint">/year</span>
            </div>
            <div className="mt-auto flex items-center justify-between pt-2">
              <div className="text-[10px] font-medium uppercase tracking-[0.08em] text-ink-faint">
                {p.leaseMonthsMin}-month lease min
              </div>
              <AvailabilityDot availability={availability} />
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};
