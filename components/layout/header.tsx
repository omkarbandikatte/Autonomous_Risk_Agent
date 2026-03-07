import { COMPANY_NAME } from "@/lib/constants";
import { Package2 } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Package2 className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold">{COMPANY_NAME}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex h-8 px-3 items-center rounded-md bg-muted text-muted-foreground text-sm">
            v1.0
          </div>
        </div>
      </div>
    </header>
  );
}
