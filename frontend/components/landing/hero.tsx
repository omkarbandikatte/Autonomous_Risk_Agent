import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-sm font-medium text-primary">Introducing SupplyGuard</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-pretty">
          Stop Supply Chain Disruptions Before They Happen
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-10 text-balance max-w-3xl mx-auto">
          Real-time simulation and risk analysis to identify vulnerabilities, predict cascading failures, and recommend mitigation strategies for your supply chain.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              Launch Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            Watch Demo
          </Button>
        </div>

        <div className="mt-16 pt-12 border-t">
          <p className="text-sm text-muted-foreground mb-8">Trusted by leading enterprises</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            {["Enterprise", "Global Co", "Tech Inc", "Supply Co"].map((company) => (
              <div key={company} className="h-12 rounded bg-muted/50 flex items-center justify-center font-medium text-muted-foreground">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
