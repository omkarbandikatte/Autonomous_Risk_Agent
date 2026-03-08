import { DisruptionEvent, Supplier } from "@/lib/types";

/**
 * Agent 1: Event Detection
 * Generates and triggers disruption events in the supply chain
 */
export class EventDetectorAgent {
  private eventId: number = 0;

  /**
   * Generate a new disruption event
   */
  generateEvent(config: {
    type: DisruptionEvent["type"];
    severity: DisruptionEvent["severity"];
    affectedRegion?: string;
    affectedSupplierId?: string;
  }): DisruptionEvent {
    this.eventId++;

    // Randomize duration and impact based on severity with some variance
    const baseDurations = {
      low: 7,
      medium: 14,
      high: 30,
      critical: 60,
    };

    const baseImpactRadii = {
      low: 1,
      medium: 2,
      high: 3,
      critical: 5,
    };

    // Add +/- 20% variance
    const variance = 0.8 + Math.random() * 0.4;
    const typeMultiplier = {
      "natural-disaster": 1.2,
      "political": 1.0,
      "economic": 0.8,
      "pandemic": 2.0,
      "supply-constraint": 0.5,
    }[config.type] || 1.0;

    const duration = Math.round(baseDurations[config.severity] * variance * typeMultiplier);
    const impactRadius = Math.round(baseImpactRadii[config.severity] * variance * (typeMultiplier > 1 ? 1.5 : 1));

    // If no region or supplier is specified, pick a random region (or a random supplier)
    let affectedRegion = config.affectedRegion;
    let affectedSupplierId = config.affectedSupplierId;

    if (!affectedRegion && !affectedSupplierId) {
      const regions = ["China", "Taiwan", "USA", "Germany", "Vietnam", "Japan", "Mexico"];
      affectedRegion = regions[Math.floor(Math.random() * regions.length)];
    }

    return {
      id: `EVT-${Date.now()}-${this.eventId}`,
      type: config.type,
      severity: config.severity,
      affectedRegion,
      affectedSupplierId,
      duration,
      timestamp: new Date(),
      impactRadius,
    };
  }

  /**
   * Identify suppliers affected by region
   */
  getAffectedSuppliersByRegion(
    suppliers: Supplier[],
    region: string
  ): Supplier[] {
    return suppliers.filter((s) => s.location === region);
  }

  /**
   * Get directly affected supplier
   */
  getAffectedSupplier(suppliers: Supplier[], id: string): Supplier | null {
    return suppliers.find((s) => s.id === id) || null;
  }
}
