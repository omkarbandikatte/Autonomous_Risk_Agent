"use client";

import { BarChart3, PieChart, Activity, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
    {
        title: "Predictive Risk Modeling",
        value: "99.2%",
        description: "Accuracy in predicting regional disruption events before they affect tier-1 suppliers.",
        icon: Activity
    },
    {
        title: "Response Velocity",
        value: "1.4s",
        description: "Mean time to compute cascading failure impact across 10,000+ global nodes.",
        icon: Zap
    },
    {
        title: "Recovery Optimization",
        value: "45%",
        description: "Average reduction in estimated recovery time through AI-driven alternative sourcing.",
        icon: TrendingUp
    }
];

export function AnalyticsSection() {
    return (
        <section id="analytics" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 tracking-tight leading-[1.1]">
                            Neural <span className="text-gradient">Analytics</span>
                        </h2>
                        <p className="text-lg text-muted-foreground/60 mb-12 font-medium leading-relaxed max-w-xl">
                            Our autonomous analytics engine processes billions of telemetry points to provide
                            surgical precision in risk assessment and mitigation planning.
                        </p>

                        <div className="space-y-6">
                            {metrics.map((metric, idx) => {
                                const Icon = metric.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                        className="flex gap-6 p-6 rounded-3xl bg-white/3 border border-white/5 backdrop-blur-md group hover:bg-white/5 transition-all"
                                    >
                                        <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors h-fit">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-bold text-foreground">{metric.title}</h3>
                                                <span className="text-xs font-black text-primary px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20">{metric.value}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground/50 font-medium">{metric.description}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: "spring" }}
                        className="relative"
                    >
                        {/* Mock Dashboard Visual */}
                        <div className="relative aspect-square rounded-full border border-white/5 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center group overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent_70%)] group-hover:scale-150 transition-transform duration-1000" />
                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <BarChart3 className="w-24 h-24 text-primary animate-pulse" />
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 10 }}
                                            animate={{ height: [10, 40, 20, 60, 10] }}
                                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                                            className="w-2 bg-primary/40 rounded-full"
                                        />
                                    ))}
                                </div>
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/40">Real-time Telemetry</span>
                            </div>

                            {/* Satellite data points */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                className="absolute inset-0 border-[1px] border-dashed border-white/10 rounded-full m-12"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                                className="absolute inset-0 border-[1px] border-dashed border-white/10 rounded-full m-32"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
