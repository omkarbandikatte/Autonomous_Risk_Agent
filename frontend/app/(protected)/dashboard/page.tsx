"use client";

import { KPICards } from "@/components/dashboard/kpi-cards";
import { SupplyChainGraph } from "@/components/dashboard/supply-chain-graph";
import { RiskMetricsPanel } from "@/components/dashboard/risk-metrics-panel";
import { RecommendationsPanel } from "@/components/dashboard/recommendations-panel";
import { MOCK_SUPPLIERS } from "@/lib/data/mock-suppliers";
import { simulationEngine } from "@/lib/simulation/simulation-engine";

export default function DashboardPage() {
  const dashboardMetrics = simulationEngine.getDashboardMetrics(MOCK_SUPPLIERS);
  const riskMetrics = simulationEngine.getRiskMetrics(MOCK_SUPPLIERS);
  
  // Generate initial recommendations without running full simulation
  const { MitigationPlannerAgent } = require("@/lib/simulation/mitigation-planner");
  const planner = new MitigationPlannerAgent();
  const recommendations = planner.generateRecommendations(
    MOCK_SUPPLIERS,
    riskMetrics,
    [],
    []
  );

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Real-time supply chain health and risk assessment</p>
      </div>

      {/* KPI Cards */}
      <KPICards metrics={dashboardMetrics} />

      {/* Supply Chain Graph and Risk Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg border bg-card p-6">
          <h2 className="font-semibold mb-4">Supply Chain Network</h2>
          <div className="h-96">
            <SupplyChainGraph suppliers={MOCK_SUPPLIERS} />
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 overflow-y-auto max-h-[500px]">
          <RiskMetricsPanel riskMetrics={riskMetrics} suppliers={MOCK_SUPPLIERS} />
        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-lg border bg-card p-6">
        <RecommendationsPanel recommendations={recommendations} suppliers={MOCK_SUPPLIERS} />
      </div>
    </div>
  );
}
