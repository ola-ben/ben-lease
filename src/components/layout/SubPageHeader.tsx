import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  eyebrow?: string;
  title: string;
}

export const SubPageHeader = ({ eyebrow, title }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <header className="sticky top-0 z-30 h-14 blur-bar bg-paper/85 lg:top-16">
        <div className="flex h-full items-center px-6 lg:mx-auto lg:max-w-2xl">
          <button onClick={() => navigate(-1)} className="no-tap -ml-2 p-2">
            <ArrowLeft className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>
      </header>
      <div className="px-6 pb-6 pt-2 lg:mx-auto lg:max-w-2xl lg:pb-10 lg:pt-6">
        {eyebrow && <div className="caption">{eyebrow}</div>}
        <h1 className="mt-2 font-display text-[28px] font-medium leading-[1.1] lg:text-[44px]">
          {title}
        </h1>
      </div>
    </>
  );
};
