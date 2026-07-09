import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  FiActivity,
  FiBarChart2,
  FiCpu,
  FiDatabase,
  FiGrid,
  FiServer,
  FiSettings,
  FiUploadCloud,
} from "react-icons/fi";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: FiGrid },
  { label: "Analytics", path: "/analytics", icon: FiBarChart2 },
  { label: "Upload files", path: "/upload", icon: FiUploadCloud },
  { label: "Atlas AI", path: "/atlas-ai", icon: FiCpu },
  { label: "ERP Connections", path: "/erp", icon: FiServer },
  { label: "ETL Monitor", path: "/etl", icon: FiDatabase },
  { label: "KPIs", path: "/kpis", icon: FiActivity },
  { label: "Settings", path: "/settings", icon: FiSettings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-[211px] min-h-screen flex-shrink-0 bg-atlas-sidebar flex flex-col relative z-10">
      {/* Logo */}
      <div className="w-full h-[106px] flex items-center justify-center overflow-hidden px-2 pt-2">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/ee6c9d1d2535c1ed29ce627804cac49a1153e9e5?width=552"
          alt="Atlas Logo"
          className="w-[180px] object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex flex-1 flex-col gap-1 px-5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "group relative flex h-[50px] items-center gap-3 rounded-xl px-4 font-montserrat text-base font-normal transition-all duration-300",
                isActive
                  ? "translate-x-0.5 text-[rgba(255,45,155,0.8)] shadow-[0_0_24px_rgba(255,45,155,0.16)] [text-shadow:0_0_12px_rgba(229,169,60,0.5)]"
                  : "text-white [text-shadow:0_0_12px_rgba(229,169,60,0.5)] hover:-translate-y-0.5 hover:text-atlas-gold-light"
              )}
            >
              {isActive && (
                <span
                  className="absolute inset-0 rounded-xl"
                  style={{ background: "linear-gradient(90deg, rgba(255,45,155,0.16), rgba(15, 29, 53, 0.70))" }}
                />
              )}
              {!isActive && <span className="absolute inset-0 rounded-xl bg-white/[0.02] opacity-0 transition duration-300 group-hover:opacity-100" />}
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-sm transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(255,255,255,0.1)]">
                <Icon className="h-4 w-4" />
              </span>
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
