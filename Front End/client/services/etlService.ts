import { ETLResponse } from "../types/etl";

export async function getETL(): Promise<ETLResponse> {
  const response = await fetch("/api/etl");

  if (!response.ok) {
    throw new Error("Failed to load ETL data");
  }

  return response.json();
}