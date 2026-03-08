"use client";

import { useMemo, useState } from "react";
import { Supplier } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Info, Maximize2, MapPin, Package, AlertTriangle, ShieldCheck, TrendingUp, Globe } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);

  const selectedSupplier = useMemo(() =>
    suppliers.find(s => s.id === selectedSupplierId),
    [suppliers, selectedSupplierId]
  );

  const hoveredSupplier = useMemo(() =>
    suppliers.find(s => s.id === hoveredNode),
    [suppliers, hoveredNode]
  );

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
    for (let iteration = 0; iteration < 150; iteration++) {
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
          const force = 2500 / (dist * dist);
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
          fx -= (dx / dist) * 60;
          fy -= (dy / dist) * 60;
        });

        pos.x += fx * 0.015;
        pos.y += fy * 0.015;

        // Soft constraints to keep them roughly centered
        pos.x = Math.max(20, Math.min(width - 20, pos.x));
        pos.y = Math.max(20, Math.min(height - 20, pos.y));
      });
    }

    // Calculate actual bounds for the viewBox
    const xValues = Array.from(positions.values()).map(p => p.x);
    const yValues = Array.from(positions.values()).map(p => p.y);
    const minX = Math.min(...xValues) - 50;
    const maxX = Math.max(...xValues) + 50;
    const minY = Math.min(...yValues) - 50;
    const maxY = Math.max(...yValues) + 50;

    return {
      positions,
      viewBox: `${minX} ${minY} ${maxX - minX} ${maxY - minY}`
    };
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
        <div className="flex gap-2 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
          Interactive Node Map
        </div>
      </div>

      <div className="flex-1 min-h-[400px] relative cursor-crosshair">
        <svg
          width="100%"
          height="100%"
          viewBox={graph.viewBox}
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
                  animate={{ pathLength: 1, opacity: isHighlighted ? 0.8 : 0.2 }}
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke={isFailed ? "var(--destructive)" : (isHighlighted ? "var(--primary)" : "rgba(255,255,255,0.05)")}
                  strokeWidth={isHighlighted ? 2.5 : 1.5}
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
                onClick={() => setSelectedSupplierId(supplier.id)}
                className="cursor-pointer"
              >
                {/* Outer Glow */}
                <AnimatePresence>
                  {isHighlighted && (
                    <motion.circle
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.8, opacity: 0.25 }}
                      exit={{ scale: 0, opacity: 0 }}
                      cx={pos.x}
                      cy={pos.y}
                      r={18}
                      fill={color}
                      className="blur-lg"
                    />
                  )}
                </AnimatePresence>

                {/* Main Node */}
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.01, type: "spring", stiffness: 200 }}
                  cx={pos.x}
                  cy={pos.y}
                  r={isFailed || isHighlighted ? 14 : 10}
                  fill={isFailed ? "transparent" : color}
                  stroke={isFailed ? color : "rgba(255,255,255,0.8)"}
                  strokeWidth={isFailed ? 4 : 2}
                  className="transition-all duration-300"
                />

                {isFailed && (
                  <motion.circle
                    animate={{ r: [14, 24, 14], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    cx={pos.x}
                    cy={pos.y}
                    r={14}
                    fill="none"
                    stroke={color}
                    strokeWidth={3}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip (Semi-Detail) */}
        <AnimatePresence mode="wait">
          {hoveredSupplier && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute pointer-events-none z-50 bg-black/90 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl min-w-[200px]"
              style={{
                left: `calc(${(graph.positions.get(hoveredSupplier.id)!.x - parseFloat(graph.viewBox.split(' ')[0])) / parseFloat(graph.viewBox.split(' ')[2]) * 100}% + 20px)`,
                top: `calc(${(graph.positions.get(hoveredSupplier.id)!.y - parseFloat(graph.viewBox.split(' ')[1])) / parseFloat(graph.viewBox.split(' ')[3]) * 100}% - 40px)`,
              }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-sm font-black text-white leading-none">{hoveredSupplier.name}</h4>
                  <div className={cn(
                    "h-1.5 w-1.5 rounded-full shadow-glow-purple",
                    failedSuppliers.includes(hoveredSupplier.id) ? "bg-red-500" : "bg-emerald-500"
                  )} />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                  <MapPin className="w-2.5 h-2.5" />
                  {hoveredSupplier.location}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                  <Package className="w-2.5 h-2.5" />
                  Risk Score: {hoveredSupplier.riskScore}
                </div>
                <div className="pt-1 text-[8px] font-black text-primary/40 uppercase tracking-widest">
                  Click for Full Analysis
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="absolute top-4 right-4 space-y-2 p-3 glass rounded-xl text-[9px] font-black uppercase tracking-tighter border-white/5 shadow-2xl z-10">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-destructive shadow-glow-purple/20" />
            <span>Critical Failure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary shadow-glow-purple/20" />
            <span>High Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-orange-500 shadow-glow-purple/20" />
            <span>Warning Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent shadow-glow-cyan/20" />
            <span>Nominal</span>
          </div>
        </div>
      </div>

      {/* Full Detail Modal */}
      <Dialog open={!!selectedSupplierId} onOpenChange={(open) => !open && setSelectedSupplierId(null)}>
        <DialogContent className="sm:max-w-[700px] glass p-0 overflow-hidden border-white/10" showCloseButton={true}>
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedSupplier?.name || "Supplier Details"}</DialogTitle>
            <DialogDescription>
              Detailed risk analysis and operational metrics for {selectedSupplier?.name}.
            </DialogDescription>
          </DialogHeader>
          {selectedSupplier && (
            <div className="flex flex-col">
              {/* Header with Visual Status */}
              <div className="relative h-32 bg-linear-to-r from-primary/20 via-background to-accent/20 p-8 flex items-end justify-between overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
                <div className="relative z-10 space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">Global Supplier Registry</p>
                  <h2 className="text-4xl font-black text-white tracking-tighter">{selectedSupplier.name}</h2>
                </div>
                <div className={cn(
                  "relative z-10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-3xl",
                  failedSuppliers.includes(selectedSupplier.id) ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                )}>
                  {failedSuppliers.includes(selectedSupplier.id) ? "Service Disrupted" : "Fully Operational"}
                </div>
              </div>

              {/* Data Grid */}
              <div className="p-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground/40 font-black uppercase tracking-widest text-[9px]">
                    <Globe className="w-3 h-3" /> Headquarters
                  </div>
                  <p className="text-lg font-black text-white">{selectedSupplier.location}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground/40 font-black uppercase tracking-widest text-[9px]">
                    <ShieldCheck className="w-3 h-3" /> Criticality
                  </div>
                  <p className="text-lg font-black text-white capitalize">{selectedSupplier.criticality}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground/40 font-black uppercase tracking-widest text-[9px]">
                    <TrendingUp className="w-3 h-3" /> Risk Coefficient
                  </div>
                  <p className="text-lg font-black text-white">{selectedSupplier.riskScore}/100</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground/40 font-black uppercase tracking-widest text-[9px]">
                    <Package className="w-3 h-3" /> Annual Volume
                  </div>
                  <p className="text-lg font-black text-white">${(selectedSupplier.annualVolume / 1000000).toFixed(1)}M</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground/40 font-black uppercase tracking-widest text-[9px]">
                    <Package className="w-3 h-3" /> Recovery Lead Time
                  </div>
                  <p className="text-lg font-black text-white">{selectedSupplier.leadTime} Days</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground/40 font-black uppercase tracking-widest text-[9px]">
                    <AlertTriangle className="w-3 h-3" /> Network Dependencies
                  </div>
                  <p className="text-lg font-black text-white">{selectedSupplier.dependencies.length + selectedSupplier.dependents.length} Nodes</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-8 border-t border-white/5 bg-white/2 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedSupplierId(null)}
                  className="px-6 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  Close Analysis
                </button>
                <button className="px-6 py-2.5 rounded-2xl bg-primary text-black text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-glow-purple">
                  Open Procurement Portal
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}

