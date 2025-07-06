
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity, Shield, Zap, AlertTriangle } from 'lucide-react';

interface AnalyticsMetrics {
  sharpeRatio: number;
  volatility: number;
  maxDrawdown: number;
  riskAdjustedReturn: number;
  yieldAttribution: {
    protocol: number;
    market: number;
  };
}

interface AnalyticsDashboardProps {
  metrics: AnalyticsMetrics;
}

export const AnalyticsDashboard = ({ metrics }: AnalyticsDashboardProps) => {
  const getRiskLevel = (volatility: number) => {
    if (volatility < 10) return { level: 'Low', color: 'emerald', icon: Shield };
    if (volatility < 20) return { level: 'Medium', color: 'yellow', icon: Activity };
    return { level: 'High', color: 'red', icon: AlertTriangle };
  };

  const riskInfo = getRiskLevel(metrics.volatility);
  const RiskIcon = riskInfo.icon;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Sharpe Ratio */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-400/30 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <TrendingUp className="h-5 w-5 text-blue-400" />
          </div>
          <Badge className={`${
            metrics.sharpeRatio > 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {metrics.sharpeRatio > 1 ? 'Excellent' : 'Good'}
          </Badge>
        </div>
        <div className="space-y-1">
          <h3 className="text-white font-semibold">Sharpe Ratio</h3>
          <p className="text-2xl font-bold text-blue-400">{metrics.sharpeRatio.toFixed(2)}</p>
          <p className="text-xs text-slate-400">Risk-adjusted returns</p>
        </div>
      </Card>

      {/* Volatility */}
      <Card className={`bg-gradient-to-br from-${riskInfo.color}-500/10 to-${riskInfo.color}-600/10 border-${riskInfo.color}-400/30 p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 bg-${riskInfo.color}-500/20 rounded-lg`}>
            <RiskIcon className={`h-5 w-5 text-${riskInfo.color}-400`} />
          </div>
          <Badge className={`bg-${riskInfo.color}-500/20 text-${riskInfo.color}-400`}>
            {riskInfo.level} Risk
          </Badge>
        </div>
        <div className="space-y-1">
          <h3 className="text-white font-semibold">Volatility</h3>
          <p className={`text-2xl font-bold text-${riskInfo.color}-400`}>{metrics.volatility.toFixed(1)}%</p>
          <p className="text-xs text-slate-400">30-day annualized</p>
        </div>
      </Card>

      {/* Max Drawdown */}
      <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-400/30 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <TrendingDown className="h-5 w-5 text-red-400" />
          </div>
          <Badge className={`${
            metrics.maxDrawdown < 5 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {metrics.maxDrawdown < 5 ? 'Low' : 'High'}
          </Badge>
        </div>
        <div className="space-y-1">
          <h3 className="text-white font-semibold">Max Drawdown</h3>
          <p className="text-2xl font-bold text-red-400">-{metrics.maxDrawdown.toFixed(1)}%</p>
          <p className="text-xs text-slate-400">Largest peak-to-trough decline</p>
        </div>
      </Card>

      {/* Risk-Adjusted Return */}
      <Card className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-400/30 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <Zap className="h-5 w-5 text-emerald-400" />
          </div>
          <Badge className="bg-emerald-500/20 text-emerald-400">
            Optimized
          </Badge>
        </div>
        <div className="space-y-1">
          <h3 className="text-white font-semibold">Risk-Adjusted Return</h3>
          <p className="text-2xl font-bold text-emerald-400">{metrics.riskAdjustedReturn.toFixed(1)}%</p>
          <p className="text-xs text-slate-400">Return per unit of risk</p>
        </div>
      </Card>

      {/* Yield Attribution */}
      <Card className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border-purple-400/30 p-4 md:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Yield Attribution</h3>
          <Badge className="bg-purple-500/20 text-purple-400">
            Analysis
          </Badge>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Protocol Selection</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-slate-700 rounded-full h-2">
                <div 
                  className="h-2 bg-purple-400 rounded-full" 
                  style={{ width: `${metrics.yieldAttribution.protocol}%` }}
                />
              </div>
              <span className="text-purple-400 font-semibold">{metrics.yieldAttribution.protocol}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Market Performance</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-slate-700 rounded-full h-2">
                <div 
                  className="h-2 bg-blue-400 rounded-full" 
                  style={{ width: `${metrics.yieldAttribution.market}%` }}
                />
              </div>
              <span className="text-blue-400 font-semibold">{metrics.yieldAttribution.market}%</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
