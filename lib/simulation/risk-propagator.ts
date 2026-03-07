import { Supplier, DisruptionEvent, CascadingFailure } from "@/lib/types";

/**
 * Agent 3: Risk Propagator
 * Simulates cascading failures through the supply chain network
 */
export class RiskPropagatorAgent {
  /**
   * Simulate cascading failures from a disruption event
   */
  simulateCascadingFailures(
    suppliers: Supplier[],
    event: DisruptionEvent,
    initialFailedSuppliers: string[]
  ): CascadingFailure[] {
    const cascadingFailures: CascadingFailure[] = [];
    const failed = new Set<string>(initialFailedSuppliers);
    const queue: Array<{ id: string; depth: number }> = initialFailedSuppliers.map((id) => ({
      id,
      depth: 0,
    }));

    while (queue.length > 0) {
      const { id, depth } = queue.shift()!;

      const supplier = suppliers.find((s) => s.id === id);
      if (!supplier) continue;

      // Calculate time to failure for dependents
      supplier.dependents.forEach((dependentId) => {
        if (!failed.has(dependentId)) {
          // Probability of failure increases with depth and supplier risk
          const failureProbability =
            Math.min(0.95, 0.3 + depth * 0.15 + supplier.riskScore / 200);

          if (Math.random() < failureProbability) {
            failed.add(dependentId);

            const timeToFailure = Math.max(
              1,
              supplier.leadTime / 2 + Math.random() * supplier.leadTime
            );

            cascadingFailures.push({
              supplierId: dependentId,
              depth: depth + 1,
              impact: this.calculateImpact(supplier),
              timeToFailure,
            });

            queue.push({ id: dependentId, depth: depth + 1 });
          }
        }
      });
    }

    return cascadingFailures;
  }

  /**
   * Calculate impact multiplier based on supplier characteristics
   */
  private calculateImpact(supplier: Supplier): number {
    const criticalityFactor =
      supplier.criticality === "high"
        ? 1.0
        : supplier.criticality === "medium"
          ? 0.6
          : 0.3;

    const volumeFactor = Math.min(1.0, supplier.annualVolume / 5000000);
    const dependentFactor = Math.min(1.0, supplier.dependents.length / 10);

    return (
      (criticalityFactor * 0.5 + volumeFactor * 0.3 + dependentFactor * 0.2) *
      100
    );
  }

  /**
   * Get all affected suppliers at each time step
   */
  getAffectedSuppliersByTime(
    cascadingFailures: CascadingFailure[],
    timeStep: number
  ): string[] {
    return cascadingFailures
      .filter((f) => f.timeToFailure <= timeStep)
      .map((f) => f.supplierId);
  }

  /**
   * Calculate total duration of supply chain disruption
   */
  calculateRecoveryTime(
    cascadingFailures: CascadingFailure[],
    eventDuration: number
  ): number {
    if (cascadingFailures.length === 0) return eventDuration;

    const maxFailureTime = Math.max(...cascadingFailures.map((f) => f.timeToFailure), 0);
    const recoveryBuffer = Math.ceil(maxFailureTime / 7); // Recovery time is 1 week per month of disruption

    return eventDuration + recoveryBuffer;
  }

  /**
   * Simulate day-by-day impact over time
   */
  simulateDayByDay(
    suppliers: Supplier[],
    event: DisruptionEvent,
    initialFailedSuppliers: string[],
    maxDays: number = 180
  ): Array<{
    day: number;
    failedSuppliers: string[];
    affectedCount: number;
  }> {
    const cascadingFailures = this.simulateCascadingFailures(
      suppliers,
      event,
      initialFailedSuppliers
    );

    const results = [];
    const failedByDay = new Map<number, string[]>();

    // Group cascading failures by day
    cascadingFailures.forEach((failure) => {
      const day = Math.ceil(failure.timeToFailure);
      if (!failedByDay.has(day)) {
        failedByDay.set(day, []);
      }
      failedByDay.get(day)!.push(failure.supplierId);
    });

    const allFailed = new Set(initialFailedSuppliers);

    for (let day = 0; day <= maxDays; day++) {
      if (failedByDay.has(day)) {
        failedByDay.get(day)!.forEach((id) => allFailed.add(id));
      }

      results.push({
        day,
        failedSuppliers: Array.from(allFailed),
        affectedCount: allFailed.size,
      });

      // Check if recovery is complete
      if (day >= event.duration && allFailed.size === initialFailedSuppliers.length) {
        break;
      }
    }

    return results;
  }
}
