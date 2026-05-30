import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Check, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { Button } from '../components/ui/Button';
import { findProperty } from '../lib/mock-data';

const TIME_SLOTS = [
  '09:30',
  '10:30',
  '11:30',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthLabels = [
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

const startOfMonth = (y: number, m: number) => new Date(y, m, 1);
const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();

export const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = findProperty(id ?? '');

  // Use a fixed "today" for deterministic builds — May 30, 2026 from context
  const today = useMemo(() => new Date(2026, 4, 30), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'call'>('whatsapp');
  const [submitted, setSubmitted] = useState(false);

  if (!property) {
    return (
      <PageTransition>
        <div className="px-6 py-20 text-center">
          <p>Home not found.</p>
          <Link to="/" className="mt-4 inline-block text-umber underline">
            Back to browse
          </Link>
        </div>
      </PageTransition>
    );
  }

  const start = startOfMonth(viewYear, viewMonth);
  const total = daysInMonth(viewYear, viewMonth);
  const leadDays = start.getDay();
  const grid: (Date | null)[] = [];
  for (let i = 0; i < leadDays; i++) grid.push(null);
  for (let d = 1; d <= total; d++) grid.push(new Date(viewYear, viewMonth, d));

  const isPast = (d: Date) => {
    const t = new Date(today);
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const stepMonth = (delta: number) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewMonth(m);
    setViewYear(y);
  };

  const canMonthBack = !(
    viewYear === today.getFullYear() && viewMonth === today.getMonth()
  );

  const submit = () => {
    if (!selectedDate || !selectedTime) return;
    setSubmitted(true);
  };

  if (submitted && selectedDate && selectedTime) {
    return (
      <PageTransition>
        <header className="sticky top-0 z-30 h-14 blur-bar bg-paper/85" />
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-verified/10 text-verified"
          >
            <Check className="h-8 w-8" strokeWidth={2} />
          </motion.div>
          <h1 className="mt-6 font-display text-[28px] italic leading-tight">
            Inspection booked
          </h1>
          <p className="mt-3 max-w-[300px] text-[15px] leading-[1.55] text-ink-soft">
            We've sent the landlord your request for{' '}
            <span className="text-ink">
              {selectedDate.getDate()} {monthLabels[selectedDate.getMonth()].slice(0, 3)}
            </span>{' '}
            at <span className="text-ink">{selectedTime}</span>. You'll hear back on
            {contactMethod === 'whatsapp' ? ' WhatsApp' : ' a call'} within an hour.
          </p>
          <div className="mt-4 caption">
            Confirmation: BL-INS-{property.id.toUpperCase()}-{selectedDate.getDate()}
          </div>
          <div className="mt-8 flex w-full max-w-[280px] flex-col gap-3">
            <Link
              to={`/listing/${property.id}`}
              className="no-tap inline-flex h-12 items-center justify-center rounded-btn bg-ink text-[14px] font-medium text-paper"
            >
              Back to listing
            </Link>
            <Link
              to="/applications"
              className="no-tap inline-flex h-12 items-center justify-center rounded-btn bg-cream text-[14px] font-medium text-ink"
            >
              Track in Applications
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <header className="sticky top-0 z-30 h-14 blur-bar bg-paper/85">
        <div className="flex h-full items-center justify-between px-6">
          <button onClick={() => navigate(-1)} className="no-tap -ml-2 p-2">
            <ArrowLeft className="h-5 w-5" strokeWidth={1.8} />
          </button>
          <h1 className="font-display text-[16px]">Book an inspection</h1>
          <div className="w-9" />
        </div>
      </header>

      <div className="px-6 pb-32 pt-2">
        {/* Property card */}
        <div className="flex gap-3 rounded-card bg-paper p-3 shadow-rest">
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-image bg-cream">
            <img src={property.images[0]} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <div className="truncate font-display text-[15px] leading-tight">
              {property.name}
            </div>
            <div className="mt-1 flex items-center gap-1 text-[12px] text-ink-soft">
              <MapPin className="h-3 w-3" strokeWidth={1.8} />
              <span className="truncate">
                {property.location.area}, {property.location.city}
              </span>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="mt-8">
          <div className="caption flex items-center gap-1.5">
            <Calendar className="h-3 w-3" strokeWidth={2} /> Pick a date
          </div>

          <div className="mt-4 rounded-card bg-paper p-4 shadow-rest">
            <div className="flex items-center justify-between">
              <button
                onClick={() => stepMonth(-1)}
                disabled={!canMonthBack}
                className="no-tap flex h-8 w-8 items-center justify-center rounded-full bg-cream text-ink disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
              </button>
              <div className="font-display text-[16px]">
                {monthLabels[viewMonth]} {viewYear}
              </div>
              <button
                onClick={() => stepMonth(1)}
                className="no-tap flex h-8 w-8 items-center justify-center rounded-full bg-cream text-ink"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-[0.08em] text-ink-faint">
              {dayLabels.map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-7 gap-1">
              {grid.map((d, i) => {
                if (!d) return <div key={i} />;
                const past = isPast(d);
                const sel =
                  selectedDate &&
                  d.getDate() === selectedDate.getDate() &&
                  d.getMonth() === selectedDate.getMonth() &&
                  d.getFullYear() === selectedDate.getFullYear();
                const isToday =
                  d.getDate() === today.getDate() &&
                  d.getMonth() === today.getMonth() &&
                  d.getFullYear() === today.getFullYear();
                return (
                  <button
                    key={i}
                    disabled={past}
                    onClick={() => {
                      setSelectedDate(d);
                      setSelectedTime(null);
                    }}
                    className={`no-tap aspect-square rounded-btn text-[13px] font-medium transition-colors ${
                      sel
                        ? 'bg-ink text-paper'
                        : past
                          ? 'text-ink-faint/50'
                          : isToday
                            ? 'bg-umber-soft text-umber'
                            : 'bg-cream text-ink'
                    }`}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Time slots */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-8"
          >
            <div className="caption flex items-center gap-1.5">
              <Clock className="h-3 w-3" strokeWidth={2} /> Pick a time
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`no-tap h-10 rounded-btn text-[13px] font-medium transition-colors ${
                    selectedTime === t
                      ? 'bg-ink text-paper'
                      : 'bg-cream text-ink'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Contact method */}
        {selectedTime && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-8"
          >
            <div className="caption">Confirm via</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setContactMethod('whatsapp')}
                className={`no-tap h-12 rounded-btn text-[13px] font-medium transition-colors ${
                  contactMethod === 'whatsapp' ? 'bg-ink text-paper' : 'bg-cream text-ink'
                }`}
              >
                WhatsApp
              </button>
              <button
                onClick={() => setContactMethod('call')}
                className={`no-tap h-12 rounded-btn text-[13px] font-medium transition-colors ${
                  contactMethod === 'call' ? 'bg-ink text-paper' : 'bg-cream text-ink'
                }`}
              >
                Phone call
              </button>
            </div>
            <p className="mt-3 text-[12px] leading-[1.55] text-ink-soft">
              A Ben Lease inspector will meet you at the property. Plan for 30 minutes.
            </p>
          </motion.div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-16 z-20 mx-auto max-w-phone border-t border-sand/80 bg-paper px-6 py-3">
        <Button
          full
          size="lg"
          onClick={submit}
          disabled={!selectedDate || !selectedTime}
        >
          {selectedDate && selectedTime
            ? `Book for ${selectedDate.getDate()} ${monthLabels[selectedDate.getMonth()].slice(0, 3)} · ${selectedTime}`
            : 'Pick date and time'}
        </Button>
      </div>
    </PageTransition>
  );
};
