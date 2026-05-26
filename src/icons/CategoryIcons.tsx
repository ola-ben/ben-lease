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

export const IconApartment = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <rect x="4" y="4" width="16" height="3.5" rx="0.5" />
    <rect x="4" y="10.25" width="16" height="3.5" rx="0.5" />
    <rect x="4" y="16.5" width="16" height="3.5" rx="0.5" />
    <path d="M8 5.75h.01M12 5.75h.01M16 5.75h.01" />
    <path d="M8 12h.01M12 12h.01M16 12h.01" />
    <path d="M8 18.25h.01M12 18.25h.01M16 18.25h.01" />
  </svg>
);

export const IconDuplex = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10.5V20h14V10.5" />
    <path d="M5 14.5h14" />
    <rect x="10.5" y="16" width="3" height="4" />
    <rect x="7" y="11.5" width="2" height="2" />
    <rect x="15" y="11.5" width="2" height="2" />
  </svg>
);

export const IconSelfCon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <rect x="6" y="6" width="12" height="14" rx="1" />
    <rect x="10.5" y="13" width="3" height="7" />
    <path d="M9.5 9.5h2M13 9.5h1.5" />
  </svg>
);

export const IconBungalow = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M3 13l9-6 9 6" />
    <path d="M5 12.5V20h14v-7.5" />
    <rect x="10.5" y="14.5" width="3" height="5.5" />
    <rect x="6.5" y="14.5" width="2.5" height="2.5" />
    <rect x="15" y="14.5" width="2.5" height="2.5" />
  </svg>
);

export const IconMiniFlat = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <rect x="4" y="5" width="16" height="14" rx="1" />
    <path d="M12 5v14" />
    <path d="M7 9h2M15 9h2" />
    <path d="M7 13h2M15 13h2" />
  </svg>
);
