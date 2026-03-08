"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DisruptionEvent } from "@/lib/types";
import { Zap, RotateCcw, Activity } from "lucide-react";
import { DISRUPTION_TYPES } from "@/lib/constants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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

  const severities: DisruptionEvent["severity"][] = ["low", "medium", "high", "critical"];

  return (
    <Card className="glass h-full overflow-hidden">
      <CardHeader className="border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <CardTitle className="text-lg font-bold tracking-tight">Simulation Engine</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-8">
        {/* Disruption Type */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
            Disruption Category
          </label>
          <div className="grid grid-cols-1 gap-2">
            {DISRUPTION_TYPES.map((type) => {
              const typeKey = disruptionTypeMap[type];
              const isSelected = typeKey === selectedType;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(typeKey)}
                  className={cn(
                    "group relative flex items-center justify-between p-3 rounded-2xl border transition-all duration-300",
                    isSelected
                      ? "bg-white/5 border-primary/50 text-white shadow-glow-purple/10"
                      : "bg-transparent border-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground"
                  )}
                >
                  <span className="text-sm font-bold tracking-tight">{type}</span>
                  {isSelected && (
                    <motion.div
                      layoutId="selected-type-indicator"
                      className="h-1.5 w-1.5 rounded-full bg-primary"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Severity Level */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
            Impact Severity
          </label>
          <div className="flex p-1 rounded-2xl bg-white/5 border border-white/5">
            {severities.map((severity) => {
              const isSelected = selectedSeverity === severity;
              return (
                <button
                  key={severity}
                  onClick={() => setSelectedSeverity(severity)}
                  className={cn(
                    "flex-1 py-2 text-[10px] font-black uppercase tracking-tighter rounded-xl transition-all duration-300",
                    isSelected
                      ? "bg-primary text-white shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {severity}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            onClick={() =>
              onSimulate({
                type: selectedType,
                severity: selectedSeverity,
              })
            }
            disabled={isRunning}
            variant="default"
            className="w-full h-12 gap-3 rounded-2xl"
          >
            {isRunning ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                Processing...
              </span>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current" />
                Run Simulation
              </>
            )}
          </Button>

          <Button
            variant="secondary"
            className="w-full h-12 gap-3 rounded-2xl"
            disabled={!isRunning}
          >
            <RotateCcw className="w-4 h-4" />
            Reset State
          </Button>
        </div>

        {/* Informational Tip */}
        <div className="relative overflow-hidden rounded-2xl bg-accent/5 border border-accent/10 p-4">
          <div className="relative z-10 flex gap-3 text-xs leading-relaxed text-muted-foreground">
            <span className="text-accent">💡</span>
            <p>
              Cascading impacts are calculated in real-time based on supplier tiers and regional dependencies.
            </p>
          </div>
          <div className="absolute -left-2 -bottom-2 h-12 w-12 rounded-full bg-accent/10 blur-xl" />
        </div>
      </CardContent>
    </Card>
  );
}
