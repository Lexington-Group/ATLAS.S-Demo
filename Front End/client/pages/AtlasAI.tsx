import type { ComponentType } from "react";
import { AppLayout } from "@/components/AppLayout";
import {
  FiActivity,
  FiArchive,
  FiBarChart2,
  FiCheckCircle,
  FiCloud,
  FiCpu,
  FiDatabase,
  FiDownload,
  FiFileText,
  FiLayers,
  FiMessageSquare,
  FiMic,
  FiPaperclip,
  FiPlus,
  FiSend,
  FiShield,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

const conversations = {
  Today: ["Revenue Analysis", "Inventory Forecast", "Executive Summary"],
  Yesterday: ["ETL Incident Review", "Cloud Latency Check"],
  "Last Week": ["Margin Deep Dive", "Warehouse Optimization", "Board Report Draft"],
};

const openingInsights = [
  "I've analyzed your business.",
  "Revenue increased 18%.",
  "No ETL failures detected.",
  "Inventory remains healthy.",
  "Google Cloud latency increased slightly.",
  "3 recommendations are available.",
];

const suggestedPrompts = [
  "Analyze revenue trends",
  "Compare this week vs last week",
  "Predict inventory demand",
  "Generate executive report",
  "Explain ETL failures",
  "Show cloud connection health",
];

const businessContext = [
  { label: "Business Health", value: "92%", status: "Strong", icon: FiActivity, tone: "text-emerald-300" },
  { label: "Revenue", value: "+18%", status: "Improving", icon: FiTrendingUp, tone: "text-cyan-300" },
  { label: "Inventory", value: "Healthy", status: "Stable", icon: FiArchive, tone: "text-emerald-300" },
  { label: "ETL", value: "0 failures", status: "Operational", icon: FiDatabase, tone: "text-emerald-300" },
  { label: "Cloud", value: "Watch", status: "Latency up", icon: FiCloud, tone: "text-[#D4AF37]" },
  { label: "Connections", value: "3/6", status: "Connected", icon: FiLayers, tone: "text-cyan-300" },
];

const todaysInsights = [
  { label: "Revenue increased", icon: FiTrendingUp, tone: "text-cyan-300" },
  { label: "Inventory stable", icon: FiCheckCircle, tone: "text-emerald-300" },
  { label: "No failed imports", icon: FiShield, tone: "text-emerald-300" },
  { label: "Cloud healthy", icon: FiCloud, tone: "text-[#D4AF37]" },
];

const capabilities = [
  { label: "Analyze Data", icon: FiBarChart2 },
  { label: "Generate Reports", icon: FiFileText },
  { label: "Forecast Trends", icon: FiTrendingUp },
  { label: "Detect Anomalies", icon: FiZap },
  { label: "Explain Metrics", icon: FiMessageSquare },
];

function SectionHeader({
  icon: Icon,
  title,
  caption,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  caption?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.06] text-sky-200 ring-1 ring-white/10 transition duration-300 group-hover:bg-sky-400/10 group-hover:text-sky-100 group-hover:shadow-[0_0_24px_rgba(56,189,248,0.18)]">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-base font-semibold text-white">{title}</h2>
          {caption && <p className="mt-0.5 text-xs font-medium text-slate-400">{caption}</p>}
        </div>
      </div>
    </div>
  );
}

function ConversationCard({ title, active = false }: { title: string; active?: boolean }) {
  return (
    <button
      className={`w-full rounded-lg border p-3 text-left transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.055] ${
        active
          ? "border-cyan-300/25 bg-cyan-400/10 shadow-[0_0_28px_rgba(0,212,255,0.08)]"
          : "border-white/10 bg-white/[0.035] hover:border-white/25"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.06] text-cyan-200 ring-1 ring-white/10">
          <FiMessageSquare className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{title}</p>
          <p className="mt-0.5 text-xs text-slate-500">Business intelligence thread</p>
        </div>
      </div>
    </button>
  );
}

function ContextRow({ item }: { item: (typeof businessContext)[number] }) {
  const Icon = item.icon;

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3 transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.055]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className={`grid h-9 w-9 place-items-center rounded-lg bg-white/[0.05] ring-1 ring-white/10 ${item.tone}`}>
            <Icon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{item.label}</p>
            <p className="mt-0.5 text-xs text-slate-500">{item.status}</p>
          </div>
        </div>
        <span className={`text-sm font-bold ${item.tone}`}>{item.value}</span>
      </div>
    </div>
  );
}

export default function AtlasAI() {
  return (
    <AppLayout pageTitle="Atlas AI" pageSubtitle="Your enterprise intelligence copilot.">
      <div className="min-h-full bg-[radial-gradient(circle_at_20%_0%,rgba(99,91,255,0.13),transparent_30%),radial-gradient(circle_at_86%_10%,rgba(0,212,255,0.1),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.98))] p-4 text-slate-100 sm:p-6 xl:p-8">
        <div className="mx-auto flex max-w-[1700px] flex-col gap-5">
          <section className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/30 hover:shadow-[0_24px_80px_rgba(56,189,248,0.1)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-300/10 bg-pink-400/5 px-3 py-1 text-xs font-semibold text-pink-100 shadow-[0_0_28px_rgba(255,77,184,0.08)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-300 shadow-[0_0_10px_rgba(255,77,184,0.35)]" />
                  AI Online
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Atlas AI</h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">Your enterprise intelligence copilot.</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white px-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-100 hover:shadow-[0_0_24px_rgba(255,255,255,0.18)]">
                  <FiPlus className="h-4 w-4" />
                  New Chat
                </button>
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm font-semibold text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.06] hover:text-white">
                  <FiFileText className="h-4 w-4" />
                  Generate Report
                </button>
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm font-semibold text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/30 hover:bg-white/[0.06] hover:text-white">
                  <FiDownload className="h-4 w-4" />
                  Export Conversation
                </button>
              </div>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)_360px]">
            <aside className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:shadow-[0_18px_70px_rgba(0,212,255,0.08)]">
              <SectionHeader icon={FiMessageSquare} title="Conversation History" caption="Recent business analysis" />
              <div className="mt-5 space-y-5">
                {Object.entries(conversations).map(([period, items]) => (
                  <div key={period}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{period}</p>
                    <div className="space-y-2">
                      {items.map((item, index) => (
                        <ConversationCard key={item} title={item} active={period === "Today" && index === 0} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            <main className="group flex min-h-[720px] min-w-0 flex-col rounded-lg border border-white/10 bg-[#0B1220]/90 shadow-2xl shadow-black/20 transition duration-300 hover:border-sky-300/20 hover:shadow-[0_24px_90px_rgba(56,189,248,0.08)]">
              <div className="border-b border-white/10 p-5">
                <SectionHeader icon={FiCpu} title="Intelligence Workspace" caption="Business answers grounded in your Atlas operating data" />
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto p-5 scrollbar-thin">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#635BFF] to-[#00D4FF] text-white shadow-[0_0_28px_rgba(99,91,255,0.35)]">
                    <FiCpu className="h-5 w-5" />
                  </span>
                  <div className="max-w-3xl rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.045] px-5 py-4 shadow-lg shadow-black/10 transition duration-300 hover:border-cyan-300/20 hover:bg-white/[0.06]">
                    <p className="text-lg font-semibold text-white">Good morning.</p>
                    <div className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
                      {openingInsights.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="max-w-xl rounded-2xl rounded-tr-md bg-white px-5 py-4 text-sm font-medium leading-6 text-slate-950 shadow-lg shadow-white/5">
                    Prioritize the recommendations for an executive review.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#635BFF] to-[#00D4FF] text-white shadow-[0_0_28px_rgba(99,91,255,0.35)]">
                    <FiCpu className="h-5 w-5" />
                  </span>
                  <div className="max-w-3xl rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.045] px-5 py-4 shadow-lg shadow-black/10">
                    <p className="text-sm leading-6 text-slate-300">
                      Recommended focus: protect revenue momentum, watch cloud latency, and keep inventory replenishment thresholds aligned with demand.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                    <FiZap className="h-4 w-4 text-[#D4AF37]" />
                    Suggested Prompts
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        className="rounded-lg border border-white/10 bg-white/[0.035] p-3 text-left text-sm font-semibold text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-cyan-400/10 hover:text-white hover:shadow-[0_12px_34px_rgba(0,212,255,0.08)]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 p-5">
                <div className="flex min-h-[58px] items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-3 ring-1 ring-sky-400/10 transition duration-300 focus-within:border-sky-300/40 focus-within:shadow-[0_0_34px_rgba(56,189,248,0.14)]">
                  <button className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl text-slate-400 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.06] hover:text-white">
                    <FiPaperclip className="h-4 w-4" />
                  </button>
                  <input
                    type="text"
                    placeholder="Ask Atlas AI anything..."
                    className="min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
                  />
                  <button className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl text-slate-400 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.06] hover:text-white">
                    <FiMic className="h-4 w-4" />
                  </button>
                  <button className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-white text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-100 hover:shadow-[0_0_22px_rgba(255,255,255,0.22)]">
                    <FiSend className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </main>

            <aside className="flex flex-col gap-5">
              <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/25 hover:shadow-[0_18px_70px_rgba(36,228,164,0.08)]">
                <SectionHeader icon={FiActivity} title="Business Context" caption="Signals Atlas AI is using" />
                <div className="mt-5 space-y-3">
                  {businessContext.map((item) => (
                    <ContextRow key={item.label} item={item} />
                  ))}
                </div>
              </div>

              <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:shadow-[0_18px_70px_rgba(0,212,255,0.08)]">
                <SectionHeader icon={FiCheckCircle} title="Today's Insights" caption="Current operating summary" />
                <div className="mt-5 space-y-3">
                  {todaysInsights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3 transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.055]">
                        <span className={`grid h-9 w-9 place-items-center rounded-lg bg-white/[0.05] ring-1 ring-white/10 ${item.tone}`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-semibold text-white">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/25 hover:shadow-[0_18px_70px_rgba(212,175,55,0.08)]">
                <SectionHeader icon={FiZap} title="AI Capabilities" caption="Enterprise analysis tools" />
                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  {capabilities.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button key={item.label} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3 text-left transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.055] hover:shadow-[0_12px_34px_rgba(0,212,255,0.08)]">
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] ring-1 ring-[#D4AF37]/15">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-semibold text-white">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}