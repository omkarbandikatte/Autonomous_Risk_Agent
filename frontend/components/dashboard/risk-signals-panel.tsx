"use client";

import { motion } from "framer-motion";
import { AlertCircle, CloudRain, Newspaper, Globe, Info, Zap } from "lucide-react";

const signals = [
    {
        id: 1,
        type: "Weather",
        icon: CloudRain,
        title: "Typhoon Approaching Shenzhen",
        description: "Expected landfall in 48 hours. Port operations may be suspended.",
        confidence: 0.94,
        impactLevel: "High",
        affectedNodes: ["SZ-Manufacturing-01", "HK-Port-Main"],
        timestamp: "2 minutes ago",
    },
    {
        id: 2,
        type: "Logistics",
        icon: Zap,
        title: "Port Congestion: Los Angeles",
        description: "Average dwell time increased by 15.6% due to labor shortage.",
        confidence: 0.88,
        impactLevel: "Medium",
        affectedNodes: ["LAX-Logistics-Hub"],
        timestamp: "14 minutes ago",
    },
    {
        id: 3,
        type: "Geopolitical",
        icon: Globe,
        title: "Trade Policy Update (EU/CN)",
        description: "New tariffs on lithium-ion batteries may trigger price volatility.",
        confidence: 0.72,
        impactLevel: "Low",
        affectedNodes: ["CN-Materials-Supplier-A"],
        timestamp: "1 hour ago",
    },
];

export function RiskSignalsPanel() {
    return (
        <div className="rounded-4xl bg-white/2 border border-white/5 backdrop-blur-3xl p-8 h-full flex flex-col shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-20">
                <RadioIcon className="w-24 h-24 text-primary animate-pulse" />
            </div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                        <Newspaper className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-black tracking-tight">External Risk Signals</h2>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                    <div className="w-1 h-1 rounded-full bg-accent shadow-glow-cyan animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-accent">Monitoring Live</span>
                </div>
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar relative z-10">
                {signals.map((signal, idx) => (
                    <motion.div
                        key={signal.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-5 rounded-3xl bg-white/3 border border-white/5 hover:bg-white/5 transition-all duration-300 relative group/item"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                                    <signal.icon className="w-3.5 h-3.5 text-muted-foreground/60" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">{signal.type}</span>
                            </div>
                            <span className="text-[8px] font-bold text-muted-foreground/20 italic">{signal.timestamp}</span>
                        </div>

                        <h3 className="text-sm font-bold mb-1 group-hover/item:text-primary transition-colors">{signal.title}</h3>
                        <p className="text-[11px] text-muted-foreground/40 font-medium leading-relaxed mb-4 line-clamp-2">{signal.description}</p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/2">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-black uppercase tracking-[0.2em] text-muted-foreground/30 mb-1">Impact</span>
                                    <span className={cn(
                                        "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                                        signal.impactLevel === "High" ? "bg-red-500/20 text-red-500" :
                                            signal.impactLevel === "Medium" ? "bg-orange-500/20 text-orange-500" : "bg-green-500/20 text-green-500"
                                    )}>
                                        {signal.impactLevel}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-black uppercase tracking-[0.2em] text-muted-foreground/30 mb-1">Confidence</span>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-white/80">{(signal.confidence * 100).toFixed(0)}%</span>
                                </div>
                            </div>
                            <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 border border-white/5 hover:bg-primary/20 hover:border-primary/20 transition-all">
                                <Info className="w-3.5 h-3.5 text-muted-foreground/60 hover:text-white" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/3 relative z-10">
                <button className="w-full h-12 rounded-2xl bg-white/3 border border-white/5 font-black text-[9px] uppercase tracking-widest hover:bg-white/5 transition-all text-muted-foreground/40 hover:text-white group/btn">
                    View All Analyzed Feed <span className="inline-block group-hover/btn:translate-x-1 transition-transform ml-1">→</span>
                </button>
            </div>
        </div>
    );
}

function RadioIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" /><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4" /><circle cx="12" cy="12" r="2" /><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4" /><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1" />
        </svg>
    );
}

const cn = (...classes: any) => classes.filter(Boolean).join(' ');
