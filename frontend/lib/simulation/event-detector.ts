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

    const durationMap = {
      low: 7,
      medium: 21,
      high: 60,
      critical: 120,
    };

    const impactRadiusMap = {
      low: 1,
      medium: 3,
      high: 7,
      critical: 15,
    };

    return {
      id: `EVT-${Date.now()}-${this.eventId}`,
      type: config.type,
      severity: config.severity,
      affectedRegion: config.affectedRegion,
      affectedSupplierId: config.affectedSupplierId,
      duration: durationMap[config.severity],
      timestamp: new Date(),
      impactRadius: impactRadiusMap[config.severity],
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
