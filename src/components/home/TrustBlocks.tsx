import type { SVGProps } from 'react';

const ShieldCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
    <path d="M8.5 12l2.5 2.5L16 9.5" />
  </svg>
);

const NairaCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M9 7.5v9" />
    <path d="M15 7.5v9" />
    <path d="M9 7.5l6 9" />
    <path d="M7 11h10" />
    <path d="M7 13.5h10" />
  </svg>
);

const Document = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 3h7l4 4v14H7z" />
    <path d="M14 3v4h4" />
    <path d="M10 12h6" />
    <path d="M10 15h6" />
    <path d="M10 18h4" />
  </svg>
);

const blocks = [
  { Icon: ShieldCheck, label: 'Every home physically verified' },
  { Icon: NairaCircle, label: 'Pay landlord directly' },
  { Icon: Document, label: 'Lease drafted by lawyers' },
];

export const TrustBlocks = () => (
  <div className="grid grid-cols-3">
    {blocks.map(({ Icon, label }, i) => (
      <div
        key={label}
        className={`flex flex-col items-center gap-2 px-2 py-6 text-center ${
          i < blocks.length - 1 ? 'border-r border-sand/70' : ''
        }`}
      >
        <Icon className="text-ink" />
        <p className="text-[11px] leading-[1.35] text-ink">{label}</p>
      </div>
    ))}
  </div>
);
