
import { Badge } from '@/components/ui/badge';

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

interface OpportunityCardProps {
  opportunity: YieldData;
  rank: number;
  userHasPosition?: boolean;
}

export const OpportunityCard = ({ opportunity, rank, userHasPosition }: OpportunityCardProps) => (
  <div className={`bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl p-3 sm:p-4 border transition-all duration-300 cursor-pointer group hover:scale-105 ${
    userHasPosition 
      ? 'border-emerald-400/50 bg-gradient-to-br from-emerald-500/30 to-blue-500/30' 
      : 'border-emerald-400/30'
  }`}>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30">
          #{rank}
        </Badge>
        {userHasPosition && (
          <Badge className="bg-blue-400/20 text-blue-300 border-blue-400/30 text-xs">
            Active
          </Badge>
        )}
      </div>
      <span className="text-emerald-400 text-xl sm:text-2xl font-bold group-hover:scale-110 transition-transform">
        {opportunity.apy.toFixed(1)}%
      </span>
    </div>
    <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">{opportunity.protocol}</h4>
    <p className="text-blue-200 text-xs sm:text-sm mb-2">{opportunity.chain}</p>
    <div className="flex items-center justify-between text-xs">
      <span className="text-blue-300 font-mono">TVL: ${opportunity.tvl}</span>
      <span className={`font-medium ${opportunity.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
        {opportunity.change >= 0 ? '+' : ''}{opportunity.change.toFixed(1)}%
      </span>
    </div>
  </div>
);
