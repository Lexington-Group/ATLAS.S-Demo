import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageSubtitle?: string;
}

export function AppLayout({ children, pageTitle, pageSubtitle }: AppLayoutProps) {
  return (
    <div
      className="min-h-screen flex"
      style={{
        background:
          "radial-gradient(87.55% 87.55% at 50% 12.45%, rgba(10, 27, 77, 0.01) 49.52%, rgba(2, 8, 23, 0.20) 100%), #0F172A",
      }}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header
          className="h-[90px] flex items-center px-8 border-b flex-shrink-0"
          style={{
            background: "rgba(17, 24, 39, 0.95)",
            borderColor: "rgba(51, 65, 85, 0.15)",
          }}
        >
          {pageTitle && (
            <div>
              <h1 className="font-inter font-bold text-2xl text-white leading-7 tracking-tight">
                {pageTitle}
              </h1>
              {pageSubtitle && (
                <p className="font-inter font-bold text-base text-atlas-muted mt-1">
                  {pageSubtitle}
                </p>
              )}
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
