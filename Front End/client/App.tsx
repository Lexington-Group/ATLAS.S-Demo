import "./global.css";
import ERPConnections from "./pages/ERPConnections";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadFiles from "./pages/UploadFiles";
import AtlasAI from "./pages/AtlasAI";
import ETLMonitor from "./pages/ETLMonitor";
import Analytics from "./pages/Analytics";
import Placeholder from "./pages/Placeholder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadFiles />} />
          <Route path="/atlas-ai" element={<AtlasAI />} />
          <Route path="/erp" element={<ERPConnections />} />
          <Route path="/etl" element={<ETLMonitor />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/kpis" element={<Placeholder title="KPIs" subtitle="Track key performance indicators" />} />
          <Route path="/settings" element={<Placeholder title="Settings" subtitle="Configure your account and preferences" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
