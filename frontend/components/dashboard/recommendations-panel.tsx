"use client";

import { Recommendation, Supplier } from "@/lib/types";
import { CheckCircle2, AlertCircle, Lightbulb, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface RecommendationsPanelProps {
  recommendations: Recommendation[];
  suppliers: Supplier[];
}

export function RecommendationsPanel({ recommendations, suppliers }: RecommendationsPanelProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "supplier-diversification":
        return <AlertCircle className="w-5 h-5 text-purple-400" />;
      case "inventory-reallocation":
        return <Lightbulb className="w-5 h-5 text-blue-400" />;
      case "route-optimization":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case "contract-renegotiation":
        return <AlertCircle className="w-5 h-5 text-orange-400" />;
      default:
        return <Lightbulb className="w-5 h-5 text-primary" />;
    }
  };

  const getPriorityClasses = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500/20 bg-red-500/5 text-red-500";
      case "medium":
        return "border-orange-500/20 bg-orange-500/5 text-orange-500";
      case "low":
        return "border-green-500/20 bg-green-500/5 text-green-500";
      default:
        return "border-white/5 bg-white/5 text-foreground";
    }
  };

  return (
    <Card className="glass h-full">
      <CardHeader className="border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Lightbulb className="w-5 h-5 text-accent" />
          </div>
          <CardTitle className="text-lg font-bold tracking-tight">Mitigation Plan</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4">
          <AnimatePresence>
            {recommendations.slice(0, 4).map((rec, index) => {
              const supplier = suppliers.find((s) => s.id === rec.affectedSupplierId);

              return (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "group relative rounded-2xl border p-4 transition-all duration-300 hover:bg-white/5",
                    getPriorityClasses(rec.priority)
                  )}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 mt-1">
                      {getTypeIcon(rec.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-sm tracking-tight text-foreground truncate group-hover:text-primary transition-colors">
                          {rec.description}
                        </h4>
                        <span className="text-[10px] font-black uppercase tracking-tighter opacity-60">
                          {rec.priority}
                        </span>
                      </div>
                      {supplier && (
                        <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                          {supplier.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="rounded-xl bg-white/3 border border-white/5 p-2.5">
                      <span className="text-[9px] font-bold text-muted-foreground/40 uppercase block mb-1">Est. Cost</span>
                      <p className="text-xs font-black text-foreground">${(rec.estimatedCost / 1000000).toFixed(1)}M</p>
                    </div>
                    <div className="rounded-xl bg-white/3 border border-white/5 p-2.5">
                      <span className="text-[9px] font-bold text-muted-foreground/40 uppercase block mb-1">Impact Reduction</span>
                      <p className="text-xs font-black text-accent">{rec.expectedMitigation}%</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 relative z-10 transition-all duration-500 overflow-hidden">
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1 h-10 rounded-xl bg-primary hover:bg-primary/90 font-black text-[9px] uppercase tracking-widest gap-2"
                        onClick={() => alert(`Strategy Approved: ${rec.description}`)}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-10 px-4 rounded-xl border-white/5 bg-white/3 hover:bg-white/5 font-black text-[9px] uppercase tracking-widest"
                        onClick={() => alert(`RFQ Generated for ${supplier?.name}`)}
                      >
                        Generate RFQ
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 h-9 rounded-xl text-muted-foreground/40 hover:text-white hover:bg-white/5 font-black text-[8px] uppercase tracking-[0.2em]"
                        onClick={() => alert(`Recommendation Ignored: ${rec.description}`)}
                      >
                        Ignore Risk
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 px-4 rounded-xl text-muted-foreground/40 hover:text-white hover:bg-white/5 font-black text-[8px] uppercase tracking-[0.2em]"
                        onClick={() => alert(`Redirecting to manual editor for ${rec.id}`)}
                      >
                        Modify
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
