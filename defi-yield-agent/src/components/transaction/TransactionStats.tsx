
import { Card } from '@/components/ui/card';

interface TransactionStatsProps {
  totalTransactions: number;
  avgGasCost: string;
  autoRebalances: number;
  crossChainOps: number;
}

export const TransactionStats = ({
  totalTransactions,
  avgGasCost,
  autoRebalances,
  crossChainOps
}: TransactionStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{totalTransactions}</p>
          <p className="text-sm text-blue-200">Total Transactions</p>
        </div>
      </Card>
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-400">{avgGasCost}</p>
          <p className="text-sm text-blue-200">Avg Gas Cost</p>
        </div>
      </Card>
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-400">{autoRebalances}</p>
          <p className="text-sm text-blue-200">Auto Rebalances</p>
        </div>
      </Card>
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-400">{crossChainOps}</p>
          <p className="text-sm text-blue-200">Cross-Chain Ops</p>
        </div>
      </Card>
    </div>
  );
};
