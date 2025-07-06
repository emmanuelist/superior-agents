
import { Activity } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function AppSidebarFooter() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  if (isCollapsed) return null;

  return (
    <div className="glass-card rounded-xl p-3 lg:p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-success font-semibold text-sm">Active</span>
        </div>
        <Activity className="h-4 w-4 text-success" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Protocols</span>
          <span className="text-foreground font-semibold">3</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Last Check</span>
          <span className="text-success font-semibold">2m ago</span>
        </div>
      </div>
    </div>
  );
}
