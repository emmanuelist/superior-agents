
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy, ExternalLink, MoreHorizontal, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

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

interface TransactionTableProps {
  transactions: Transaction[];
  onViewDetails: (transaction: Transaction) => void;
}

export const TransactionTable = ({ transactions, onViewDetails }: TransactionTableProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <div className="p-6">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-slate-300">Type</TableHead>
              <TableHead className="text-slate-300">Description</TableHead>
              <TableHead className="text-slate-300">From/To</TableHead>
              <TableHead className="text-slate-300 text-right">Amount</TableHead>
              <TableHead className="text-slate-300">Date</TableHead>
              <TableHead className="text-slate-300">Status</TableHead>
              <TableHead className="text-slate-300 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow 
                key={tx.id} 
                className="border-white/10 hover:bg-white/5 cursor-pointer"
                onClick={() => onViewDetails(tx)}
              >
                <TableCell className="text-white">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(tx.type)}
                    <Badge variant="outline" className="text-xs text-blue-300 border-blue-300/30">
                      {tx.type}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-white font-medium max-w-64">
                  <div className="truncate" title={tx.description}>
                    {tx.description}
                  </div>
                </TableCell>
                <TableCell className="text-slate-300">
                  <div className="text-xs">
                    <div className="truncate max-w-24" title={tx.from}>{tx.from}</div>
                    <div className="text-slate-400">→</div>
                    <div className="truncate max-w-24" title={tx.to}>{tx.to}</div>
                  </div>
                </TableCell>
                <TableCell className="text-white font-semibold text-right">
                  ${tx.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-slate-300 text-sm">
                  {formatDate(tx.timestamp)}
                </TableCell>
                <TableCell>
                  <Badge className="bg-emerald-400/20 text-emerald-300 text-xs">
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(tx.txHash);
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
                        window.open(`https://etherscan.io/tx/${tx.txHash}`, '_blank');
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
                        onViewDetails(tx);
                      }}
                      className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                    >
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
