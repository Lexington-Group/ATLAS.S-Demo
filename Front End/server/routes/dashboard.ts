import { RequestHandler } from "express";

export const handleDashboard: RequestHandler = (_req, res) => {
  res.status(200).json({
    metrics: {
      totalRevenue: {
        label: "Total Revenue",
        value: 9999,
        change: 10
      },
      inventoryValue: {
        label: "Inventory Value",
        value: 896,
        change: 10
      },
      grossMargin: {
        label: "Gross Margin",
        value: 253,
        change: -10
      }
    },

    performance: [
      { period: "Mon", sales: 200, inventory: 42 },
      { period: "Tue", sales: 234, inventory: 36 },
      { period: "Wed", sales: 37, inventory: 207 },
      { period: "Thu", sales: 195, inventory: 29 },
      { period: "Fri", sales: 89, inventory: 155 },
      { period: "Sat", sales: 83, inventory: 241 },
      { period: "Sun", sales: 64, inventory: 70 }
    ],

    alerts: [
      {
        title: "ATLAS AI",
        message: "Product B needs restocking in the next 24 hours",
        severity: "high"
      },
      {
        title: "ATLAS AI",
        message: "Inventory turnover increased 12%.",
        severity: "medium"
      }
    ]
  });
};