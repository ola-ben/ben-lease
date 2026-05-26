import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { TopBar } from '../components/layout/TopBar';
import { Pill } from '../components/ui/Pill';
import { applications, findProperty } from '../lib/mock-data';
import { formatDateShort } from '../lib/format';
import type { ApplicationStatus } from '../lib/types';

const statusMap: Record<ApplicationStatus, { label: string; tone: 'cream' | 'umber' | 'verified' | 'sand' }> = {
  'under-review': { label: 'Under review', tone: 'cream' },
  'inspection-scheduled': { label: 'Inspection scheduled', tone: 'umber' },
  approved: { label: 'Approved', tone: 'verified' },
  declined: { label: 'Declined', tone: 'sand' },
};

export const Applications = () => {
  const [tab, setTab] = useState<'active' | 'past'>('active');
  const active = applications.filter((a) => a.status !== 'declined' && a.status !== 'approved');
  const past = applications.filter((a) => a.status === 'declined' || a.status === 'approved');
  const list = tab === 'active' ? active : past;

  return (
    <PageTransition>
      <TopBar />
      <div className="px-6 pb-8 pt-6">
        <div className="caption">Your activity</div>
        <h1 className="mt-2 font-display text-section font-medium">Applications</h1>
      </div>

      <div className="px-6">
        <div className="relative flex gap-6 border-b border-sand">
          {(['active', 'past'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="no-tap relative pb-3 text-[14px] font-medium capitalize transition-colors"
            >
              <span className={tab === t ? 'text-ink' : 'text-ink-faint'}>{t}</span>
              {tab === t && (
                <motion.span
                  layoutId="appsTab"
                  className="absolute -bottom-px left-0 right-0 h-0.5 bg-ink"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 px-6 py-6">
        {list.length === 0 ? (
          <p className="py-16 text-center text-[14px] text-ink-soft">
            No applications yet. Browse homes to start.
          </p>
        ) : (
          list.map((a) => {
            const p = findProperty(a.propertyId);
            if (!p) return null;
            const s = statusMap[a.status];
            return (
              <Link
                key={a.id}
                to={`/listing/${p.id}`}
                className="no-tap flex gap-4 rounded-card bg-paper p-3 shadow-rest"
              >
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-image bg-cream">
                  <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                  <div>
                    <h3 className="truncate font-display text-[16px] leading-tight">{p.name}</h3>
                    <div className="text-[12px] text-ink-soft">
                      {p.location.area}, {p.location.city}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.08em] text-ink-faint">
                      {formatDateShort(a.appliedAt)}
                    </span>
                    <Pill tone={s.tone} size="sm">
                      {s.label}
                    </Pill>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </PageTransition>
  );
};
