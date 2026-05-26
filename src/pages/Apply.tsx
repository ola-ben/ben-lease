import { motion } from 'framer-motion';
import { ArrowLeft, Check, FileText, Upload } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { Button } from '../components/ui/Button';
import { findProperty } from '../lib/mock-data';
import { formatNaira } from '../lib/format';

export const Apply = () => {
  const { id } = useParams();
  const property = findProperty(id ?? '');
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (!property) return null;

  const next = () => {
    if (step < 3) setStep(step + 1);
    else setSubmitted(true);
  };

  if (submitted) {
    return <Success propertyName={property.name} />;
  }

  return (
    <PageTransition>
      <header className="sticky top-0 z-30 blur-bar bg-paper/85">
        <div className="flex h-14 items-center justify-between px-6">
          <button onClick={() => (step === 0 ? navigate(-1) : setStep(step - 1))} className="no-tap -ml-2 p-2">
            <ArrowLeft className="h-5 w-5" strokeWidth={1.8} />
          </button>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i <= step ? 'bg-ink' : 'bg-sand'
                }`}
              />
            ))}
          </div>
          <div className="w-9" />
        </div>
      </header>

      <div className="px-6 pb-32 pt-4">
        <div className="caption">Step {step + 1} of 4</div>

        {step === 0 && <Personal />}
        {step === 1 && <Preferences />}
        {step === 2 && <Documents />}
        {step === 3 && <Review propertyName={property.name} price={property.pricePerYear} />}
      </div>

      <div className="fixed inset-x-0 bottom-16 z-20 mx-auto max-w-phone border-t border-sand/80 bg-paper px-6 py-3">
        <Button full size="lg" onClick={next}>
          {step === 3 ? 'Submit application' : 'Continue'}
        </Button>
      </div>
    </PageTransition>
  );
};

const Field = ({
  label,
  placeholder,
  type = 'text',
}: {
  label: string;
  placeholder: string;
  type?: string;
}) => (
  <label className="block">
    <span className="caption">{label}</span>
    <input
      type={type}
      placeholder={placeholder}
      className="mt-2 h-12 w-full rounded-btn bg-cream px-4 text-[15px] outline-none placeholder:text-ink-faint focus:ring-1 focus:ring-ink"
    />
  </label>
);

const Personal = () => (
  <div className="mt-3">
    <h2 className="font-display text-[26px] leading-tight">Tell us who you are.</h2>
    <p className="mt-2 text-[14px] text-ink-soft">
      We use this to verify your identity. It stays private to you and the landlord.
    </p>
    <div className="mt-6 space-y-4">
      <Field label="Full name" placeholder="Adekunle Ojo" />
      <Field label="Phone" placeholder="0803 000 0000" type="tel" />
      <Field label="Email" placeholder="you@example.com" type="email" />
      <Field label="Current employer" placeholder="Self-employed, or company name" />
    </div>
  </div>
);

const Preferences = () => {
  const [lease, setLease] = useState(12);
  return (
    <div className="mt-3">
      <h2 className="font-display text-[26px] leading-tight">Your lease preferences.</h2>
      <p className="mt-2 text-[14px] text-ink-soft">
        We'll share these with the landlord with your application.
      </p>
      <div className="mt-6 space-y-5">
        <Field label="Move-in date" placeholder="July 2026" type="date" />
        <div>
          <span className="caption">Lease length</span>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {[12, 24].map((m) => (
              <button
                key={m}
                onClick={() => setLease(m)}
                className={`no-tap h-12 rounded-btn text-[14px] font-medium transition-colors ${
                  lease === m ? 'bg-ink text-paper' : 'bg-cream text-ink'
                }`}
              >
                {m} months
              </button>
            ))}
          </div>
        </div>
        <Field label="Occupants" placeholder="2 adults" />
      </div>
    </div>
  );
};

const Documents = () => (
  <div className="mt-3">
    <h2 className="font-display text-[26px] leading-tight">Documents.</h2>
    <p className="mt-2 text-[14px] text-ink-soft">
      Upload a government-issued ID and proof of income (pay slip or bank statement).
    </p>
    <div className="mt-6 space-y-4">
      <UploadZone label="Government ID" hint="Driver's license, NIN, or passport" />
      <UploadZone label="Proof of income" hint="Last 3 months pay slips or bank statement" />
    </div>
  </div>
);

const UploadZone = ({ label, hint }: { label: string; hint: string }) => (
  <button className="no-tap flex w-full flex-col items-start gap-1 rounded-card border border-dashed border-sand bg-paper p-5 text-left">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-btn bg-cream">
        <Upload className="h-4 w-4" strokeWidth={1.8} />
      </div>
      <div>
        <div className="font-medium text-[14px]">{label}</div>
        <div className="text-[12px] text-ink-soft">{hint}</div>
      </div>
    </div>
    <div className="caption mt-3 self-end text-umber">Tap to upload</div>
  </button>
);

const Review = ({ propertyName, price }: { propertyName: string; price: number }) => (
  <div className="mt-3">
    <h2 className="font-display text-[26px] leading-tight">Review &amp; submit.</h2>
    <p className="mt-2 text-[14px] text-ink-soft">
      Once submitted, the landlord has 24 hours to respond.
    </p>

    <div className="mt-6 space-y-4">
      <div className="rounded-card bg-paper p-5 shadow-rest">
        <div className="caption">The home</div>
        <div className="mt-2 font-display text-[18px]">{propertyName}</div>
        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="font-semibold">{formatNaira(price)}</span>
          <span className="text-[12px] text-ink-faint">/year</span>
        </div>
      </div>

      <div className="rounded-card bg-cream p-5">
        <div className="caption">Submission includes</div>
        <ul className="mt-3 space-y-2 text-[14px]">
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-verified" strokeWidth={2.5} /> Personal details
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-verified" strokeWidth={2.5} /> Lease preferences
          </li>
          <li className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-ink-soft" strokeWidth={1.8} /> 2 documents
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const Success = ({ propertyName }: { propertyName: string }) => (
  <PageTransition>
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        className="text-umber"
      >
        <motion.circle
          cx="28"
          cy="40"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <motion.path
          d="M38 40h28"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
        />
        <motion.path
          d="M58 40v8 M66 40v6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 1.0, ease: 'easeOut' }}
        />
      </motion.svg>

      <motion.h1
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8 font-display text-[32px] italic leading-tight"
      >
        Application sent
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="mt-4 max-w-[320px] text-[15px] leading-[1.55] text-ink-soft"
      >
        We'll review within 24 hours. You'll get an SMS and email at every step.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="mt-5"
      >
        <div className="caption">Reference</div>
        <div className="mt-1.5 font-mono text-[14px] text-ink">BL-2026-0526-Q4</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-10 flex w-full max-w-[280px] flex-col gap-3"
      >
        <Link
          to="/applications"
          className="no-tap inline-flex h-12 items-center justify-center rounded-btn bg-ink text-[14px] font-medium text-paper"
        >
          Track application
        </Link>
        <Link
          to="/"
          className="no-tap inline-flex h-12 items-center justify-center rounded-btn bg-cream text-[14px] font-medium text-ink"
        >
          Back to browse
        </Link>
        <span className="sr-only">{propertyName}</span>
      </motion.div>
    </div>
  </PageTransition>
);
