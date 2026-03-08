"use client";

import { RiskMetricsPanel } from "@/components/dashboard/risk-metrics-panel";
import { MOCK_SUPPLIERS } from "@/lib/data/mock-suppliers";
import { simulationEngine } from "@/lib/simulation/simulation-engine";
import {
  RiskDistributionChart,
  TopRiskySuppliersChart,
  RiskByCategoryChart,
  RiskTrendChart,
  RiskRadarChart
} from "@/components/dashboard/risk-charts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, ShieldCheck, Activity } from "lucide-react";

export default function AnalysisPage() {
  const riskMetrics = simulationEngine.getRiskMetrics(MOCK_SUPPLIERS);

  // Calculate aggregate stats
  const highRiskCount = MOCK_SUPPLIERS.filter((s) => s.riskScore >= 70).length;
  const mediumRiskCount = MOCK_SUPPLIERS.filter((s) => s.riskScore >= 40 && s.riskScore < 70).length;
  const lowRiskCount = MOCK_SUPPLIERS.filter((s) => s.riskScore < 40).length;
  const avgRiskScore = Math.round(MOCK_SUPPLIERS.reduce((acc, s) => acc + s.riskScore, 0) / MOCK_SUPPLIERS.length);

  return (
    <div className="space-y-8 p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gradient">Risk Analysis</h1>
          <p className="text-muted-foreground text-lg">Predictive risk modeling and supply chain vulnerability assessment.</p>
        </div>
        <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-2 px-4 h-fit">
          <Activity className="w-4 h-4 text-accent animate-pulse" />
          <span className="text-sm font-medium">Real-time Analysis Active</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass group hover:glow-purple transition-all duration-500 border-none shadow-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-red-500/10 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <Badge variant="outline" className="text-red-500 border-red-500/20 bg-red-500/5 px-2 py-0.5 rounded-full">Critical</Badge>
            </div>
            <p className="text-4xl font-bold">0{highRiskCount}</p>
            <p className="text-sm text-muted-foreground mt-1">High Risk Suppliers</p>
          </CardContent>
        </Card>

        <Card className="glass group hover:glow-purple transition-all duration-500 border-none shadow-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-orange-500/10 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
              </div>
              <Badge variant="outline" className="text-orange-500 border-orange-500/20 bg-orange-500/5 px-2 py-0.5 rounded-full">Elevated</Badge>
            </div>
            <p className="text-4xl font-bold">{mediumRiskCount < 10 ? `0${mediumRiskCount}` : mediumRiskCount}</p>
            <p className="text-sm text-muted-foreground mt-1">Medium Risk Suppliers</p>
          </CardContent>
        </Card>

        <Card className="glass group hover:glow-cyan transition-all duration-500 border-none shadow-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-green-500/10 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-green-500" />
              </div>
              <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/5 px-2 py-0.5 rounded-full">Stable</Badge>
            </div>
            <p className="text-4xl font-bold">{lowRiskCount < 10 ? `0${lowRiskCount}` : lowRiskCount}</p>
            <p className="text-sm text-muted-foreground mt-1">Low Risk Suppliers</p>
          </CardContent>
        </Card>

        <Card className="glass group hover:glow-purple transition-all duration-500 border-none shadow-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 rounded-xl">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-2 py-0.5 rounded-full">Index</Badge>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-4xl font-bold">{avgRiskScore}</p>
              <p className="text-xs text-green-500 font-medium mb-1.5">+2.4%</p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Global Health Index</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass lg:col-span-2 overflow-hidden border-none shadow-2xl relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Network Risk Velocity
            </CardTitle>
            <CardDescription>Aggregate predictive risk trend across the supply network</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <RiskTrendChart />
          </CardContent>
        </Card>

        <Card className="glass overflow-hidden border-none shadow-2xl relative">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -ml-16 -mb-16" />
          <CardHeader>
            <CardTitle>Health Distribution</CardTitle>
            <CardDescription>Current status segmentation</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <RiskDistributionChart suppliers={MOCK_SUPPLIERS} />
          </CardContent>
        </Card>
      </div>

      {/* Secondary Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass overflow-hidden border-none shadow-2xl">
          <CardHeader>
            <CardTitle>Risk Dimensions</CardTitle>
            <CardDescription>Multi-factor risk assessment</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <RiskRadarChart riskMetrics={riskMetrics} suppliers={MOCK_SUPPLIERS} />
          </CardContent>
        </Card>

        <Card className="glass overflow-hidden border-none shadow-2xl">
          <CardHeader>
            <CardTitle>Critical Exposure</CardTitle>
            <CardDescription>Highest risk individual suppliers</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <TopRiskySuppliersChart suppliers={MOCK_SUPPLIERS} />
          </CardContent>
        </Card>

        <Card className="glass overflow-hidden border-none shadow-2xl">
          <CardHeader>
            <CardTitle>Sector Vulnerability</CardTitle>
            <CardDescription>Average risk per product category</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <RiskByCategoryChart suppliers={MOCK_SUPPLIERS} />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Data Section */}
      <Card className="glass overflow-hidden border-none shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
          <div>
            <CardTitle>Supplier Vulnerability Deep-Dive</CardTitle>
            <CardDescription>Granular risk metrics and exposure assessment per supplier</CardDescription>
          </div>
          <Badge variant="outline" className="px-3 py-1 rounded-full border-white/10 bg-white/5">
            {MOCK_SUPPLIERS.length} Entities Analyzed
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <RiskMetricsPanel riskMetrics={riskMetrics} suppliers={MOCK_SUPPLIERS} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
