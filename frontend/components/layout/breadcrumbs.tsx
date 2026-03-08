"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs() {
  const pathname = usePathname();

  if (!pathname.includes("/dashboard")) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean).slice(1);

  return (
    <nav className="flex items-center gap-2 mb-10 animate-fade-in group">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300"
      >
        <div className="p-1 rounded-md bg-white/5 border border-white/5 group-hover:bg-primary/10 transition-colors">
          <Home className="h-3 w-3" />
        </div>
        <span>Overview</span>
      </Link>

      {segments.map((segment, index) => {
        const href = "/dashboard/" + segments.slice(0, index + 1).join("/");
        const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");
        const isLast = index === segments.length - 1;

        return (
          <div key={segment} className="flex items-center gap-2">
            <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
            {isLast ? (
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">{label}</span>
            ) : (
              <Link
                href={href}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
