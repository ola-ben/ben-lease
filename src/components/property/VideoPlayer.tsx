import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  videoId: string;
  title?: string;
}

export const VideoPlayer = ({ open, onClose, videoId, title }: Props) => {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95"
        >
          <button
            onClick={onClose}
            aria-label="Close video"
            className="no-tap absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 text-paper hover:bg-paper/20"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>

          {title && (
            <div className="absolute left-6 top-6 max-w-[70%] text-paper">
              <div className="text-[10px] font-medium uppercase tracking-[0.1em] opacity-70">
                Video tour
              </div>
              <div className="mt-1 truncate font-display text-[16px]">{title}</div>
            </div>
          )}

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-video w-full max-w-[920px] px-4"
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title ?? 'Property video tour'}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full rounded-card border-0 bg-ink"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
