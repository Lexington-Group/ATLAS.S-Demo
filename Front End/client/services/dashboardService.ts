import { DashboardResponse } from "../types/dashboard";

export async function getDashboard(): Promise<DashboardResponse> {
  const response = await fetch("/api/dashboard");

  if (!response.ok) {
    throw new Error("Failed to load dashboard");
  }

  return response.json();
}