
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { OptimizationRecommendation } from '@/services/portfolioIntegration';
import { ArrowRight, TrendingUp, Zap, AlertTriangle } from 'lucide-react';

interface OptimizationRecommendationsProps {
  recommendations: OptimizationRecommendation[];
}

export const OptimizationRecommendations = ({ recommendations }: OptimizationRecommendationsProps) => {
  if (recommendations.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <div className="p-4 sm:p-6 text-center">
          <TrendingUp className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Portfolio Optimized!</h3>
          <p className="text-blue-200">Your current positions are well optimized. No immediate actions needed.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-400/30 hover:bg-yellow-500/15 transition-all duration-300">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-400" />
            Optimization Opportunities
          </h3>
          <Badge className="bg-yellow-400/20 text-yellow-300 border-yellow-400/30">
            {recommendations.length} found
          </Badge>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${
                    rec.confidence === 'high' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30' :
                    rec.confidence === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30' :
                    'bg-gray-500/20 text-gray-400 border-gray-400/30'
                  }`}>
                    {rec.confidence} confidence
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs">
                    {rec.type}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-bold">+${rec.potentialGain.toFixed(0)}</p>
                  <p className="text-blue-200 text-sm">potential gain</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1">
                  <p className="text-white font-medium">{rec.fromProtocol}</p>
                  <p className="text-blue-200 text-sm">{rec.currentApy.toFixed(1)}% APY</p>
                </div>
                <ArrowRight className="h-4 w-4 text-yellow-400" />
                <div className="flex-1">
                  <p className="text-white font-medium">{rec.toProtocol}</p>
                  <p className="text-emerald-400 text-sm">{rec.newApy.toFixed(1)}% APY</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-3">
                <div>
                  <p className="text-blue-300">Amount</p>
                  <p className="text-white font-medium">${rec.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-blue-300">APY Improvement</p>
                  <p className="text-emerald-400 font-medium">+{(rec.newApy - rec.currentApy).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-blue-300">Gas Cost</p>
                  <p className="text-white font-medium">${rec.gasCost}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  {rec.riskChange !== 'same' && (
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-yellow-400" />
                      <span className="text-yellow-400">Risk {rec.riskChange}</span>
                    </div>
                  )}
                </div>
                <Button 
                  size="sm" 
                  className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border-yellow-400/30"
                >
                  Execute
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
