
import { Card } from '@/components/ui/card';
import { Wallet, ArrowUp } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface PortfolioSummaryProps {
  totalValue: number;
}

export const PortfolioSummary = ({ totalValue }: PortfolioSummaryProps) => {
  return (
    <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-600/40 hover:border-slate-500/60 transition-all duration-300 group">
      <div className="p-4 sm:p-6">
        {/* Header Section */}
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 mb-4 sm:mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-700/60 rounded-lg border border-slate-600/40 flex-shrink-0">
              <Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-slate-300" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-semibold text-slate-200 truncate">
                Total Portfolio Value
              </h3>
              <div className="flex items-center text-emerald-400 text-xs sm:text-sm font-medium">
                <ArrowUp className="h-3 w-3 mr-1 flex-shrink-0" />
                <span>+2.4% (24h)</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Value and Status Section */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-2 sm:space-y-3">
            {/* Main Value */}
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              $<AnimatedCounter value={totalValue} />
            </div>
            
            {/* Status Tags */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-3 text-xs sm:text-sm">
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-md border border-emerald-500/30 font-medium whitespace-nowrap">
                Growing Strong
              </span>
              <span className="text-slate-400 text-xs">
                Auto-optimized across 3 chains
              </span>
            </div>
          </div>
          
          {/* Mini Chart - Hidden on small screens, simplified on medium */}
          <div className="hidden sm:flex h-8 lg:h-10 items-end space-x-1">
            {[40, 55, 35, 70, 45, 80, 65, 90, 75, 85].map((height, i) => (
              <div 
                key={i} 
                className="w-1 lg:w-1.5 bg-gradient-to-t from-emerald-400/80 to-blue-400/80 rounded-sm"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
