import { MenuItem } from "./types";

export const NAVIGATION_ITEMS: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    label: "Simulation",
    href: "/dashboard/simulation",
    icon: "Zap",
  },
  {
    label: "Risk Analysis",
    href: "/dashboard/analysis",
    icon: "AlertTriangle",
  },
  {
    label: "Suppliers",
    href: "/dashboard/suppliers",
    icon: "Users",
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: "FileText",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: "Settings",
  },
];

export const RISK_LEVELS = {
  LOW: { label: "Low", color: "bg-green-500" },
  MEDIUM: { label: "Medium", color: "bg-yellow-500" },
  HIGH: { label: "High", color: "bg-orange-500" },
  CRITICAL: { label: "Critical", color: "bg-red-500" },
};

export const SUPPLIER_STATUS = {
  HEALTHY: { label: "Healthy", color: "text-green-600" },
  AT_RISK: { label: "At Risk", color: "text-yellow-600" },
  DISRUPTED: { label: "Disrupted", color: "text-red-600" },
};

export const DISRUPTION_TYPES = [
  "Natural Disaster",
  "Political Crisis",
  "Economic Downturn",
  "Pandemic",
  "Supply Constraint",
];

export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Semiconductors",
  "Chemicals",
  "Raw Materials",
  "Logistics",
  "Energy",
];

export const COMPANY_NAME = "SupplyGuard";
export const COMPANY_TAGLINE = "Real-time Supply Chain Risk Simulation & Mitigation";
