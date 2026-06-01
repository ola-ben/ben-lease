import { Building2, CreditCard, Plus } from 'lucide-react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SubPageHeader } from '../../components/layout/SubPageHeader';

export const Payments = () => (
  <PageTransition>
    <SubPageHeader eyebrow="Your account" title="Payment methods" />
    <div className="px-6 pb-8 lg:mx-auto lg:max-w-2xl lg:pb-16">
      <p className="-mt-4 mb-5 text-[14px] leading-[1.55] text-ink-soft">
        Rent is paid directly to the landlord. We just provide the rails — secured by
        Paystack and Flutterwave.
      </p>

      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-card bg-paper p-5 shadow-rest">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-btn bg-cream text-ink">
            <CreditCard className="h-5 w-5" strokeWidth={1.6} />
          </div>
          <div className="flex-1">
            <div className="font-medium text-[14px]">Debit card</div>
            <div className="text-[12px] text-ink-soft">Visa · Mastercard · Verve</div>
          </div>
          <button className="text-[13px] font-medium text-umber">Add</button>
        </div>

        <div className="flex items-center gap-3 rounded-card bg-paper p-5 shadow-rest">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-btn bg-cream text-ink">
            <Building2 className="h-5 w-5" strokeWidth={1.6} />
          </div>
          <div className="flex-1">
            <div className="font-medium text-[14px]">Bank transfer</div>
            <div className="text-[12px] text-ink-soft">All Nigerian banks supported</div>
          </div>
          <button className="text-[13px] font-medium text-umber">Set up</button>
        </div>
      </div>

      <button className="no-tap mt-4 flex w-full items-center justify-center gap-2 rounded-card border border-dashed border-sand bg-paper px-5 py-5 text-[14px] font-medium text-ink-soft">
        <Plus className="h-4 w-4" strokeWidth={1.8} />
        Add another method
      </button>

      <div className="mt-8 rounded-card bg-umber-soft p-5">
        <div className="caption text-umber">Why direct?</div>
        <p className="mt-1.5 text-[13px] leading-[1.55] text-ink">
          Most renters in Nigeria lose 10–15% to agent fees and caution charges. With
          direct landlord pay, you keep that. Ben Lease earns a flat service fee, paid
          by the landlord, not you.
        </p>
      </div>
    </div>
  </PageTransition>
);
