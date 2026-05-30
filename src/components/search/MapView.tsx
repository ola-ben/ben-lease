import L from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { formatNaira } from '../../lib/format';
import type { Property } from '../../lib/types';

const cityCenter: Record<string, [number, number]> = {
  Lagos: [6.4541, 3.4316],
  Abuja: [9.0765, 7.4912],
  Ibadan: [7.3775, 3.9470],
};

const makePinIcon = (price: string, selected = false) =>
  L.divIcon({
    className: 'bl-pin-icon',
    html: `<div class="bl-pin ${selected ? 'bl-pin-on' : ''}">${price}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

const FitToProperties = ({ properties }: { properties: Property[] }) => {
  const map = useMap();
  useEffect(() => {
    if (properties.length === 0) return;
    if (properties.length === 1) {
      map.setView([properties[0].location.lat, properties[0].location.lng], 14);
      return;
    }
    const bounds = L.latLngBounds(
      properties.map((p) => [p.location.lat, p.location.lng] as [number, number]),
    );
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [properties, map]);
  return null;
};

interface Props {
  properties: Property[];
}

export const MapView = ({ properties }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = useMemo(
    () => properties.find((p) => p.id === selectedId) ?? properties[0] ?? null,
    [selectedId, properties],
  );

  const center: [number, number] = useMemo(() => {
    if (properties.length > 0) {
      const c = cityCenter[properties[0].location.city];
      return c ?? [properties[0].location.lat, properties[0].location.lng];
    }
    return [6.4541, 3.4316];
  }, [properties]);

  return (
    <div className="relative h-[calc(100vh-220px)] w-full overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <FitToProperties properties={properties} />
        {properties.map((p) => (
          <Marker
            key={p.id}
            position={[p.location.lat, p.location.lng]}
            icon={makePinIcon(formatPriceShort(p.pricePerYear), selected?.id === p.id)}
            eventHandlers={{ click: () => setSelectedId(p.id) }}
          />
        ))}
      </MapContainer>

      {selected && (
        <Link
          to={`/listing/${selected.id}`}
          className="no-tap absolute inset-x-4 bottom-4 z-[400] flex gap-3 rounded-card bg-paper p-3 shadow-elevated"
        >
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-image bg-cream">
            <img
              src={selected.images[0]}
              alt={selected.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
            <div>
              <h3 className="truncate font-display text-[16px] leading-tight">
                {selected.name}
              </h3>
              <div className="text-[12px] text-ink-soft">
                {selected.location.area}, {selected.location.city}
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="font-semibold text-[14px]">
                  {formatNaira(selected.pricePerYear)}
                </span>
                <span className="text-[11px] text-ink-faint">/year</span>
              </div>
              <span className="text-[11px] uppercase tracking-[0.08em] text-umber">
                View →
              </span>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

const formatPriceShort = (n: number): string => {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `₦${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  return `₦${(n / 1000).toFixed(0)}k`;
};
