import { useEffect, useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import {
  FiActivity,
  FiArrowDownRight,
  FiArrowUpRight,
  FiBarChart2,
  FiBox,
  FiCheckCircle,
  FiClock,
  FiCpu,
  FiDatabase,
  FiDollarSign,
  FiLayers,
  FiMessageSquare,
  FiRefreshCw,
  FiSend,
  FiShield,
  FiShoppingCart,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import { getDashboard } from "@/services/dashboardService";
import { AppLayout } from "@/components/AppLayout";

const chartData = [
  { period: "0", blue: 144, pink: 1 },
  { period: "1", blue: 234, pink: 36 },
  { period: "2", blue: 37, pink: 207 },
  { period: "3", blue: 195, pink: 29 },
  { period: "4", blue: 89, pink: 155 },
  { period: "5", blue: 83, pink: 241 },
  { period: "6", blue: 64, pink: 70 },
];

const metrics = [
  {
    label: "Total Revenue",
    sublabel: "Run rate",
    value: "2,765",
    trend: "+10%",
    trendUp: true,
    icon: FiDollarSign,
    accent: "#635BFF",
  },
  {
    label: "Inventory Value",
    sublabel: "Live stock",
    value: "896",
    trend: "+10%",
    trendUp: true,
    icon: FiBox,
    accent: "#00D4FF",
  },
  {
    label: "Gross Margin",
    sublabel: "Profitability",
    value: "253",
    trend: "-10%",
    trendUp: false,
    icon: FiTrendingUp,
    accent: "#FFB020",
  },
  {
    label: "Orders",
    sublabel: "Fulfillment flow",
    value: "1,024",
    trend: "+8%",
    trendUp: true,
    icon: FiShoppingCart,
    accent: "#24E4A4",
  },
];

const aiMessages = [
  {
    title: "ATLAS AI",
    text: "Stockout risk detected for Product A. Recommended reorder within 3 days.",
    severity: "high",
  },
  {
    title: "ATLAS AI",
    text: "Inventory turnover increased 12% this week.",
    severity: "medium",
  },
];

const quickPrompts = [
  "Which products are at risk of stockout?",
  "Show inventory trends for this week",
  "Summarize margin anomalies",
];

const pulseSignals = [
  { label: "Demand signal", value: "82", tone: "text-emerald-300", width: "82%" },
  { label: "Inventory pressure", value: "64", tone: "text-sky-300", width: "64%" },
  { label: "Margin variance", value: "38", tone: "text-orange-300", width: "38%" },
];

const recentActivity = [
  {
    title: "Revenue model refreshed",
    detail: "Forecast pipeline processed latest sales periods.",
    time: "2m ago",
    icon: FiRefreshCw,
  },
  {
    title: "Inventory rule triggered",
    detail: "Safety stock threshold matched a high priority SKU.",
    time: "18m ago",
    icon: FiZap,
  },
  {
    title: "ERP sync completed",
    detail: "Products, vendors, and receipts are aligned.",
    time: "42m ago",
    icon: FiDatabase,
  },
];

const systemHealth = [
  { label: "API", value: 99, status: "Operational", icon: FiShield },
  { label: "ETL", value: 94, status: "Stable", icon: FiLayers },
  { label: "AI Core", value: 91, status: "Learning", icon: FiCpu },
];

function TrendBadge({ trend, up }: { trend: string; up: boolean }) {
  const Icon = up ? FiArrowUpRight : FiArrowDownRight;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition duration-300 group-hover:scale-105 ${
        up
          ? "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20"
          : "bg-rose-400/10 text-rose-300 ring-1 ring-rose-400/20"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {trend}
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
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.06] text-sky-200 ring-1 ring-white/10 transition duration-300 group-hover:bg-sky-400/10 group-hover:text-sky-100 group-hover:shadow-[0_0_24px_rgba(56,189,248,0.22)]">
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

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const [aiInput, setAiInput] = useState("");
  const [activeTab, setActiveTab] = useState("Week");
  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboard();
        console.log(JSON.stringify(data, null, 2));
        setDashboard(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadDashboard();
  }, []);

  const dashboardChart = dashboard
    ? dashboard.performance.map((item: any) => ({
        period: item.period,
        blue: item.sales,
        pink: item.inventory,
      }))
    : chartData;

  const ordersValue = dashboardChart.reduce((total, item) => total + Math.round((item.blue + item.pink) / 3), 0);

  const dashboardMetrics = dashboard
    ? [
        {
          ...metrics[0],
          value: dashboard.metrics.totalRevenue.value.toLocaleString(),
          trend: `${dashboard.metrics.totalRevenue.change > 0 ? "+" : ""}${dashboard.metrics.totalRevenue.change}%`,
          trendUp: dashboard.metrics.totalRevenue.change >= 0,
        },
        {
          ...metrics[1],
          value: dashboard.metrics.inventoryValue.value.toLocaleString(),
          trend: `${dashboard.metrics.inventoryValue.change > 0 ? "+" : ""}${dashboard.metrics.inventoryValue.change}%`,
          trendUp: dashboard.metrics.inventoryValue.change >= 0,
        },
        {
          ...metrics[2],
          value: dashboard.metrics.grossMargin.value.toLocaleString(),
          trend: `${dashboard.metrics.grossMargin.change > 0 ? "+" : ""}${dashboard.metrics.grossMargin.change}%`,
          trendUp: dashboard.metrics.grossMargin.change >= 0,
        },
        {
          ...metrics[3],
          value: ordersValue.toLocaleString(),
        },
      ]
    : metrics;

  const dashboardAlerts = dashboard
    ? dashboard.alerts.map((alert: any) => ({
        title: alert.title,
        text: alert.message,
        severity: alert.severity,
      }))
    : aiMessages;

  const chartOptions = useMemo<ApexOptions>(
    () => ({
      chart: {
        type: "area",
        height: 350,
        toolbar: { show: false },
        fontFamily: "Inter, sans-serif",
        foreColor: "#94A3B8",
        background: "transparent",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 700,
          animateGradually: { enabled: true, delay: 120 },
          dynamicAnimation: { enabled: true, speed: 350 },
        },
      },
      stroke: {
        curve: "smooth",
        width: [3, 3],
        lineCap: "round",
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.25,
          type: "vertical",
          opacityFrom: 0.48,
          opacityTo: 0.03,
          stops: [0, 65, 100],
        },
      },
      dataLabels: { enabled: false },
      grid: {
        borderColor: "rgba(148, 163, 184, 0.12)",
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
        padding: { left: 8, right: 10, top: 0, bottom: 0 },
      },
      colors: ["#635BFF", "#00D4FF"],
      markers: {
        size: 0,
        strokeWidth: 0,
        hover: { size: 5, sizeOffset: 3 },
      },
      xaxis: {
        categories: dashboardChart.map((item) => item.period),
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: "#94A3B8",
            fontSize: "12px",
            fontWeight: 600,
          },
        },
      },
      yaxis: {
        labels: {
          style: { colors: "#64748B", fontSize: "12px" },
          formatter: (value) => `${Math.round(value)}`,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        labels: { colors: "#CBD5E1" },
        markers: { size: 7 },
      },
      tooltip: {
        theme: "dark",
        style: { fontSize: "12px" },
        marker: { show: true },
      },
      states: {
        hover: { filter: { type: "lighten", value: 0.08 } },
        active: { filter: { type: "none" } },
      },
    }),
    [dashboardChart],
  );

  const chartSeries = useMemo(
    () => [
      { name: "Sales", data: dashboardChart.map((item) => item.blue) },
      { name: "Inventory", data: dashboardChart.map((item) => item.pink) },
    ],
    [dashboardChart],
  );

  const pulseScore = Math.min(
    96,
    Math.round(dashboardChart.reduce((total, item) => total + item.blue, 0) / Math.max(dashboardChart.length, 1) / 2 + 22),
  );
  const greeting = getGreeting();

  return (
    <AppLayout pageTitle="Executive Command Center" pageSubtitle="Atlas Pulse, AI insights, activity, and operating health.">
      <div className="min-h-full bg-[radial-gradient(circle_at_20%_0%,rgba(99,91,255,0.16),transparent_30%),radial-gradient(circle_at_84%_8%,rgba(0,212,255,0.12),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.98))] p-4 text-slate-100 sm:p-6 xl:p-8">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5">
          <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/30 hover:shadow-[0_24px_80px_rgba(56,189,248,0.12)]">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-200 shadow-[0_0_28px_rgba(56,189,248,0.12)]">
                    <FiActivity className="h-3.5 w-3.5" />
                    {greeting}, command center is live
                  </div>
                  <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Executive Command Center
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    A focused control room for revenue, inventory, margin, orders, and AI-guided operational decisions.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-2">
                  {["Day", "Week", "Month"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`h-9 rounded-md px-3 text-xs font-semibold transition duration-300 hover:-translate-y-0.5 ${
                        activeTab === tab
                          ? "bg-white text-slate-950 shadow-lg shadow-white/10"
                          : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {dashboardMetrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={metric.label}
                      className="group rounded-lg border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.055] hover:shadow-[0_18px_50px_rgba(99,91,255,0.13)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className="grid h-10 w-10 place-items-center rounded-lg ring-1 ring-white/10 transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_28px_rgba(255,255,255,0.12)]"
                          style={{ backgroundColor: `${metric.accent}18`, color: metric.accent }}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <TrendBadge trend={metric.trend} up={metric.trendUp} />
                      </div>
                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {metric.label}
                      </p>
                      <div className="mt-2 flex items-end justify-between gap-3">
                        <span className="text-3xl font-bold tracking-tight text-white">{metric.value}</span>
                        <span className="pb-1 text-xs font-medium text-slate-400">{metric.sublabel}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/30 hover:shadow-[0_24px_80px_rgba(36,228,164,0.12)]">
              <SectionHeader icon={FiZap} title="Atlas Pulse" caption="Business Health and demand pressure" />
              <div className="mt-6 flex flex-col items-center text-center">
                <div
                  className="relative grid h-44 w-44 place-items-center rounded-full p-3 shadow-[0_0_70px_rgba(36,228,164,0.14)] transition duration-500 group-hover:scale-[1.03]"
                  style={{ background: `conic-gradient(#24E4A4 ${pulseScore * 3.6}deg, rgba(255,255,255,0.08) 0deg)` }}
                >
                  <div className="grid h-full w-full place-items-center rounded-full border border-white/10 bg-[#0B1220]">
                    <div>
                      <p className="text-5xl font-bold tracking-tight text-white">{pulseScore}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Health</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm font-semibold text-white">Business Health is strong</p>
                <p className="mt-1 max-w-[260px] text-xs leading-5 text-slate-400">
                  Signals indicate healthy revenue velocity with manageable inventory pressure.
                </p>
              </div>
              <div className="mt-6 space-y-4">
                {pulseSignals.map((signal) => (
                  <div key={signal.label} className="transition duration-300 hover:translate-x-1">
                    <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-400">{signal.label}</span>
                      <span className={signal.tone}>{signal.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.06]">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#635BFF] via-[#00D4FF] to-[#24E4A4] shadow-[0_0_18px_rgba(0,212,255,0.22)]" style={{ width: signal.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="flex min-w-0 flex-col gap-5">
              <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:border-indigo-300/30 hover:shadow-[0_24px_90px_rgba(99,91,255,0.14)]">
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <SectionHeader icon={FiBarChart2} title="Performance" caption={`${activeTab} area view across sales and inventory`} />
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-[#635BFF] shadow-[0_0_12px_rgba(99,91,255,0.8)]" />
                    Sales
                    <span className="ml-2 h-2 w-2 rounded-full bg-[#00D4FF] shadow-[0_0_12px_rgba(0,212,255,0.8)]" />
                    Inventory
                  </div>
                </div>
                <div className="min-h-[340px]">
                  <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={340} />
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_18px_60px_rgba(15,23,42,0.5)]">
                  <SectionHeader icon={FiClock} title="Recent Activity" caption="Latest operational events" />
                  <div className="mt-5 space-y-4">
                    {recentActivity.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3 transition duration-300 hover:-translate-y-0.5 hover:border-sky-400/30 hover:bg-white/[0.055]">
                          <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-white/[0.06] text-slate-200">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-sm font-semibold text-white">{item.title}</p>
                              <span className="flex-shrink-0 text-xs font-medium text-slate-500">{item.time}</span>
                            </div>
                            <p className="mt-1 text-xs leading-5 text-slate-400">{item.detail}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="group rounded-lg border border-white/10 bg-[#0B1220]/90 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/25 hover:shadow-[0_18px_60px_rgba(16,185,129,0.1)]">
                  <SectionHeader icon={FiCheckCircle} title="System Health" caption="Platform services and sync quality" />
                  <div className="mt-5 space-y-4">
                    {systemHealth.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.03] p-3 transition duration-300 hover:border-emerald-400/25 hover:bg-white/[0.055]">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-400/10 text-emerald-300">
                                <Icon className="h-4 w-4" />
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-white">{item.label}</p>
                                <p className="text-xs text-slate-400">{item.status}</p>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-white">{item.value}%</span>
                          </div>
                          <div className="mt-3 h-2 rounded-full bg-white/[0.06]">
                            <div className="h-full rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.28)]" style={{ width: `${item.value}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <aside className="group rounded-lg border border-white/10 bg-[#0B1220]/90 shadow-2xl shadow-black/20 transition duration-300 hover:border-sky-300/25 hover:shadow-[0_24px_80px_rgba(56,189,248,0.12)] xl:sticky xl:top-6 xl:self-start">
              <div className="border-b border-white/10 p-5">
                <SectionHeader icon={FiMessageSquare} title="AI Insights" caption="Conversational analyst workspace" />
              </div>
              <div className="p-5">
                <div className="mb-5 flex flex-wrap gap-2">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setAiInput(prompt)}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-xs font-semibold text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-white"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                <div className="max-h-[430px] space-y-4 overflow-y-auto pr-1 scrollbar-thin">
                  <div className="flex justify-end">
                    <div className="max-w-[86%] rounded-2xl rounded-tr-md bg-white px-4 py-3 text-sm font-medium leading-6 text-slate-950 shadow-lg shadow-white/5">
                      What changed in the business this week?
                    </div>
                  </div>
                  {dashboardAlerts.map((msg, i) => (
                    <div key={`${msg.title}-${i}`} className="flex items-start gap-3">
                      <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#635BFF] to-[#00D4FF] text-white shadow-[0_0_24px_rgba(99,91,255,0.35)]">
                        <FiCpu className="h-4 w-4" />
                      </span>
                      <div className="max-w-[88%] rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.045] px-4 py-3 shadow-lg shadow-black/10 transition duration-300 hover:border-sky-400/25 hover:bg-white/[0.065]">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{msg.title}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                              msg.severity === "high"
                                ? "bg-rose-400/10 text-rose-300"
                                : msg.severity === "medium"
                                  ? "bg-amber-400/10 text-amber-300"
                                  : "bg-emerald-400/10 text-emerald-300"
                            }`}
                          >
                            {msg.severity}
                          </span>
                        </div>
                        <p className="text-sm leading-6 text-slate-300">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-start gap-3">
                    <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#635BFF] to-[#00D4FF] text-white shadow-[0_0_24px_rgba(99,91,255,0.35)]">
                      <FiCpu className="h-4 w-4" />
                    </span>
                    <div className="max-w-[88%] rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.045] px-4 py-3">
                      <p className="text-sm leading-6 text-slate-300">
                        I can compare orders, inventory, and margin pressure, then suggest the next operating move.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex min-h-[54px] items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-3 ring-1 ring-sky-400/10 transition duration-300 focus-within:border-sky-300/40 focus-within:shadow-[0_0_34px_rgba(56,189,248,0.14)]">
                  <input
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Message Atlas..."
                    className="min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
                  />
                  <button className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-white text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-100 hover:shadow-[0_0_22px_rgba(255,255,255,0.22)]">
                    <FiSend className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}