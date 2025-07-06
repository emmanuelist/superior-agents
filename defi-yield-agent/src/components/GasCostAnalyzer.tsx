
import { Badge } from '@/components/ui/badge';
import { Fuel, TrendingUp, TrendingDown } from 'lucide-react';

interface GasCostProps {
  chain: string;
  apy: number;
  tvl: number;
}

export const GasCostAnalyzer = ({ chain, apy, tvl }: GasCostProps) => {
  // Mock gas cost calculations based on chain
  const getGasCosts = (chain: string) => {
    const costs = {
      'Ethereum': { entry: 45, exit: 35, daily: 0.12 },
      'Polygon': { entry: 2, exit: 1.5, daily: 0.008 },
      'Arbitrum': { entry: 8, exit: 6, daily: 0.02 },
    };
    return costs[chain as keyof typeof costs] || { entry: 20, exit: 15, daily: 0.05 };
  };

  const gasCosts = getGasCosts(chain);
  const netApy = apy - (gasCosts.daily * 365 / 100); // Rough calculation
  const breakEvenDays = Math.ceil((gasCosts.entry + gasCosts.exit) / (apy / 365 * 100));

  const getGasEfficiency = () => {
    if (netApy > apy * 0.9) return { label: 'Excellent', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30' };
    if (netApy > apy * 0.8) return { label: 'Good', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30' };
    return { label: 'Poor', color: 'bg-red-500/20 text-red-400 border-red-400/30' };
  };

  const efficiency = getGasEfficiency();

  return (
    <div className="flex items-center gap-2 text-xs">
      <Fuel className="h-3 w-3 text-blue-300" />
      <Badge className={efficiency.color}>
        {efficiency.label}
      </Badge>
      <span className="text-blue-200">
        Net: {netApy.toFixed(1)}%
      </span>
      <span className="text-blue-300">
        Break-even: {breakEvenDays}d
      </span>
    </div>
  );
};
