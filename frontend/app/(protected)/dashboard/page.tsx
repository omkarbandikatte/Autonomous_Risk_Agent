"use client";

import { KPICards } from "@/components/dashboard/kpi-cards";
import { SupplyChainGraph } from "@/components/dashboard/supply-chain-graph";
import { RiskMetricsPanel } from "@/components/dashboard/risk-metrics-panel";
import { RecommendationsPanel } from "@/components/dashboard/recommendations-panel";
import { RiskSignalsPanel } from "@/components/dashboard/risk-signals-panel";
import { MOCK_SUPPLIERS } from "@/lib/data/mock-suppliers";
import { simulationEngine } from "@/lib/simulation/simulation-engine";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  const dashboardMetrics = simulationEngine.getDashboardMetrics(MOCK_SUPPLIERS);
  const riskMetrics = simulationEngine.getRiskMetrics(MOCK_SUPPLIERS);

  // Generate initial recommendations
  const { MitigationPlannerAgent } = require("@/lib/simulation/mitigation-planner");
  const planner = new MitigationPlannerAgent();
  const recommendations = planner.generateRecommendations(
    MOCK_SUPPLIERS,
    riskMetrics,
    [],
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">System Status: Optimal</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gradient pb-1">
            Network Intelligence
          </h1>
          <p className="text-sm font-medium text-muted-foreground/80 max-w-2xl">
            Real-time supply chain monitoring and predictive risk orchestration powered by autonomous agents.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-3 overflow-hidden p-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-linear-to-br from-primary/20 to-accent/20" />
            ))}
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-foreground">3 Active Agents</p>
            <p className="text-[9px] font-bold text-muted-foreground/60">Monitoring 24/7</p>
          </div>
        </div>
      </div>

      {/* KPI Cards Section */}
      <section>
        <KPICards metrics={dashboardMetrics} />
      </section>

      {/* Main Analysis Section */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
        {/* Supply Chain Network - 12 cols total in internal row */}
        <div className="lg:col-span-12 flex flex-col h-[400px] sm:h-[500px] lg:h-[600px]">
          <SupplyChainGraph suppliers={MOCK_SUPPLIERS} />
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
        {/* Risk Metrics - 4 cols */}
        <div className="lg:col-span-4 flex flex-col">
          <RiskMetricsPanel riskMetrics={riskMetrics} suppliers={MOCK_SUPPLIERS} />
        </div>

        {/* Signals Monitoring - 4 cols */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="flex flex-col h-full">
            <RiskSignalsPanel />
          </div>
        </div>

        {/* Intelligence & Recommendations - 4 cols */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <RecommendationsPanel recommendations={recommendations} suppliers={MOCK_SUPPLIERS} />
        </div>
      </div>

      {/* Decision Support & Learning Section */}
      <section className="pb-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-4xl bg-white/2 border border-white/5 backdrop-blur-3xl p-8 shadow-2xl relative overflow-hidden h-full">
          <h3 className="text-xl font-black mb-6 tracking-tight flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Decision Integrity Track
          </h3>
          <div className="space-y-4">
            {[
              { action: "Alternative Sourcing Approved", node: "SZ-Factory-Alpha", timestamp: "1h 22m ago", status: "In Progress" },
              { action: "Inventory Reroute Manual Override", node: "SEA-Port-West", timestamp: "3h 45m ago", status: "Completed" }
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/3 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-foreground">{item.action}</p>
                  <p className="text-[10px] font-medium text-muted-foreground/40 mt-1 uppercase tracking-widest">{item.node} • {item.timestamp}</p>
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded-full">{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-4xl bg-white/2 border border-white/5 backdrop-blur-3xl p-8 shadow-2xl relative overflow-hidden h-full">
          <h3 className="text-xl font-black mb-4 tracking-tight flex items-center gap-3">
            <Activity className="w-5 h-5 text-accent" />
            Continuous Learning Lab
          </h3>
          <p className="text-[11px] font-medium text-muted-foreground/40 mb-6 px-1 tracking-tight">System performance improves by analyzing historical outcomes. Current prediction accuracy: <span className="text-accent underline font-black">94.8%</span></p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-2xl bg-white/3 border border-white/5 flex flex-col gap-2">
              <div className="h-1 w-10 bg-primary/20 rounded-full" />
              <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/40">Model Confidence</span>
              <p className="text-lg font-black text-white/80">9.2/10</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/3 border border-white/5 flex flex-col gap-2">
              <div className="h-1 w-10 bg-accent/20 rounded-full" />
              <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/40">New Learnings</span>
              <p className="text-lg font-black text-white/80">+142</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
