
import { ArrowUp, Info, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface Position {
  protocol: string;
  amount: number;
  yield: number;
  chain: string;
  logo: string;
  trend: string;
  trendUp: boolean;
}

interface PositionCardProps {
  position: Position;
}

export const PositionCard = ({ position }: PositionCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-5 border border-slate-600/30 hover:border-slate-500/50 hover:bg-slate-800/90 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-lg hover:shadow-slate-900/20"
         onClick={() => setShowDetails(!showDetails)}>
      
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="text-2xl group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
            {position.logo}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-white font-semibold text-lg group-hover:text-emerald-400 transition-colors truncate">
                {position.protocol}
              </h4>
              <span className="px-2 py-0.5 bg-slate-700/60 text-slate-300 text-xs rounded-md border border-slate-600/40 font-medium flex-shrink-0">
                {position.chain}
              </span>
            </div>
            <div className="flex items-center text-emerald-400 text-sm font-medium">
              <TrendingUp className="h-3 w-3 mr-1.5 flex-shrink-0" />
              <span>{position.trend} (24h)</span>
            </div>
          </div>
        </div>
        
        {/* Value Section */}
        <div className="text-right flex-shrink-0">
          <div className="text-white font-bold text-xl mb-0.5">
            ${position.amount.toLocaleString()}
          </div>
          <div className="flex items-center justify-end">
            <span className="text-emerald-400 text-lg font-semibold">{position.yield}%</span>
            <span className="text-emerald-300/80 text-xs ml-1">APY</span>
          </div>
        </div>
      </div>
      
      {/* Performance Indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-400">Performance vs Market</span>
          <span className="text-emerald-400 font-medium">+2.1% above avg</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${Math.min((position.yield / 12) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Expandable Details */}
      {showDetails && (
        <div className="pt-4 border-t border-slate-600/30 animate-fade-in">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div>
                <span className="text-slate-400 text-xs">Risk Level</span>
                <div className="text-white font-medium">Low Risk</div>
              </div>
              <div>
                <span className="text-slate-400 text-xs">Auto-compound</span>
                <div className="text-emerald-400 font-medium">Active</div>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-slate-400 text-xs">Last Updated</span>
                <div className="text-white font-medium">2 hours ago</div>
              </div>
              <div>
                <span className="text-slate-400 text-xs">Next Rebalance</span>
                <div className="text-blue-400 font-medium">4 days</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Expand Indicator */}
      <div className="flex justify-center mt-4 pt-2 border-t border-slate-600/20">
        <div className="flex items-center text-slate-500 group-hover:text-slate-400 transition-colors text-xs">
          <Info className="h-3 w-3 mr-1" />
          <span>{showDetails ? 'Less details' : 'More details'}</span>
        </div>
      </div>
    </div>
  );
};
