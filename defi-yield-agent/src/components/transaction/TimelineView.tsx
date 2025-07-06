
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, RotateCcw, Wallet, Calendar } from 'lucide-react';

interface Transaction {
  id: string;
  type: string;
  description: string;
  amount: number;
  from: string;
  to: string;
  timestamp: string;
  status: string;
  txHash: string;
  gasUsed: number;
}

interface TimelineViewProps {
  transactions: Transaction[];
}

export const TimelineView = ({ transactions }: TimelineViewProps) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'rebalance':
        return <RotateCcw className="h-4 w-4" />;
      case 'top-up':
        return <ArrowUp className="h-4 w-4" />;
      case 'bridge':
        return <ArrowDown className="h-4 w-4" />;
      case 'deposit':
        return <Wallet className="h-4 w-4" />;
      default:
        return <ArrowUp className="h-4 w-4" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'rebalance':
        return 'border-blue-400 text-blue-400';
      case 'top-up':
        return 'border-emerald-400 text-emerald-400';
      case 'bridge':
        return 'border-purple-400 text-purple-400';
      case 'deposit':
        return 'border-yellow-400 text-yellow-400';
      default:
        return 'border-gray-400 text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const groupByDate = (transactions: Transaction[]) => {
    const groups: { [key: string]: Transaction[] } = {};
    transactions.forEach(tx => {
      const date = new Date(tx.timestamp).toDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(tx);
    });
    return groups;
  };

  const groupedTransactions = groupByDate(transactions);

  return (
    <div className="space-y-6">
      {Object.entries(groupedTransactions).map(([date, txs]) => (
        <div key={date} className="relative">
          {/* Date Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20">
              <Calendar className="h-4 w-4 text-blue-300" />
              <span className="text-sm font-medium text-white">{date}</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
          </div>

          {/* Timeline Items */}
          <div className="relative pl-8">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/50 to-transparent"></div>
            
            <div className="space-y-4">
              {txs.map((tx, index) => {
                const { time } = formatDate(tx.timestamp);
                return (
                  <div key={tx.id} className="relative">
                    {/* Timeline Node */}
                    <div className={`absolute left-[-1.75rem] top-4 w-3 h-3 rounded-full border-2 bg-slate-900 ${getTransactionColor(tx.type)}`}></div>
                    
                    {/* Transaction Card */}
                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-200 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`p-2 rounded-lg bg-white/10 ${getTransactionColor(tx.type)}`}>
                            {getTransactionIcon(tx.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-white font-medium">{tx.description}</h4>
                              <Badge variant="outline" className="text-xs text-blue-200 border-blue-200/30">
                                {time}
                              </Badge>
                            </div>
                            <div className="text-sm text-blue-200 mb-2">
                              <span className="text-blue-300">{tx.from}</span>
                              <span className="mx-2">→</span>
                              <span className="text-blue-300">{tx.to}</span>
                            </div>
                            <div className="text-xs text-blue-300">
                              Gas: {tx.gasUsed} ETH
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">${tx.amount.toLocaleString()}</p>
                          <Badge className="bg-emerald-400/20 text-emerald-300 text-xs">
                            {tx.status}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
