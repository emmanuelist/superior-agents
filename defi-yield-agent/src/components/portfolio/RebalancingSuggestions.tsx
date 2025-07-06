
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, TrendingUp, ArrowRight, Zap } from 'lucide-react';

interface RebalancingSuggestionsProps {
  userPositions: any[];
  yieldData: any[];
}

interface RebalancingSuggestion {
  id: string;
  type: 'move' | 'add' | 'reduce';
  fromProtocol?: string;
  toProtocol: string;
  amount: number;
  reason: string;
  projectedIncrease: number;
  priority: 'low' | 'medium' | 'high';
}

export const RebalancingSuggestions = ({ userPositions, yieldData }: RebalancingSuggestionsProps) => {
  // Generate rebalancing suggestions
  const suggestions: RebalancingSuggestion[] = [
    {
      id: '1',
      type: 'move',
      fromProtocol: 'Compound USDT',
      toProtocol: 'Yearn DAI',
      amount: 2000,
      reason: 'Higher APY with similar risk profile',
      projectedIncrease: 168,
      priority: 'high'
    },
    {
      id: '2',
      type: 'reduce',
      toProtocol: 'Beefy Finance',
      amount: 1500,
      reason: 'Reduce high-risk exposure',
      projectedIncrease: 0,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'add',
      toProtocol: 'Lido stETH',
      amount: 3000,
      reason: 'Add stable Ethereum staking',
      projectedIncrease: 123,
      priority: 'low'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'move': return <ArrowRight className="h-4 w-4" />;
      case 'add': return <TrendingUp className="h-4 w-4" />;
      case 'reduce': return <RotateCcw className="h-4 w-4" />;
      default: return <RotateCcw className="h-4 w-4" />;
    }
  };

  const totalProjectedIncrease = suggestions.reduce((sum, s) => sum + s.projectedIncrease, 0);

  return (
    <Card className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/30">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            Rebalancing Suggestions
          </h3>
          {totalProjectedIncrease > 0 && (
            <Badge className="text-emerald-400 bg-emerald-400/20">
              +${totalProjectedIncrease}/year
            </Badge>
          )}
        </div>

        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id}
              className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/30 hover:border-slate-500/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-500/20 rounded text-blue-400">
                    {getTypeIcon(suggestion.type)}
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">
                      {suggestion.type === 'move' && `Move from ${suggestion.fromProtocol}`}
                      {suggestion.type === 'add' && `Add to ${suggestion.toProtocol}`}
                      {suggestion.type === 'reduce' && `Reduce ${suggestion.toProtocol}`}
                    </h4>
                    {suggestion.type === 'move' && (
                      <p className="text-slate-300 text-xs">to {suggestion.toProtocol}</p>
                    )}
                  </div>
                </div>
                <Badge className={getPriorityColor(suggestion.priority)}>
                  {suggestion.priority}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">Amount</span>
                  <span className="text-white font-medium">${suggestion.amount.toLocaleString()}</span>
                </div>
                
                {suggestion.projectedIncrease > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Projected Annual Increase</span>
                    <span className="text-emerald-400 font-medium">+${suggestion.projectedIncrease}</span>
                  </div>
                )}

                <p className="text-slate-300 text-xs mt-2">{suggestion.reason}</p>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  Details
                </Button>
                <Button size="sm" className="flex-1 text-xs">
                  {suggestion.type === 'move' ? 'Rebalance' : 
                   suggestion.type === 'add' ? 'Add Position' : 'Reduce'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {suggestions.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-600">
            <Button className="w-full" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Auto-Rebalance Portfolio
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
