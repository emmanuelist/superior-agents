
import { useState } from "react";
import { 
  ChevronDown,
  ChevronRight,
  Wallet,
  X,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

import { NavigationItems } from "./sidebar/NavigationItems";
import { QuickActions } from "./sidebar/QuickActions";
import { AppSidebarFooter } from "./sidebar/SidebarFooter";
import { primaryNavItems, secondaryNavItems, quickActions } from "./sidebar/navigationData";

interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AppSidebar({ activeTab, setActiveTab }: AppSidebarProps) {
  const { state, isMobile, setOpenMobile } = useSidebar();
  const [quickActionsOpen, setQuickActionsOpen] = useState(true);
  const [secondaryNavOpen, setSecondaryNavOpen] = useState(true);
  const isCollapsed = state === "collapsed";

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar-background" style={{ width: isCollapsed ? '4rem' : '18rem' }}>
      <SidebarHeader className="p-3 sm:p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-sidebar-background"></div>
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  DeFi Agent
                </h2>
                <p className="text-sidebar-foreground text-xs lg:text-sm">Autonomous Yield Optimizer</p>
              </div>
            )}
          </div>
          
          {isMobile && (
            <button
              onClick={() => setOpenMobile(false)}
              className="p-2 text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent rounded-lg transition-colors touch-target"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 lg:px-4">
        {/* Primary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground font-semibold text-xs uppercase tracking-wider mb-2">
            {!isCollapsed && "Dashboard"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <NavigationItems 
              items={primaryNavItems}
              activeTab={activeTab}
              onNavClick={handleNavClick}
              groupType="primary"
            />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-sidebar-border my-4 lg:my-6" />

        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground font-semibold text-xs uppercase tracking-wider mb-2 flex items-center justify-between">
            {!isCollapsed && (
              <>
                <span>Management</span>
                <button
                  onClick={() => setSecondaryNavOpen(!secondaryNavOpen)}
                  className="p-1 hover:bg-sidebar-accent rounded transition-colors touch-target"
                >
                  {secondaryNavOpen ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </button>
              </>
            )}
          </SidebarGroupLabel>
          {(secondaryNavOpen || isCollapsed) && (
            <SidebarGroupContent>
              <NavigationItems 
                items={secondaryNavItems}
                activeTab={activeTab}
                onNavClick={handleNavClick}
                groupType="secondary"
              />
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        <SidebarSeparator className="bg-sidebar-border my-4 lg:my-6" />

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground font-semibold text-xs uppercase tracking-wider mb-2 flex items-center justify-between">
            {!isCollapsed && (
              <>
                <span>Quick Actions</span>
                <button
                  onClick={() => setQuickActionsOpen(!quickActionsOpen)}
                  className="p-1 hover:bg-sidebar-accent rounded transition-colors touch-target"
                >
                  {quickActionsOpen ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </button>
              </>
            )}
          </SidebarGroupLabel>
          {(quickActionsOpen || isCollapsed) && (
            <SidebarGroupContent>
              <QuickActions actions={quickActions} />
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 lg:p-4">
        <AppSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
