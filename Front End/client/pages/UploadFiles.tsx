import { useState, useCallback } from "react";
import { AppLayout } from "@/components/AppLayout";
import { cn } from "@/lib/utils";
import {
  FiActivity,
  FiAlertTriangle,
  FiArchive,
  FiBarChart2,
  FiCheckCircle,
  FiClock,
  FiCloud,
  FiDatabase,
  FiDownload,
  FiFile,
  FiFileText,
  FiFolderPlus,
  FiGrid,
  FiHardDrive,
  FiLayers,
  FiMoreVertical,
  FiPlus,
  FiRefreshCw,
  FiServer,
  FiSettings,
  FiUploadCloud,
  FiZap,
} from "react-icons/fi";

interface FileEntry {
  id: number;
  name: string;
  uploader: string;
  size: string;
  date: string;
  status: "Processing" | "Completed" | "Failed";
  type: "csv" | "png" | "pdf" | "xlsx";
}

const recentUploads: FileEntry[] = [
  {
    id: 1,
    name: "Q3_Inventory_Master.csv",
    uploader: "Uploaded by Alex M.",
    size: "2.4 MB",
    date: "Today, 10:42 AM",
    status: "Processing",
    type: "csv",
  },
  {
    id: 2,
    name: "Warehouse_Layout_v2.png",
    uploader: "Uploaded by Sarah K.",
    size: "8.1 MB",
    date: "Yesterday, 04:15 PM",
    status: "Completed",
    type: "png",
  },
  {
    id: 3,
    name: "Vendor_Contract_2024.pdf",
    uploader: "Uploaded by Alex M.",
    size: "1.2 MB",
    date: "Oct 24, 09:30 AM",
    status: "Failed",
    type: "pdf",
  },
  {
    id: 4,
    name: "Asset_Depreciation_Q2.xlsx",
    uploader: "System Auto-Gen",
    size: "4.5 MB",
    date: "Oct 23, 11:00 PM",
    status: "Completed",
    type: "xlsx",
  },
];

const statusConfig = {
  Processing: {
    text: "Processing",
    color: "#D4AF37",
    border: "rgba(212, 175, 55, 0.22)",
    bg: "rgba(212, 175, 55, 0.10)",
  },
  Completed: {
    text: "Completed",
    color: "#24E4A4",
    border: "rgba(36, 228, 164, 0.22)",
    bg: "rgba(36, 228, 164, 0.10)",
  },
  Failed: {
    text: "Failed",
    color: "#FF4DB8",
    border: "rgba(255, 77, 184, 0.20)",
    bg: "rgba(255, 77, 184, 0.10)",
  },
};

const fileTypeConfig = {
  csv: { color: "#24E4A4", bg: "rgba(36, 228, 164, 0.10)", label: "CSV", icon: FiFileText },
  png: { color: "#60A5FA", bg: "rgba(96, 165, 250, 0.10)", label: "IMG", icon: FiFile },
  pdf: { color: "#FF4DB8", bg: "rgba(255, 77, 184, 0.10)", label: "PDF", icon: FiFileText },
  xlsx: { color: "#00D4FF", bg: "rgba(0, 212, 255, 0.10)", label: "XLS", icon: FiGrid },
};

const supportedFormats = [
  { label: "CSV", description: "Delimited operational datasets", icon: FiFileText },
  { label: "Excel", description: "XLS and XLSX workbooks", icon: FiGrid },
  { label: "JSON", description: "Structured API exports", icon: FiServer },
  { label: "XML", description: "Legacy enterprise documents", icon: FiLayers },
  { label: "Parquet", description: "Columnar analytics files", icon: FiDatabase },
];

const importQueue = [
  { name: "northwind_orders.csv", status: "Uploading", progress: 68, speed: "14 MB/s", eta: "1m 12s" },
  { name: "warehouse_inventory.xlsx", status: "Processing", progress: 84, speed: "9k rec/s", eta: "34s" },
  { name: "supplier_catalog.json", status: "Queued", progress: 18, speed: "Pending", eta: "4m" },
  { name: "finance_snapshot.parquet", status: "Completed", progress: 100, speed: "22 MB/s", eta: "Done" },
  { name: "legacy_orders.xml", status: "Failed", progress: 43, speed: "0 MB/s", eta: "Stopped" },
];

const quickActions = [
  { label: "Import from Cloud", icon: FiCloud },
  { label: "Schedule Import", icon: FiClock },
  { label: "Create Folder", icon: FiFolderPlus },
  { label: "Manage Storage", icon: FiSettings },
];

const queueStatusStyles: Record<string, { text: string; bg: string; ring: string; dot: string; bar: string }> = {
  Queued: {
    text: "text-slate-300",
    bg: "bg-slate-400/10",
    ring: "ring-slate-300/20",
    dot: "bg-slate-300",
    bar: "from-slate-400 to-cyan-300",
  },
  Uploading: {
    text: "text-cyan-300",
    bg: "bg-cyan-400/10",
    ring: "ring-cyan-300/20",
    dot: "bg-cyan-300",
    bar: "from-[#635BFF] to-[#00D4FF]",
  },
  Processing: {
    text: "text-[#D4AF37]",
    bg: "bg-[#D4AF37]/10",
    ring: "ring-[#D4AF37]/20",
    dot: "bg-[#D4AF37]",
    bar: "from-[#D4AF37] to-cyan-300",
  },
  Completed: {
    text: "text-emerald-300",
    bg: "bg-emerald-400/10",
    ring: "ring-emerald-300/20",
    dot: "bg-emerald-300",
    bar: "from-emerald-400 to-cyan-300",
  },
  Failed: {
    text: "text-pink-200",
    bg: "bg-pink-400/10",
    ring: "ring-pink-300/20",
    dot: "bg-pink-300",
    bar: "from-rose-400 to-pink-300",
  },
};

function FileTypeIcon({ type }: { type: FileEntry["type"] }) {
  const config = fileTypeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg ring-1 ring-white/10"
      style={{ background: config.bg, color: config.color }}
    >
      <Icon className="h-4 w-4" />
    </div>
  );
}

function StatusBadge({ status }: { status: FileEntry["status"] }) {
  const config = statusConfig[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1"
      style={{ color: config.color, borderColor: config.border, background: config.bg }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: config.color }} />
      {config.text}
    </span>
  );
}

function QueueBadge({ status }: { status: string }) {
  const tone = queueStatusStyles[status];

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${tone.bg} ${tone.text} ${tone.ring}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${tone.dot} ${status === "Uploading" ? "shadow-[0_0_12px_rgba(0,212,255,0.4)]" : ""}`} />
      {status}
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

function KpiCard({
  label,
  value,
  trend,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  trend: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}) {
  return (
    <div className="group rounded-lg border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.055] hover:shadow-[0_18px_50px_rgba(99,91,255,0.12)]">
      <div className="flex items-start justify-between gap-3">
        <span
          className="grid h-10 w-10 place-items-center rounded-lg ring-1 ring-white/10 transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_28px_rgba(255,255,255,0.12)]"
          style={{ backgroundColor: `${accent}18`, color: accent }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/20 transition duration-300 group-hover:scale-105">
          {trend}
        </span>
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-white">{value}</p>
      <div className="mt-4 h-1 rounded-full bg-white/[0.06]">
        <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#635BFF] via-[#00D4FF] to-[#24E4A4] shadow-[0_0_18px_rgba(0,212,255,0.18)]" />
      </div>
    </div>
  );
}

export default function UploadFiles() {
  const [isDragging, setIsDragging] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const completedUploads = recentUploads.filter((file) => file.status === "Completed").length;
  const successRate = Math.round((completedUploads / recentUploads.length) * 100);
  const storageUsage = 68;

  return (
    <AppLayout pageTitle="Data Upload Center" pageSubtitle="Import spreadsheets, CSV files and datasets into the Atlas AI platform.">
      <div className="min-h-full bg-[radial-gradient(circle_at_20%_0%,rgba(99,91,255,0.13),transparent_30%),radial-gradient(circle_at_86%_10%,rgba(0,212,255,0.1),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.98))] p-4 text-slate-100 sm:p-6 xl:p-8">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5">
          <section className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/30 hover:shadow-[0_24px_80px_rgba(56,189,248,0.1)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-300/10 bg-pink-400/5 px-3 py-1 text-xs font-semibold text-pink-100 shadow-[0_0_28px_rgba(255,77,184,0.08)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(36,228,164,0.35)]" />
                  Ready
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Data Upload Center</h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                  Import spreadsheets, CSV files and datasets into the Atlas AI platform.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white px-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-100 hover:shadow-[0_0_24px_rgba(255,255,255,0.18)]">
                  <FiUploadCloud className="h-4 w-4" />
                  Upload Files
                </button>
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm font-semibold text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.06] hover:text-white">
                  <FiPlus className="h-4 w-4" />
                  Create Import Job
                </button>
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm font-semibold text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/30 hover:bg-white/[0.06] hover:text-white">
                  <FiRefreshCw className="h-4 w-4" />
                  Refresh
                </button>
              </div>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:border-cyan-300/25 hover:shadow-[0_24px_90px_rgba(0,212,255,0.1)]">
              <div
                className={cn(
                  "relative overflow-hidden rounded-lg border-2 border-dashed p-8 transition duration-300 sm:p-10",
                  isDragging
                    ? "border-cyan-300/60 bg-cyan-400/[0.06] shadow-[0_0_60px_rgba(0,212,255,0.14)]"
                    : "border-white/10 bg-white/[0.03] hover:border-cyan-300/35 hover:bg-white/[0.045]",
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,212,255,0.11),transparent_38%)]" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="grid h-24 w-24 place-items-center rounded-2xl border border-white/10 bg-cyan-400/10 text-cyan-200 shadow-[0_0_46px_rgba(0,212,255,0.18)] transition duration-300 group-hover:scale-105">
                    <FiUploadCloud className="h-11 w-11" />
                  </div>
                  <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">Upload CSV, Excel, JSON, XML or Parquet</h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                    Drag and drop enterprise datasets here, or select files from your device to start a new import pipeline.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {["CSV", "Excel", "JSON", "XML", "Parquet"].map((format) => (
                      <span key={format} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                        {format}
                      </span>
                    ))}
                  </div>
                  <label className="mt-7 inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-100 hover:shadow-[0_0_24px_rgba(255,255,255,0.18)]">
                    <FiUploadCloud className="h-4 w-4" />
                    Select Files
                    <input type="file" className="hidden" multiple accept=".csv,.xlsx,.pdf,.jpg,.png,.json,.xml,.parquet" />
                  </label>
                </div>
              </div>
            </div>

            <aside className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/25 hover:shadow-[0_24px_80px_rgba(36,228,164,0.1)]">
              <SectionHeader icon={FiHardDrive} title="Storage Health" caption="Capacity and upload throughput" />
              <div className="mt-6 flex flex-col items-center text-center">
                <div
                  className="relative grid h-44 w-44 place-items-center rounded-full p-3 shadow-[0_0_70px_rgba(36,228,164,0.12)] transition duration-500 group-hover:scale-[1.03]"
                  style={{ background: `conic-gradient(#24E4A4 ${storageUsage * 3.6}deg, rgba(255,255,255,0.08) 0deg)` }}
                >
                  <div className="grid h-full w-full place-items-center rounded-full border border-white/10 bg-[#0B1220]">
                    <div>
                      <p className="text-5xl font-bold tracking-tight text-white">{storageUsage}%</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Usage</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                  <p className="text-slate-500">Available Space</p>
                  <p className="mt-1 font-bold text-white">2.4 TB</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                  <p className="text-slate-500">Upload Speed</p>
                  <p className="mt-1 font-bold text-white">18 MB/s</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3 sm:col-span-2">
                  <p className="text-slate-500">Free Capacity</p>
                  <p className="mt-1 font-bold text-white">32%</p>
                </div>
              </div>
            </aside>
          </section>

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="Files Uploaded" value="24" trend="+12%" icon={FiFileText} accent="#635BFF" />
            <KpiCard label="Pending Imports" value="7" trend="+4%" icon={FiClock} accent="#00D4FF" />
            <KpiCard label="Storage Used" value="68%" trend="+9%" icon={FiHardDrive} accent="#24E4A4" />
            <KpiCard label="Success Rate" value={`${successRate}%`} trend="+6%" icon={FiCheckCircle} accent="#D4AF37" />
          </section>

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="flex min-w-0 flex-col gap-5">
              <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/25 hover:shadow-[0_18px_70px_rgba(56,189,248,0.08)]">
                <SectionHeader icon={FiArchive} title="Import Queue" caption="Active upload jobs and processing status" />
                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  {importQueue.map((job) => {
                    const tone = queueStatusStyles[job.status];
                    return (
                      <article key={job.name} className="rounded-lg border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.055] hover:shadow-[0_20px_60px_rgba(99,91,255,0.11)]">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white">{job.name}</p>
                            <p className="mt-1 text-xs text-slate-500">Import job</p>
                          </div>
                          <QueueBadge status={job.status} />
                        </div>
                        <div className="mt-5">
                          <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                            <span className="text-slate-400">Progress</span>
                            <span className={tone.text}>{job.progress}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/[0.06]">
                            <div className={`h-full rounded-full bg-gradient-to-r ${tone.bar} shadow-[0_0_18px_rgba(0,212,255,0.16)] transition-all duration-700`} style={{ width: `${job.progress}%` }} />
                          </div>
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                          <div className="rounded-md bg-white/[0.035] p-2">
                            <p className="text-slate-500">Speed</p>
                            <p className="mt-1 font-semibold text-slate-200">{job.speed}</p>
                          </div>
                          <div className="rounded-md bg-white/[0.035] p-2">
                            <p className="text-slate-500">Time Remaining</p>
                            <p className="mt-1 font-semibold text-slate-200">{job.eta}</p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:shadow-[0_18px_70px_rgba(0,212,255,0.08)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <SectionHeader icon={FiActivity} title="Recent Uploads" caption="Latest files imported into Atlas AI" />
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    Page {currentPage} of 2
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {recentUploads.map((file) => (
                    <article key={file.id} className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.055] sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 items-center gap-3">
                        <FileTypeIcon type={file.type} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">{file.name}</p>
                          <p className="mt-1 text-xs text-slate-400">{file.date} · {file.uploader.replace("Uploaded by ", "")}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-3 text-xs sm:min-w-[320px]">
                        <div>
                          <p className="text-slate-500">Records</p>
                          <p className="mt-1 font-semibold text-slate-200">{(file.id * 1840 + 620).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Size</p>
                          <p className="mt-1 font-semibold text-slate-200">{file.size}</p>
                        </div>
                        <div className="flex items-center justify-end gap-3">
                          <StatusBadge status={file.status} />
                          <button className="grid h-8 w-8 place-items-center rounded-md text-slate-500 transition hover:bg-white/[0.06] hover:text-white">
                            <FiMoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-slate-500">Showing 1 to 4 of 24 entries</span>
                  <div className="flex items-center gap-1">
                    <button className="rounded-md border border-white/10 px-3 py-1 text-sm text-slate-500 opacity-50" disabled>
                      Prev
                    </button>
                    {[1, 2].map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`rounded-md border px-3 py-1 text-sm font-semibold transition ${
                          currentPage === page
                            ? "border-cyan-300/25 bg-cyan-400/10 text-cyan-300"
                            : "border-white/10 text-slate-400 hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button className="rounded-md border border-white/10 px-3 py-1 text-sm text-slate-400 transition hover:bg-white/[0.06] hover:text-white">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <aside className="flex flex-col gap-5">
              <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/25 hover:shadow-[0_18px_70px_rgba(36,228,164,0.08)]">
                <SectionHeader icon={FiCheckCircle} title="Supported Formats" caption="Compatible import file types" />
                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  {supportedFormats.map((format) => {
                    const Icon = format.icon;
                    return (
                      <article key={format.label} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.055]">
                        <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/15">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-white">{format.label}</p>
                          <p className="mt-1 text-xs text-slate-400">{format.description}</p>
                        </div>
                        <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[11px] font-bold text-emerald-300 ring-1 ring-emerald-300/20">
                          Compatible
                        </span>
                      </article>
                    );
                  })}
                </div>
              </div>

              <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/25 hover:shadow-[0_18px_70px_rgba(212,175,55,0.08)]">
                <SectionHeader icon={FiZap} title="Quick Actions" caption="Common upload operations" />
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
            </aside>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}