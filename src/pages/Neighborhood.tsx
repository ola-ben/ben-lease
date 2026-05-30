import { ArrowLeft, ArrowRight, Check, MapPin, X } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { PropertyCard } from '../components/property/PropertyCard';
import { properties } from '../lib/mock-data';
import { findGuide } from '../lib/neighborhood-guides';

export const Neighborhood = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const guide = findGuide(slug ?? '');

  if (!guide) {
    return (
      <PageTransition>
        <div className="px-6 py-20 text-center">
          <p>Guide not found.</p>
          <Link to="/" className="mt-4 inline-block text-umber underline">
            Back to browse
          </Link>
        </div>
      </PageTransition>
    );
  }

  const homesHere = properties.filter(
    (p) => p.location.area === guide.name,
  );

  return (
    <PageTransition>
      <div className="relative h-[300px] w-full overflow-hidden bg-cream">
        <img
          src={guide.hero}
          alt={guide.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="no-tap absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-paper/85 blur-bar text-ink"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.8} />
        </button>
        <div className="absolute bottom-6 left-6 right-6 text-paper">
          <div className="caption text-paper/80">
            {guide.city} · Neighborhood guide
          </div>
          <h1 className="mt-2 font-display text-[34px] font-medium leading-[1.05]">
            {guide.name}
          </h1>
          <p className="mt-1 max-w-[280px] font-display text-[16px] italic opacity-90">
            {guide.tagline}
          </p>
        </div>
      </div>

      <div className="px-6 pb-32 pt-8">
        <p className="text-[16px] leading-[1.6] text-ink">{guide.intro}</p>

        {/* Vibes */}
        <div className="mt-6 flex flex-wrap gap-2">
          {guide.vibes.map((v) => (
            <span
              key={v}
              className="rounded-btn bg-cream px-3 py-1.5 text-[12px] font-medium text-ink"
            >
              {v}
            </span>
          ))}
        </div>

        {/* Character paras */}
        <div className="mt-8 space-y-4 text-[15px] leading-[1.65] text-ink-soft">
          {guide.characterParas.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Pros / watchouts */}
        <div className="mt-10 grid grid-cols-1 gap-3">
          <div className="rounded-card bg-paper p-5 shadow-rest">
            <div className="caption text-verified">What's good</div>
            <ul className="mt-3 space-y-2 text-[14px] leading-[1.5]">
              {guide.pros.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <Check
                    className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-verified"
                    strokeWidth={2.5}
                  />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card bg-paper p-5 shadow-rest">
            <div className="caption text-umber">Watch-outs</div>
            <ul className="mt-3 space-y-2 text-[14px] leading-[1.5]">
              {guide.watchouts.map((w) => (
                <li key={w} className="flex items-start gap-2">
                  <X
                    className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-umber"
                    strokeWidth={2.5}
                  />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Average rent */}
        <div className="mt-10">
          <div className="caption">What it costs</div>
          <h2 className="mt-1.5 font-display text-section font-medium">
            Average yearly rent
          </h2>
          <div className="mt-4 divide-y divide-sand/70 rounded-card bg-paper shadow-rest">
            {guide.averageRent.map((r) => (
              <div
                key={r.type}
                className="flex items-center justify-between px-5 py-3.5 text-[14px]"
              >
                <span className="text-ink-soft">{r.type}</span>
                <span className="font-medium text-ink">{r.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Commute */}
        <div className="mt-10">
          <div className="caption">Getting around</div>
          <h2 className="mt-1.5 font-display text-section font-medium">
            Commute times
          </h2>
          <div className="mt-4 space-y-2">
            {guide.commute.map((c) => (
              <div
                key={c.to}
                className="flex items-center justify-between rounded-btn bg-cream px-4 py-2.5 text-[14px]"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-ink-soft" strokeWidth={1.8} />
                  <span>{c.to}</span>
                </div>
                <span className="text-ink-soft">{c.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Good for */}
        <div className="mt-10 rounded-card bg-umber-soft p-5">
          <div className="caption text-umber">Best for</div>
          <ul className="mt-3 space-y-2 text-[14px] leading-[1.5] text-ink">
            {guide.goodFor.map((g) => (
              <li key={g} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-umber" />
                {g}
              </li>
            ))}
          </ul>
        </div>

        {/* Spots */}
        <div className="mt-10">
          <div className="caption">On the doorstep</div>
          <h2 className="mt-1.5 font-display text-section font-medium">Places nearby</h2>
          <div className="mt-4 grid grid-cols-1 gap-2">
            {guide.spots.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between rounded-btn bg-paper px-4 py-3 shadow-rest"
              >
                <span className="caption text-ink-faint">{s.kind}</span>
                <span className="text-[14px] font-medium">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Homes here */}
        {homesHere.length > 0 && (
          <div className="mt-12">
            <div className="caption">Open today</div>
            <h2 className="mt-1.5 font-display text-section font-medium">
              {homesHere.length} home{homesHere.length === 1 ? '' : 's'} in {guide.name}
            </h2>
            <div className="-mx-6 mt-5 flex gap-4 overflow-x-auto px-6 pb-2 pr-8 scroll-hide">
              {homesHere.map((p) => (
                <PropertyCard key={p.id} property={p} variant="feature" />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <Link
            to={`/search?city=${guide.city}`}
            className="no-tap flex h-12 w-full items-center justify-between rounded-btn bg-ink px-5 text-[14px] font-medium text-paper"
          >
            See all homes in {guide.city}
            <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};
