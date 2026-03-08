import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { UseCases } from "@/components/landing/use-cases";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import { DynamicBackground } from "@/components/landing/dynamic-background";
import { AgentStreams } from "@/components/landing/agent-streams";
import { AnalyticsSection } from "@/components/landing/analytics-section";
import { SecuritySection } from "@/components/landing/security-section";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <DynamicBackground />
      <AgentStreams />
      <Hero />
      <Features />
      <AnalyticsSection />
      <UseCases />
      <HowItWorks />
      <SecuritySection />
      <CTASection />
      <Footer />
    </div>
  );
}
