"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/lib/types";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

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
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors relative group",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
      title={isCollapsed ? item.label : undefined}
    >
      <div className="relative flex h-5 w-5 items-center justify-center flex-shrink-0">
        <IconComponent className="h-5 w-5" />
      </div>
      {!isCollapsed && (
        <>
          <span className="flex-1">{item.label}</span>
          {item.badge && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-semibold text-destructive-foreground">
              {item.badge}
            </span>
          )}
        </>
      )}
      {isCollapsed && (
        <div className="absolute left-full ml-2 hidden rounded-md bg-popover px-2 py-1 text-sm group-hover:block whitespace-nowrap">
          {item.label}
        </div>
      )}
    </Link>
  );
}
