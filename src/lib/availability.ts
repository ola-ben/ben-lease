import type { Property } from './types';

export type Availability =
  | { state: 'available-now'; label: 'Available now'; tone: 'verified' }
  | { state: 'available-future'; label: string; tone: 'umber' }
  | { state: 'inspection-only'; label: 'Inspection only'; tone: 'sand' };

const MONTHS = [
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

// Deterministic based on id so cards are stable across renders
export const getAvailability = (p: Property): Availability => {
  const tail = p.id.slice(-1).charCodeAt(0);
  const bucket = tail % 4;
  if (bucket === 0) {
    const next = new Date();
    next.setMonth(next.getMonth() + 1);
    return {
      state: 'available-future',
      label: `Available ${MONTHS[next.getMonth()]}`,
      tone: 'umber',
    };
  }
  if (bucket === 1) {
    return { state: 'inspection-only', label: 'Inspection only', tone: 'sand' };
  }
  return { state: 'available-now', label: 'Available now', tone: 'verified' };
};
