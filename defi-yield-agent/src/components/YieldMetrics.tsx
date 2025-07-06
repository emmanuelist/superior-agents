
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Shield, Zap, BarChart3 } from 'lucide-react';

interface YieldData {
  protocol: string;
  chain: string;
  apy: number;
  change: number;
  tvl: string;
  tvlNumeric: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  volatility?: number;
  gasScore?: number;
}

interface YieldMetricsProps {
  data: YieldData[];
}

export const YieldMetrics = ({ data }: YieldMetricsProps) => {
  const avgApy = data.reduce((sum, item) => sum + item.apy, 0) / data.length;
  const totalTvl = data.reduce((sum, item) => sum + item.tvlNumeric, 0);
  const riskDistribution = data.reduce((acc, item) => {
    acc[item.riskLevel] = (acc[item.riskLevel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topChain = data.reduce((acc, item) => {
    acc[item.chain] = (acc[item.chain] || 0) + item.apy;
    return acc;
  }, {} as Record<string, number>);

  const bestChain = Object.entries(topChain).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  const highYieldCount = data.filter(item => item.apy > 10).length;

  const formatTvl = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${(value / 1e3).toFixed(1)}K`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400/30 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-sm">Market Average APY</p>
            <p className="text-white text-2xl font-bold">{avgApy.toFixed(1)}%</p>
          </div>
          <BarChart3 className="h-8 w-8 text-blue-400" />
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-400/30 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-200 text-sm">Total Market TVL</p>
            <p className="text-white text-2xl font-bold">{formatTvl(totalTvl)}</p>
          </div>
          <DollarSign className="h-8 w-8 text-emerald-400" />
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400/30 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-200 text-sm">Top Chain</p>
            <p className="text-white text-xl font-bold">{bestChain}</p>
          </div>
          <Zap className="h-8 w-8 text-yellow-400" />
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border-red-400/30 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-200 text-sm">High Yield ({'>'}10%)</p>
            <p className="text-white text-2xl font-bold">{highYieldCount}</p>
          </div>
          <TrendingUp className="h-8 w-8 text-red-400" />
        </div>
      </Card>
    </div>
  );
};
