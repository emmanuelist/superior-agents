
import { TrendingUp, ChevronRight } from 'lucide-react';

interface Position {
  protocol: string;
  amount: number;
  yield: number;
  chain: string;
  logo: string;
  trend: string;
  trendUp: boolean;
}

interface PositionListItemProps {
  position: Position;
}

export const PositionListItem = ({ position }: PositionListItemProps) => (
  <div className="flex items-center justify-between p-4 bg-slate-800/60 rounded-lg border border-slate-600/30 hover:border-slate-500/50 hover:bg-slate-800/80 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md hover:shadow-slate-900/10">
    
    {/* Left Section */}
    <div className="flex items-center space-x-3 flex-1 min-w-0">
      <span className="text-xl group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
        {position.logo}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-white font-semibold text-base truncate group-hover:text-emerald-400 transition-colors">
            {position.protocol}
          </h4>
          <span className="px-1.5 py-0.5 bg-slate-700/60 text-slate-300 text-xs rounded border border-slate-600/40 font-medium flex-shrink-0">
            {position.chain}
          </span>
        </div>
        <div className="flex items-center text-emerald-400 text-sm font-medium">
          <TrendingUp className="h-3 w-3 mr-1.5 flex-shrink-0" />
          <span>{position.trend} (24h)</span>
        </div>
      </div>
    </div>
    
    {/* Right Section */}
    <div className="text-right flex-shrink-0 mr-3">
      <div className="text-white font-bold text-base mb-0.5">
        ${position.amount.toLocaleString()}
      </div>
      <div className="flex items-center justify-end">
        <span className="text-emerald-400 text-sm font-semibold">{position.yield}%</span>
        <span className="text-emerald-300/80 text-xs ml-1">APY</span>
      </div>
    </div>
    
    {/* Chevron */}
    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-300 transition-colors flex-shrink-0" />
  </div>
);
