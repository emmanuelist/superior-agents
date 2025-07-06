
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface QuickAction {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu className="space-y-1 lg:space-y-2">
      {actions.map((action) => (
        <SidebarMenuItem key={action.title}>
          <SidebarMenuButton 
            className="group w-full"
            tooltip={isCollapsed ? action.title : undefined}
          >
            <button className="flex items-center gap-2 lg:gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 w-full text-left touch-target">
              <action.icon className={`h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0 ${action.color}`} />
              {!isCollapsed && (
                <div className="flex-1">
                  <span className="font-medium text-sm block break-words leading-tight">{action.title}</span>
                  <span className="text-xs text-sidebar-foreground/60 block break-words leading-tight mt-0.5">{action.description}</span>
                </div>
              )}
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
