import { AppLayout } from "@/components/AppLayout";
import { useEffect, useState } from "react";
import type { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import {
  FiActivity,
  FiArrowDownRight,
  FiArrowUpRight,
  FiBarChart2,
  FiBookOpen,
  FiCalendar,
  FiChevronRight,
  FiDownload,
  FiFilter,
  FiGlobe,
  FiLayers,
  FiMapPin,
  FiRefreshCw,
  FiShoppingCart,
  FiZap,
  FiTrendingUp,
  FiTruck,
  FiUsers,
} from "react-icons/fi";

const kpiCards = [
  {
    title: "Revenue",
    value: "$2.84M",
    valueNumber: 2.84,
    prefix: "$",
    suffix: "M",
    change: "+12.4%",
    up: true,
    icon: FiTrendingUp,
    accent: "#00D4FF",
    spark: [18, 42, 39, 58, 54, 72, 86],
  },
  {
    title: "Profit",
    value: "$624K",
    valueNumber: 624,
    prefix: "$",
    suffix: "K",
    change: "+8.9%",
    up: true,
    icon: FiActivity,
    accent: "#24E4A4",
    spark: [24, 34, 29, 46, 52, 64, 74],
  },
  {
    title: "Orders",
    value: "12.8K",
    valueNumber: 12.8,
    prefix: "",
    suffix: "K",
    change: "+6.1%",
    up: true,
    icon: FiShoppingCart,
    accent: "#D4AF37",
    spark: [15, 28, 24, 41, 48, 57, 69],
  },
  {
    title: "Customers",
    value: "8.2K",
    valueNumber: 8.2,
    prefix: "",
    suffix: "K",
    change: "+4.7%",
    up: true,
    icon: FiUsers,
    accent: "#635BFF",
    spark: [18, 31, 38, 43, 49, 55, 61],
  },
  {
    title: "Growth",
    value: "19.3%",
    valueNumber: 19.3,
    prefix: "",
    suffix: "%",
    change: "-1.2%",
    up: false,
    icon: FiBarChart2,
    accent: "#FF4DB8",
    spark: [28, 25, 32, 29, 41, 36, 44],
  },
  {
    title: "Forecast Accuracy",
    value: "94.8%",
    valueNumber: 94.8,
    prefix: "",
    suffix: "%",
    change: "+2.4%",
    up: true,
    icon: FiZap,
    accent: "#60A5FA",
    spark: [20, 36, 41, 49, 58, 66, 77],
  },
];

const revenueSeries = [
  { name: "Revenue", data: [82, 96, 90, 122, 140, 168, 196] },
  { name: "Profit", data: [42, 54, 58, 78, 86, 104, 118] },
  { name: "Orders", data: [28, 34, 31, 44, 49, 58, 70] },
];

const forecastSeries = [
  { name: "Current", data: [72, 76, 81, 86, 92, 104, 112] },
  { name: "Predicted", data: [76, 79, 84, 90, 97, 108, 120] },
  { name: "Expected", data: [78, 82, 88, 94, 101, 112, 124] },
];

const products = [
  { name: "Aurora Pro", revenue: "$418K", orders: "1,284", growth: "+18%", status: "Momentum" },
  { name: "Northstar X", revenue: "$326K", orders: "986", growth: "+12%", status: "Stable" },
  { name: "Terra AI", revenue: "$271K", orders: "842", growth: "+9%", status: "Watch" },
  { name: "Nova Core", revenue: "$243K", orders: "718", growth: "+14%", status: "Momentum" },
];

const insights = [
  "Revenue continues growing across premium accounts.",
  "Inventory remains balanced with stable replenishment.",
  "Customer acquisition improved in the mid-market segment.",
  "Margins require attention in the enterprise channel.",
];

const regionalNodes = [
  { name: "North America", value: "$1.1M", x: "15%", y: "32%", tone: "from-cyan-400/20 to-cyan-300/10" },
  { name: "Europe", value: "$712K", x: "48%", y: "24%", tone: "from-sky-400/20 to-blue-400/10" },
  { name: "South America", value: "$384K", x: "24%", y: "68%", tone: "from-emerald-400/20 to-cyan-400/10" },
  { name: "Asia", value: "$948K", x: "76%", y: "38%", tone: "from-[#D4AF37]/20 to-pink-400/10" },
];

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

function TrendBadge({ up, value }: { up: boolean; value: string }) {
  const Icon = up ? FiArrowUpRight : FiArrowDownRight;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 transition duration-300 group-hover:scale-105 ${up ? "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20" : "bg-rose-400/10 text-rose-300 ring-rose-400/20"}`}>
      <Icon className="h-3.5 w-3.5" />
      {value}
    </span>
  );
}

function AnimatedMetricValue({ valueNumber, prefix = "", suffix = "", decimals = 2 }: { valueNumber: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const duration = 900;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(valueNumber * eased);

      if (progress < 1) {
        frame = window.requestAnimationFrame(step);
      }
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [valueNumber]);

  const formatted = `${prefix}${displayValue.toFixed(decimals).replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1")}${suffix}`;

  return <span className="mt-2 text-3xl font-bold tracking-tight text-white">{formatted}</span>;
}

function StatusPill({ status }: { status: string }) {
  const classes =
    status === "Momentum"
      ? "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20"
      : status === "Watch"
        ? "bg-amber-400/10 text-amber-300 ring-amber-400/20"
        : "bg-cyan-400/10 text-cyan-300 ring-cyan-400/20";

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${classes}`}>{status}</span>;
}

export default function Analytics() {
  const areaOptions: ApexOptions = {
    chart: {
      type: "area",
      height: 320,
      toolbar: { show: false },
      background: "transparent",
      foreColor: "#94A3B8",
      animations: {
        enabled: true,
        speed: 850,
        animateGradually: { enabled: true, delay: 120 },
        dynamicAnimation: { enabled: true, speed: 350 },
      },
    },
    stroke: { curve: "smooth", width: [3, 3, 3] },
    markers: { size: 0 },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.4,
        gradientToColors: ["#1D4ED8", "#0F172A"],
        inverseColors: false,
        opacityFrom: 0.48,
        opacityTo: 0.04,
        stops: [0, 70, 100],
      },
    },
    dataLabels: { enabled: false },
    tooltip: {
      theme: "dark",
      style: { fontSize: "12px" },
      fillSeriesColor: true,
      followCursor: true,
    },
    legend: {
      labels: { colors: ["#E2E8F0"] },
      position: "top",
      horizontalAlign: "left",
      markers: { size: 8, shape: "circle" },
    },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], labels: { style: { colors: "#64748B" } } },
    yaxis: { labels: { style: { colors: "#64748B" } } },
    grid: { borderColor: "rgba(148,163,184,0.12)" },
  };

  const donutOptions: ApexOptions = {
    chart: {
      type: "donut",
      height: 280,
      background: "transparent",
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 700,
      },
    },
    labels: ["Retail", "Wholesale", "Online", "Enterprise"],
    colors: ["#00D4FF", "#635BFF", "#24E4A4", "#D4AF37"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      markers: { size: 8, shape: "circle" },
      labels: { colors: ["#CBD5E1"] },
    },
    dataLabels: {
      enabled: true,
      style: { fontSize: "12px", fontWeight: "600", colors: ["#F8FAFC"] },
      formatter: (val: number) => `${val.toFixed(0)}%`,
    },
    tooltip: { theme: "dark", style: { fontSize: "12px" } },
    plotOptions: { pie: { donut: { size: "72%", background: "transparent" }, expandOnClick: false } },
  };

  const forecastOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 300,
      toolbar: { show: false },
      background: "transparent",
      foreColor: "#94A3B8",
      animations: {
        enabled: true,
        speed: 700,
      },
    },
    stroke: { curve: "smooth", width: [3, 3, 3] },
    markers: { size: 0 },
    colors: ["#00D4FF", "#24E4A4", "#D4AF37"],
    tooltip: { theme: "dark", style: { fontSize: "12px" }, fillSeriesColor: true },
    legend: { labels: { colors: ["#E2E8F0"] }, position: "top", horizontalAlign: "left" },
    xaxis: { categories: ["W1", "W2", "W3", "W4", "W5", "W6", "W7"], labels: { style: { colors: "#64748B" } } },
    yaxis: { labels: { style: { colors: "#64748B" } } },
    grid: { borderColor: "rgba(148,163,184,0.12)" },
  };

  return (
    <AppLayout>
      <div className="min-h-full bg-[radial-gradient(circle_at_20%_0%,rgba(99,91,255,0.14),transparent_28%),radial-gradient(circle_at_88%_10%,rgba(0,212,255,0.1),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.98))] p-4 text-slate-100 sm:p-6 xl:p-8">
        <div className="mx-auto flex max-w-[1680px] flex-col gap-5">
          <section className="group rounded-2xl border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/30 hover:shadow-[0_24px_85px_rgba(56,189,248,0.10)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-400/8 px-3 py-1 text-xs font-semibold text-cyan-100 shadow-[0_0_26px_rgba(0,212,255,0.08)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(0,212,255,0.35)]" />
                  Live Analytics
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Business Analytics</h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                  Explore trends, discover opportunities and monitor enterprise performance with a premium BI workspace.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white px-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-100 hover:shadow-[0_0_24px_rgba(255,255,255,0.16)]">
                  <FiDownload className="h-4 w-4" />
                  Export PDF
                </button>
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm font-semibold text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.06] hover:text-white">
                  <FiDownload className="h-4 w-4" />
                  Export Excel
                </button>
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm font-semibold text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/30 hover:bg-white/[0.06] hover:text-white">
                  <FiCalendar className="h-4 w-4" />
                  Schedule Report
                </button>
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm font-semibold text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/30 hover:bg-white/[0.06] hover:text-white">
                  <FiRefreshCw className="h-4 w-4" />
                  Refresh
                </button>
              </div>
            </div>
          </section>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-5">
              <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {kpiCards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className="group rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(11,18,32,0.96),rgba(15,23,42,0.86))] p-4 shadow-[0_22px_80px_rgba(2,6,23,0.45),inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300/25 hover:bg-[#0E1728] hover:shadow-[0_30px_90px_rgba(99,91,255,0.2),0_0_0_1px_rgba(255,255,255,0.03)]">
                      <div className="flex items-start justify-between gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-xl ring-1 ring-white/10 transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_28px_rgba(255,255,255,0.12)]" style={{ backgroundColor: `${item.accent}16`, color: item.accent }}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <TrendBadge up={item.up} value={item.change} />
                      </div>
                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.title}</p>
                      <AnimatedMetricValue valueNumber={item.valueNumber} prefix={item.prefix} suffix={item.suffix} decimals={item.title === "Revenue" || item.title === "Profit" ? 2 : item.title === "Orders" || item.title === "Customers" ? 1 : 1} />
                      <div className="mt-4 flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-white/[0.06]">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#635BFF] via-[#00D4FF] to-[#D4AF37] shadow-[0_0_16px_rgba(0,212,255,0.16)]" style={{ width: `${Math.max(38, Math.min(86, 30 + item.title.length * 2))}%` }} />
                        </div>
                        <svg viewBox="0 0 80 24" className="h-5 w-16 overflow-visible">
                          <polyline points={item.spark.map((value, index) => `${index * 12},${24 - value / 2}`).join(" ")} fill="none" stroke={item.accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
                        </svg>
                      </div>
                    </article>
                  );
                })}
              </section>

              <section className="group rounded-2xl border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:shadow-[0_24px_80px_rgba(0,212,255,0.08)]">
                <SectionHeader icon={FiBarChart2} title="Revenue Analytics" caption="Performance across the latest operating cycle" />
                <div className="mt-5 rounded-xl border border-white/10 bg-slate-950/40 p-3">
                  <ReactApexChart options={areaOptions} series={revenueSeries} type="area" height={320} />
                </div>
              </section>

              <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                <section className="group rounded-2xl border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/25 hover:shadow-[0_24px_80px_rgba(212,175,55,0.08)]">
                  <SectionHeader icon={FiLayers} title="Sales Distribution" caption="Channel mix and commercial exposure" />
                  <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_180px] lg:items-center">
                    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
                      <ReactApexChart options={donutOptions} series={[34, 24, 24, 18]} type="donut" height={280} />
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: "Retail", value: "34%", color: "text-cyan-300" },
                        { label: "Wholesale", value: "24%", color: "text-indigo-300" },
                        { label: "Online", value: "24%", color: "text-emerald-300" },
                        { label: "Enterprise", value: "18%", color: "text-[#D4AF37]" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2">
                          <span className={`text-sm font-semibold ${item.color}`}>{item.label}</span>
                          <span className="text-sm text-slate-300">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="group rounded-2xl border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/25 hover:shadow-[0_24px_80px_rgba(36,228,164,0.08)]">
                  <SectionHeader icon={FiTrendingUp} title="Business Forecast" caption="Projected growth versus current run-rate" />
                  <div className="mt-5 rounded-xl border border-white/10 bg-slate-950/40 p-3">
                    <ReactApexChart options={forecastOptions} series={forecastSeries} type="line" height={300} />
                  </div>
                </section>
              </div>

              <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
                <section className="group rounded-2xl border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-pink-300/25 hover:shadow-[0_24px_80px_rgba(255,77,184,0.08)]">
                  <SectionHeader icon={FiGlobe} title="Regional Performance" caption="Revenue posture by operating region" />
                  <div className="mt-6 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(99,91,255,0.16),transparent_45%),linear-gradient(180deg,rgba(15,23,42,0.8),rgba(2,6,23,0.92))] p-4">
                    <div className="relative h-[280px] overflow-hidden rounded-xl border border-white/10 bg-slate-950/50">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.12),transparent_45%)]" />
                      {regionalNodes.map((node) => (
                        <div key={node.name} className="absolute" style={{ left: node.x, top: node.y }}>
                          <div className={`rounded-xl border border-white/10 bg-gradient-to-br ${node.tone} p-3 shadow-[0_0_28px_rgba(0,212,255,0.08)]`}>
                            <p className="text-sm font-semibold text-white">{node.name}</p>
                            <p className="mt-1 text-xs text-slate-300">{node.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="group rounded-2xl border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/25 hover:shadow-[0_24px_80px_rgba(56,189,248,0.08)]">
                  <SectionHeader icon={FiBookOpen} title="Business Insights" caption="AI-generated executive recommendations" />
                  <div className="mt-6 space-y-3">
                    {insights.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-white/[0.05] hover:shadow-[0_12px_34px_rgba(0,212,255,0.08)]">
                        <span className="mt-0.5 grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-sky-400/10 text-cyan-200 ring-1 ring-cyan-300/20 shadow-[0_0_18px_rgba(0,212,255,0.12)]">
                          <FiZap className="h-4 w-4" />
                        </span>
                        <p className="text-sm leading-6 text-slate-300">{item}</p>
                      </div>
                    ))}
                  </div>
                  <button className="mt-5 inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-gradient-to-r from-cyan-400/10 via-sky-400/10 to-[#D4AF37]/10 px-3.5 py-2.5 text-sm font-semibold text-slate-100 shadow-[0_12px_36px_rgba(0,212,255,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-gradient-to-r hover:from-cyan-400/20 hover:via-sky-400/15 hover:to-[#D4AF37]/15 hover:text-white">
                    Generate Executive Summary
                    <FiChevronRight className="h-4 w-4" />
                  </button>
                </section>
              </div>

              <section className="group rounded-2xl border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:shadow-[0_24px_80px_rgba(99,91,255,0.1)]">
                <SectionHeader icon={FiTruck} title="Top Products" caption="Highest-leverage portfolio performers" />
                <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                  <div className="max-h-[360px] overflow-auto">
                    <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                      <thead className="sticky top-0 z-10 bg-[#0B1220]/95 text-slate-400 backdrop-blur">
                        <tr>
                          <th className="px-4 py-3.5 font-semibold uppercase tracking-[0.16em] text-[11px]">Product</th>
                          <th className="px-4 py-3.5 font-semibold uppercase tracking-[0.16em] text-[11px]">Revenue</th>
                          <th className="px-4 py-3.5 font-semibold uppercase tracking-[0.16em] text-[11px]">Orders</th>
                          <th className="px-4 py-3.5 font-semibold uppercase tracking-[0.16em] text-[11px]">Growth</th>
                          <th className="px-4 py-3.5 font-semibold uppercase tracking-[0.16em] text-[11px]">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 bg-slate-950/35 text-slate-300">
                        {products.map((item) => (
                          <tr key={item.name} className="transition duration-300 hover:bg-white/[0.05]">
                            <td className="px-4 py-3.5 font-semibold text-white">{item.name}</td>
                            <td className="px-4 py-3.5">{item.revenue}</td>
                            <td className="px-4 py-3.5">{item.orders}</td>
                            <td className="px-4 py-3.5 text-emerald-300">{item.growth}</td>
                            <td className="px-4 py-3.5"><StatusPill status={item.status} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
              <section className="group rounded-2xl border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/25 hover:shadow-[0_24px_80px_rgba(56,189,248,0.08)]">
                <SectionHeader icon={FiFilter} title="Filter Panel" caption="Refine the analytics view" />
                <div className="mt-5 space-y-3">
                  {[
                    { label: "Date Range", value: "Last 90 Days" },
                    { label: "Region", value: "Global" },
                    { label: "Category", value: "Enterprise" },
                    { label: "Sales Channel", value: "Direct" },
                    { label: "Product", value: "All" },
                    { label: "Status", value: "Healthy" },
                  ].map((item) => (
                    <label key={item.label} className="block">
                      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{item.label}</span>
                      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-slate-300 transition duration-300 hover:border-cyan-300/20 hover:bg-white/[0.05]">
                        <span>{item.value}</span>
                        <FiChevronRight className="h-4 w-4 text-slate-500" />
                      </div>
                    </label>
                  ))}
                </div>
              </section>

              <section className="group rounded-2xl border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/25 hover:shadow-[0_24px_80px_rgba(212,175,55,0.08)]">
                <SectionHeader icon={FiMapPin} title="Coverage" caption="High-value operating zones" />
                <div className="mt-5 space-y-3">
                  {[
                    { label: "North America", value: "Peak demand", tone: "text-cyan-300" },
                    { label: "Europe", value: "Stable growth", tone: "text-sky-300" },
                    { label: "South America", value: "Upside ready", tone: "text-emerald-300" },
                    { label: "Asia", value: "Strategic scaling", tone: "text-[#D4AF37]" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2">
                      <div>
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className={`text-xs ${item.tone}`}>{item.value}</p>
                      </div>
                      <span className="text-sm font-semibold text-slate-300">+12%</span>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
