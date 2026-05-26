import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export const Sheet = ({ open, onClose, children, title }: SheetProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink/30"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-phone rounded-t-[24px] bg-paper p-6 pb-10 shadow-elevated"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-sand" />
            {title && (
              <h3 className="mb-4 font-display text-[22px] leading-tight">{title}</h3>
            )}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
