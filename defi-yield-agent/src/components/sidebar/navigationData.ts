
import { 
  PieChart, 
  Activity, 
  Bot, 
  Clock, 
  Target,
  Shield,
  Zap,
} from "lucide-react";

export const primaryNavItems = [
  { id: "overview", title: "Portfolio Overview", icon: PieChart, badge: null, description: "View your complete portfolio" },
  { id: "yields", title: "Yield Analytics", icon: Activity, badge: "3", description: "Monitor active yield opportunities" },
];

export const secondaryNavItems = [
  { id: "settings", title: "Agent Settings", icon: Bot, badge: null, description: "Configure your DeFi agent" },
  { id: "history", title: "Transaction History", icon: Clock, badge: null, description: "View past transactions" },
];

export const quickActions = [
  { title: "Auto-Rebalance", icon: Target, color: "text-primary", description: "Optimize portfolio allocation" },
  { title: "Emergency Stop", icon: Shield, color: "text-error", description: "Halt all agent operations" },
  { title: "Optimize Gas", icon: Zap, color: "text-warning", description: "Reduce transaction costs" },
];
