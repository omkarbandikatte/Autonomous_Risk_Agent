"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DisruptionEvent } from "@/lib/types";
import { Zap, Play, RotateCcw } from "lucide-react";
import { DISRUPTION_TYPES } from "@/lib/constants";

interface SimulationControlsProps {
  onSimulate: (eventConfig: {
    type: DisruptionEvent["type"];
    severity: DisruptionEvent["severity"];
    affectedRegion?: string;
    affectedSupplierId?: string;
  }) => void;
  isRunning: boolean;
}

export function SimulationControls({ onSimulate, isRunning }: SimulationControlsProps) {
  const [selectedType, setSelectedType] = useState<DisruptionEvent["type"]>("natural-disaster");
  const [selectedSeverity, setSelectedSeverity] = useState<DisruptionEvent["severity"]>("high");

  const disruptionTypeMap: Record<string, DisruptionEvent["type"]> = {
    "Natural Disaster": "natural-disaster",
    "Political Crisis": "political",
    "Economic Downturn": "economic",
    "Pandemic": "pandemic",
    "Supply Constraint": "supply-constraint",
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-3">Disruption Type</label>
        <div className="grid grid-cols-1 gap-2">
          {DISRUPTION_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(disruptionTypeMap[type])}
              className={`p-3 rounded-lg border text-left transition-colors ${
                disruptionTypeMap[type] === selectedType
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <span className="font-medium text-sm">{type}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">Severity Level</label>
        <div className="grid grid-cols-4 gap-2">
          {["low", "medium", "high", "critical"].map((severity) => (
            <button
              key={severity}
              onClick={() => setSelectedSeverity(severity as DisruptionEvent["severity"])}
              className={`p-3 rounded-lg border text-center transition-colors ${
                selectedSeverity === severity
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <span className="font-medium text-sm capitalize">{severity}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Button
          onClick={() =>
            onSimulate({
              type: selectedType,
              severity: selectedSeverity,
            })
          }
          disabled={isRunning}
          className="w-full gap-2"
          size="lg"
        >
          <Zap className="w-4 h-4" />
          {isRunning ? "Running Simulation..." : "Trigger Simulation"}
        </Button>
        <Button variant="outline" className="w-full gap-2" disabled={!isRunning}>
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
        <p className="text-xs text-muted-foreground">
          💡 <span className="font-medium">Tip:</span> Simulation runs in real-time. Watch the network graph to see cascading failures propagate through your supply chain.
        </p>
      </div>
    </div>
  );
}
