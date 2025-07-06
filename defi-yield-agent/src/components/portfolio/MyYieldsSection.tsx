
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Clock } from 'lucide-react';
import { UserPosition } from '@/services/portfolioIntegration';

interface MyYieldsSectionProps {
  positions: UserPosition[];
  isExpanded: boolean;
  onToggle: () => void;
}

export const MyYieldsSection = ({ positions, isExpanded, onToggle }: MyYieldsSectionProps) => {
  const totalValue = positions.reduce((sum, pos) => sum + pos.currentValue, 0);
  const totalYield = positions.reduce((sum, pos) => sum + pos.yieldEarned, 0);
  const weightedApy = positions.reduce((sum, pos) => {
    return sum + (pos.currentApy * pos.currentValue / totalValue);
  }, 0);

  return (
    <Card className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border-emerald-400/30 hover:bg-emerald-500/15 transition-all duration-300">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={onToggle}>
          <h3 className="text-xl font-semibold text-white flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-emerald-400" />
            My Active Positions
          </h3>
          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30">
              {positions.length} positions
            </Badge>
            <span className="text-emerald-400 text-lg font-bold">
              {weightedApy.toFixed(1)}% avg
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-blue-200 text-sm">Total Value</p>
            <p className="text-white text-lg font-bold">${totalValue.toLocaleString()}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-blue-200 text-sm">Total Yield Earned</p>
            <p className="text-emerald-400 text-lg font-bold">+${totalYield.toLocaleString()}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-blue-200 text-sm">Portfolio APY</p>
            <p className="text-white text-lg font-bold">{weightedApy.toFixed(1)}%</p>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-3">
            {positions.map((position, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h4 className="text-white font-medium">{position.protocol}</h4>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                      {position.chain}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-semibold">{position.currentApy.toFixed(1)}%</p>
                    <p className="text-blue-200 text-sm">${position.currentValue.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <p className="text-blue-300">Invested</p>
                    <p className="text-white font-medium">${position.invested.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-blue-300">Yield Earned</p>
                    <p className="text-emerald-400 font-medium">+${position.yieldEarned.toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-blue-300">Days Active</p>
                    <p className="text-white font-medium">
                      {Math.floor((Date.now() - position.entryDate.getTime()) / (1000 * 60 * 60 * 24))}d
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-300">Risk Level</p>
                    <Badge className={`text-xs ${
                      position.riskLevel === 'Low' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30' :
                      position.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30' :
                      'bg-red-500/20 text-red-400 border-red-400/30'
                    }`}>
                      {position.riskLevel}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
