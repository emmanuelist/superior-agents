
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { InsightItem } from './InsightItem';

export const MarketInsights = () => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
      <div className="p-4 sm:p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Market Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-3">
            <h4 className="text-emerald-400 font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending Up
            </h4>
            <div className="space-y-2">
              <InsightItem text="Arbitrum yields increasing due to ARB incentives" positive={true} />
              <InsightItem text="Curve pools benefiting from veCRV boost" positive={true} />
              <InsightItem text="Lido staking rewards stabilizing post-merge" positive={true} />
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-red-400 font-medium flex items-center">
              <TrendingDown className="h-4 w-4 mr-2" />
              Risk Factors
            </h4>
            <div className="space-y-2">
              <InsightItem text="High gas costs affecting Ethereum yields" positive={false} />
              <InsightItem text="USDC depeg risk in some protocols" positive={false} />
              <InsightItem text="Regulatory uncertainty impacting DeFi rates" positive={false} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
