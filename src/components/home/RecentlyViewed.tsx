import { PropertyCard } from '../property/PropertyCard';
import { properties } from '../../lib/mock-data';
import { useRecentlyViewed } from '../../lib/storage';

export const RecentlyViewed = () => {
  const { ids } = useRecentlyViewed();
  const list = ids
    .map((id) => properties.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (list.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="px-6">
        <div className="caption">Picking up where you left off</div>
        <h2 className="mt-2 font-display text-[20px] font-medium leading-tight">
          Recently viewed
        </h2>
      </div>
      <div className="mt-4 flex gap-3 overflow-x-auto px-6 pb-2 pr-8 scroll-hide">
        {list.map((p) => (
          <PropertyCard key={p.id} property={p} variant="mini" />
        ))}
      </div>
    </section>
  );
};
