import { Supplier, DisruptionEvent, SimulationState, Recommendation, RiskMetric } from "@/lib/types";
import { EventDetectorAgent } from "./event-detector";
import { GraphMapperAgent } from "./graph-mapper";
import { RiskPropagatorAgent } from "./risk-propagator";
import { ImpactEstimatorAgent } from "./impact-estimator";
import { MitigationPlannerAgent } from "./mitigation-planner";

/**
 * Simulation Engine Orchestrator
 * Coordinates all 5 agents to run a complete supply chain simulation
 */
export class SupplyChainSimulationEngine {
  private eventDetector: EventDetectorAgent;
  private graphMapper: GraphMapperAgent;
  private riskPropagator: RiskPropagatorAgent;
  private impactEstimator: ImpactEstimatorAgent;
  private mitigationPlanner: MitigationPlannerAgent;

  constructor() {
    this.eventDetector = new EventDetectorAgent();
    this.graphMapper = new GraphMapperAgent();
    this.riskPropagator = new RiskPropagatorAgent();
    this.impactEstimator = new ImpactEstimatorAgent();
    this.mitigationPlanner = new MitigationPlannerAgent();
  }

  /**
   * Run a complete supply chain simulation
   */
  runSimulation(
    suppliers: Supplier[],
    eventConfig: {
      type: DisruptionEvent["type"];
      severity: DisruptionEvent["severity"];
      affectedRegion?: string;
      affectedSupplierId?: string;
    }
  ): SimulationState {
    // Step 1: Generate disruption event
    const event = this.eventDetector.generateEvent(eventConfig);

    // Step 2: Build supply chain graph
    const graph = this.graphMapper.buildGraph(suppliers);

    // Step 3: Determine initial affected suppliers
    let initialFailedSuppliers: string[] = [];
    if (event.affectedSupplierId) {
      initialFailedSuppliers = [event.affectedSupplierId];
    } else if (event.affectedRegion) {
      const affectedByRegion = this.eventDetector.getAffectedSuppliersByRegion(
        suppliers,
        event.affectedRegion
      );
      initialFailedSuppliers = affectedByRegion.map((s) => s.id);
    }

    // Step 4: Simulate cascading failures
    const cascadingFailures = this.riskPropagator.simulateCascadingFailures(
      suppliers,
      event,
      initialFailedSuppliers
    );

    const allFailedSuppliers = [
      ...initialFailedSuppliers,
      ...cascadingFailures.map((f) => f.supplierId),
    ];

    // Step 5: Calculate impact
    const financialImpact = this.impactEstimator.calculateFinancialImpact(
      suppliers,
      allFailedSuppliers,
      event.duration
    );

    const riskMetrics = this.impactEstimator.calculateRiskMetrics(suppliers);

    // Step 6: Generate recommendations
    const recommendations = this.mitigationPlanner.generateRecommendations(
      suppliers,
      riskMetrics,
      allFailedSuppliers,
      cascadingFailures
    );

    // Step 7: Generate timeline
    const timeline = this.riskPropagator.simulateDayByDay(
      suppliers,
      event,
      initialFailedSuppliers,
      180
    );

    const recoveryTime = this.riskPropagator.calculateRecoveryTime(
      cascadingFailures,
      event.duration
    );

    return {
      isRunning: false,
      currentEvent: event,
      affectedSuppliers: allFailedSuppliers,
      totalImpact: financialImpact,
      estimatedRecoveryTime: recoveryTime,
      cascadingFailures,
      recommendations,
      timeline: timeline.map((step) => ({
        day: step.day,
        activeDisruptions: step.day <= event.duration ? [event] : [],
        failedSuppliers: step.failedSuppliers,
        cumulativeImpact: Math.round(
          (step.affectedCount / suppliers.length) * financialImpact
        ),
        recoveredSuppliers: [],
      })),
    };
  }

  /**
   * Get all risk metrics for the supply chain
   */
  getRiskMetrics(suppliers: Supplier[]): RiskMetric[] {
    return this.impactEstimator.calculateRiskMetrics(suppliers);
  }

  /**
   * Get dashboard metrics
   */
  getDashboardMetrics(suppliers: Supplier[]) {
    const riskMetrics = this.getRiskMetrics(suppliers);
    return this.impactEstimator.calculateDashboardMetrics(suppliers, riskMetrics);
  }

  /**
   * Get supply chain graph
   */
  getSupplyChainGraph(suppliers: Supplier[]) {
    return this.graphMapper.buildGraph(suppliers);
  }

  /**
   * Get critical nodes in the network
   */
  getCriticalNodes(suppliers: Supplier[]): string[] {
    return this.graphMapper.identifyCriticalNodes(suppliers);
  }
}

// Singleton instance
export const simulationEngine = new SupplyChainSimulationEngine();
