import { Supplier, Recommendation, RiskMetric, CascadingFailure } from "@/lib/types";

/**
 * Agent 5: Mitigation Planner
 * Generates mitigation recommendations based on simulation results
 */
export class MitigationPlannerAgent {
  private recommendationId: number = 0;

  /**
   * Generate mitigation recommendations based on simulation results
   */
  generateRecommendations(
    suppliers: Supplier[],
    riskMetrics: RiskMetric[],
    failedSuppliers: string[],
    cascadingFailures: CascadingFailure[]
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // 1. Supplier Diversification Recommendations
    const highRiskSuppliers = riskMetrics
      .filter((m) => m.riskScore > 60)
      .sort((a, b) => b.riskScore - a.riskScore)
      .slice(0, 5);

    highRiskSuppliers.forEach((metric) => {
      const supplier = suppliers.find((s) => s.id === metric.supplierId);
      if (!supplier) return;

      recommendations.push({
        id: `REC-${++this.recommendationId}`,
        type: "supplier-diversification",
        priority: metric.riskScore > 75 ? "high" : "medium",
        affectedSupplierId: supplier.id,
        description: `Diversify sources for ${supplier.name}. Current risk score: ${metric.riskScore}. Consider adding backup suppliers in different regions.`,
        estimatedCost: (supplier.annualVolume / 1000000) * 2, // 2M per million in volume
        expectedMitigation: 30, // 30% risk reduction
        actionItems: [
          `Identify alternative suppliers in different regions`,
          `Evaluate alternative suppliers on risk metrics`,
          `Negotiate dual-source contracts`,
          `Implement inventory buffer for critical items`,
        ],
      });
    });

    // 2. Inventory Reallocation Recommendations
    const criticalCascadingSuppliers = cascadingFailures
      .filter((f) => f.depth >= 1 && f.impact > 20)
      .map((f) => f.supplierId)
      .filter((id, idx, arr) => arr.indexOf(id) === idx)
      .slice(0, 3);

    criticalCascadingSuppliers.forEach((supplierId) => {
      const supplier = suppliers.find((s) => s.id === supplierId);
      if (!supplier) return;

      recommendations.push({
        id: `REC-${++this.recommendationId}`,
        type: "inventory-reallocation",
        priority: "high",
        affectedSupplierId: supplier.id,
        description: `Increase safety stock for ${supplier.name}. This supplier is critical to downstream operations. Lead time: ${supplier.leadTime} days.`,
        estimatedCost: (supplier.annualVolume / 365) * (supplier.leadTime / 30) * 100, // Stock value
        expectedMitigation: 45, // 45% risk reduction
        actionItems: [
          `Calculate optimal safety stock levels (2x lead time)`,
          `Coordinate with warehouse management`,
          `Implement automated reorder points`,
          `Monitor inventory turnover`,
        ],
      });
    });

    // 3. Route Optimization Recommendations
    const logisticsSuppliers = suppliers.filter((s) => s.category === "Logistics");
    if (logisticsSuppliers.length < 3) {
      recommendations.push({
        id: `REC-${++this.recommendationId}`,
        type: "route-optimization",
        priority: "medium",
        affectedSupplierId: logisticsSuppliers[0]?.id || "SUP-007",
        description:
          "Diversify transportation routes and logistics providers to reduce single-point-of-failure risk.",
        estimatedCost: 500000, // General infrastructure cost
        expectedMitigation: 25,
        actionItems: [
          `Establish contracts with alternative logistics providers`,
          `Map backup transportation routes`,
          `Implement multi-modal transportation strategy`,
          `Set up real-time route monitoring`,
        ],
      });
    }

    // 4. Contract Renegotiation Recommendations
    const undiversifiedCategories = this.identifyUndiversifiedCategories(suppliers);
    undiversifiedCategories.forEach((category) => {
      const categorySuppliers = suppliers.filter((s) => s.category === category);
      const primarySupplier = categorySuppliers[0];

      if (primarySupplier) {
        recommendations.push({
          id: `REC-${++this.recommendationId}`,
          type: "contract-renegotiation",
          priority: "medium",
          affectedSupplierId: primarySupplier.id,
          description: `Renegotiate contract with ${primarySupplier.name} to include SLA terms for disruption scenarios and increase flexibility.`,
          estimatedCost: 100000, // Legal and negotiation costs
          expectedMitigation: 20,
          actionItems: [
            `Review current contract terms`,
            `Propose flexible delivery schedules`,
            `Add force majeure compensation clauses`,
            `Include price protection mechanisms`,
          ],
        });
      }
    });

    // Sort by priority and return top recommendations
    return recommendations
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
      .slice(0, 8); // Return top 8 recommendations
  }

  /**
   * Identify product categories with low diversification
   */
  private identifyUndiversifiedCategories(suppliers: Supplier[]): string[] {
    const categorySupplierCount = new Map<string, number>();

    suppliers.forEach((supplier) => {
      supplier.productCategories.forEach((category) => {
        categorySupplierCount.set(
          category,
          (categorySupplierCount.get(category) || 0) + 1
        );
      });
    });

    // Categories with only 1-2 suppliers are undiversified
    return Array.from(categorySupplierCount.entries())
      .filter(([_, count]) => count <= 2)
      .map(([category]) => category);
  }

  /**
   * Calculate recommendation effectiveness
   */
  calculateEffectiveness(
    recommendations: Recommendation[],
    financialImpact: number
  ): Array<{
    recommendation: Recommendation;
    roi: number;
    savingsPerYear: number;
  }> {
    return recommendations.map((rec) => {
      const potentialSavings = (financialImpact * rec.expectedMitigation) / 100;
      const roi = (potentialSavings - rec.estimatedCost) / rec.estimatedCost;

      return {
        recommendation: rec,
        roi: Math.round(roi * 100) / 100,
        savingsPerYear: Math.round(potentialSavings),
      };
    });
  }
}
