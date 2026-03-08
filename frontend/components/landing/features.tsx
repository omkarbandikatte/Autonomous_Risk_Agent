"use client";

import { Cpu, Globe, Database, Fingerprint, Network, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Cpu,
    title: "Neural Real-Time Core",
    description: "Multi-modal orchestration engine for instant supply chain scenario analysis.",
  },
  {
    icon: Globe,
    title: "Global Node Mapping",
    description: "Deep mapping of multi-tier supplier connections and geographical risk hotspots.",
  },
  {
    icon: Network,
    title: "Autonomous Logistics",
    description: "AI agents that proactively adjust routing and inventory based on streaming data.",
  },
  {
    icon: Database,
    title: "Quantum Forecasting",
    description: "Precision analytics that predict disruptions weeks before they manifest.",
  },
  {
    icon: ShieldCheck,
    title: "Protocol Enforcement",
    description: "Smart contracts that automatically execute pre-approved risk mitigation strategies.",
  },
  {
    icon: Fingerprint,
    title: "Trust Verification",
    description: "Blockchain-backed pedigree for total transparency across your supply chain.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

import { TerminalCard } from "@/components/landing/terminal-card";

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-32 px-4 sm:px-6 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-24 flex flex-col items-center gap-10"
        >
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 tracking-tight px-4 leading-[1.1]">System <span className="text-gradient hover:scale-105 transition-transform inline-block">Capabilities</span></h2>
            <p className="text-base sm:text-lg text-muted-foreground/50 max-w-2xl mx-auto font-medium px-4">
              Advanced neural-orchestration for proactive supply chain resilience and risk mitigation.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden sm:block"
          >
            <TerminalCard />
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                style={{ transformStyle: "preserve-3d" }}
                className="group flex flex-col items-start p-8 rounded-4xl bg-white/2 border border-white/5 backdrop-blur-3xl hover:bg-white/5 transition-all duration-700 hover:[transform:rotateY(10deg)_rotateX(-5deg)_translateZ(20px)] relative overflow-hidden"
              >
                {/* Neural Node Indicator in corner */}
                <div className="absolute top-4 right-4 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse shadow-glow-purple" />
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-pulse delay-75 shadow-glow-cyan" />
                </div>

                <div className="mb-8 inline-flex p-5 rounded-2xl bg-linear-to-tr from-primary/10 to-accent/10 border border-white/5 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-500 group-hover:scale-110 group-hover:[transform:translateZ(40px)]">
                  <Icon className="w-8 h-8 text-primary/80 transition-colors group-hover:text-primary" />
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tighter group-hover:text-primary transition-colors group-hover:[transform:translateZ(30px)]">{feature.title}</h3>
                <p className="text-muted-foreground/40 leading-relaxed font-bold text-sm tracking-tight group-hover:[transform:translateZ(20px)] transition-all delay-75 group-hover:text-muted-foreground/60">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Local background element removed as it's now in DynamicBackground */}
    </section>
  );
}
