import { AppLayout } from "@/components/AppLayout";

interface PlaceholderProps {
  title: string;
  subtitle?: string;
}

export default function Placeholder({ title, subtitle }: PlaceholderProps) {
  return (
    <AppLayout pageTitle={title} pageSubtitle={subtitle}>
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-8">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
          style={{
            background: "rgba(212, 175, 55, 0.08)",
            border: "1px solid rgba(212, 175, 55, 0.15)",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 9h18M9 21V9"/>
          </svg>
        </div>
        <h2 className="font-montserrat font-semibold text-2xl text-white mb-3">
          {title}
        </h2>
        <p className="font-inter text-base text-atlas-muted max-w-md">
          This page is coming soon. Continue prompting to fill in this page's contents.
        </p>
      </div>
    </AppLayout>
  );
}
