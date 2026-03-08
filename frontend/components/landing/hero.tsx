"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AgentVisual } from "@/components/landing/agent-visual";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent perspective-distant py-12 lg:py-0">
      {/* Remove individual animated blobs as they are now in DynamicBackground */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        {/* Content Side */}
        <div className="text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[100px] font-black mb-8 text-pretty tracking-tight leading-[1] sm:leading-[0.85] lg:leading-[0.8]"
          >
            Resilience <span className="text-gradient">Redefined</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground/60 mb-12 text-balance max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
          >
            Autonomous risk orchestration and real-time simulation for the next generation of global supply chains.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="h-16 w-full px-12 rounded-full font-black text-lg gap-3 glow-purple/20 transition-all hover:scale-105 active:scale-95 group">
                Launch Intelligence
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-16 w-full sm:w-auto px-12 rounded-full font-black text-lg border-white/5 bg-white/3 hover:bg-white/10 backdrop-blur-sm transition-all hover:scale-105 active:scale-95">
              View Protocol
            </Button>
          </motion.div>

          {/* Trusted Network entities - adjusted for left alignment */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-20 pt-10 border-t border-white/5 lg:max-w-md"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 mb-8">Trusted Network Entities</p>
            <div className="flex flex-wrap gap-8 items-center justify-center lg:justify-between opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
              {["Nexus", "Vertex", "Aether", "Prime"].map((company) => (
                <div key={company} className="text-base font-black tracking-tighter hover:text-white transition-colors cursor-default hover:opacity-100">
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 3D Agent Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <AgentVisual />
        </motion.div>
      </div>
    </section>
  );
}
