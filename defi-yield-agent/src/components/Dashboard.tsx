
import { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { PortfolioOverview } from '@/components/PortfolioOverview';
import { YieldMonitor } from '@/components/YieldMonitor';
import { AgentSettings } from '@/components/AgentSettings';
import { TransactionHistory } from '@/components/TransactionHistory';
import { PortfolioChart } from '@/components/PortfolioChart';
import { YieldComparison } from '@/components/YieldComparison';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { NotificationPanel } from '@/components/NotificationPanel';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { LogOut, Settings as SettingsIcon, Zap, Shield } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardProps {
  userAddress: string;
  onDisconnect: () => void;
}

export const Dashboard = ({ userAddress, onDisconnect }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const isMobile = useIsMobile();

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Portfolio Overview';
      case 'yields': return 'Yield Monitor';
      case 'settings': return 'Agent Settings';
      case 'history': return 'Transaction History';
      default: return 'Dashboard';
    }
  };

  return (
    <NotificationProvider>
      <SidebarProvider 
        defaultOpen={!isMobile}
        style={{
          "--sidebar-width": isMobile ? "16rem" : "18rem",
          "--sidebar-width-icon": "4rem",
        } as React.CSSProperties}
      >
        <div className="min-h-screen flex w-full bg-background safe-area-top safe-area-bottom">
          <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <SidebarInset className="flex-1">
            {/* Enhanced Mobile-First Responsive Header */}
            <header className="sticky top-0 z-50 flex h-14 sm:h-16 lg:h-18 shrink-0 items-center gap-2 sm:gap-3 lg:gap-4 glass border-b px-3 sm:px-4 lg:px-6">
              <SidebarTrigger className="text-foreground hover:bg-accent p-2 -ml-1 touch-target" />
              <Separator orientation="vertical" className="h-4 bg-border hidden sm:block" />
              
              {/* Mobile-optimized breadcrumb */}
              <Breadcrumb className="flex-1 min-w-0">
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#" className="text-muted-foreground hover:text-foreground transition-colors text-responsive-xs">
                      DeFi Agent
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block text-muted-foreground" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-foreground font-medium text-responsive-xs truncate">
                      {getBreadcrumbTitle()}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              {/* Enhanced mobile-optimized header actions */}
              <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
                {/* Agent Status - Responsive visibility */}
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 status-active rounded-full text-2xs font-medium">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Agent Active</span>
                </div>

                {/* Quick Stats - Enhanced responsive visibility */}
                <div className="hidden xl:flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 glass-card rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <Zap className="h-3 w-3 text-warning" />
                    <span className="text-warning text-2xs lg:text-xs font-semibold">8.2%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3 w-3 text-success" />
                    <span className="text-success text-2xs lg:text-xs font-semibold">Safe</span>
                  </div>
                </div>

                {/* Notification Panel */}
                <NotificationPanel />
                
                {/* Settings button - responsive visibility */}
                <button className="hidden sm:flex p-2 text-muted-foreground hover:text-foreground transition-colors touch-target">
                  <SettingsIcon className="h-4 w-4" />
                </button>
                
                {/* Enhanced User Section - Mobile optimized */}
                <div className="flex items-center gap-2 lg:gap-3 pl-2 lg:pl-3 border-l border-border">
                  <div className="text-right hidden sm:block">
                    <div className="text-foreground text-2xs sm:text-xs lg:text-sm font-medium">
                      {userAddress.slice(0, 4)}...{userAddress.slice(-4)}
                    </div>
                    <div className="text-muted-foreground text-2xs hidden lg:block">Connected</div>
                  </div>
                  
                  <button
                    onClick={onDisconnect}
                    className="p-2 text-muted-foreground hover:text-error transition-colors touch-target-lg"
                    title="Disconnect"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </header>

            {/* Enhanced mobile-first main content */}
            <main className="flex-1 container-fluid safe-area-bottom">
              <div className="max-w-7xl mx-auto space-responsive-lg">
                {activeTab === 'overview' && (
                  <div className="space-responsive-lg animate-fade-in">
                    <PortfolioOverview userAddress={userAddress} />
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                      <div className="animate-slide-up">
                        <PortfolioChart />
                      </div>
                      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <YieldComparison />
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'yields' && (
                  <div className="animate-fade-in">
                    <YieldMonitor userAddress={userAddress} />
                  </div>
                )}
                {activeTab === 'settings' && (
                  <div className="animate-scale-in">
                    <AgentSettings userAddress={userAddress} />
                  </div>
                )}
                {activeTab === 'history' && (
                  <div className="animate-slide-up">
                    <TransactionHistory userAddress={userAddress} />
                  </div>
                )}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </NotificationProvider>
  );
};
