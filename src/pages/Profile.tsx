import { Bell, ChevronRight, CreditCard, FileText, HelpCircle, Info, ShieldCheck, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { TopBar } from '../components/layout/TopBar';

const menu = [
  { label: 'Personal details', Icon: UserIcon, to: '/profile/personal' },
  { label: 'Documents & ID', Icon: FileText, to: '/profile/documents' },
  { label: 'Payment methods', Icon: CreditCard, to: '/profile/payments' },
  { label: 'Notifications', Icon: Bell, to: '/profile/notifications' },
  { label: 'Help center', Icon: HelpCircle, to: '/profile/help' },
  { label: 'About Ben Lease', Icon: Info, to: '/profile/about' },
];

export const Profile = () => {
  return (
    <PageTransition>
      <TopBar />

      <div className="px-6 pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-umber-soft font-display text-[28px] text-umber">
            A
          </div>
          <h1 className="mt-4 font-display text-[24px] font-medium leading-tight">
            Adekunle Ojo
          </h1>
          <div className="caption mt-1">olaben09@gmail.com</div>
        </div>

        <div className="mt-6 rounded-card bg-paper p-4 shadow-rest">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-btn bg-verified/10 text-verified">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <div className="font-medium text-[14px]">KYC verified</div>
              <div className="text-[12px] text-ink-soft">
                Your identity was verified on 12 May 2026.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 rounded-card bg-cream py-5">
          <Stat label="Saved" value={4} />
          <div className="border-l border-r border-sand">
            <Stat label="Applications" value={3} />
          </div>
          <Stat label="Active leases" value={0} />
        </div>

        <div className="mt-8 overflow-hidden rounded-card bg-paper shadow-rest">
          {menu.map(({ label, Icon, to }, i) => (
            <Link
              key={label}
              to={to}
              className={`no-tap flex h-14 w-full items-center gap-4 px-5 text-left text-[14px] ${
                i < menu.length - 1 ? 'border-b border-sand/70' : ''
              }`}
            >
              <Icon className="h-[18px] w-[18px] text-ink-soft" strokeWidth={1.7} />
              <span className="flex-1">{label}</span>
              <ChevronRight className="h-4 w-4 text-ink-faint" strokeWidth={1.8} />
            </Link>
          ))}
        </div>

        <button className="mt-8 mb-4 w-full py-3 text-center text-[14px] font-medium text-umber">
          Sign out
        </button>
      </div>
    </PageTransition>
  );
};

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col items-center text-center">
    <span className="font-display text-[22px] leading-none">{value}</span>
    <span className="caption mt-1.5">{label}</span>
  </div>
);
