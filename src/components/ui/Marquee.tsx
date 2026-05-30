import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  direction?: 'left' | 'right';
  duration?: number;
  gap?: number;
  className?: string;
}

export const Marquee = ({
  children,
  direction = 'left',
  duration = 40,
  gap = 12,
  className = '',
}: Props) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`bl-marquee bl-marquee-pause ${
          direction === 'left' ? 'bl-marquee-left' : 'bl-marquee-right'
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex flex-shrink-0" style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}>
          {children}
        </div>
        <div
          className="flex flex-shrink-0"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
