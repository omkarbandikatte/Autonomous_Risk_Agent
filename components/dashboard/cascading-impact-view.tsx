"use client";

import { SimulationTimestep } from "@/lib/types";

interface CascadingImpactViewProps {
  timeline: SimulationTimestep[];
  maxDays?: number;
}

export function CascadingImpactView({ timeline, maxDays = 30 }: CascadingImpactViewProps) {
  const displayTimeline = timeline.slice(0, maxDays);
  const maxFailures = Math.max(...displayTimeline.map((t) => t.failedSuppliers.length), 1);
  const maxImpact = Math.max(...displayTimeline.map((t) => t.cumulativeImpact), 1);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-4">Impact Timeline</h3>
      </div>

      {/* Chart */}
      <div className="space-y-2">
        <div className="flex items-end gap-1 h-64 p-4 bg-muted/30 rounded-lg overflow-x-auto">
          {displayTimeline.map((step, index) => {
            const barHeightPercent = (step.failedSuppliers.length / maxFailures) * 100 || 5;

            return (
              <div
                key={index}
                className="flex flex-col items-center gap-1 flex-1 min-w-[30px]"
                title={`Day ${step.day}: ${step.failedSuppliers.length} failed suppliers`}
              >
                <div
                  className="w-full rounded-t transition-all hover:bg-destructive/80"
                  style={{
                    height: `${barHeightPercent}%`,
                    minHeight: "4px",
                    backgroundColor:
                      step.failedSuppliers.length === 0
                        ? "#10b981"
                        : step.failedSuppliers.length <= 3
                          ? "#f59e0b"
                          : "#ef4444",
                  }}
                />
                {index % 5 === 0 && (
                  <span className="text-xs text-muted-foreground text-center">D{step.day}</span>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground text-center">
          {displayTimeline.length} days | {displayTimeline[displayTimeline.length - 1]?.failedSuppliers.length || 0} peak failures
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Peak Failures</p>
          <p className="text-2xl font-bold">{maxFailures}</p>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Duration</p>
          <p className="text-2xl font-bold">{displayTimeline.length}d</p>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Max Impact</p>
          <p className="text-2xl font-bold">${(maxImpact / 1000000).toFixed(0)}M</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500" />
          <span>No Impact</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-500" />
          <span>Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500" />
          <span>Critical</span>
        </div>
      </div>
    </div>
  );
}
