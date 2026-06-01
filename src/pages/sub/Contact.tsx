import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SubPageHeader } from '../../components/layout/SubPageHeader';
import { Button } from '../../components/ui/Button';

export const Contact = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  return (
    <PageTransition>
      <SubPageHeader eyebrow="Talk to us" title="Get in touch." />
      <div className="px-6 pb-10 lg:mx-auto lg:max-w-2xl lg:pb-16">
        <p className="-mt-3 text-[15px] leading-[1.6] text-ink-soft">
          We answer every message. Pick whichever channel suits you.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <a
            href="https://wa.me/2348000000000"
            className="no-tap flex flex-col items-start gap-2 rounded-card bg-cream p-5"
          >
            <MessageCircle className="h-5 w-5 text-umber" strokeWidth={1.6} />
            <div>
              <div className="font-medium text-[14px]">WhatsApp</div>
              <div className="text-[12px] text-ink-soft">+234 800 000 0000</div>
            </div>
          </a>
          <a
            href="tel:+2348000000000"
            className="no-tap flex flex-col items-start gap-2 rounded-card bg-cream p-5"
          >
            <Phone className="h-5 w-5 text-umber" strokeWidth={1.6} />
            <div>
              <div className="font-medium text-[14px]">Call</div>
              <div className="text-[12px] text-ink-soft">Mon–Sat, 9am–7pm</div>
            </div>
          </a>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (form.name && form.email.includes('@') && form.message) setSent(true);
          }}
          className="mt-8 space-y-3"
        >
          <div className="caption mb-1">Send us a note</div>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="h-12 w-full rounded-btn bg-cream px-4 text-[15px] outline-none placeholder:text-ink-faint focus:ring-1 focus:ring-ink"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="h-12 w-full rounded-btn bg-cream px-4 text-[15px] outline-none placeholder:text-ink-faint focus:ring-1 focus:ring-ink"
          />
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="What's on your mind?"
            rows={5}
            className="w-full rounded-btn bg-cream p-4 text-[15px] outline-none placeholder:text-ink-faint focus:ring-1 focus:ring-ink"
          />
          {sent ? (
            <div className="rounded-btn bg-verified/10 px-4 py-3 text-[13px] text-verified">
              Got it — we'll be in touch within 24 hours.
            </div>
          ) : (
            <Button full size="lg" type="submit">
              Send message
            </Button>
          )}
        </form>

        <div className="mt-10 flex items-start gap-3 text-[13px] text-ink-soft">
          <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={1.6} />
          hello@benlease.ng
        </div>
        <div className="mt-3 flex items-start gap-3 text-[13px] text-ink-soft">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={1.6} />
          24 Bourdillon Road, Ikoyi, Lagos
        </div>
      </div>
    </PageTransition>
  );
};
