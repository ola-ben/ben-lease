import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Marquee } from '../ui/Marquee';

const filters = [
  { label: 'Furnished only', q: 'furnished=true' },
  { label: 'Pet-friendly', q: 'pets=true' },
  { label: 'Move in this month', q: 'available=now' },
  { label: 'Under ₦10k/yr', q: 'max=10000' },
  { label: 'Family-size (3+ bed)', q: 'beds=3' },
  { label: 'Self-serviced', q: 'serviced=true' },
];

const Pill = ({ label, q }: { label: string; q: string }) => {
  const navigate = useNavigate();
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15 }}
      onClick={() => navigate(`/search?${q}`)}
      className="no-tap flex h-9 flex-shrink-0 items-center rounded-btn bg-cream px-3 text-[13px] font-medium text-ink"
    >
      {label}
    </motion.button>
  );
};

export const QuickFiltersMarquee = () => (
  <Marquee direction="left" duration={48} gap={10}>
    {filters.map((f) => (
      <Pill key={f.label} label={f.label} q={f.q} />
    ))}
  </Marquee>
);
