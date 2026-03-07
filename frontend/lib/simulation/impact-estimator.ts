import { Supplier, DisruptionEvent, CascadingFailure, RiskMetric, DashboardMetrics } from "@/lib/types";

/**
 * Agent 4: Impact Estimator
 * Calculates financial and operational impact of disruptions
 */
export class ImpactEstimatorAgent {
  /**
   * Calculate total financial impact in dollars
   */
  calculateFinancialImpact(
    suppliers: Supplier[],
    failedSuppliers: string[],
    durationDays: number
  ): number {
    let totalImpact = 0;

    failedSuppliers.forEach((supplierId) => {
      const supplier = suppliers.find((s) => s.id === supplierId);
      if (!supplier) return;

      // Daily cost = (annual volume * daily percentage) * cost multiplier
      const dailyCost = (supplier.annualVolume / 365) * (supplier.riskScore / 100) * 50; // $50 per unit when disrupted
      totalImpact += dailyCost * durationDays;
    });

    return Math.round(totalImpact);
  }

  /**
   * Calculate risk metrics for all suppliers
   */
  calculateRiskMetrics(suppliers: Supplier[]): RiskMetric[] {
    const riskMetrics: RiskMetric[] = [];

    // Calculate supply chain tiers
    const tiers = this.calculateSupplyChainTiers(suppliers);

    suppliers.forEach((supplier) => {
      // Risk score factors
      const baseRisk = supplier.riskScore;
      const tier = tiers.get(supplier.id) || 1;
      const tierMultiplier = Math.min(1.0, tier / 5); // Deeper in chain = higher risk

      // Vulnerability: concentration risk + dependency risk
      const dependencyCount = supplier.dependencies.length;
      const concentrationRisk = (supplier.dependents.length / suppliers.length) * 100;

      // Geopolitical risk based on location
      const geopoliticalRiskMap: Record<string, number> = {
        China: 75,
        "Saudi Arabia": 70,
        India: 45,
        Vietnam: 50,
        Mexico: 40,
        Taiwan: 65,
        USA: 20,
        Germany: 15,
        Japan: 20,
        Netherlands: 10,
        Sweden: 5,
        Belgium: 8,
        UK: 10,
        Singapore: 30,
        "South Korea": 35,
      };

      const geopoliticalRisk = geopoliticalRiskMap[supplier.location] || 40;

      riskMetrics.push({
        supplierId: supplier.id,
        riskScore: baseRisk + tierMultiplier * 10,
        vulnerabilityIndex: Math.min(100, baseRisk * 0.6 + dependencyCount * 8),
        concentrationRisk,
        geopoliticalRisk,
        financialImpact: (supplier.annualVolume / 1000000) * 10, // Millions of dollars
        supplyChainTier: tier,
      });
    });

    return riskMetrics;
  }

  /**
   * Calculate overall supply chain metrics
   */
  calculateDashboardMetrics(
    suppliers: Supplier[],
    riskMetrics: RiskMetric[]
  ): DashboardMetrics {
    const avgRiskScore = riskMetrics.reduce((sum, m) => sum + m.riskScore, 0) / riskMetrics.length;
    const criticalSuppliersAtRisk = suppliers.filter(
      (s) => s.criticality === "high" && s.riskScore > 50
    ).length;

    // Calculate diversification index (0-100, higher is better)
    const locationCount = new Set(suppliers.map((s) => s.location)).size;
    const categoryCount = new Set(suppliers.map((s) => s.category)).size;
    const diversificationIndex = Math.min(100, (locationCount + categoryCount) * 5);

    // Calculate health score (0-100, higher is better)
    const healthScore = Math.max(0, 100 - avgRiskScore * 0.8);

    // Calculate resilience (based on network redundancy)
    const avgDependents = suppliers.reduce((sum, s) => sum + s.dependents.length, 0) / suppliers.length;
    const resilience = Math.min(100, avgDependents * 15 + (100 - healthScore) * 0.3);

    const financialExposure = riskMetrics.reduce((sum, m) => sum + m.financialImpact, 0);

    return {
      overallHealthScore: Math.round(healthScore),
      averageRiskScore: Math.round(avgRiskScore),
      criticalSuppliersAtRisk,
      estimatedFinancialExposure: Math.round(financialExposure * 1000000), // Convert to dollars
      supplyChainResilience: Math.round(resilience),
      diversificationIndex: Math.round(diversificationIndex),
    };
  }

  /**
   * Calculate supply chain tiers (depth from primary suppliers)
   */
  private calculateSupplyChainTiers(suppliers: Supplier[]): Map<string, number> {
    const tiers = new Map<string, number>();

    // Primary suppliers (no dependencies)
    const primarySuppliers = suppliers.filter((s) => s.dependencies.length === 0);
    primarySuppliers.forEach((s) => tiers.set(s.id, 1));

    // Calculate tiers iteratively
    let currentTier = 1;
    while (tiers.size < suppliers.length && currentTier < 10) {
      currentTier++;
      suppliers.forEach((supplier) => {
        if (!tiers.has(supplier.id)) {
          const depTiers = supplier.dependencies
            .map((depId) => tiers.get(depId))
            .filter((t) => t !== undefined) as number[];

          if (depTiers.length === supplier.dependencies.length && depTiers.length > 0) {
            tiers.set(supplier.id, Math.max(...depTiers) + 1);
          }
        }
      });
    }

    suppliers.forEach((s) => {
      if (!tiers.has(s.id)) {
        tiers.set(s.id, 2);
      }
    });

    return tiers;
  }

  /**
   * Estimate cost savings from a mitigation strategy
   */
  estimateMitigationBenefit(
    currentImpact: number,
    mitigationStrength: number // 0-1, where 1 is 100% mitigation
  ): number {
    return Math.round(currentImpact * mitigationStrength);
  }
}
