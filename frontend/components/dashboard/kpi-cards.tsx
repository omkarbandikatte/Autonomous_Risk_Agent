"use client";

import { DashboardMetrics } from "@/lib/types";
import { Activity, AlertCircle, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KPICardsProps {
  metrics: DashboardMetrics;
}

export function KPICards({ metrics }: KPICardsProps) {
  const cards = [
    {
      title: "Network Health",
      value: `${metrics.overallHealthScore}%`,
      icon: Activity,
      trend: "+2.4%",
      color: "text-accent",
      bg: "bg-accent/10",
      description: "Aggregate stability index"
    },
    {
      title: "At-Risk Entities",
      value: metrics.criticalSuppliersAtRisk,
      icon: AlertCircle,
      trend: "-1",
      color: "text-red-500",
      bg: "bg-red-500/10",
      description: "Nodes requiring mitigation"
    },
    {
      title: "Economic Exposure",
      value: `$${(metrics.estimatedFinancialExposure / 1000000).toFixed(1)}M`,
      icon: TrendingUp,
      trend: "+12.4%",
      color: "text-primary",
      bg: "bg-primary/10",
      description: "Projected revenue at risk"
    },
    {
      title: "Mitigation Power",
      value: `${metrics.supplyChainResilience}%`,
      icon: Zap,
      trend: "+5.1%",
      color: "text-green-500",
      bg: "bg-green-500/10",
      description: "Efficiency of current strategies"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative rounded-4xl bg-white/2 border border-white/5 p-8 shadow-2xl backdrop-blur-3xl hover:bg-white/5 transition-all duration-500 overflow-hidden"
        >
          {/* Subtle Glow Background */}
          <div className={cn("absolute -top-10 -right-10 w-32 h-32 blur-[80px] opacity-20", card.bg)} />

          <div className="flex items-start justify-between mb-6 relative z-10">
            <div className={cn("p-4 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", card.bg)}>
              <card.icon className={cn("w-6 h-6", card.color)} />
            </div>
            <div className="text-right">
              <span className={cn("text-[10px] font-black tracking-widest", card.color)}>{card.trend}</span>
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-1">{card.title}</h3>
            <p className="text-4xl font-black text-white tracking-tighter mb-2">{card.value}</p>
            <p className="text-[10px] font-bold text-muted-foreground/20 italic">{card.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
