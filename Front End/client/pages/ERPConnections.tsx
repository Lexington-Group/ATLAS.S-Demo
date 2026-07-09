import { AppLayout } from "@/components/AppLayout";
import {
  FiActivity,
  FiAlertTriangle,
  FiArchive,
  FiCheckCircle,
  FiClock,
  FiCloud,
  FiCpu,
  FiDatabase,
  FiDownload,
  FiGitBranch,
  FiGlobe,
  FiHardDrive,
  FiKey,
  FiLayers,
  FiPlus,
  FiRefreshCw,
  FiRepeat,
  FiServer,
  FiSettings,
  FiShield,
  FiUploadCloud,
  FiZap,
} from "react-icons/fi";

const systems = [
  {
    name: "AWS",
    description: "Amazon Web Services",
    status: "Online",
    color: "#22c55e",
    button: "Manage",
  },
  {
    name: "Google Cloud",
    description: "Google Cloud Platform",
    status: "Offline",
    color: "#ef4444",
    button: "Connect",
  },
  {
    name: "SAP ERP",
    description: "Enterprise Resource Planning",
    status: "Offline",
    color: "#ef4444",
    button: "Configure",
  },
  {
    name: "Oracle ERP",
    description: "Oracle Enterprise",
    status: "Online",
    color: "#22c55e",
    button: "Manage",
  },
  {
    name: "PostgreSQL",
    description: "Primary Database",
    status: "Online",
    color: "#22c55e",
    button: "Manage",
  },
  {
    name: "Microsoft Dynamics",
    description: "Business Central",
    status: "Offline",
    color: "#ef4444",
    button: "Connect",
  },
];

const connectionMap = [
  { label: "ERP", icon: FiServer },
  { label: "API Gateway", icon: FiGitBranch },
  { label: "Database", icon: FiDatabase },
  { label: "Warehouse", icon: FiArchive },
  { label: "Atlas AI", icon: FiCpu },
];

const quickActions = [
  { label: "Test Connection", icon: FiZap },
  { label: "Create Connection", icon: FiPlus },
  { label: "Import Configuration", icon: FiDownload },
  { label: "Export Settings", icon: FiUploadCloud },
];

const recentActivity = [
  { label: "Connection Established", target: "AWS", time: "2 min ago", icon: FiCheckCircle, tone: "text-emerald-300" },
  { label: "Connection Lost", target: "Google Cloud", time: "16 min ago", icon: FiAlertTriangle, tone: "text-rose-300" },
  { label: "Reconnected", target: "PostgreSQL", time: "34 min ago", icon: FiRepeat, tone: "text-cyan-300" },
  { label: "Credentials Updated", target: "Oracle ERP", time: "1h ago", icon: FiKey, tone: "text-[#D4AF37]" },
];

const providerIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  AWS: FiCloud,
  "Google Cloud": FiGlobe,
  "SAP ERP": FiLayers,
  "Oracle ERP": FiHardDrive,
  PostgreSQL: FiDatabase,
  "Microsoft Dynamics": FiServer,
};

const connectionMeta: Record<string, { category: string; sync: string; latency: string; region: string }> = {
  AWS: { category: "Cloud Provider", sync: "2 min ago", latency: "24 ms", region: "US-East" },
  "Google Cloud": { category: "Cloud Provider", sync: "18 min ago", latency: "--", region: "US-Central" },
  "SAP ERP": { category: "ERP Platform", sync: "42 min ago", latency: "--", region: "EU-West" },
  "Oracle ERP": { category: "ERP Platform", sync: "5 min ago", latency: "31 ms", region: "US-West" },
  PostgreSQL: { category: "Database", sync: "1 min ago", latency: "12 ms", region: "Primary" },
  "Microsoft Dynamics": { category: "ERP Platform", sync: "1h ago", latency: "--", region: "NA" },
};

function statusTone(status: string) {
  if (status === "Online") {
    return {
      label: "Connected",
      dot: "bg-emerald-300",
      text: "text-emerald-300",
      bg: "bg-emerald-400/10",
      ring: "ring-emerald-300/20",
      glow: "shadow-[0_0_14px_rgba(52,211,153,0.22)]",
      line: "from-emerald-400 via-cyan-300 to-[#D4AF37]",
    };
  }

  return {
    label: "Offline",
    dot: "bg-rose-300",
    text: "text-rose-300",
    bg: "bg-rose-400/10",
    ring: "ring-rose-300/20",
    glow: "shadow-[0_0_14px_rgba(255,77,184,0.12)]",
    line: "from-rose-400 via-pink-300 to-[#D4AF37]",
  };
}

function StatusBadge({ status }: { status: string }) {
  const tone = statusTone(status);

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${tone.bg} ${tone.text} ${tone.ring}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${tone.dot} ${tone.glow}`} />
      {tone.label}
    </span>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  caption,
}: {
  icon: React.ComponentType<{ className?: string }>;
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

export default function ERPConnections() {
  const connected = systems.filter((item) => item.status === "Online").length;
  const warnings = systems.filter((item) => item.status !== "Online").length;
  const critical = systems.filter((item) => item.status === "Critical").length;
  const healthScore = Math.round((connected / systems.length) * 100);

  return (
    <AppLayout>
      <div className="min-h-full bg-[radial-gradient(circle_at_20%_0%,rgba(99,91,255,0.13),transparent_30%),radial-gradient(circle_at_86%_10%,rgba(0,212,255,0.1),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.98))] p-4 text-slate-100 sm:p-6 xl:p-8">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5">
          <section className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/30 hover:shadow-[0_24px_80px_rgba(56,189,248,0.1)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-300/10 bg-pink-400/5 px-3 py-1 text-xs font-semibold text-pink-100 shadow-[0_0_28px_rgba(255,77,184,0.08)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-300 shadow-[0_0_10px_rgba(255,77,184,0.35)]" />
                  Live Status
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Enterprise Connections</h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                  Manage cloud providers, ERP platforms and databases from a unified workspace.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white px-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-100 hover:shadow-[0_0_24px_rgba(255,255,255,0.18)]">
                  <FiPlus className="h-4 w-4" />
                  Add Connection
                </button>
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm font-semibold text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.06] hover:text-white">
                  <FiRepeat className="h-4 w-4" />
                  Sync All
                </button>
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm font-semibold text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/30 hover:bg-white/[0.06] hover:text-white">
                  <FiRefreshCw className="h-4 w-4" />
                  Refresh
                </button>
              </div>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[380px_minmax(0,1fr)_360px]">
            <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/25 hover:shadow-[0_24px_80px_rgba(36,228,164,0.1)]">
              <SectionHeader icon={FiActivity} title="Connection Health" caption="Enterprise connectivity posture" />
              <div className="mt-6 flex flex-col items-center text-center">
                <div
                  className="relative grid h-44 w-44 place-items-center rounded-full p-3 shadow-[0_0_70px_rgba(36,228,164,0.12)] transition duration-500 group-hover:scale-[1.03]"
                  style={{ background: `conic-gradient(#24E4A4 ${healthScore * 3.6}deg, rgba(255,255,255,0.08) 0deg)` }}
                >
                  <div className="grid h-full w-full place-items-center rounded-full border border-white/10 bg-[#0B1220]">
                    <div>
                      <p className="text-5xl font-bold tracking-tight text-white">{healthScore}%</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Healthy</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                  <p className="text-2xl font-bold text-white">{connected}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Connected Services</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                  <p className="text-2xl font-bold text-[#D4AF37]">{warnings}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Warnings</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                  <p className="text-2xl font-bold text-pink-200">{critical}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Critical</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {systems.map((item) => {
                const Icon = providerIcons[item.name] ?? FiCloud;
                const meta = connectionMeta[item.name];
                const tone = statusTone(item.status);

                return (
                  <article key={item.name} className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-4 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-[#0E1728] hover:shadow-[0_20px_70px_rgba(99,91,255,0.12)]">
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-lg bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/15 transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_26px_rgba(34,211,238,0.16)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <StatusBadge status={item.status} />
                    </div>
                    <div className="mt-5">
                      <h2 className="text-lg font-bold text-white">{item.name}</h2>
                      <p className="mt-1 text-sm text-slate-400">{meta.category}</p>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-md bg-white/[0.035] p-2">
                        <p className="text-slate-500">Last Sync</p>
                        <p className="mt-1 font-semibold text-slate-200">{meta.sync}</p>
                      </div>
                      <div className="rounded-md bg-white/[0.035] p-2">
                        <p className="text-slate-500">Latency</p>
                        <p className="mt-1 font-semibold text-slate-200">{meta.latency}</p>
                      </div>
                      <div className="rounded-md bg-white/[0.035] p-2">
                        <p className="text-slate-500">Region</p>
                        <p className="mt-1 font-semibold text-slate-200">{meta.region}</p>
                      </div>
                      <div className="rounded-md bg-white/[0.035] p-2">
                        <p className="text-slate-500">Type</p>
                        <p className="mt-1 font-semibold text-slate-200">{item.description}</p>
                      </div>
                    </div>
                    <div className="mt-5 h-1 rounded-full bg-white/[0.06]">
                      <div className={`h-full w-3/4 rounded-full bg-gradient-to-r ${tone.line} shadow-[0_0_18px_rgba(0,212,255,0.14)]`} />
                    </div>
                    <button className="mt-5 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] text-sm font-semibold text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white hover:text-slate-950">
                      <FiSettings className="h-4 w-4" />
                      {item.button === "Connect" ? "Manage" : item.button}
                    </button>
                  </article>
                );
              })}
            </div>

            <aside className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:shadow-[0_24px_80px_rgba(0,212,255,0.09)]">
              <SectionHeader icon={FiGitBranch} title="Connection Map" caption="Unified Atlas data path" />
              <div className="mt-6 flex flex-col items-center gap-3">
                {connectionMap.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="flex w-full flex-col items-center">
                      <div className="flex w-full items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.055]">
                        <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/15">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white">{step.label}</p>
                          <p className="text-xs text-slate-500">Node {index + 1}</p>
                        </div>
                      </div>
                      {index < connectionMap.length - 1 && (
                        <div className="flex h-8 flex-col items-center justify-center text-cyan-300/70">
                          <span className="h-5 w-px bg-gradient-to-b from-cyan-300/70 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.22)]" />
                          <span className="-mt-1 text-xs">↓</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </aside>
          </section>

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/25 hover:shadow-[0_18px_70px_rgba(56,189,248,0.08)]">
              <SectionHeader icon={FiClock} title="Recent Activity" caption="Connection events and credential operations" />
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {recentActivity.map((event) => {
                  const Icon = event.icon;
                  return (
                    <article key={`${event.label}-${event.target}`} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.055]">
                      <span className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-white/[0.05] ring-1 ring-white/10 ${event.tone}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">{event.label}</p>
                        <p className="mt-1 text-xs text-slate-400">{event.target}</p>
                        <p className="mt-2 text-xs font-medium text-slate-500">{event.time}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/25 hover:shadow-[0_18px_70px_rgba(212,175,55,0.08)]">
              <SectionHeader icon={FiZap} title="Quick Actions" caption="Common connection operations" />
              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button key={action.label} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.055] hover:shadow-[0_12px_34px_rgba(0,212,255,0.08)]">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] ring-1 ring-[#D4AF37]/15">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-semibold text-white">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}