import { Check, FileText, Upload } from 'lucide-react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SubPageHeader } from '../../components/layout/SubPageHeader';

const docs = [
  {
    name: 'NIN slip',
    status: 'verified',
    uploadedAt: '12 May 2026',
    hint: 'Government-issued ID',
  },
  {
    name: 'Bank statement — last 3 months',
    status: 'verified',
    uploadedAt: '12 May 2026',
    hint: 'Proof of income',
  },
  {
    name: 'Employment letter',
    status: 'missing',
    hint: 'Speeds up landlord review',
  },
] as const;

export const Documents = () => (
  <PageTransition>
    <SubPageHeader eyebrow="Your account" title="Documents & ID" />
    <div className="px-6 pb-8 lg:mx-auto lg:max-w-2xl lg:pb-16">
      <p className="-mt-4 mb-5 text-[14px] leading-[1.55] text-ink-soft">
        Upload once. Reuse across every application.
      </p>
      <div className="space-y-3">
        {docs.map((d) => (
          <div
            key={d.name}
            className="flex items-center gap-3 rounded-card bg-paper p-4 shadow-rest"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-btn bg-cream text-ink-soft">
              <FileText className="h-4 w-4" strokeWidth={1.8} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium text-[14px]">{d.name}</div>
              <div className="mt-0.5 text-[12px] text-ink-soft">
                {d.status === 'verified'
                  ? `Verified · uploaded ${d.uploadedAt}`
                  : d.hint}
              </div>
            </div>
            {d.status === 'verified' ? (
              <span className="inline-flex items-center gap-1 rounded-btn bg-verified/10 px-2 py-1 text-[11px] font-medium text-verified">
                <Check className="h-3 w-3" strokeWidth={2.5} />
                Verified
              </span>
            ) : (
              <button className="inline-flex h-9 items-center gap-1.5 rounded-btn bg-ink px-3 text-[12px] font-medium text-paper">
                <Upload className="h-3.5 w-3.5" strokeWidth={2} />
                Upload
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-card bg-cream p-5">
        <div className="caption text-umber">Privacy</div>
        <p className="mt-1.5 text-[13px] leading-[1.55] text-ink">
          Your documents are encrypted and only shared with a landlord after you submit
          an application. We never sell or share your data with anyone else.
        </p>
      </div>
    </div>
  </PageTransition>
);
