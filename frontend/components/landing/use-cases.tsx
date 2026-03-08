"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const useCases = [
  {
    title: "Supply Chain Resilience Planning",
    description: "Before launching a new product, simulate potential disruptions to ensure your supplier network can handle unexpected events.",
    benefits: ["Identify critical vulnerabilities", "Plan for redundancy", "Reduce time-to-market risks"],
  },
  {
    title: "Supplier Risk Assessment",
    description: "Evaluate new suppliers and existing partnerships against various disruption scenarios to make data-driven sourcing decisions.",
    benefits: ["Quantify supplier risk", "Compare alternatives", "Negotiate better contracts"],
  },
  {
    title: "Geopolitical Risk Management",
    description: "Monitor and simulate the impact of geopolitical events on your supply chain to proactively mitigate exposure.",
    benefits: ["Track regional conflicts", "Diversify geographically", "Plan contingencies"],
  },
  {
    title: "Disaster Recovery Planning",
    description: "Test your supply chain's ability to recover from major disruptions and validate your continuity plans.",
    benefits: ["Test recovery scenarios", "Validate procedures", "Update protocols"],
  },
];

export function UseCases() {
  return (
    <section id="network" className="py-20 sm:py-32 px-4 sm:px-6 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tight px-4">Built for <span className="text-gradient">Strategic Entities</span></h2>
          <p className="text-base sm:text-lg text-muted-foreground/60 max-w-2xl mx-auto font-medium px-4">
            SupplyGuard serves the world's most complex supply chains with precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 rounded-4xl bg-white/3 border border-white/5 backdrop-blur-md hover:bg-white/5 transition-all duration-500 hover:scale-[1.02]"
            >
              <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">{useCase.title}</h3>
              <p className="text-muted-foreground/60 mb-8 font-medium leading-relaxed">{useCase.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {useCase.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="p-1 rounded-full bg-primary/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    </div>
                    <span className="text-xs font-bold text-muted-foreground/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
