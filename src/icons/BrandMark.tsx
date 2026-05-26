import type { SVGProps } from 'react';

export const BrandMark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* doorway */}
    <path d="M5.5 21V8.5l6.5-4.5 6.5 4.5V21" />
    <path d="M5.5 21h13" />
    {/* keyhole / key combined */}
    <circle cx="12" cy="12.5" r="1.6" />
    <path d="M12 14.1V17" />
    <path d="M11 16h2" />
  </svg>
);
