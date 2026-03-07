import { CheckCircle2 } from "lucide-react";

const useCases = [
  {
    title: "Supply Chain Resilience Planning",
    description: "Before launching a new product, simulate potential disruptions to ensure your supplier network can handle unexpected events.",
    benefits: ["Identify critical vulnerabilities", "Plan for redundancy", "Reduce time-to-market risks"],
  },
  {
    title: "Supplier Risk Assessment",
    description: "Evaluate new suppliers and existing partnerships against various disruption scenarios to make data-driven sourcing decisions.",
    benefits: ["Quantify supplier risk", "Compare alternatives", "Negotiate better contracts"],
  },
  {
    title: "Geopolitical Risk Management",
    description: "Monitor and simulate the impact of geopolitical events on your supply chain to proactively mitigate exposure.",
    benefits: ["Track regional conflicts", "Diversify geographically", "Plan contingencies"],
  },
  {
    title: "Disaster Recovery Planning",
    description: "Test your supply chain's ability to recover from major disruptions and validate your continuity plans.",
    benefits: ["Test recovery scenarios", "Validate procedures", "Update protocols"],
  },
];

export function UseCases() {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for Your Use Cases</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            SupplyGuard serves supply chain managers, procurement teams, and risk officers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="rounded-lg border bg-background p-8">
              <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
              <p className="text-muted-foreground mb-6">{useCase.description}</p>
              <div className="space-y-3">
                {useCase.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
