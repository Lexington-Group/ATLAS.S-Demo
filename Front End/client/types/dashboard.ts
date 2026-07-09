export interface DashboardMetric {
  label: string;
  value: number;
  change: number;
  period?: string;
}

export interface PerformanceData {
  period: string;
  sales: number;
  inventory: number;
}

export interface AIAlert {
  title: string;
  message: string;
  severity: "low" | "medium" | "high";
}

export interface DashboardResponse {
  metrics: {
    totalRevenue: DashboardMetric;
    inventoryValue: DashboardMetric;
    grossMargin: DashboardMetric;
  };
  performance: PerformanceData[];
  alerts: AIAlert[];
}