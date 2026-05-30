import type { SVGProps } from 'react';

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// Apartment: three stacked floors, top one half-width suggesting balcony
export const IconApartment = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <rect x="4" y="14.5" width="16" height="6" rx="0.5" />
    <rect x="4" y="8.5" width="16" height="5.5" rx="0.5" />
    <rect x="4" y="3.5" width="9" height="4.5" rx="0.5" />
    <path d="M8 16.5v3.5" />
    <path d="M16 16.5v3.5" />
    <path d="M8 10.5v3" />
    <path d="M16 10.5v3" />
  </svg>
);

// Duplex: two-story silhouette, pitched roof line over second floor
export const IconDuplex = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M3.5 10.5L12 4l8.5 6.5" />
    <path d="M5.5 10v10.5h13V10" />
    <path d="M5.5 15h13" />
    <rect x="10.5" y="15.5" width="3" height="5" />
    <rect x="7.5" y="11.5" width="2" height="2" />
    <rect x="14.5" y="11.5" width="2" height="2" />
  </svg>
);

// Self-con: small square with one door and one window
export const IconSelfCon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <rect x="6" y="5" width="12" height="15" rx="0.75" />
    <rect x="10.5" y="13" width="3.5" height="7" />
    <rect x="8" y="8" width="3" height="3" />
    <circle cx="13.25" cy="16.75" r="0.5" fill="currentColor" />
  </svg>
);

// Bungalow: low rectangle with long pitched roof extending past walls
export const IconBungalow = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M2.5 13L12 6.5l9.5 6.5" />
    <path d="M5 12.5V20h14v-7.5" />
    <rect x="10.5" y="14.5" width="3" height="5.5" />
    <rect x="6.5" y="14.5" width="2.5" height="2.5" />
    <rect x="15" y="14.5" width="2.5" height="2.5" />
  </svg>
);

// Mini-flat: rectangle divided by internal wall, two rooms
export const IconMiniFlat = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <rect x="4" y="6" width="16" height="13" rx="0.75" />
    <path d="M12 6v13" />
    <path d="M7 10h2.5" />
    <path d="M14.5 10H17" />
    <path d="M7 14h2.5" />
    <path d="M14.5 14H17" />
  </svg>
);
