import type { SVGProps } from 'react';

export const EmptyDoorway = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M28 100V42l32-22 32 22v58" />
    <path d="M28 100h64" />
    <path d="M48 100V68a12 12 0 0 1 24 0v32" />
    <circle cx="68" cy="84" r="1.5" fill="currentColor" />
    <path d="M40 50h6M74 50h6" />
  </svg>
);

export const KeyArrival = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="28" cy="40" r="10" />
    <path d="M38 40h28" />
    <path d="M58 40v8" />
    <path d="M66 40v6" />
  </svg>
);
