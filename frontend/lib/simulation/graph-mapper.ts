import { Supplier } from "@/lib/types";

interface SupplierNode {
  id: string;
  name: string;
  category: string;
  riskScore: number;
  criticality: string;
  status: string;
  location: string;
}

interface SupplyChainGraph {
  nodes: SupplierNode[];
  edges: Array<{ source: string; target: string; strength: number }>;
  clusters: Map<string, string[]>;
}

/**
 * Agent 2: Graph Mapper
 * Builds and analyzes the supply chain network graph
 */
export class GraphMapperAgent {
  /**
   * Build the supply chain network graph
   */
  buildGraph(suppliers: Supplier[]): SupplyChainGraph {
    const nodes: SupplierNode[] = suppliers.map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      riskScore: s.riskScore,
      criticality: s.criticality,
      status: s.status,
      location: s.location,
    }));

    // Build edges from dependencies
    const edges: Array<{ source: string; target: string; strength: number }> = [];
    const edgeSet = new Set<string>();

    suppliers.forEach((supplier) => {
      supplier.dependencies.forEach((depId) => {
        const key = `${depId}-${supplier.id}`;
        if (!edgeSet.has(key)) {
          edges.push({
            source: depId,
            target: supplier.id,
            strength: 1, // Can be weighted by criticality
          });
          edgeSet.add(key);
        }
      });
    });

    // Create clusters by location
    const clusters = new Map<string, string[]>();
    suppliers.forEach((s) => {
      if (!clusters.has(s.location)) {
        clusters.set(s.location, []);
      }
      clusters.get(s.location)!.push(s.id);
    });

    return { nodes, edges, clusters };
  }

  /**
   * Find all suppliers within N hops of a given supplier
   */
  getNeighbors(
    suppliers: Supplier[],
    supplierId: string,
    depth: number = 1
  ): string[] {
    const visited = new Set<string>();
    const queue: Array<{ id: string; depth: number }> = [{ id: supplierId, depth: 0 }];

    while (queue.length > 0) {
      const { id, depth: currentDepth } = queue.shift()!;

      if (visited.has(id) || currentDepth > depth) continue;
      visited.add(id);

      const supplier = suppliers.find((s) => s.id === id);
      if (!supplier) continue;

      // Add dependents (companies that depend on this supplier)
      supplier.dependents.forEach((depId) => {
        if (!visited.has(depId) && currentDepth < depth) {
          queue.push({ id: depId, depth: currentDepth + 1 });
        }
      });

      // Add dependencies (suppliers this company depends on)
      supplier.dependencies.forEach((depId) => {
        if (!visited.has(depId) && currentDepth < depth) {
          queue.push({ id: depId, depth: currentDepth + 1 });
        }
      });
    }

    visited.delete(supplierId);
    return Array.from(visited);
  }

  /**
   * Get supply chain tiers (depth levels from primary suppliers)
   */
  calculateSupplyChainTiers(suppliers: Supplier[]): Map<string, number> {
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

          if (depTiers.length === supplier.dependencies.length) {
            tiers.set(supplier.id, Math.max(...depTiers) + 1);
          }
        }
      });
    }

    // Assign remaining suppliers
    suppliers.forEach((s) => {
      if (!tiers.has(s.id)) {
        tiers.set(s.id, 2);
      }
    });

    return tiers;
  }

  /**
   * Identify single points of failure
   */
  identifyCriticalNodes(suppliers: Supplier[]): string[] {
    const criticalNodes: string[] = [];

    suppliers.forEach((supplier) => {
      // A supplier is critical if many other suppliers depend on it
      // and it has high criticality rating
      if (supplier.criticality === "high" && supplier.dependents.length >= 2) {
        criticalNodes.push(supplier.id);
      }
    });

    return criticalNodes;
  }
}
