"use client";

import { SimulationTimestep } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, BarChart3, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CascadingImpactViewProps {
  timeline: SimulationTimestep[];
  maxDays?: number;
}

export function CascadingImpactView({ timeline, maxDays = 30 }: CascadingImpactViewProps) {
  const displayTimeline = timeline.slice(0, maxDays);
  const peakFailures = Math.max(...displayTimeline.map((t) => t.failedSuppliers.length), 0);
  const maxImpact = Math.max(...displayTimeline.map((t) => t.cumulativeImpact), 0);
  const lastStep = displayTimeline[displayTimeline.length - 1];

  return (
    <Card className="glass h-full flex flex-col">
      <CardHeader className="border-b border-white/5 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <BarChart3 className="w-5 h-5 text-accent" />
            </div>
            <CardTitle className="text-lg font-bold tracking-tight">Impact Timeline</CardTitle>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <TrendingUp className="w-3 h-3 text-accent" />
            <span className="text-[10px] font-black uppercase tracking-tighter text-foreground">Live Simulation</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-8 space-y-10 flex-1">
        {/* Timeline Chart */}
        <div className="relative h-48 flex items-end gap-1.5 px-4 bg-white/3 rounded-2xl border border-white/5 overflow-hidden">
          {displayTimeline.map((step, index) => {
            const barHeightPercent = (step.failedSuppliers.length / (peakFailures || 1)) * 100;
            const isCritical = step.failedSuppliers.length > 5;
            const isMedium = step.failedSuppliers.length > 0 && !isCritical;

            return (
              <div
                key={index}
                className="group relative flex flex-col items-center flex-1 min-w-[12px]"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(barHeightPercent, 4)}%` }}
                  transition={{ duration: 0.8, delay: index * 0.02, ease: "circOut" }}
                  className={cn(
                    "w-full rounded-t-sm transition-all duration-300",
                    isCritical
                      ? "bg-linear-to-t from-destructive to-red-400 shadow-glow-purple/20"
                      : isMedium
                        ? "bg-linear-to-t from-orange-400 to-yellow-300"
                        : "bg-linear-to-t from-accent to-cyan-300"
                  )}
                />

                {/* Tooltip on Hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                  <div className="bg-black/90 text-[10px] font-bold text-white px-2 py-1 rounded-lg whitespace-nowrap border border-white/10 shadow-2xl">
                    Day {step.day}: {step.failedSuppliers.length} Failures
                  </div>
                </div>

                {index % 7 === 0 && (
                  <span className="absolute top-full mt-2 text-[9px] font-bold text-muted-foreground/40">D{step.day}</span>
                )}
              </div>
            );
          })}

          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none opacity-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full border-t border-dashed border-white" />
            ))}
          </div>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/5 bg-white/3 p-4 text-center group hover:bg-white/5 transition-colors">
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Peak Failures</p>
            <p className="text-2xl font-black text-foreground tracking-tighter group-hover:text-destructive transition-colors">{peakFailures}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/3 p-4 text-center group hover:bg-white/5 transition-colors">
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Duration</p>
            <p className="text-2xl font-black text-foreground tracking-tighter group-hover:text-primary transition-colors">{displayTimeline.length}d</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/3 p-4 text-center group hover:bg-white/5 transition-colors">
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Max Impact</p>
            <p className="text-2xl font-black text-foreground tracking-tighter group-hover:text-accent transition-colors">
              ${(maxImpact / 1000000).toFixed(0)}M
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-glow-cyan/20" />
            <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground/60">Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-400" />
            <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground/60">At Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive shadow-glow-purple/20" />
            <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground/60">Critical</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
