"use client";

import { DashboardMetrics } from "@/lib/types";
import { AlertTriangle, TrendingUp, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardsProps {
  metrics: DashboardMetrics;
}

export function KPICards({ metrics }: KPICardsProps) {
  const cards = [
    {
      icon: Shield,
      label: "Health Score",
      value: metrics.overallHealthScore,
      unit: "%",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      trend: null,
    },
    {
      icon: AlertTriangle,
      label: "Average Risk",
      value: Math.round(metrics.averageRiskScore),
      unit: "%",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      trend: null,
    },
    {
      icon: TrendingUp,
      label: "At-Risk Suppliers",
      value: metrics.criticalSuppliersAtRisk,
      unit: " critical",
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
      trend: null,
    },
    {
      icon: Zap,
      label: "Diversification",
      value: metrics.diversificationIndex,
      unit: "%",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      trend: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={cn(
              "rounded-lg border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 ease-out animate-slide-up",
              card.bgColor
            )}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {card.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{card.value}</span>
                  <span className="text-sm text-muted-foreground">{card.unit}</span>
                </div>
              </div>
              <div className={cn("p-3 rounded-lg bg-background/50")}>
                <Icon className={cn("w-6 h-6", card.color)} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
