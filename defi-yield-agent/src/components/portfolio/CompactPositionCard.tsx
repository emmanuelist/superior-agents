
import { TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Position {
  protocol: string;
  amount: number;
  yield: number;
  chain: string;
  logo: string;
  trend: string;
  trendUp: boolean;
}

interface CompactPositionCardProps {
  position: Position;
}

export const CompactPositionCard = ({ position }: CompactPositionCardProps) => (
  <Card className="bg-slate-800/80 backdrop-blur-sm border border-slate-600/30 hover:border-slate-500/50 hover:bg-slate-800/90 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-lg hover:shadow-slate-900/20">
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2.5 min-w-0 flex-1">
          <span className="text-xl group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
            {position.logo}
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-semibold text-base truncate group-hover:text-emerald-400 transition-colors">
              {position.protocol}
            </h4>
            <span className="px-1.5 py-0.5 bg-slate-700/60 text-slate-300 text-xs rounded border border-slate-600/40 inline-block mt-1 font-medium">
              {position.chain}
            </span>
          </div>
        </div>
      </div>
      
      {/* Value and APY */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-white font-bold text-xl">
            ${position.amount.toLocaleString()}
          </span>
          <div className="text-right">
            <div className="text-emerald-400 font-bold text-base">{position.yield}%</div>
            <div className="text-emerald-300/80 text-xs">APY</div>
          </div>
        </div>
        
        {/* Performance Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-1.5 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${Math.min((position.yield / 12) * 100, 100)}%` }}
            ></div>
          </div>
          
          {/* Trend */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center text-emerald-400 font-medium">
              <TrendingUp className="h-3 w-3 mr-1 flex-shrink-0" />
              <span>{position.trend}</span>
            </div>
            <span className="text-slate-400">24h</span>
          </div>
        </div>
      </div>
    </div>
  </Card>
);
