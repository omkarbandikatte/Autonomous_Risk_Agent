"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on public pages
  if (!pathname.includes("/dashboard")) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean).slice(1); // Skip (protected)
  
  return (
    <div className="flex items-center gap-2 px-6 py-3 text-sm text-muted-foreground border-b bg-background/50">
      <Link href="/dashboard" className="hover:text-foreground transition-colors">
        Dashboard
      </Link>
      {segments.map((segment, index) => {
        const href = "/dashboard/" + segments.slice(0, index + 1).join("/");
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);
        
        return (
          <div key={segment} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4" />
            {index === segments.length - 1 ? (
              <span className="text-foreground font-medium">{label}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
