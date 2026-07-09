import { AppLayout } from "@/components/AppLayout";
import { useEffect, useMemo, useState } from "react";
import {
  FiActivity,
  FiAlertTriangle,
  FiArchive,
  FiArrowDown,
  FiBarChart2,
  FiCheckCircle,
  FiClock,
  FiCpu,
  FiDatabase,
  FiDownload,
  FiFileText,
  FiLayers,
  FiPlayCircle,
  FiRefreshCw,
  FiServer,
  FiShield,
  FiUploadCloud,
  FiZap,
} from "react-icons/fi";
import { getETL } from "@/services/etlService";
import { ETLResponse } from "@/types/etl";

type StatusTone = {
  label: string;
  dot: string;
  text: string;
  bg: string;
  ring: string;
  bar: string;
};

const pipelineStatusStyles: Record<string, StatusTone> = {
  Running: {
    label: "Running",
    dot: "bg-pink-300",
    text: "text-pink-200",
    bg: "bg-pink-400/10",
    ring: "ring-pink-300/20",
    bar: "from-[#635BFF] via-[#00D4FF] to-[#FF4DB8]",
  },
  Completed: {
    label: "Completed",
    dot: "bg-emerald-300",
    text: "text-emerald-300",
    bg: "bg-emerald-400/10",
    ring: "ring-emerald-300/20",
    bar: "from-emerald-400 to-cyan-300",
  },
  Queued: {
    label: "Queued",
    dot: "bg-amber-300",
    text: "text-amber-300",
    bg: "bg-amber-400/10",
    ring: "ring-amber-300/20",
    bar: "from-amber-300 to-[#D4AF37]",
  },
  Failed: {
    label: "Failed",
    dot: "bg-rose-300",
    text: "text-rose-300",
    bg: "bg-rose-400/10",
    ring: "ring-rose-300/20",
    bar: "from-rose-400 to-pink-300",
  },
};

const serviceStatusStyles: Record<string, StatusTone> = {
  Healthy: {
    label: "Healthy",
    dot: "bg-emerald-300",
    text: "text-emerald-300",
    bg: "bg-emerald-400/10",
    ring: "ring-emerald-300/20",
    bar: "from-emerald-400 to-cyan-300",
  },
  Warning: {
    label: "Warning",
    dot: "bg-amber-300",
    text: "text-amber-300",
    bg: "bg-amber-400/10",
    ring: "ring-amber-300/20",
    bar: "from-amber-300 to-[#D4AF37]",
  },
  Offline: {
    label: "Offline",
    dot: "bg-rose-300",
    text: "text-rose-300",
    bg: "bg-rose-400/10",
    ring: "ring-rose-300/20",
    bar: "from-rose-400 to-pink-300",
  },
};

const pipelines = [
  {
    name: "ERP -> PostgreSQL",
    status: "Running",
    progress: 72,
  },
  {
    name: "CSV -> Inventory",
    status: "Completed",
    progress: 100,
  },
  {
    name: "Google Sheets -> Sales",
    status: "Queued",
    progress: 15,
  },
  {
    name: "AWS S3 -> Warehouse",
    status: "Failed",
    progress: 41,
  },
];

const logs = [
  "Inventory.csv imported successfully",
  "ERP synchronization completed",
  "Google Sheets synced",
  "AWS connection timeout",
];

const services = [
  { name: "PostgreSQL", status: "Connected" },
  { name: "AWS S3", status: "Connected" },
  { name: "ERP", status: "Connected" },
  { name: "Google API", status: "Connected" },
];

const flowSteps = [
  { label: "ERP", icon: FiServer },
  { label: "Extract", icon: FiDownload },
  { label: "Transform", icon: FiCpu },
  { label: "Validate", icon: FiShield },
  { label: "Warehouse", icon: FiDatabase },
  { label: "Dashboard", icon: FiBarChart2 },
];

function getPipelineTone(status: string) {
  return pipelineStatusStyles[status] ?? pipelineStatusStyles.Queued;
}

function getServiceHealth(status: string) {
  const normalized = status.toLowerCase();

  if (normalized.includes("offline") || normalized.includes("failed") || normalized.includes("down")) return "Offline";
  if (normalized.includes("warning") || normalized.includes("degraded") || normalized.includes("slow")) return "Warning";
  return "Healthy";
}

function StatusBadge({ status, service = false }: { status: string; service?: boolean }) {
  const health = service ? getServiceHealth(status) : status;
  const tone = service ? serviceStatusStyles[health] : getPipelineTone(status);

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${tone.bg} ${tone.text} ${tone.ring}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${tone.dot} ${health === "Running" || status === "Running" ? "shadow-[0_0_12px_rgba(255,77,184,0.42)]" : ""}`} />
      {service ? health : tone.label}
    </span>
  );
}

function KpiCard({
  label,
  value,
  trend,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  trend: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}) {
  const trendUp = !trend.trim().startsWith("-");

  return (
    <div className="group rounded-lg border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.055] hover:shadow-[0_18px_50px_rgba(99,91,255,0.12)]">
      <div className="flex items-start justify-between gap-3">
        <span
          className="grid h-10 w-10 place-items-center rounded-lg ring-1 ring-white/10 transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_28px_rgba(255,255,255,0.12)]"
          style={{ backgroundColor: `${accent}18`, color: accent }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 transition duration-300 group-hover:scale-105 ${
            trendUp ? "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20" : "bg-rose-400/10 text-rose-300 ring-rose-400/20"
          }`}
        >
          {trendUp ? "+" : ""}{trend}
        </span>
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-white">{value}</p>
      <div className="mt-4 h-1 rounded-full bg-white/[0.06]">
        <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#635BFF] via-[#00D4FF] to-[#D4AF37] shadow-[0_0_18px_rgba(0,212,255,0.18)]" />
      </div>
    </div>
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

function Sparkline({ index, state }: { index: number; state: string }) {
  const values = [36, 52, 44, 66, 58, 74, 69, 82].map((value) => Math.max(18, Math.min(88, value - index * 3)));
  const color = state === "Offline" ? "#FB7185" : state === "Warning" ? "#D4AF37" : "#22D3EE";
  const points = values.map((value, i) => `${i * 14},${96 - value}`).join(" ");

  return (
    <svg viewBox="0 0 98 64" className="h-10 w-24 overflow-visible">
      <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <polyline points={`0,64 ${points} 98,64`} fill={color} opacity="0.08" />
    </svg>
  );
}

export default function ETLMonitor() {
  const [etl, setETL] = useState<ETLResponse | null>(null);

  useEffect(() => {
    async function loadETL() {
      try {
        const data = await getETL();
        console.log(data);
        setETL(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadETL();
  }, []);

  const currentPipelines = etl?.pipelines ?? pipelines;
  const currentServices = etl?.services ?? services;
  const currentLogs = etl?.logs ?? logs;

  const derivedStats = useMemo(() => {
    const records = etl?.summary.recordsImported ?? 0;
    const active = etl?.summary.activePipelines ?? 0;
    const files = etl?.summary.filesToday ?? 0;
    const errors = etl?.summary.errors ?? 0;

    return {
      active,
      files,
      records: records.toLocaleString(),
      errors,
    };
  }, [etl]);

  return (
    <AppLayout>
      <div className="min-h-full bg-[radial-gradient(circle_at_20%_0%,rgba(99,91,255,0.13),transparent_30%),radial-gradient(circle_at_86%_10%,rgba(0,212,255,0.1),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.98))] p-4 text-slate-100 sm:p-6 xl:p-8">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5">
          <section className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/30 hover:shadow-[0_24px_80px_rgba(56,189,248,0.1)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-300/10 bg-pink-400/5 px-3 py-1 text-xs font-semibold text-pink-100 shadow-[0_0_28px_rgba(255,77,184,0.08)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-300 shadow-[0_0_10px_rgba(255,77,184,0.35)]" />
                  Real-time
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Data Pipelines</h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                  Monitor, orchestrate and validate every pipeline across your enterprise ecosystem.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm font-semibold text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/30 hover:bg-white/[0.06] hover:text-white">
                  <FiClock className="h-4 w-4" />
                  Date Range
                </button>
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm font-semibold text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.06] hover:text-white">
                  <FiRefreshCw className="h-4 w-4" />
                  Refresh
                </button>
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white text-sm font-semibold text-slate-950 px-3 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-100 hover:shadow-[0_0_24px_rgba(255,255,255,0.18)]">
                  <FiUploadCloud className="h-4 w-4" />
                  Export
                </button>
              </div>
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="Active Pipelines" value={derivedStats.active} trend="12%" icon={FiActivity} accent="#635BFF" />
            <KpiCard label="Files Today" value={derivedStats.files} trend="9%" icon={FiFileText} accent="#00D4FF" />
            <KpiCard label="Records Imported" value={derivedStats.records} trend="18%" icon={FiDatabase} accent="#D4AF37" />
            <KpiCard label="Errors" value={derivedStats.errors} trend={derivedStats.errors > 0 ? "-3%" : "0%"} icon={FiAlertTriangle} accent="#FF4DB8" />
          </section>

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]">
            <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:border-sky-300/25 hover:shadow-[0_24px_90px_rgba(56,189,248,0.1)]">
              <SectionHeader icon={FiPlayCircle} title="Active Pipelines" caption="Throughput, status and execution progress" />
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {currentPipelines.map((pipeline, index) => {
                  const tone = getPipelineTone(pipeline.status);
                  const records = Math.max(1200, Math.round((pipeline.progress + 25) * (index + 7) * 41));
                  const duration = pipeline.status === "Queued" ? "Pending" : `${Math.max(2, Math.round(pipeline.progress / 9))}m ${index * 8 + 12}s`;
                  const speed = pipeline.status === "Failed" ? "0 rec/s" : `${Math.max(18, Math.round(records / 420))} rec/s`;

                  return (
                    <article key={pipeline.name} className="rounded-lg border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.055] hover:shadow-[0_20px_60px_rgba(99,91,255,0.11)]">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">{pipeline.name}</p>
                          <p className="mt-1 text-xs text-slate-500">Pipeline</p>
                        </div>
                        <StatusBadge status={pipeline.status} />
                      </div>

                      <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-400">Progress</span>
                          <span className={tone.text}>{pipeline.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/[0.06]">
                          <div className={`h-full rounded-full bg-gradient-to-r ${tone.bar} shadow-[0_0_18px_rgba(0,212,255,0.16)] transition-all duration-700`} style={{ width: `${pipeline.progress}%` }} />
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
                        <div className="rounded-md bg-white/[0.035] p-2">
                          <p className="text-slate-500">Duration</p>
                          <p className="mt-1 font-semibold text-slate-200">{duration}</p>
                        </div>
                        <div className="rounded-md bg-white/[0.035] p-2">
                          <p className="text-slate-500">Records</p>
                          <p className="mt-1 font-semibold text-slate-200">{records.toLocaleString()}</p>
                        </div>
                        <div className="rounded-md bg-white/[0.035] p-2">
                          <p className="text-slate-500">Speed</p>
                          <p className="mt-1 font-semibold text-slate-200">{speed}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:shadow-[0_24px_80px_rgba(0,212,255,0.1)]">
              <SectionHeader icon={FiLayers} title="Pipeline Flow" caption="Enterprise data movement" />
              <div className="mt-6 flex flex-col items-center gap-3">
                {flowSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="flex w-full flex-col items-center">
                      <div className="flex w-full items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.055]">
                        <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/15">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white">{step.label}</p>
                          <p className="text-xs text-slate-500">Stage {index + 1}</p>
                        </div>
                      </div>
                      {index < flowSteps.length - 1 && (
                        <div className="flex h-8 flex-col items-center justify-center text-cyan-300/70">
                          <span className="h-5 w-px bg-gradient-to-b from-cyan-300/70 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.24)]" />
                          <FiArrowDown className="-mt-1 h-3.5 w-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/25 hover:shadow-[0_18px_70px_rgba(16,185,129,0.08)]">
              <SectionHeader icon={FiShield} title="System Health" caption="Service availability, latency and signal trend" />
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {currentServices.map((service, index) => {
                  const health = getServiceHealth(service.status);
                  const latency = health === "Offline" ? "--" : `${42 + index * 13}ms`;

                  return (
                    <article key={service.name} className="rounded-lg border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.055]">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white">{service.name}</p>
                          <p className="mt-1 text-xs text-slate-500">Latency {latency}</p>
                        </div>
                        <StatusBadge status={service.status} service />
                      </div>
                      <div className="mt-4 flex items-end justify-between gap-3">
                        <Sparkline index={index} state={health} />
                        <span className="text-xs font-semibold text-slate-500">{service.status}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/25 hover:shadow-[0_18px_70px_rgba(56,189,248,0.09)]">
              <SectionHeader icon={FiArchive} title="Recent Jobs" caption="Latest executions and import results" />
              <div className="mt-5 space-y-3">
                {currentLogs.map((log, index) => {
                  const lower = log.toLowerCase();
                  const status = lower.includes("timeout") || lower.includes("failed") || lower.includes("error") ? "Failed" : lower.includes("sync") || lower.includes("imported") || lower.includes("completed") ? "Completed" : "Running";
                  const records = Math.round((index + 3) * 1482 + (status === "Failed" ? 0 : 680));

                  return (
                    <article key={`${log}-${index}`} className="rounded-lg border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.055]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">{log}</p>
                          <p className="mt-1 text-xs text-slate-500">{index + 1}h ago</p>
                        </div>
                        <StatusBadge status={status} />
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                        <div className="rounded-md bg-white/[0.035] p-2">
                          <p className="text-slate-500">Duration</p>
                          <p className="mt-1 font-semibold text-slate-200">{status === "Failed" ? "1m 04s" : `${index + 2}m ${index * 9 + 18}s`}</p>
                        </div>
                        <div className="rounded-md bg-white/[0.035] p-2">
                          <p className="text-slate-500">Records</p>
                          <p className="mt-1 font-semibold text-slate-200">{records.toLocaleString()}</p>
                        </div>
                      </div>
                    </article>
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