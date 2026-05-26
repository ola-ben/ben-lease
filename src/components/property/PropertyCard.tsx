import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatNaira } from '../../lib/format';
import type { Property } from '../../lib/types';
import { VerifiedBadge } from '../ui/VerifiedBadge';

interface Props {
  property: Property;
  variant?: 'feature' | 'wide' | 'compact';
}

export const PropertyCard = ({ property: p, variant = 'feature' }: Props) => {
  if (variant === 'compact') {
    return (
      <Link
        to={`/listing/${p.id}`}
        className="no-tap flex gap-4 rounded-card bg-paper p-3 shadow-rest"
      >
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-image bg-cream">
          <img
            src={p.images[0]}
            alt={p.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
          <div>
            <h3 className="truncate font-display text-[17px] leading-tight">{p.name}</h3>
            <div className="mt-1 flex items-center gap-1 text-[12px] text-ink-soft">
              <MapPin className="h-3 w-3" strokeWidth={1.8} />
              <span className="truncate">{p.location.area}, {p.location.city}</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold text-[14px] text-ink">{formatNaira(p.pricePerYear)}</span>
            <span className="text-[11px] text-ink-faint">/year</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'wide') {
    return (
      <Link
        to={`/listing/${p.id}`}
        className="no-tap block overflow-hidden rounded-card bg-paper shadow-rest"
      >
        <div className="relative h-56 w-full overflow-hidden bg-cream">
          <img
            src={p.images[0]}
            alt={p.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute right-3 top-3">
            <VerifiedBadge />
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
            <span className="caption">{p.leaseMonthsMin}-month minimum</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
      }}
      className="flex-shrink-0"
    >
      <Link
        to={`/listing/${p.id}`}
        className="no-tap flex w-[280px] flex-col overflow-hidden rounded-card bg-paper shadow-rest"
      >
        <div className="relative h-[260px] w-full overflow-hidden bg-cream">
          <img
            src={p.images[0]}
            alt={p.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute right-3 top-3">
            <VerifiedBadge />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-[20px] leading-tight">{p.name}</h3>
          <div className="mt-1.5 flex items-center gap-1 text-[13px] text-ink-soft">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
            <span className="truncate">
              {p.location.area}, {p.location.city}
            </span>
          </div>
          <div className="mt-auto pt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold text-[16px] text-ink">
                {formatNaira(p.pricePerYear)}
              </span>
              <span className="text-[12px] text-ink-faint">/year</span>
            </div>
            <div className="caption mt-1">{p.leaseMonthsMin}-month lease minimum</div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
