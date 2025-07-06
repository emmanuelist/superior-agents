
import { useState } from 'react';
import { PortfolioSummary } from './PortfolioSummary';
import { PortfolioMetrics } from './PortfolioMetrics';
import { PositionsList } from './PositionsList';
import { PortfolioSidebar } from './PortfolioSidebar';
import { RiskAssessmentDashboard } from './RiskAssessmentDashboard';
import { RebalancingSuggestions } from './RebalancingSuggestions';
import { EnhancedPortfolioOverview } from '../analytics/EnhancedPortfolioOverview';
import { PageTransition } from '@/components/ui/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { yieldData } from '@/data/mockYieldData';
import { BarChart3, PieChart, Grid3X3, List, LayoutGrid } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PortfolioOverviewProps {
  userAddress: string;
}

export const PortfolioOverview = ({ userAddress }: PortfolioOverviewProps) => {
  const [viewMode, setViewMode] = useState<'compact' | 'detailed' | 'list'>('detailed');
  const isMobile = useIsMobile();

  // Mock data - in real implementation, this would come from APIs
  const portfolioData = {
    totalValue: 15420.50,
    totalYield: 1240.30,
    apy: 8.05,
    cardBalance: 150.00,
    emergencyBuffer: 500.00,
    dailyYield: 3.45,
    positions: [
      { 
        protocol: 'Aave USDC', 
        amount: 8500, 
        yield: 7.2, 
        chain: 'Ethereum', 
        logo: '🏛️', 
        trend: '+2.4%', 
        trendUp: true,
        currentValue: 8500,
        riskLevel: 'Low' as const
      },
      { 
        protocol: 'Compound USDT', 
        amount: 4200, 
        yield: 6.8, 
        chain: 'Polygon', 
        logo: '🏢', 
        trend: '+5.1%', 
        trendUp: true,
        currentValue: 4200,
        riskLevel: 'Low' as const
      },
      { 
        protocol: 'Yearn DAI', 
        amount: 2720.50, 
        yield: 9.1, 
        chain: 'Arbitrum', 
        logo: '🏰', 
        trend: '+8.3%', 
        trendUp: true,
        currentValue: 2720.50,
        riskLevel: 'Medium' as const
      },
    ]
  };

  return (
    <PageTransition className="container-responsive space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Mobile-First Portfolio Summary */}
      <PageTransition delay={100} className="relative max-w-7xl mx-auto">
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {/* Total Portfolio Value - Full width on mobile */}
          <PortfolioSummary totalValue={portfolioData.totalValue} />

          {/* Metrics - Responsive grid */}
          <PortfolioMetrics 
            totalYield={portfolioData.totalYield}
            apy={portfolioData.apy}
            dailyYield={portfolioData.dailyYield}
          />
        </div>
      </PageTransition>

      {/* Enhanced Analytics Section */}
      <PageTransition delay={200} className="max-w-7xl mx-auto">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="bg-white/10 border-white/20 mb-4 sm:mb-6 w-full sm:w-auto grid grid-cols-2 sm:flex">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-white/20 text-xs sm:text-sm">
              <PieChart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Home</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white/20 text-xs sm:text-sm">
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Advanced Analytics</span>
              <span className="sm:hidden">Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Mobile-First View Mode Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <h3 className="text-base sm:text-lg font-semibold text-white">Portfolio Positions</h3>
              
              {/* Responsive View Mode Controls */}
              <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1">
                <Button
                  variant={viewMode === 'compact' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('compact')}
                  className="touch-target text-xs whitespace-nowrap"
                >
                  <Grid3X3 className="h-3 w-3 mr-1" />
                  <span className="hidden xs:inline">Compact</span>
                </Button>
                <Button
                  variant={viewMode === 'detailed' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('detailed')}
                  className="touch-target text-xs whitespace-nowrap"
                >
                  <LayoutGrid className="h-3 w-3 mr-1" />
                  <span className="hidden xs:inline">Detailed</span>
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="touch-target text-xs whitespace-nowrap"
                >
                  <List className="h-3 w-3 mr-1" />
                  <span className="hidden xs:inline">List</span>
                </Button>
              </div>
            </div>

            {/* Risk Assessment and Rebalancing - Stack on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <RiskAssessmentDashboard userPositions={portfolioData.positions} />
              <RebalancingSuggestions userPositions={portfolioData.positions} yieldData={yieldData} />
            </div>

            {/* Main Content - Responsive Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {/* Current Positions - Takes full width on mobile, 3/4 on desktop */}
              <div className="xl:col-span-3 order-1 xl:order-1">
                <PositionsList positions={portfolioData.positions} viewMode={viewMode} />
              </div>

              {/* Sidebar - Bottom on mobile, right on desktop */}
              <div className="xl:col-span-1 order-2 xl:order-2">
                <PortfolioSidebar 
                  cardBalance={portfolioData.cardBalance}
                  emergencyBuffer={portfolioData.emergencyBuffer}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <EnhancedPortfolioOverview />
          </TabsContent>
        </Tabs>
      </PageTransition>
    </PageTransition>
  );
};
