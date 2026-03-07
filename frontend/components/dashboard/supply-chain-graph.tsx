"use client";

import { useMemo } from "react";
import { Supplier } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SupplyChainGraphProps {
  suppliers: Supplier[];
  failedSuppliers?: string[];
  highlightedSupplier?: string;
}

export function SupplyChainGraph({
  suppliers,
  failedSuppliers = [],
  highlightedSupplier,
}: SupplyChainGraphProps) {
  const graph = useMemo(() => {
    // Calculate node positions using a simple force-directed layout simulation
    const width = 800;
    const height = 500;
    const positions = new Map<string, { x: number; y: number }>();

    // Initial random positions
    suppliers.forEach((supplier) => {
      positions.set(supplier.id, {
        x: Math.random() * width,
        y: Math.random() * height,
      });
    });

    // Simple force-directed layout
    for (let iteration = 0; iteration < 50; iteration++) {
      suppliers.forEach((supplier) => {
        let fx = 0;
        let fy = 0;
        const pos = positions.get(supplier.id)!;

        // Repulsion from other nodes
        suppliers.forEach((other) => {
          if (supplier.id === other.id) return;
          const otherPos = positions.get(other.id)!;
          const dx = pos.x - otherPos.x;
          const dy = pos.y - otherPos.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = 1000 / (dist * dist);
          fx += (dx / dist) * force;
          fy += (dy / dist) * force;
        });

        // Attraction to connected nodes
        supplier.dependencies.forEach((depId) => {
          const otherPos = positions.get(depId);
          if (!otherPos) return;
          const dx = pos.x - otherPos.x;
          const dy = pos.y - otherPos.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          fx -= (dx / dist) * 50;
          fy -= (dy / dist) * 50;
        });

        // Apply force with damping
        pos.x += fx * 0.01;
        pos.y += fy * 0.01;

        // Keep within bounds
        pos.x = Math.max(40, Math.min(width - 40, pos.x));
        pos.y = Math.max(40, Math.min(height - 40, pos.y));
      });
    }

    return { positions, width, height };
  }, [suppliers]);

  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f97316";
      case "low":
        return "#22c55e";
      default:
        return "#3b82f6";
    }
  };

  return (
    <div className="w-full h-full rounded-lg border bg-card overflow-auto">
      <svg
        width={graph.width}
        height={graph.height}
        className="w-full h-auto"
        viewBox={`0 0 ${graph.width} ${graph.height}`}
      >
        {/* Draw edges first (behind nodes) */}
        {suppliers.flatMap((supplier) =>
          supplier.dependencies.map((depId) => {
            const fromPos = graph.positions.get(supplier.id);
            const toPos = graph.positions.get(depId);

            if (!fromPos || !toPos) return null;

            const isFailed =
              failedSuppliers.includes(supplier.id) ||
              failedSuppliers.includes(depId);

            return (
              <line
                key={`edge-${supplier.id}-${depId}`}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke={isFailed ? "#ef4444" : "#cbd5e1"}
                strokeWidth={isFailed ? 2 : 1}
                opacity={isFailed ? 0.8 : 0.4}
              />
            );
          })
        )}

        {/* Draw nodes */}
        {suppliers.map((supplier) => {
          const pos = graph.positions.get(supplier.id);
          if (!pos) return null;

          const isFailed = failedSuppliers.includes(supplier.id);
          const isHighlighted = highlightedSupplier === supplier.id;
          const color = isFailed ? "#ef4444" : getCriticalityColor(supplier.criticality);

          return (
            <g key={supplier.id}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isFailed || isHighlighted ? 18 : 12}
                fill={color}
                opacity={isFailed ? 0.9 : 0.7}
              />
              {(isFailed || isHighlighted) && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={24}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  opacity={0.3}
                >
                  <animate attributeName="r" from="24" to="32" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur border rounded-lg p-3 text-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Failed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Low Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
}
