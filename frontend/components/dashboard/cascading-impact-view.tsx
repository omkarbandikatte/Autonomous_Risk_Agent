"use client";

import { SimulationTimestep } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from 'recharts';

interface CascadingImpactViewProps {
  timeline: SimulationTimestep[];
  maxDays?: number;
}

export function CascadingImpactView({ timeline, maxDays = 30 }: CascadingImpactViewProps) {
  const displayTimeline = timeline.slice(0, maxDays).map(step => ({
    ...step,
    failures: step.failedSuppliers.length,
    impactMd: parseFloat((step.cumulativeImpact / 1000000).toFixed(2)),
    dayLabel: `Day ${step.day}`
  }));

  const peakFailures = Math.max(...displayTimeline.map((t) => t.failures), 0);
  const maxImpact = Math.max(...displayTimeline.map((t) => t.cumulativeImpact), 0);

  return (
    <Card className="glass h-full flex flex-col overflow-hidden">
      <CardHeader className="border-b border-white/5 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-accent/20 border border-accent/20 shadow-glow-cyan/10">
              <BarChart3 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <CardTitle className="text-lg font-black tracking-tight text-white">Impact Analytics</CardTitle>
              <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest leading-none mt-1">Real-time cascading modeling</p>
            </div>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <TrendingUp className="w-3 h-3 text-accent" />
            <span className="text-[9px] font-black uppercase tracking-tighter text-foreground/80">Active Simulation</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-8 space-y-12 flex-1">
        {/* Main Multi-Metric Graph */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Propagation & Financial Loss</h4>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent shadow-glow-cyan" />
                <span className="text-[9px] font-bold text-muted-foreground/40 uppercase">Economic Loss ($M)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-destructive shadow-glow-purple" />
                <span className="text-[9px] font-bold text-muted-foreground/40 uppercase">Failure Density</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full bg-white/[0.02] rounded-3xl border border-white/5 p-4 backdrop-blur-sm">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={displayTimeline}>
                <defs>
                  <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 800 }}
                  interval={Math.floor(displayTimeline.length / 5)}
                />
                <YAxis yAxisId="left" hide />
                <YAxis yAxisId="right" hide />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', padding: '12px' }}
                  itemStyle={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                  labelStyle={{ color: 'rgba(255,255,255,0.4)', marginBottom: '8px', fontSize: '10px', fontWeight: '900' }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="impactMd"
                  stroke="var(--color-accent)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorImpact)"
                  name="Loss ($M)"
                />
                <Line
                  yAxisId="right"
                  type="stepAfter"
                  dataKey="failures"
                  stroke="var(--color-destructive)"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                  name="Failed Nodes"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-3 gap-6">
          <div className="rounded-3xl border border-white/5 bg-white/2 p-5 group hover:bg-white/5 transition-all duration-500 hover:scale-[1.02]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30 mb-2">Maximum Disruption</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tracking-tighter group-hover:text-destructive transition-colors">{peakFailures}</span>
              <span className="text-[10px] font-bold text-muted-foreground/20 uppercase">Nodes</span>
            </div>
          </div>
          <div className="rounded-3xl border border-white/5 bg-white/2 p-5 group hover:bg-white/5 transition-all duration-500 hover:scale-[1.02]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30 mb-2">Time Window</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tracking-tighter group-hover:text-primary transition-colors">{displayTimeline.length}</span>
              <span className="text-[10px] font-bold text-muted-foreground/20 uppercase">Days</span>
            </div>
          </div>
          <div className="rounded-3xl border border-white/5 bg-white/2 p-5 group hover:bg-white/5 transition-all duration-500 hover:scale-[1.02]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30 mb-2">Terminal Deficit</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tracking-tighter group-hover:text-accent transition-colors">
                ${(maxImpact / 1000000).toFixed(1)}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground/20 uppercase">Million</span>
            </div>
          </div>
        </div>

        {/* Legend / Status Labels */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex gap-8">
            <div className="flex items-center gap-2 group cursor-help">
              <div className="w-2 h-2 rounded-full bg-accent shadow-glow-cyan/40 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 group-hover:text-accent transition-colors">Predictive Stability</span>
            </div>
            <div className="flex items-center gap-2 group cursor-help">
              <div className="w-2 h-2 rounded-full bg-destructive shadow-glow-purple/40" />
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 group-hover:text-destructive transition-colors">Cascade Threshold</span>
            </div>
          </div>
          <p className="text-[9px] font-bold text-muted-foreground/20 uppercase tracking-[0.3em]">Dataset: Synthetic Risk v4.2</p>
        </div>
      </CardContent>
    </Card>
  );
}
