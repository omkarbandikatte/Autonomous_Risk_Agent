"use client";

import { RiskMetric, Supplier } from "@/lib/types";
import { AlertTriangle, TrendingUp, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RiskMetricsPanelProps {
  riskMetrics: RiskMetric[];
  suppliers: Supplier[];
}

export function RiskMetricsPanel({ riskMetrics, suppliers }: RiskMetricsPanelProps) {
  const sortedMetrics = [...riskMetrics].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <Card className="glass h-full">
      <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-destructive/10">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <CardTitle className="text-lg font-bold tracking-tight">Top Risk Suppliers</CardTitle>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Info className="w-4 h-4" />
        </button>
      </CardHeader>

      <CardContent className="pt-6 space-y-5">
        {sortedMetrics.slice(0, 6).map((metric, index) => {
          const supplier = suppliers.find((s) => s.id === metric.supplierId);
          if (!supplier) return null;

          const riskScore = Math.round(metric.riskScore);
          const getRiskGradient = (score: number) => {
            if (score >= 70) return "from-red-500 to-orange-500 shadow-red-500/20";
            if (score >= 50) return "from-orange-500 to-yellow-500 shadow-orange-500/20";
            return "from-accent to-primary shadow-accent-500/20";
          };

          return (
            <motion.div
              key={metric.supplierId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm tracking-tight group-hover:text-primary transition-colors truncate">
                    {supplier.name}
                  </p>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                    Tier {metric.supplyChainTier} • {supplier.location}
                  </p>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black tracking-tighter shadow-sm border border-white/5",
                  riskScore >= 70 ? "bg-red-500/10 text-red-500" : "bg-accent/10 text-accent"
                )}>
                  {riskScore}% RISK
                </div>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${riskScore}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: "circOut" }}
                  className={cn(
                    "absolute h-full bg-linear-to-r rounded-full shadow-lg transition-all duration-1000",
                    getRiskGradient(riskScore)
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">Geopol</span>
                  <p className="text-xs font-black">{Math.round(metric.geopoliticalRisk)}</p>
                </div>
                <div className="space-y-1 text-center">
                  <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">Concen</span>
                  <p className="text-xs font-black">{Math.round(metric.concentrationRisk)}%</p>
                </div>
                <div className="space-y-1 text-right">
                  <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">Trend</span>
                  <TrendingUp className="w-3 h-3 text-destructive inline ml-1" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
