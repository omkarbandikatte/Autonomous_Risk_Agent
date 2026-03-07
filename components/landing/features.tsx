import { Zap, AlertTriangle, TrendingUp, Network, BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-Time Simulation",
    description: "Trigger disruption events and instantly see cascading failures across your supply chain network.",
  },
  {
    icon: AlertTriangle,
    title: "Risk Detection",
    description: "Automatically identify vulnerabilities, concentration risks, and geopolitical exposure.",
  },
  {
    icon: Network,
    title: "Network Mapping",
    description: "Visualize complex supplier relationships and interdependencies with interactive graphs.",
  },
  {
    icon: TrendingUp,
    title: "Impact Forecasting",
    description: "Calculate financial exposure and recovery timelines for potential disruption scenarios.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Access comprehensive reports with risk rankings, vulnerability assessments, and trends.",
  },
  {
    icon: Shield,
    title: "Mitigation Planning",
    description: "Get AI-powered recommendations for supplier diversification and risk reduction strategies.",
  },
];

export function Features() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features for Supply Chain Excellence</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to proactively manage supply chain risk and build resilience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group rounded-lg border bg-card p-8 hover:border-primary/50 transition-colors">
                <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
