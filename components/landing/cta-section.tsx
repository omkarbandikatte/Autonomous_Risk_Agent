import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-accent/5 border-y">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Master Your Supply Chain Risk?
        </h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Start simulating supply chain disruptions today and build a more resilient business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              Start Free Simulation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            Schedule a Demo
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-6">
          No credit card required. Full access to all features.
        </p>
      </div>
    </section>
  );
}
