"use client";

import { RiskMetricsPanel } from "@/components/dashboard/risk-metrics-panel";
import { MOCK_SUPPLIERS } from "@/lib/data/mock-suppliers";
import { simulationEngine } from "@/lib/simulation/simulation-engine";

export default function AnalysisPage() {
  const riskMetrics = simulationEngine.getRiskMetrics(MOCK_SUPPLIERS);
  const dashboardMetrics = simulationEngine.getDashboardMetrics(MOCK_SUPPLIERS);

  // Calculate distribution stats
  const highRiskCount = riskMetrics.filter((m) => m.riskScore >= 70).length;
  const mediumRiskCount = riskMetrics.filter((m) => m.riskScore >= 50 && m.riskScore < 70).length;
  const lowRiskCount = riskMetrics.filter((m) => m.riskScore < 50).length;

  // Calculate geographic exposure
  const locationExposure = new Map<string, number>();
  MOCK_SUPPLIERS.forEach((supplier) => {
    const risk = riskMetrics.find((m) => m.supplierId === supplier.id)?.riskScore || 0;
    locationExposure.set(
      supplier.location,
      (locationExposure.get(supplier.location) || 0) + risk
    );
  });

  const topLocations = Array.from(locationExposure.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Risk Analysis</h1>
        <p className="text-muted-foreground">Detailed risk metrics and vulnerability assessment</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground mb-2">High Risk Suppliers</p>
          <p className="text-3xl font-bold text-red-600">{highRiskCount}</p>
          <p className="text-xs text-muted-foreground mt-2">Score ≥ 70</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground mb-2">Medium Risk Suppliers</p>
          <p className="text-3xl font-bold text-orange-600">{mediumRiskCount}</p>
          <p className="text-xs text-muted-foreground mt-2">Score 50-70</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground mb-2">Low Risk Suppliers</p>
          <p className="text-3xl font-bold text-green-600">{lowRiskCount}</p>
          <p className="text-xs text-muted-foreground mt-2">Score &lt; 50</p>
        </div>
      </div>

      {/* Geographic and Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic Risk */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold mb-4">Geographic Risk Exposure</h2>
          <div className="space-y-3">
            {topLocations.map(([location, riskScore]) => (
              <div key={location}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{location}</span>
                  <span className="text-sm font-semibold">{Math.round(riskScore)}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                    style={{ width: `${Math.min(100, (riskScore / 500) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold mb-4">Risk Score Distribution</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Critical (≥70)</span>
                <span className="text-sm font-semibold">{highRiskCount}</span>
              </div>
              <div className="h-2 bg-red-500 rounded-full w-full" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">High (50-70)</span>
                <span className="text-sm font-semibold">{mediumRiskCount}</span>
              </div>
              <div className="h-2 bg-orange-500 rounded-full w-3/4" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Moderate (&lt;50)</span>
                <span className="text-sm font-semibold">{lowRiskCount}</span>
              </div>
              <div className="h-2 bg-yellow-500 rounded-full w-1/3" />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Risk Metrics */}
      <div className="rounded-lg border bg-card p-6 overflow-y-auto max-h-[600px]">
        <RiskMetricsPanel riskMetrics={riskMetrics} suppliers={MOCK_SUPPLIERS} />
      </div>
    </div>
  );
}
