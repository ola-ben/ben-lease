import { motion } from 'framer-motion';
import { Bookmark, FileText, Search, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { to: '/', label: 'Browse', icon: Search, match: (p: string) => p === '/' || p.startsWith('/search') || p.startsWith('/listing') },
  { to: '/saved', label: 'Saved', icon: Bookmark, match: (p: string) => p.startsWith('/saved') },
  { to: '/applications', label: 'Applications', icon: FileText, match: (p: string) => p.startsWith('/applications') || p.startsWith('/apply') },
  { to: '/profile', label: 'Profile', icon: User, match: (p: string) => p.startsWith('/profile') },
];

export const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto h-16 max-w-phone border-t border-sand/80 bg-paper">
      <div className="grid h-full grid-cols-4">
        {tabs.map(({ to, label, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={to}
              to={to}
              className="no-tap relative flex flex-col items-center justify-center gap-1 text-ink-faint"
            >
              <Icon
                className={`h-[22px] w-[22px] transition-colors ${active ? 'text-ink' : 'text-ink-faint'}`}
                strokeWidth={active ? 2 : 1.6}
              />
              <span
                className={`text-[11px] font-medium tracking-wide transition-colors ${active ? 'text-ink' : 'text-ink-faint'}`}
              >
                {label}
              </span>
              {active && (
                <motion.div
                  layoutId="navIndicator"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute bottom-1 h-0.5 w-6 rounded-full bg-ink"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
