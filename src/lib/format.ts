export const formatNaira = (amount: number): string => {
  return `₦${amount.toLocaleString('en-NG')}`;
};

export const formatNairaShort = (amount: number): string => {
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return `₦${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (amount >= 1_000) return `₦${(amount / 1000).toFixed(0)}k`;
  return `₦${amount}`;
};

export const formatSize = (sqm: number): string => `${sqm}sqm`;

export const formatLease = (months: number): string => {
  if (months % 12 === 0) {
    const years = months / 12;
    return years === 1 ? '12 months' : `${years} years`;
  }
  return `${months} months`;
};

export const formatDate = (iso: string): string => {
  const d = new Date(iso);
  const longMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return `${d.getDate()} ${longMonths[d.getMonth()]} ${d.getFullYear()}`;
};

export const formatDuration = (sec: number): string => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export const formatDateShort = (iso: string): string => {
  const d = new Date(iso);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};
