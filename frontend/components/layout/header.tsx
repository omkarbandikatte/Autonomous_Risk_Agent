"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { COMPANY_NAME } from "@/lib/constants";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { SupplyGuardLogo } from "@/components/ui/logo";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-[100] w-full transition-all duration-500",
          (isScrolled || !isHome)
            ? "py-2 bg-black/40 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "py-3 bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 sm:px-12">
          <Link href="/" className="group">
            <SupplyGuardLogo imageClassName="h-12 w-12" />
          </Link>

          {/* Desktop Nav - Hidden on small screens */}
          {isHome && (
            <nav className="hidden lg:flex items-center gap-8">
              {["Features", "Network", "Simulation", "Analytics", "Security"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 hover:text-white transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
              <div className="relative flex h-2 w-2">
                <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></div>
                <div className="relative inline-flex rounded-full h-2 w-2 bg-accent"></div>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-accent">Active Node</span>
            </div>

            {isHome && (
              <Link href="/dashboard" className="hidden sm:block">
                <Button className="h-9 rounded-full px-6 font-black text-xs uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-glow-purple/20">
                  Launch App
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground hover:bg-white/5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-left"
          style={{ scaleX }}
        />
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[90] lg:hidden bg-black/80 flex flex-col pt-32 px-12"
          >
            <nav className="flex flex-col gap-10">
              {isHome ? (
                ["Features", "Network", "Simulation", "Analytics", "Security"].map((item, idx) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-4xl font-black text-white hover:text-primary transition-colors tracking-tighter"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))
              ) : (
                ["Dashboard", "Suppliers", "Simulation", "Network", "Settings"].map((item, idx) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={item === "Dashboard" ? "/dashboard" : `/dashboard/${item.toLowerCase()}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-4xl font-black text-white hover:text-primary transition-colors tracking-tighter"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))
              )}
            </nav>

            <div className="mt-auto pb-16">
              <Button className="w-full h-16 rounded-2xl text-lg font-black uppercase tracking-widest shadow-glow-purple/20">
                Connect Node
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
