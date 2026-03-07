/**
 * Supply Chain Risk Simulation Types
 */

export interface Supplier {
  id: string;
  name: string;
  category: string;
  location: string;
  riskScore: number;
  criticality: "high" | "medium" | "low";
  status: "healthy" | "at-risk" | "disrupted";
  dependents: string[];
  dependencies: string[];
  productCategories: string[];
  annualVolume: number;
  leadTime: number;
}

export interface DisruptionEvent {
  id: string;
  type: "natural-disaster" | "political" | "economic" | "pandemic" | "supply-constraint";
  severity: "low" | "medium" | "high" | "critical";
  affectedRegion?: string;
  affectedSupplierId?: string;
  duration: number; // in days
  timestamp: Date;
  impactRadius: number; // number of suppliers affected
}

export interface RiskMetric {
  supplierId: string;
  riskScore: number;
  vulnerabilityIndex: number;
  concentrationRisk: number;
  geopoliticalRisk: number;
  financialImpact: number;
  supplyChainTier: number;
}

export interface SimulationState {
  isRunning: boolean;
  currentEvent: DisruptionEvent | null;
  affectedSuppliers: string[];
  totalImpact: number;
  estimatedRecoveryTime: number;
  cascadingFailures: CascadingFailure[];
  recommendations: Recommendation[];
  timeline: SimulationTimestep[];
}

export interface CascadingFailure {
  supplierId: string;
  depth: number; // how many hops from initial failure
  impact: number;
  timeToFailure: number; // in days
}

export interface Recommendation {
  id: string;
  type: "supplier-diversification" | "inventory-reallocation" | "route-optimization" | "contract-renegotiation";
  priority: "high" | "medium" | "low";
  affectedSupplierId: string;
  description: string;
  estimatedCost: number;
  expectedMitigation: number; // percentage reduction in risk
  actionItems: string[];
}

export interface SimulationTimestep {
  day: number;
  activeDisruptions: DisruptionEvent[];
  failedSuppliers: string[];
  cumulativeImpact: number;
  recoveredSuppliers: string[];
}

export interface DashboardMetrics {
  overallHealthScore: number;
  averageRiskScore: number;
  criticalSuppliersAtRisk: number;
  estimatedFinancialExposure: number;
  supplyChainResilience: number;
  diversificationIndex: number;
}

export interface MenuItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}
