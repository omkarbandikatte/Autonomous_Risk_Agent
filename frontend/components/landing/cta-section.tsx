"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-20 sm:py-48 px-4 sm:px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-12 sm:p-20 rounded-4xl bg-white/2 border border-white/5 backdrop-blur-3xl text-center relative overflow-hidden shadow-2xl"
        >
          {/* Subtle Glow Background within CTA */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 pointer-events-none opacity-40" />

          <h2 className="text-5xl sm:text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[1] sm:leading-[0.85] relative z-10">
            Establish Your <br />
            <span className="text-gradient">Resilience Protocol</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground/40 mb-12 max-w-2xl mx-auto font-bold tracking-tight relative z-10">
            The next generation of supply chain orchestration is here. Secure your network against the unknown with autonomous nodes.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="h-16 w-full sm:w-auto px-12 rounded-full font-black text-lg gap-3 bg-primary hover:bg-primary/90 glow-purple/30 group">
                Initialize Intelligence
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-16 w-full sm:w-auto px-12 rounded-full font-black text-lg border-white/5 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all hover:scale-105">
              Consult Specialist
            </Button>
          </div>
          <div className="mt-14 flex items-center justify-center gap-3 relative z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-glow-cyan" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/30">
              Protocol Status: Fully Operational
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
