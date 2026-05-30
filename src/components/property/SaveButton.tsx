import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { MouseEvent } from 'react';
import { useSaved } from '../../lib/storage';

interface Props {
  id: string;
  size?: 'sm' | 'md';
  floating?: boolean;
}

export const SaveButton = ({ id, size = 'sm', floating }: Props) => {
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(id);
  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(id);
  };
  const isMd = size === 'md';
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.85 }}
      animate={saved ? { scale: [1, 1.18, 1] } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 14, duration: 0.18 }}
      aria-label={saved ? 'Remove from saved' : 'Save home'}
      className={`no-tap inline-flex items-center justify-center rounded-full ${
        floating ? 'bg-paper/85 blur-bar text-ink' : 'bg-paper/90 text-ink'
      } ${isMd ? 'h-9 w-9' : 'h-8 w-8'}`}
    >
      <Heart
        className={`transition-colors ${saved ? 'fill-umber text-umber' : 'text-ink'} ${
          isMd ? 'h-[18px] w-[18px]' : 'h-4 w-4'
        }`}
        strokeWidth={1.8}
      />
    </motion.button>
  );
};
