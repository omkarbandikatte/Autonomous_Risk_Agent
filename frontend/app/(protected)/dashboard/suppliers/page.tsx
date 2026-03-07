"use client";

import { MOCK_SUPPLIERS } from "@/lib/data/mock-suppliers";
import { Button } from "@/components/ui/button";
import { Users, MapPin, TrendingUp } from "lucide-react";

export default function SuppliersPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Suppliers</h1>
          <p className="text-muted-foreground">Manage supplier relationships and dependencies</p>
        </div>
        <Button>Add Supplier</Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Suppliers</p>
              <p className="text-2xl font-bold">{MOCK_SUPPLIERS.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Regions</p>
              <p className="text-2xl font-bold">
                {new Set(MOCK_SUPPLIERS.map((s) => s.location)).size}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">High Priority</p>
              <p className="text-2xl font-bold">
                {MOCK_SUPPLIERS.filter((s) => s.criticality === "high").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Supplier Table */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="p-6">
          <h2 className="font-semibold mb-4">Supplier Database</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Location</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Criticality</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Risk Score</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_SUPPLIERS.map((supplier) => (
                  <tr key={supplier.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{supplier.name}</p>
                        <p className="text-xs text-muted-foreground">{supplier.id}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{supplier.category}</td>
                    <td className="py-3 px-4">{supplier.location}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          supplier.criticality === "high"
                            ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                            : supplier.criticality === "medium"
                              ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200"
                              : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {supplier.criticality}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          supplier.status === "healthy"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                            : supplier.status === "at-risk"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {supplier.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              supplier.riskScore >= 60
                                ? "bg-red-500"
                                : supplier.riskScore >= 40
                                  ? "bg-orange-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${supplier.riskScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold">{supplier.riskScore}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
