"use client";

import { useState } from "react";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { SidebarMenuItem } from "./sidebar-menu-items";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 z-40 flex h-[calc(100vh-3.5rem)] flex-col border-r bg-sidebar transition-all duration-300 ease-in-out animate-fade-in",
        isCollapsed ? "w-16" : "w-60"
      )}
    >
      {/* Collapse Toggle */}
      <div className="flex items-center justify-end border-b p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              isCollapsed && "rotate-180"
            )}
          />
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-2 py-4">
        {NAVIGATION_ITEMS.map((item) => (
          <SidebarMenuItem key={item.href} item={item} isCollapsed={isCollapsed} />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <div
          className={cn(
            "rounded-lg bg-sidebar-accent/10 p-3 text-xs",
            isCollapsed && "p-2"
          )}
        >
          {!isCollapsed && (
            <div>
              <p className="font-semibold text-sidebar-accent-foreground mb-1">
                Quick Tip
              </p>
              <p className="text-sidebar-foreground/70">
                Use simulations to test supply chain resilience
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
