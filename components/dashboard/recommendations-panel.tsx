"use client";

import { Recommendation, Supplier } from "@/lib/types";
import { CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RecommendationsPanelProps {
  recommendations: Recommendation[];
  suppliers: Supplier[];
}

export function RecommendationsPanel({ recommendations, suppliers }: RecommendationsPanelProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "supplier-diversification":
        return <AlertCircle className="w-4 h-4" />;
      case "inventory-reallocation":
        return <Lightbulb className="w-4 h-4" />;
      case "route-optimization":
        return <CheckCircle2 className="w-4 h-4" />;
      case "contract-renegotiation":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "supplier-diversification":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200";
      case "inventory-reallocation":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200";
      case "route-optimization":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200";
      case "contract-renegotiation":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/30";
      case "medium":
        return "border-orange-200 bg-orange-50/50 dark:border-orange-900 dark:bg-orange-950/30";
      case "low":
        return "border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/30";
      default:
        return "border-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          Mitigation Recommendations
        </h3>
      </div>

      <div className="space-y-3">
        {recommendations.slice(0, 5).map((rec) => {
          const supplier = suppliers.find((s) => s.id === rec.affectedSupplierId);

          return (
            <div
              key={rec.id}
              className={cn(
                "rounded-lg border-2 p-4 transition-colors",
                getPriorityColor(rec.priority)
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2 flex-1">
                  <div className="mt-1">{getTypeIcon(rec.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{rec.description}</h4>
                      <span className={cn("px-2 py-0.5 rounded text-xs font-semibold", getTypeBadgeColor(rec.type))}>
                        {rec.type.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                      </span>
                    </div>
                    {supplier && <p className="text-xs text-muted-foreground">{supplier.name}</p>}
                  </div>
                </div>
                <div className={cn("px-2 py-1 rounded text-xs font-semibold", {
                  "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200": rec.priority === "high",
                  "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200": rec.priority === "medium",
                  "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200": rec.priority === "low",
                })}>
                  {rec.priority.toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                <div>
                  <span className="text-muted-foreground">Est. Cost</span>
                  <p className="font-semibold">${(rec.estimatedCost / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Expected Mitigation</span>
                  <p className="font-semibold text-green-600">{rec.expectedMitigation}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">ROI</span>
                  <p className="font-semibold">≈ {Math.round((rec.expectedMitigation * 3))}</p>
                </div>
              </div>

              <div className="space-y-1 mb-3">
                {rec.actionItems.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Button size="sm" variant="outline" className="w-full text-xs">
                View Details
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
