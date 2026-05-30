import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const safeStorage = {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* no-op */
    }
  },
};

export const LaunchPopup = ({ open, onClose }: Props) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll + Esc to dismiss
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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    safeStorage.set('bl.landlord.waitlist', email);
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/55 px-4 pb-8 sm:items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[360px] overflow-hidden rounded-card bg-paper shadow-elevated"
            role="dialog"
            aria-modal="true"
            aria-label="Join the landlord waitlist"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="no-tap absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-paper/85 text-ink blur-bar"
            >
              <X className="h-4 w-4" strokeWidth={1.8} />
            </button>

            <div className="relative h-[150px] w-full overflow-hidden bg-cream">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80"
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
              <span className="absolute left-4 top-4 inline-flex h-6 items-center rounded-full bg-paper/95 px-2.5 text-[10px] font-medium uppercase tracking-[0.1em] text-umber">
                Coming soon
              </span>
            </div>

            {submitted ? (
              <div className="px-6 py-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-verified/10 text-verified">
                  <Check className="h-6 w-6" strokeWidth={2} />
                </div>
                <h2 className="mt-4 font-display text-[22px] leading-tight">
                  You're on the list.
                </h2>
                <p className="mt-2 text-[13px] leading-[1.55] text-ink-soft">
                  We'll reach out the moment landlord listings open. Until then, keep
                  exploring homes.
                </p>
                <button
                  onClick={onClose}
                  className="no-tap mt-5 inline-flex h-11 items-center justify-center rounded-btn bg-cream px-5 text-[13px] font-medium text-ink"
                >
                  Back to browse
                </button>
              </div>
            ) : (
              <div className="px-6 pb-6 pt-5">
                <h2 className="font-display text-[22px] leading-[1.15]">
                  Want to list a home?
                </h2>
                <p className="mt-2 text-[13px] leading-[1.55] text-ink-soft">
                  We're opening the platform to verified landlords first. Add your email
                  and we'll let you know the moment listings go live.
                </p>

                <ul className="mt-4 space-y-2 text-[13px] text-ink">
                  {[
                    'Self-list a home in five minutes',
                    'Only verified tenants reach you',
                    'Lease drafted by our lawyers — included',
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <Check
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-umber"
                        strokeWidth={2}
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <form onSubmit={submit} className="mt-5 flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-11 flex-1 rounded-btn bg-cream px-4 text-[14px] outline-none placeholder:text-ink-faint focus:ring-1 focus:ring-ink"
                  />
                  <button
                    type="submit"
                    className="no-tap inline-flex h-11 items-center gap-1 rounded-btn bg-ink px-3.5 text-[13px] font-medium text-paper"
                  >
                    Join
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </button>
                </form>

                <button
                  onClick={onClose}
                  className="no-tap mt-3 w-full py-2 text-center text-[12px] font-medium text-ink-soft"
                >
                  Maybe later
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const useLaunchPopup = () => {
  const KEY = 'bl.landlord.waitlist';
  // Only suppress the popup when the user has actually joined the waitlist.
  // A simple dismiss does not persist — so a page reload shows it again.
  const hasJoined = () => safeStorage.get(KEY) !== null;
  return { hasJoined };
};
