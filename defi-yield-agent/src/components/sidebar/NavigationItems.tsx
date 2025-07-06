

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface NavItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string | null;
  description: string;
}

interface NavigationItemsProps {
  items: NavItem[];
  activeTab: string;
  onNavClick: (tabId: string) => void;
  groupType?: 'primary' | 'secondary';
}

export function NavigationItems({ items, activeTab, onNavClick, groupType = 'primary' }: NavigationItemsProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu className="space-y-2">
      {items.map((item) => (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton 
            isActive={activeTab === item.id}
            className="group relative w-full p-0 h-auto"
            onClick={() => onNavClick(item.id)}
            tooltip={isCollapsed ? item.title : undefined}
          >
            <div className={`flex items-start gap-3 px-4 py-3 rounded-lg transition-all duration-300 w-full touch-target min-h-[3.5rem] ${
              activeTab === item.id
                ? 'bg-sidebar-accent text-sidebar-primary border border-sidebar-primary/30' 
                : 'text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50'
            }`}>
              <item.icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                groupType === 'primary' && activeTab === item.id ? 'text-sidebar-primary' : ''
              }`} />
              {!isCollapsed && (
                <>
                  <div className="flex-1 min-w-0 space-y-1 overflow-hidden">
                    <div className="font-medium text-sm leading-tight text-left">
                      {item.title}
                    </div>
                    {item.description && (
                      <div className="text-xs text-sidebar-foreground/60 leading-tight text-left">
                        {item.description}
                      </div>
                    )}
                  </div>
                  {item.badge && (
                    <div className="flex-shrink-0 ml-2 self-start mt-0.5">
                      <span className="bg-success/20 text-success text-xs px-2 py-0.5 rounded-full border border-success/30 font-semibold">
                        {item.badge}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

