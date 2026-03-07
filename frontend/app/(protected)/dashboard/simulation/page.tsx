"use client";

import { useState } from "react";
import { SimulationControls } from "@/components/dashboard/simulation-controls";
import { SupplyChainGraph } from "@/components/dashboard/supply-chain-graph";
import { CascadingImpactView } from "@/components/dashboard/cascading-impact-view";
import { MOCK_SUPPLIERS } from "@/lib/data/mock-suppliers";
import { simulationEngine } from "@/lib/simulation/simulation-engine";
import { SimulationState, DisruptionEvent } from "@/lib/types";

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
          <div className="h-96">
            <SupplyChainGraph
              suppliers={MOCK_SUPPLIERS}
              failedSuppliers={simulationState?.affectedSuppliers || []}
            />
          </div>
        </div>
      </div>

      {/* Impact Timeline */}
      {simulationState && (
        <>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="font-semibold mb-4">Impact Timeline</h2>
            <CascadingImpactView timeline={simulationState.timeline} />
          </div>

          {/* Impact Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-2">Event</p>
              <p className="text-lg font-semibold">{simulationState.currentEvent?.type}</p>
              <p className="text-sm text-muted-foreground mt-2">{simulationState.currentEvent?.severity}</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Financial Impact</p>
              <p className="text-lg font-semibold text-red-600">${(simulationState.totalImpact / 1000000).toFixed(1)}M</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-2">Recovery Time</p>
              <p className="text-lg font-semibold">{simulationState.estimatedRecoveryTime} days</p>
            </div>
          </div>

          {/* Affected Suppliers */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="font-semibold mb-4">Affected Suppliers ({simulationState.affectedSuppliers.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {simulationState.affectedSuppliers.map((supplierId) => {
                const supplier = MOCK_SUPPLIERS.find((s) => s.id === supplierId);
                if (!supplier) return null;
                return (
                  <div key={supplierId} className="rounded-lg border bg-red-50 dark:bg-red-950 p-3">
                    <p className="text-sm font-medium">{supplier.name}</p>
                    <p className="text-xs text-muted-foreground">{supplier.location}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
