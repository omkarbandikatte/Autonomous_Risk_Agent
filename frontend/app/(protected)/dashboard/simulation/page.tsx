"use client";

import { useState } from "react";
import { SimulationControls } from "@/components/dashboard/simulation-controls";
import { SupplyChainGraph } from "@/components/dashboard/supply-chain-graph";
import { CascadingImpactView } from "@/components/dashboard/cascading-impact-view";
import { MOCK_SUPPLIERS } from "@/lib/data/mock-suppliers";
import { simulationEngine } from "@/lib/simulation/simulation-engine";
import { SimulationState, DisruptionEvent } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SimulationPage() {
  const [simulationState, setSimulationState] = useState<SimulationState | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleSimulate = (eventConfig: {
    type: DisruptionEvent["type"];
    severity: DisruptionEvent["severity"];
    affectedRegion?: string;
    affectedSupplierId?: string;
  }) => {
    setIsRunning(true);

    // Simulate async operation
    setTimeout(() => {
      const state = simulationEngine.runSimulation(MOCK_SUPPLIERS, eventConfig);
      setSimulationState(state);
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Supply Chain Simulation</h1>
        <p className="text-muted-foreground">Trigger disruption events and observe cascading failures</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 rounded-lg border bg-card p-6">
          <h2 className="font-semibold mb-4">Simulation Controls</h2>
          <SimulationControls onSimulate={handleSimulate} isRunning={isRunning} />
        </div>

        {/* Network Visualization */}
        <div className="lg:col-span-2 rounded-lg border bg-card p-6">
          <h2 className="font-semibold mb-4">Network Visualization</h2>
          <div className="h-[600px]">
            <SupplyChainGraph
              suppliers={MOCK_SUPPLIERS}
              failedSuppliers={simulationState?.affectedSuppliers || []}
            />
          </div>
        </div>
      </div>

      {/* Impact Overview & Metrics */}
      <AnimatePresence>
        {simulationState && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Main Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="rounded-3xl border border-white/5 bg-white/2 p-6 backdrop-blur-3xl shadow-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-2">Disruption Event</p>
                <p className="text-xl font-black text-white capitalize">{simulationState.currentEvent?.type.replace('-', ' ')}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={cn(
                    "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border",
                    simulationState.currentEvent?.severity === "critical" ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-orange-500/10 border-orange-500/20 text-orange-500"
                  )}>
                    {simulationState.currentEvent?.severity}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/30">
                    {simulationState.currentEvent?.affectedRegion}
                  </span>
                </div>
              </div>

              <div className="rounded-3xl border border-white/5 bg-white/2 p-6 backdrop-blur-3xl shadow-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-2">Financial Impact</p>
                <p className="text-4xl font-black text-white tracking-tighter">
                  ${(simulationState.totalImpact / 1000000).toFixed(2)}M
                </p>
                <p className="text-[10px] font-bold text-red-500/60 mt-1 uppercase">Total Pipeline Loss</p>
              </div>

              <div className="rounded-3xl border border-white/5 bg-white/2 p-6 backdrop-blur-3xl shadow-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-2">Recovery Estimate</p>
                <p className="text-4xl font-black text-white tracking-tighter">
                  {simulationState.estimatedRecoveryTime} <span className="text-lg">Days</span>
                </p>
                <p className="text-[10px] font-bold text-accent/60 mt-1 uppercase">Time to Stabilization</p>
              </div>

              <div className="rounded-3xl border border-white/5 bg-white/2 p-6 backdrop-blur-3xl shadow-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-2">Affected Nodes</p>
                <p className="text-4xl font-black text-white tracking-tighter">
                  {simulationState.affectedSuppliers.length}
                </p>
                <p className="text-[10px] font-bold text-primary/60 mt-1 uppercase">Network Entities Disrupted</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Timeline - 8 cols */}
              <div className="lg:col-span-8 flex flex-col">
                <CascadingImpactView timeline={simulationState.timeline} />
              </div>

              {/* Affected Nodes List - 4 cols */}
              <div className="lg:col-span-4 rounded-4xl border border-white/5 bg-white/2 backdrop-blur-3xl p-8 flex flex-col h-[600px]">
                <h3 className="text-xl font-black mb-6 tracking-tight flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-red-500/10"><Activity className="w-5 h-5 text-red-500" /></span>
                  Impacted Registry
                </h3>
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
                  {simulationState.affectedSuppliers.map((supplierId) => {
                    const supplier = MOCK_SUPPLIERS.find((s) => s.id === supplierId);
                    if (!supplier) return null;
                    return (
                      <div key={supplierId} className="p-4 rounded-2xl bg-white/3 border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-colors">
                        <div>
                          <p className="text-sm font-black text-white/90">{supplier.name}</p>
                          <p className="text-[10px] font-medium text-muted-foreground/40 uppercase tracking-widest">{supplier.location} • {supplier.category}</p>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-red-500 shadow-glow-purple" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
