import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Map Your Network",
    description: "Input your supplier data and dependencies. SupplyGuard builds an interactive network graph of your entire supply chain.",
  },
  {
    number: 2,
    title: "Set Risk Parameters",
    description: "Define your risk tolerance, supplier criticality levels, and business impact thresholds for different scenarios.",
  },
  {
    number: 3,
    title: "Run Simulations",
    description: "Trigger disruption events and watch as the system calculates cascading failures, financial impacts, and recovery times in real-time.",
  },
  {
    number: 4,
    title: "Get Recommendations",
    description: "Receive AI-powered mitigation strategies including supplier diversification, inventory reallocation, and route optimization.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to supply chain risk mastery
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Card */}
              <div className="rounded-lg border bg-card p-8 h-full flex flex-col">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-6">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground flex-grow">{step.description}</p>
              </div>

              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 translate-x-1/2">
                  <ArrowRight className="w-6 h-6 text-primary/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
