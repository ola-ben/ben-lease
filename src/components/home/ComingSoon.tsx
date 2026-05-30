import { useState } from 'react';
import { Check } from 'lucide-react';

interface Props {
  city: string;
}

export const ComingSoon = ({ city }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <section className="mx-6 mt-12 rounded-card bg-cream p-6">
      <div className="caption text-umber">Limited inventory</div>
      <h2 className="mt-2 font-display text-[22px] font-medium leading-tight">
        Coming soon to {city}.
      </h2>
      <p className="mt-2 max-w-[280px] text-[14px] leading-[1.55] text-ink-soft">
        We're verifying new homes in {city} every week. Be first to know when fresh
        listings drop.
      </p>

      {submitted ? (
        <div className="mt-5 flex items-center gap-2 rounded-btn bg-paper px-4 py-3 text-[13px]">
          <Check className="h-4 w-4 text-verified" strokeWidth={2.5} />
          You're on the list. Look out for an email.
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.includes('@')) setSubmitted(true);
          }}
          className="mt-5 flex gap-2"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-11 flex-1 rounded-btn bg-paper px-4 text-[14px] outline-none placeholder:text-ink-faint focus:ring-1 focus:ring-ink"
          />
          <button
            type="submit"
            className="no-tap inline-flex h-11 items-center rounded-btn bg-ink px-4 text-[13px] font-medium text-paper"
          >
            Notify me
          </button>
        </form>
      )}
    </section>
  );
};
