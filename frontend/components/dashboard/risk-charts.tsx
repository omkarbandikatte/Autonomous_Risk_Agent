"use client";

import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    AreaChart,
    Area,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
} from "recharts";
import { Supplier, RiskMetric } from "@/lib/types";

interface RiskChartsProps {
    suppliers: Supplier[];
    riskMetrics?: RiskMetric[];
}

const COLORS = {
    high: "#ef4444", // red-500
    medium: "#f97316", // orange-500
    low: "#22c55e", // green-500
    primary: "#7C3AED", // purple-600
    accent: "#22D3EE", // cyan-400
};

export const RiskDistributionChart: React.FC<RiskChartsProps> = ({ suppliers }) => {
    const data = [
        { name: "High Risk", value: suppliers.filter((s) => s.riskScore >= 70).length, color: COLORS.high },
        { name: "Medium Risk", value: suppliers.filter((s) => s.riskScore >= 40 && s.riskScore < 70).length, color: COLORS.medium },
        { name: "Low Risk", value: suppliers.filter((s) => s.riskScore < 40).length, color: COLORS.low },
    ].filter(d => d.value > 0);

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                        itemStyle={{ color: "#fff" }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export const TopRiskySuppliersChart: React.FC<RiskChartsProps> = ({ suppliers }) => {
    const data = [...suppliers]
        .sort((a, b) => b.riskScore - a.riskScore)
        .slice(0, 6)
        .map(s => ({
            name: s.name.length > 15 ? s.name.substring(0, 12) + "..." : s.name,
            score: s.riskScore,
        }));

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ left: 40, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="name"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                    />
                    <Tooltip
                        cursor={{ fill: "rgba(255,255,255,0.05)" }}
                        contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                    />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.score >= 70 ? COLORS.high : entry.score >= 40 ? COLORS.medium : COLORS.low} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export const RiskByCategoryChart: React.FC<RiskChartsProps> = ({ suppliers }) => {
    const categories = Array.from(new Set(suppliers.map(s => s.category)));
    const data = categories.map(cat => ({
        name: cat,
        avgRisk: Math.round(suppliers.filter(s => s.category === cat).reduce((acc, s) => acc + s.riskScore, 0) / suppliers.filter(s => s.category === cat).length),
    })).sort((a, b) => b.avgRisk - a.avgRisk);

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} />
                    <Tooltip
                        cursor={{ fill: "rgba(255,255,255,0.05)" }}
                        contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                    />
                    <Bar dataKey="avgRisk" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export const RiskTrendChart: React.FC = () => {
    // Generate mock historical trend data
    const data = [
        { month: 'Oct', risk: 45, confidence: 85 },
        { month: 'Nov', risk: 42, confidence: 82 },
        { month: 'Dec', risk: 48, confidence: 78 },
        { month: 'Jan', risk: 55, confidence: 70 },
        { month: 'Feb', risk: 52, confidence: 75 },
        { month: 'Mar', risk: 58, confidence: 72 },
    ];

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="risk"
                        stroke={COLORS.primary}
                        fillOpacity={1}
                        fill="url(#colorRisk)"
                        strokeWidth={3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export const RiskRadarChart: React.FC<RiskChartsProps> = ({ riskMetrics = [] }) => {
    if (!riskMetrics.length) return null;

    // Aggregate metrics
    const avgConcentration = riskMetrics.reduce((acc, m) => acc + m.concentrationRisk, 0) / riskMetrics.length;
    const avgGeopolitical = riskMetrics.reduce((acc, m) => acc + m.geopoliticalRisk, 0) / riskMetrics.length;
    const avgVulnerability = riskMetrics.reduce((acc, m) => acc + m.vulnerabilityIndex, 0) / riskMetrics.length;
    const avgTierImpact = riskMetrics.reduce((acc, m) => acc + (m.supplyChainTier / 3), 0) / riskMetrics.length;

    const data = [
        { subject: 'Concentration', A: avgConcentration * 100, fullMark: 100 },
        { subject: 'Geopolitical', A: avgGeopolitical * 100, fullMark: 100 },
        { subject: 'Vulnerability', A: avgVulnerability * 100, fullMark: 100 },
        { subject: 'Tiers', A: avgTierImpact * 100, fullMark: 100 },
        { subject: 'Financial', A: 45, fullMark: 100 }, // Mock aggregate
    ];

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }} />
                    <PolarRadiusAxis hide />
                    <Radar
                        name="Average Risk"
                        dataKey="A"
                        stroke={COLORS.accent}
                        fill={COLORS.accent}
                        fillOpacity={0.6}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};
