"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/lib/types";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SidebarMenuItemProps {
  item: MenuItem;
  isCollapsed: boolean;
}

export function SidebarMenuItem({ item, isCollapsed }: SidebarMenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

  // Get icon component - handle dynamic icon lookup
  const IconComponent = (Icons as any)[item.icon] || Icons.LayoutDashboard;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-all duration-300 relative group overflow-hidden",
        isActive
          ? "text-primary shadow-glow-purple/10"
          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
      )}
      title={isCollapsed ? item.label : undefined}
    >
      {/* Active State Background Layer */}
      {isActive && (
        <motion.div
          layoutId="active-sidebar-pill"
          className="absolute inset-0 bg-white/5 border border-white/5 z-0 rounded-2xl"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}

      {/* Active Left Indicator */}
      {isActive && (
        <motion.div
          layoutId="active-sidebar-indicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-primary z-20"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}

      <div className="relative z-10 flex h-6 w-6 items-center justify-center flex-shrink-0">
        <IconComponent
          className={cn(
            "h-5 w-5 transition-all duration-300",
            isActive ? "text-primary scale-110" : "group-hover:scale-110"
          )}
        />
      </div>

      {!isCollapsed && (
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 flex-1 truncate"
        >
          {item.label}
        </motion.span>
      )}

      {!isCollapsed && item.badge && (
        <span className="relative z-10 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/20 px-1.5 text-[10px] font-bold text-primary group-hover:bg-primary/30 transition-colors">
          {item.badge}
        </span>
      )}

      {isCollapsed && (
        <div className="absolute left-full ml-4 hidden rounded-xl glass px-3 py-1.5 text-xs font-bold text-foreground group-hover:block whitespace-nowrap z-50 shadow-xl border-white/10">
          {item.label}
        </div>
      )}
    </Link>
  );
}
