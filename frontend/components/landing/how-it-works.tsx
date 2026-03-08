"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Map Your Network",
    description: "Input your supplier data and dependencies. SupplyGuard builds an interactive network graph of your entire supply chain.",
  },
  {
    number: 2,
    title: "Set Risk Parameters",
    description: "Define your risk tolerance, supplier criticality levels, and business impact thresholds for different scenarios.",
  },
  {
    number: 3,
    title: "Run Simulations",
    description: "Trigger disruption events and watch as the system calculates cascading failures, financial impacts, and recovery times in real-time.",
  },
  {
    number: 4,
    title: "Get Recommendations",
    description: "Receive AI-powered mitigation strategies including supplier diversification, inventory reallocation, and route optimization.",
  },
];

export function HowItWorks() {
  return (
    <section id="simulation" className="py-20 sm:py-32 px-4 sm:px-6 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tight px-4">The <span className="text-gradient">Protocol</span></h2>
          <p className="text-base sm:text-lg text-muted-foreground/60 max-w-2xl mx-auto font-medium px-4">
            Four phases to achieve absolute supply chain mastery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-black text-xl mb-8 glow-purple/20">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground/60 font-medium leading-relaxed text-sm">{step.description}</p>
              </div>

              {/* Arrow connector (visual only, hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-6 top-7 -translate-y-1/2">
                  <ArrowRight className="w-5 h-5 text-primary/20" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
