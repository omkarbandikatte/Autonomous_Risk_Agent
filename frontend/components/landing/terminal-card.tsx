"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const logs = [
    "INITIALIZING NEURAL CORE...",
    "SCANNING GLOBAL NODES...",
    "CONNECTING TO VERTEX API...",
    "ANALYZING RISK VECTORS...",
    "SYMMETRIC ENCRYPTION ENABLED",
    "AUTONOMOUS AGENT ACTIVE",
    "PROTOCOL INITIALIZED",
];

export function TerminalCard() {
    const [currentLogs, setCurrentLogs] = useState<string[]>([]);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setCurrentLogs(prev => [...prev.slice(-4), logs[i % logs.length]]);
            i++;
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-sm rounded-xl bg-black/80 border border-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl font-mono text-[10px] p-4 text-primary relative group">
            <div className="flex gap-1.5 mb-3 border-b border-white/5 pb-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                <div className="ml-auto text-[8px] opacity-30">agent.sh</div>
            </div>
            <div className="space-y-1">
                {currentLogs.map((log, idx) => (
                    <motion.div
                        key={idx + log}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-2"
                    >
                        <span className="text-muted-foreground/40">{">"}</span>
                        <span className={idx === currentLogs.length - 1 ? "text-primary brightness-150" : "opacity-60"}>
                            {log}
                        </span>
                    </motion.div>
                ))}
                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-3 bg-primary/40 inline-block ml-1"
                />
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
    );
}
