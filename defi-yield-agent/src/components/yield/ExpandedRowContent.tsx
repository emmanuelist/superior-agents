
import { TableCell, TableRow } from '@/components/ui/table';
import { TrendingUp, Info } from 'lucide-react';
import { YieldChart } from '../YieldChart';
import { GasCostAnalyzer } from '../GasCostAnalyzer';

interface YieldData {
  protocol: string;
  chain: string;
  apy: number;
  change: number;
  tvl: string;
  tvlNumeric: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  volatility: number;
  gasScore: number;
  userPosition?: any;
}

interface ExpandedRowContentProps {
  protocol: YieldData;
  userAddress?: string;
  generateHistoricalData: (apy: number, volatility: number) => any[];
}

export const ExpandedRowContent = ({ 
  protocol, 
  userAddress, 
  generateHistoricalData 
}: ExpandedRowContentProps) => {
  return (
    <TableRow className="border-white/10">
      <TableCell colSpan={userAddress ? 9 : 8} className="p-0">
        <div className="p-4 bg-white/5 space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <YieldChart
              data={generateHistoricalData(protocol.apy, protocol.volatility)}
              protocol={protocol.protocol}
              currentApy={protocol.apy}
            />
            <div className="space-y-3">
              <h5 className="text-white font-medium flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-300" />
                Gas Cost Analysis
              </h5>
              <GasCostAnalyzer
                chain={protocol.chain}
                apy={protocol.apy}
                tvl={protocol.tvlNumeric}
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                  <p className="text-blue-200 text-sm">Volatility</p>
                  <p className="text-white font-semibold">{(protocol.volatility * 100).toFixed(1)}%</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                  <p className="text-blue-200 text-sm">Gas Efficiency</p>
                  <p className="text-white font-semibold">{protocol.gasScore}/10</p>
                </div>
              </div>
              {protocol.userPosition && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 mt-4 hover:bg-emerald-500/15 transition-colors">
                  <p className="text-emerald-400 font-medium mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Your Position
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-blue-300">Amount</p>
                      <p className="text-white font-semibold">${protocol.userPosition.currentValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-blue-300">Yield Earned</p>
                      <p className="text-emerald-400 font-semibold">+${protocol.userPosition.yieldEarned.toFixed(0)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};
