import { Camera, Car, Droplet, Power, ShieldCheck, Sun, Trees, Zap } from 'lucide-react';
import type { ReactNode } from 'react';

const iconMap: Record<string, ReactNode> = {
  Borehole: <Droplet className="h-4 w-4" strokeWidth={1.6} />,
  '24/7 power': <Zap className="h-4 w-4" strokeWidth={1.6} />,
  CCTV: <Camera className="h-4 w-4" strokeWidth={1.6} />,
  Parking: <Car className="h-4 w-4" strokeWidth={1.6} />,
  Security: <ShieldCheck className="h-4 w-4" strokeWidth={1.6} />,
  Generator: <Power className="h-4 w-4" strokeWidth={1.6} />,
  Garden: <Trees className="h-4 w-4" strokeWidth={1.6} />,
  Inverter: <Sun className="h-4 w-4" strokeWidth={1.6} />,
  Lift: <Power className="h-4 w-4" strokeWidth={1.6} />,
};

export const AmenityList = ({ amenities }: { amenities: string[] }) => (
  <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 scroll-hide">
    {amenities.map((a) => (
      <div
        key={a}
        className="flex flex-shrink-0 items-center gap-2 rounded-btn bg-cream px-3 py-2 text-[13px] text-ink"
      >
        <span className="text-ink-soft">{iconMap[a] ?? <Power className="h-4 w-4" strokeWidth={1.6} />}</span>
        {a}
      </div>
    ))}
  </div>
);
