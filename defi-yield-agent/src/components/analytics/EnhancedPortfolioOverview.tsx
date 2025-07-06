import { InteractiveChart } from './InteractiveChart';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { PredictiveModeling } from './PredictiveModeling';
import { SmartInsights } from './SmartInsights';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Brain, Lightbulb, TrendingUp } from 'lucide-react';

// Mock data for demonstration
const chartData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  value: 12500 + Math.sin(i * 0.2) * 1000 + i * 50,
  yield: 8.5 + Math.sin(i * 0.3) * 2 + Math.random() * 0.5,
  benchmark: 7.2 + Math.sin(i * 0.25) * 1.5
}));

const analyticsMetrics = {
  sharpeRatio: 1.34,
  volatility: 12.8,
  maxDrawdown: 3.2,
  riskAdjustedReturn: 24.7,
  yieldAttribution: {
    protocol: 68,
    market: 32
  }
};

const forecastData = Array.from({ length: 20 }, (_, i) => {
  const isActual = i < 10;
  const baseValue = 8.5 + Math.sin(i * 0.2) * 1;
  
  return {
    date: new Date(Date.now() + (i - 10) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    actual: isActual ? baseValue : undefined,
    predicted: baseValue + (isActual ? 0 : 0.5),
    confidence: {
      upper: baseValue + 1.5,
      lower: baseValue - 1.5
    }
  };
});

const scenarios = [
  {
    scenario: 'Bull Market',
    probability: 35,
    expectedReturn: 12.4,
    risk: 'Medium' as const
  },
  {
    scenario: 'Bear Market',
    probability: 20,
    expectedReturn: -5.2,
    risk: 'High' as const
  },
  {
    scenario: 'Sideways Market',
    probability: 45,
    expectedReturn: 3.8,
    risk: 'Low' as const
  }
];

const insights = [
  {
    id: '1',
    type: 'opportunity' as const,
    title: 'Higher Yield Available',
    description: 'Compound USDC is offering 2.3% higher APY than your current Aave position with similar risk profile.',
    impact: 'high' as const,
    action: 'Rebalance Now',
    value: 847
  },
  {
    id: '2',
    type: 'warning' as const,
    title: 'Increased Protocol Risk',
    description: 'Your Yearn DAI position has increased concentration risk. Consider diversifying to maintain optimal portfolio balance.',
    impact: 'medium' as const,
    action: 'Review Allocation'
  },
  {
    id: '3',
    type: 'achievement' as const,
    title: 'Performance Milestone',
    description: 'Congratulations! Your portfolio has outperformed the DeFi index by 4.2% this quarter.',
    impact: 'low' as const,
    value: 4.2
  }
];

export const EnhancedPortfolioOverview = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-white/10 border-white/20 mb-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white/20">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white/20">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="predictions" className="data-[state=active]:bg-white/20">
            <Brain className="h-4 w-4 mr-2" />
            Predictions
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-white/20">
            <Lightbulb className="h-4 w-4 mr-2" />
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <InteractiveChart 
              title="Portfolio Performance"
              metric="value"
              showBenchmark={true}
            />
            <InteractiveChart 
              title="Yield Analysis"
              metric="yield"
            />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsDashboard metrics={analyticsMetrics} />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <InteractiveChart 
              title="Risk-Return Analysis"
              metric="value"
              showBenchmark={true}
            />
            <InteractiveChart 
              title="Portfolio Composition"
              metric="yield"
            />
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <PredictiveModeling 
            forecastData={forecastData}
            scenarios={scenarios}
          />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <SmartInsights insights={insights} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
