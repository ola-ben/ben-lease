import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CalendarPlus, ChevronLeft, ChevronRight, Heart, MapPin, Play } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { AmenityList } from '../components/property/AmenityList';
import { MoveInCostCard } from '../components/property/MoveInCostCard';
import { UtilitiesPanel } from '../components/property/UtilitiesPanel';
import { VideoPlayer } from '../components/property/VideoPlayer';
import { VerifiedBadge } from '../components/ui/VerifiedBadge';
import { findProperty } from '../lib/mock-data';
import { neighborhoodGuides } from '../lib/neighborhood-guides';
import { formatDate, formatDuration, formatNaira } from '../lib/format';
import { addRecentlyViewed, useSaved } from '../lib/storage';

export const Listing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = findProperty(id ?? '');
  const [imgIndex, setImgIndex] = useState(0);
  const { isSaved, toggle: toggleSaved } = useSaved();
  const saved = property ? isSaved(property.id) : false;
  const [expanded, setExpanded] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [slideW, setSlideW] = useState(0);
  useEffect(() => {
    const update = () => setSlideW(containerRef.current?.offsetWidth ?? 0);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const slides = useMemo(() => {
    if (!property) return [];
    const imageSlides = property.images.map((src) => ({ kind: 'image' as const, src }));
    if (property.videoId) {
      return [
        {
          kind: 'video' as const,
          src: property.images[0],
          videoId: property.videoId,
          durationSec: property.videoDurationSec,
        },
        ...imageSlides,
      ];
    }
    return imageSlides;
  }, [property]);

  useEffect(() => {
    if (property) addRecentlyViewed(property.id);
  }, [property?.id]);

  if (!property) {
    return (
      <PageTransition>
        <div className="px-6 py-20 text-center">
          <p className="font-display text-section">Home not found.</p>
          <Link to="/" className="mt-4 inline-block text-[14px] text-umber underline">
            Back to browse
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      {/* Hero carousel */}
      <div ref={containerRef} className="relative h-[380px] w-full overflow-hidden bg-cream lg:h-[520px]">
        <motion.div
          className="flex h-full"
          drag={slideW > 0 ? 'x' : false}
          dragConstraints={{ left: -((slides.length - 1) * slideW), right: 0 }}
          dragElastic={0.1}
          animate={{ x: -imgIndex * slideW }}
          transition={{ type: 'spring', stiffness: 300, damping: 35 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50 && imgIndex < slides.length - 1) {
              setImgIndex(imgIndex + 1);
            } else if (info.offset.x > 50 && imgIndex > 0) {
              setImgIndex(imgIndex - 1);
            }
          }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="relative h-full w-full flex-shrink-0">
              <img src={slide.src} alt="" className="h-full w-full object-cover" />
              {slide.kind === 'video' && (
                <>
                  <div className="absolute inset-0 bg-ink/25" />
                  <button
                    onClick={() => setVideoOpen(true)}
                    aria-label="Play video tour"
                    className="no-tap absolute inset-0 flex items-center justify-center"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/95 shadow-elevated">
                      <Play className="ml-1 h-7 w-7 fill-ink text-ink" strokeWidth={1.5} />
                    </span>
                  </button>
                  <div className="pointer-events-none absolute left-5 top-16 flex items-center gap-2">
                    <span className="inline-flex h-6 items-center rounded-full bg-paper/95 px-2.5 text-[10px] font-medium uppercase tracking-[0.1em] text-ink">
                      Video tour
                    </span>
                    {slide.durationSec && (
                      <span className="inline-flex h-6 items-center rounded-full bg-ink/70 px-2.5 text-[11px] font-medium text-paper">
                        {formatDuration(slide.durationSec)}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </motion.div>

        <button
          onClick={() => navigate(-1)}
          className="no-tap absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-paper/85 blur-bar text-ink"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.8} />
        </button>
        <button
          onClick={() => toggleSaved(property.id)}
          className="no-tap absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-paper/85 blur-bar text-ink"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${saved ? 'fill-umber text-umber' : ''}`}
            strokeWidth={1.8}
          />
        </button>

        {imgIndex > 0 && (
          <button
            onClick={() => setImgIndex((i) => Math.max(0, i - 1))}
            aria-label="Previous"
            className="no-tap absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 blur-bar text-ink shadow-rest"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
          </button>
        )}
        {imgIndex < slides.length - 1 && (
          <button
            onClick={() => setImgIndex((i) => Math.min(slides.length - 1, i + 1))}
            aria-label="Next"
            className="no-tap absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 blur-bar text-ink shadow-rest"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
          </button>
        )}

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {slides.map((slide, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === imgIndex
                  ? slide.kind === 'video'
                    ? 'w-5 bg-umber'
                    : 'w-5 bg-paper'
                  : 'w-1.5 bg-paper/50'
              }`}
            />
          ))}
        </div>
      </div>

      {property.videoId && (
        <VideoPlayer
          open={videoOpen}
          onClose={() => setVideoOpen(false)}
          videoId={property.videoId}
          title={property.name}
        />
      )}

      <div className="px-6 pb-32 pt-6 lg:mx-auto lg:max-w-3xl lg:pb-16 lg:pt-12">
        <h1 className="font-display text-[28px] font-medium leading-[1.1]">
          {property.name}
        </h1>
        <div className="mt-2 flex items-center gap-1.5 text-[13px] text-ink-soft">
          <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
          <span>
            {property.location.area}, {property.location.city} • {property.location.distanceKm}km
            from {property.location.landmark}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <VerifiedBadge size="md" />
          <span className="text-[12px] text-ink-soft">
            Inspected on {formatDate(property.verifiedAt)} by Ben Lease team
          </span>
        </div>

        {/* Key facts */}
        <div className="mt-6 flex items-center justify-between rounded-card bg-cream px-4 py-4 text-[13px]">
          <div className="flex flex-col items-center">
            <span className="font-display text-[18px] leading-none">{property.bedrooms}</span>
            <span className="caption mt-1.5">Bedrooms</span>
          </div>
          <div className="h-7 w-px bg-sand" />
          <div className="flex flex-col items-center">
            <span className="font-display text-[18px] leading-none">{property.bathrooms}</span>
            <span className="caption mt-1.5">Baths</span>
          </div>
          <div className="h-7 w-px bg-sand" />
          <div className="flex flex-col items-center">
            <span className="font-display text-[18px] leading-none">{property.sizeSqm}</span>
            <span className="caption mt-1.5">sqm</span>
          </div>
          <div className="h-7 w-px bg-sand" />
          <div className="flex flex-col items-center">
            <span className="font-display text-[15px] leading-none">
              {property.furnished ? 'Yes' : 'No'}
            </span>
            <span className="caption mt-1.5">Furnished</span>
          </div>
        </div>

        {/* Lease terms */}
        <div className="mt-8 rounded-card bg-paper p-5 shadow-rest">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-[20px] leading-tight">Lease terms</h3>
            {property.isNegotiable && (
              <span className="inline-flex h-6 items-center rounded-full bg-umber-soft px-2.5 text-[11px] font-medium text-umber">
                Negotiable
              </span>
            )}
          </div>
          <div className="mt-4 space-y-3 text-[14px]">
            <Row label="Annual rent" value={formatNaira(property.pricePerYear)} bold />
            <Row label="Service charge" value={`${formatNaira(property.serviceCharge)}/yr`} />
            <Row label="Lease length" value={`${property.leaseMonthsMin} months minimum`} />
            <Row label="Move-in" value="Available now" />
            <Row label="Agency fees" value="None — direct landlord" tone="verified" />
          </div>
          {property.isNegotiable && (
            <p className="mt-4 rounded-btn bg-cream px-3 py-2.5 text-[12px] leading-[1.5] text-ink-soft">
              The landlord has indicated the annual rent is open to negotiation. Make an
              offer in your application.
            </p>
          )}
        </div>

        {/* Book inspection CTA */}
        <Link
          to={`/book/${property.id}`}
          className="no-tap mt-4 flex items-center justify-between rounded-card bg-umber-soft px-5 py-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-paper text-umber">
              <CalendarPlus className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <div>
              <div className="font-medium text-[14px] text-ink">Book a free inspection</div>
              <div className="text-[12px] text-ink-soft">
                A Ben Lease inspector will meet you here
              </div>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-umber" strokeWidth={2} />
        </Link>

        {/* Move-in cost */}
        <div className="mt-6">
          <MoveInCostCard property={property} />
        </div>

        {/* Utilities */}
        {property.utilities && (
          <div className="mt-8">
            <UtilitiesPanel utilities={property.utilities} />
          </div>
        )}

        {/* Amenities */}
        <div className="mt-10">
          <div className="caption">What's included</div>
          <h3 className="mt-1.5 font-display text-section font-medium">Amenities</h3>
          <div className="mt-4">
            <AmenityList amenities={property.amenities} />
          </div>
        </div>

        {/* About */}
        <div className="mt-10">
          <div className="caption">The home</div>
          <h3 className="mt-1.5 font-display text-section font-medium">About this home</h3>
          <div className="mt-4 space-y-4 text-[15px] leading-[1.6] text-ink">
            {property.description.slice(0, expanded ? undefined : 1).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {property.description.length > 1 && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="mt-3 text-[13px] font-medium text-umber"
            >
              {expanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Neighborhood */}
        <div className="mt-10">
          <div className="caption">The neighborhood</div>
          <h3 className="mt-1.5 font-display text-section font-medium">
            {property.location.area}
          </h3>
          <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
            A walkable area with good road access and amenities close by.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {property.nearby.map((n) => (
              <span
                key={n.name}
                className="rounded-btn bg-cream px-3 py-1.5 text-[12px] text-ink"
              >
                {n.name} {n.distanceKm}km
              </span>
            ))}
          </div>
          {neighborhoodGuides.some(
            (g) => g.name === property.location.area,
          ) && (
            <Link
              to={`/neighborhood/${
                neighborhoodGuides.find(
                  (g) => g.name === property.location.area,
                )?.slug
              }`}
              className="no-tap mt-5 inline-flex items-center gap-1 text-[13px] font-medium text-umber"
            >
              Read the full {property.location.area} guide
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          )}
        </div>

        {/* Landlord */}
        <div className="mt-10 rounded-card bg-paper p-5 shadow-rest">
          <div className="caption">Listed by</div>
          <div className="mt-3 flex items-center gap-3">
            <div
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full font-display text-[18px] text-umber"
              style={{ background: property.landlord.avatarTint }}
            >
              {property.landlord.name.split(' ').slice(-1)[0]?.[0] ?? 'A'}
            </div>
            <div>
              <div className="font-medium text-[15px]">{property.landlord.name}</div>
              <div className="text-[12px] text-ink-soft">
                Direct landlord · {property.landlord.listingsCount} properties on Ben Lease
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Apply CTA */}
        <Link
          to={`/apply/${property.id}`}
          className="no-tap mt-10 hidden h-14 w-full items-center justify-center rounded-btn bg-ink text-[15px] font-medium text-paper lg:flex"
        >
          Apply to lease — {formatNaira(property.pricePerYear)}/year
        </Link>

        {/* Testimonial */}
        {property.testimonial && (
          <div className="mt-10">
            <div className="caption">From a previous tenant</div>
            <blockquote className="mt-3 border-l-2 border-umber pl-4 font-display text-[18px] italic leading-[1.4] text-ink">
              "{property.testimonial.quote}"
            </blockquote>
            <div className="mt-2 caption">{property.testimonial.author}</div>
          </div>
        )}
      </div>

      {/* Sticky bottom CTA — mobile only */}
      <div className="fixed inset-x-0 bottom-16 z-20 mx-auto max-w-phone border-t border-sand/80 bg-paper px-6 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-semibold text-[16px]">{formatNaira(property.pricePerYear)}</div>
            <div className="text-[11px] uppercase tracking-[0.1em] text-ink-faint">/year</div>
          </div>
          <Link
            to={`/apply/${property.id}`}
            className="no-tap inline-flex h-12 items-center justify-center rounded-btn bg-ink px-6 text-[14px] font-medium text-paper"
          >
            Apply to lease
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};

const Row = ({
  label,
  value,
  bold,
  tone,
}: {
  label: string;
  value: string;
  bold?: boolean;
  tone?: 'verified';
}) => (
  <div className="flex items-center justify-between">
    <span className="text-ink-soft">{label}</span>
    <span
      className={`${bold ? 'font-semibold text-[15px]' : ''} ${
        tone === 'verified' ? 'text-verified' : 'text-ink'
      }`}
    >
      {value}
    </span>
  </div>
);
