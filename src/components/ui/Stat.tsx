interface StatProps {
  label: string;
  value: string | number;
}

export const Stat = ({ label, value }: StatProps) => (
  <div className="flex flex-col items-center text-center">
    <div className="font-display text-[20px] leading-tight text-ink">{value}</div>
    <div className="caption mt-1">{label}</div>
  </div>
);
