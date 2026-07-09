import { RequestHandler } from "express";

export const handleETL: RequestHandler = (req, res) => {
  res.json({
    summary: {
      activePipelines: 99,
      filesToday: 777,
      recordsImported: 1234567,
      errors: 15,
    },

    pipelines: [
      {
        name: "ERP → PostgreSQL",
        status: "Running",
        progress: 72,
      },
      {
        name: "CSV → Inventory",
        status: "Completed",
        progress: 100,
      },
      {
        name: "Google Sheets → Sales",
        status: "Queued",
        progress: 15,
      },
      {
        name: "AWS S3 → Warehouse",
        status: "Failed",
        progress: 41,
      },
    ],

    services: [
      {
        name: "PostgreSQL",
        status: "Connected",
      },
      {
        name: "AWS S3",
        status: "Connected",
      },
      {
        name: "ERP",
        status: "Connected",
      },
      {
        name: "Google API",
        status: "Connected",
      },
    ],

    logs: [
      "Inventory.csv imported successfully",
      "ERP synchronization completed",
      "Google Sheets synced",
      "AWS connection timeout",
    ],
  });
};