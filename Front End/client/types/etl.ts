export interface ETLSummary {
  activePipelines: number;
  filesToday: number;
  recordsImported: number;
  errors: number;
}

export interface ETLPipeline {
  name: string;
  status: string;
  progress: number;
}

export interface ETLServiceStatus {
  name: string;
  status: string;
}

export interface ETLResponse {
  summary: ETLSummary;
  pipelines: ETLPipeline[];
  services: ETLServiceStatus[];
  logs: string[];
}