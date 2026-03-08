"use client";

import { useMemo, useState } from "react";
import { Supplier } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Info, Maximize2 } from "lucide-react";

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
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const graph = useMemo(() => {
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
    for (let iteration = 0; iteration < 80; iteration++) {
      suppliers.forEach((supplier) => {
        let fx = 0;
        let fy = 0;
        const pos = positions.get(supplier.id)!;

        // Repulsion
        suppliers.forEach((other) => {
          if (supplier.id === other.id) return;
          const otherPos = positions.get(other.id)!;
          const dx = pos.x - otherPos.x;
          const dy = pos.y - otherPos.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = 1200 / (dist * dist);
          fx += (dx / dist) * force;
          fy += (dy / dist) * force;
        });

        // Attraction
        supplier.dependencies.forEach((depId) => {
          const otherPos = positions.get(depId);
          if (!otherPos) return;
          const dx = pos.x - otherPos.x;
          const dy = pos.y - otherPos.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          fx -= (dx / dist) * 40;
          fy -= (dy / dist) * 40;
        });

        pos.x += fx * 0.015;
        pos.y += fy * 0.015;

        pos.x = Math.max(60, Math.min(width - 60, pos.x));
        pos.y = Math.max(60, Math.min(height - 60, pos.y));
      });
    }

    return { positions, width, height };
  }, [suppliers]);

  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case "high": return "var(--primary)";
      case "medium": return "#F97316";
      case "low": return "var(--accent)";
      default: return "#3B82F6";
    }
  };

  return (
    <Card className="glass h-full relative group/graph flex flex-col p-0 overflow-hidden border-white/5">
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-foreground">Live Supply Network</span>
        </div>
        <div className="flex gap-2">
          <button className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground transition-colors">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground transition-colors">
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-[400px] relative cursor-crosshair">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${graph.width} ${graph.height}`}
          className="w-full h-full"
        >
          {/* Edges */}
          {suppliers.flatMap((supplier) =>
            supplier.dependencies.map((depId) => {
              const fromPos = graph.positions.get(supplier.id);
              const toPos = graph.positions.get(depId);
              if (!fromPos || !toPos) return null;

              const isFailed = failedSuppliers.includes(supplier.id) || failedSuppliers.includes(depId);
              const isHighlighted = hoveredNode === supplier.id || hoveredNode === depId;

              return (
                <motion.line
                  key={`edge-${supplier.id}-${depId}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: isHighlighted ? 0.8 : 0.3 }}
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke={isFailed ? "var(--destructive)" : (isHighlighted ? "var(--primary)" : "rgba(255,255,255,0.1)")}
                  strokeWidth={isHighlighted ? 2 : 1.5}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              );
            })
          )}

          {/* Nodes */}
          {suppliers.map((supplier, idx) => {
            const pos = graph.positions.get(supplier.id);
            if (!pos) return null;

            const isFailed = failedSuppliers.includes(supplier.id);
            const isHighlighted = highlightedSupplier === supplier.id || hoveredNode === supplier.id;
            const color = isFailed ? "var(--destructive)" : getCriticalityColor(supplier.criticality);

            return (
              <g
                key={supplier.id}
                onMouseEnter={() => setHoveredNode(supplier.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
              >
                {/* Outer Glow */}
                <AnimatePresence>
                  {isHighlighted && (
                    <motion.circle
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0.2 }}
                      exit={{ scale: 0, opacity: 0 }}
                      cx={pos.x}
                      cy={pos.y}
                      r={18}
                      fill={color}
                      className="blur-md"
                    />
                  )}
                </AnimatePresence>

                {/* Main Node */}
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.02, type: "spring", stiffness: 200 }}
                  cx={pos.x}
                  cy={pos.y}
                  r={isFailed || isHighlighted ? 12 : 8}
                  fill={isFailed ? "transparent" : color}
                  stroke={isFailed ? color : "white"}
                  strokeWidth={isFailed ? 3 : 1.5}
                  className="transition-all duration-300"
                />

                {isFailed && (
                  <motion.circle
                    animate={{ r: [12, 18, 12], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    cx={pos.x}
                    cy={pos.y}
                    r={12}
                    fill="none"
                    stroke={color}
                    strokeWidth={2}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute top-4 right-4 space-y-2 p-3 glass rounded-xl text-[9px] font-black uppercase tracking-tighter border-white/5 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-destructive shadow-glow-purple/20" />
            <span>Node Failure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>High Criticality</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span>Operational</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
