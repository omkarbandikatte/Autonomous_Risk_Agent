import Link from "next/link";
import { COMPANY_NAME } from "@/lib/constants";
import { SupplyGuardLogo } from "@/components/ui/logo";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Network", href: "#network" },
    { label: "Simulation", href: "#simulation" },
    { label: "Analytics", href: "#analytics" },
    { label: "Security", href: "#security" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Guides", href: "#" },
    { label: "Support", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
    { label: "License", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-transparent backdrop-blur-sm relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-6 gap-12 mb-20 text-left">
          {/* Branding */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-8">
              <SupplyGuardLogo imageClassName="h-32 w-32" />
            </Link>
            <p className="text-sm text-muted-foreground/60 leading-relaxed max-w-sm">
              Architecting the future of supply chain resilience through neural orchestration and autonomous risk mitigation.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6">{category}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground/40 hover:text-white transition-all duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs font-bold text-muted-foreground/20 uppercase tracking-widest">
            © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Twitter", "LinkedIn", "GitHub"].map((platform) => (
              <Link key={platform} href="#" className="text-xs font-bold text-muted-foreground/20 hover:text-white transition-colors tracking-widest uppercase">
                {platform}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
