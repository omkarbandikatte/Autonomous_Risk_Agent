"use client";

import { ShieldCheck, Lock, Fingerprint, Key, AlertTriangle, Database } from "lucide-react";
import { motion } from "framer-motion";

const securityFeatures = [
    {
        title: "Immutable Pedigree",
        description: "Zero-trust verification for every tier of your supplier network.",
        icon: Fingerprint
    },
    {
        title: "Self-Executing Protocols",
        description: "Active risk mitigation through secure autonomous contracts.",
        icon: Key
    },
    {
        title: "Neural Perimeter",
        description: "AI-driven firewall against geopolitical and financial volatility.",
        icon: ShieldCheck
    },
    {
        title: "Disruption Shield",
        description: "Resilient infrastructure with multi-node redundancy by default.",
        icon: Lock
    }
];

export function SecuritySection() {
    return (
        <section id="security" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-black/5">
            <div className="max-w-6xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center gap-10 mb-20"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
                        Advanced <span className="text-gradient">Security</span>
                    </h2>
                    <p className="text-lg text-muted-foreground/50 max-w-2xl font-medium leading-relaxed">
                        Precision-engineered security protocols to ensure your supply chain
                        operates within a fortress of trust and reliability.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {securityFeatures.map((sec, idx) => {
                        const Icon = sec.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="group p-8 rounded-4xl bg-white/2 border border-white/5 backdrop-blur-3xl hover:bg-white/5 transition-all text-left"
                            >
                                <div className="mb-6 inline-flex p-4 rounded-2xl bg-accent/10 group-hover:bg-accent/20 transition-all group-hover:scale-110">
                                    <Icon className="w-6 h-6 text-accent" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-accent transition-colors">
                                    {sec.title}
                                </h3>
                                <p className="text-sm text-muted-foreground/40 leading-relaxed font-bold tracking-tight">
                                    {sec.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Mock Security Visual */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="mt-32 max-w-4xl mx-auto p-12 rounded-[3.5rem] bg-linear-to-b from-white/3 to-transparent border border-white/5 backdrop-blur-3xl overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -ml-32 -mb-32" />

                    <div className="flex flex-col gap-10 items-center">
                        <div className="flex items-center gap-10 opacity-30">
                            <Database className="w-10 h-10" />
                            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                            <div className="p-8 rounded-full border border-white/10 bg-white/5 relative">
                                <div className="absolute inset-0 rounded-full border border-accent/40 animate-ping opacity-20" />
                                <ShieldCheck className="w-12 h-12 text-accent" />
                            </div>
                            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                            <AlertTriangle className="w-10 h-10" />
                        </div>
                        <div className="flex flex-col gap-4 text-center relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent/60">Automated Protocol Enforcement</span>
                            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground/30">
                                <span>[SEC.VERIFIED]</span>
                                <span className="w-2 h-2 rounded-full bg-green-500/40" />
                                <span>SYSTEM STATUS: OPTIMAL</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
