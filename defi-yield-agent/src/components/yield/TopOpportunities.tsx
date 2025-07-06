
import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { OpportunityCard } from './OpportunityCard';
import { UserPosition } from '@/services/portfolioIntegration';

interface YieldData {
  protocol: string;
  chain: string;
  apy: number;
  change: number;
  tvl: string;
  tvlNumeric: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  volatility: number;
  gasScore: number;
}

interface TopOpportunitiesProps {
  opportunities: YieldData[];
  userPositions: UserPosition[];
  viewMode: 'market' | 'personal';
  userAddress?: string;
}

export const TopOpportunities = ({ opportunities, userPositions, viewMode, userAddress }: TopOpportunitiesProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
      <div className="p-4 sm:p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-emerald-400" />
          {viewMode === 'personal' && userAddress ? 'Recommended Opportunities' : 'Top Yield Opportunities'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {opportunities.map((opportunity, index) => (
            <OpportunityCard 
              key={index} 
              opportunity={opportunity} 
              rank={index + 1}
              userHasPosition={userPositions.some(pos => pos.protocol === opportunity.protocol)}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
