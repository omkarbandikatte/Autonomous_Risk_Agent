"use client";

import { useState } from "react";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { SidebarMenuItem } from "./sidebar-menu-items";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Zap, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { SupplyGuardLogo } from "@/components/ui/logo";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Implement logout logic here
    router.push("/");
  };

  return (
    <aside
      className={cn(
        "hidden md:flex h-[calc(100vh-4rem)] flex-col bg-sidebar-dark backdrop-blur-3xl transition-all duration-500 ease-in-out border-none",
        isCollapsed ? "w-16" : "w-64"
      )}
      style={{
        background: "linear-gradient(180deg, rgba(3, 3, 3, 0.8) 0%, rgba(11, 11, 15, 0.9) 100%)",
      }}
    >
      {/* Sidebar Header/Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        {!isCollapsed ? (
          <div className="px-2 py-1 leading-none flex items-center">
            <SupplyGuardLogo imageClassName="h-10 w-10" />
          </div>
        ) : (
          <div className="w-full flex justify-center leading-none">
            <SupplyGuardLogo iconOnly imageClassName="h-8 w-8" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-white/5 text-muted-foreground hover:text-foreground h-8 w-8 rounded-lg"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform duration-500",
              isCollapsed && "rotate-180"
            )}
          />
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar px-3 py-6">
        <AnimatePresence>
          {NAVIGATION_ITEMS.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <SidebarMenuItem item={item} isCollapsed={isCollapsed} />
            </motion.div>
          ))}
        </AnimatePresence>
      </nav>

      {/* Footer / Pro Badge - Dribbble Style */}
      <div className="p-4 space-y-4">
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 transition-all duration-500",
            isCollapsed ? "p-2" : "p-4"
          )}
        >
          {!isCollapsed ? (
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Zap className="h-3 w-3 fill-primary" />
                </div>
                <span className="text-xs font-bold text-foreground">Pro Plan</span>
              </div>
              <p className="text-[10px] leading-relaxed text-muted-foreground">
                Unlock advanced AI agents and custom workflows.
              </p>
              <Button variant="default" size="sm" className="w-full h-8 text-[10px] rounded-xl">
                Upgrade Now
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <Zap className="h-4 w-4 text-primary animate-pulse" />
            </div>
          )}
          {/* Decorative background glow */}
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/20 blur-2xl" />
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-6 rounded-2xl text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 relative group overflow-hidden",
            isCollapsed ? "justify-center px-0" : "justify-start"
          )}
        >
          <div className="relative z-10 flex h-6 w-6 items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
            <LogOut className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <span className="relative z-10 font-bold tracking-wide transition-all duration-300 group-hover:translate-x-1">Logout</span>
          )}
        </Button>
      </div>
    </aside >
  );
}
