import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
  padded?: boolean;
}

export const Card = ({ children, className = '', elevated, padded }: CardProps) => (
  <div
    className={`rounded-card bg-paper ${elevated ? 'shadow-elevated' : 'shadow-rest'} ${padded ? 'p-5' : ''} ${className}`}
  >
    {children}
  </div>
);
