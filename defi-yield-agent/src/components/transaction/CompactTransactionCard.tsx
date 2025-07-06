
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink, TrendingUp, TrendingDown, AlertTriangle, MoreHorizontal } from 'lucide-react';

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

interface CompactTransactionCardProps {
  transaction: Transaction;
  onViewDetails: (transaction: Transaction) => void;
}

export const CompactTransactionCard = ({ transaction, onViewDetails }: CompactTransactionCardProps) => {
  const [showActions, setShowActions] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'rebalance':
        return <TrendingUp className="h-3 w-3 text-emerald-400" />;
      case 'bridge':
        return <AlertTriangle className="h-3 w-3 text-blue-400" />;
      case 'deposit':
        return <TrendingUp className="h-3 w-3 text-green-400" />;
      case 'top-up':
        return <TrendingDown className="h-3 w-3 text-orange-400" />;
      default:
        return <AlertTriangle className="h-3 w-3 text-gray-400" />;
    }
  };

  const { date, time } = formatDate(transaction.timestamp);

  return (
    <Card 
      className="bg-white/5 border-white/10 p-3 hover:bg-white/10 transition-all duration-200 cursor-pointer group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={() => onViewDetails(transaction)}
    >
      <div className="flex items-center justify-between">
        {/* Left side - Type icon, description, and flow */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="flex-shrink-0">
            {getTypeIcon(transaction.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h4 className="text-white font-medium text-sm truncate">
                {transaction.description}
              </h4>
              <Badge variant="outline" className="text-xs px-1.5 py-0.5 text-blue-300 border-blue-300/30">
                {transaction.type}
              </Badge>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-slate-400 truncate">{transaction.from}</span>
              <span className="text-xs text-slate-400">→</span>
              <span className="text-xs text-slate-400 truncate">{transaction.to}</span>
            </div>
          </div>
        </div>

        {/* Right side - Amount, date, and actions */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <div className="text-right">
            <p className="text-white font-semibold text-sm">${transaction.amount.toLocaleString()}</p>
            <p className="text-xs text-blue-200">{date} {time}</p>
          </div>

          <div className="flex items-center space-x-1">
            <Badge className="bg-emerald-400/20 text-emerald-300 text-xs px-2 py-0.5">
              {transaction.status}
            </Badge>
            
            {/* Quick Actions - Show on hover */}
            <div className={`flex items-center space-x-1 transition-opacity duration-200 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(transaction.txHash);
                }}
                className="h-6 w-6 p-0 text-slate-400 hover:text-white"
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`https://etherscan.io/tx/${transaction.txHash}`, '_blank');
                }}
                className="h-6 w-6 p-0 text-slate-400 hover:text-white"
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(transaction);
                }}
                className="h-6 w-6 p-0 text-slate-400 hover:text-white"
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
