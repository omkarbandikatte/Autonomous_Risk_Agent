"use client";

import { RiskMetric, Supplier } from "@/lib/types";
import { AlertTriangle, TrendingUp } from "lucide-react";

interface RiskMetricsPanelProps {
  riskMetrics: RiskMetric[];
  suppliers: Supplier[];
}

export function RiskMetricsPanel({ riskMetrics, suppliers }: RiskMetricsPanelProps) {
  // Sort by risk score descending
  const sortedMetrics = [...riskMetrics].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Top Risk Suppliers
        </h3>
      </div>

      <div className="space-y-3">
        {sortedMetrics.slice(0, 8).map((metric) => {
          const supplier = suppliers.find((s) => s.id === metric.supplierId);
          if (!supplier) return null;

          const getRiskColor = (score: number) => {
            if (score >= 70) return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200";
            if (score >= 50) return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200";
            if (score >= 30) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200";
            return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200";
          };

          return (
            <div
              key={metric.supplierId}
              className="rounded-lg border bg-card p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{supplier.name}</p>
                  <p className="text-xs text-muted-foreground">{supplier.location}</p>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getRiskColor(metric.riskScore)}`}>
                  {Math.round(metric.riskScore)}
                </div>
              </div>

              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full transition-all ${getRiskColor(metric.riskScore).split(" ")[0]}`}
                  style={{ width: `${metric.riskScore}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Geopolitical</span>
                  <p className="font-semibold">{Math.round(metric.geopoliticalRisk)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Concentration</span>
                  <p className="font-semibold">{Math.round(metric.concentrationRisk)}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Tier</span>
                  <p className="font-semibold">{metric.supplyChainTier}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
