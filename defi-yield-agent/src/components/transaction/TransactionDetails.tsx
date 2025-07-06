
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp, ExternalLink, Copy, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

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

interface TransactionDetailsProps {
  transaction: Transaction;
  expanded: boolean;
  onToggleExpand: () => void;
}

export const TransactionDetails = ({ transaction, expanded, onToggleExpand }: TransactionDetailsProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      full: date.toLocaleString()
    };
  };

  const getImpactAnalysis = () => {
    // Mock impact analysis based on transaction type
    switch (transaction.type) {
      case 'rebalance':
        return {
          impact: 'positive',
          description: 'Improved portfolio yield by 0.3% APY',
          risk: 'Reduced exposure to underperforming protocols',
          savings: '$12.50 in potential losses avoided'
        };
      case 'deposit':
        return {
          impact: 'positive',
          description: 'Increased total portfolio value',
          risk: 'Diversified risk across multiple protocols',
          savings: 'Earning $8.20/day in yield'
        };
      case 'bridge':
        return {
          impact: 'neutral',
          description: 'Optimized for better yield opportunities',
          risk: 'Cross-chain bridge exposure (temporary)',
          savings: 'Potential 2.1% higher APY on destination chain'
        };
      default:
        return {
          impact: 'positive',
          description: 'Portfolio optimization completed',
          risk: 'Maintained security standards',
          savings: 'Cost-effective execution'
        };
    }
  };

  const getGasOptimization = () => {
    const avgGas = 0.003; // Mock average gas cost
    const gasEfficiency = transaction.gasUsed < avgGas ? 'efficient' : 'standard';
    const savings = transaction.gasUsed < avgGas ? (avgGas - transaction.gasUsed) : 0;
    
    return {
      efficiency: gasEfficiency,
      savings: savings > 0 ? `Saved $${(savings * 2000).toFixed(2)}` : 'Standard cost',
      recommendation: gasEfficiency === 'efficient' ? 'Optimal timing' : 'Consider off-peak hours'
    };
  };

  const { date, time, full } = formatDate(transaction.timestamp);
  const impact = getImpactAnalysis();
  const gasOpt = getGasOptimization();

  return (
    <div className="space-y-2">
      {/* Main Transaction Row */}
      <div
        className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer"
        onClick={onToggleExpand}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="text-white font-medium">{transaction.description}</h4>
              <Badge 
                variant="outline" 
                className={
                  impact.impact === 'positive' ? 'text-emerald-300 border-emerald-300/30' :
                  impact.impact === 'negative' ? 'text-red-300 border-red-300/30' :
                  'text-blue-300 border-blue-300/30'
                }
              >
                {impact.impact === 'positive' && <TrendingUp className="h-3 w-3 mr-1" />}
                {impact.impact === 'negative' && <TrendingDown className="h-3 w-3 mr-1" />}
                {impact.impact === 'neutral' && <AlertTriangle className="h-3 w-3 mr-1" />}
                Impact
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-white font-semibold">${transaction.amount.toLocaleString()}</p>
              <p className="text-xs text-blue-200">{date} {time}</p>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-300">
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <Card className="bg-white/5 border-white/10 p-6 ml-4">
          <div className="space-y-6">
            {/* Transaction Info */}
            <div>
              <h5 className="text-lg font-semibold text-white mb-4">Transaction Details</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-200">From:</span>
                    <span className="text-white font-medium">{transaction.from}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">To:</span>
                    <span className="text-white font-medium">{transaction.to}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Type:</span>
                    <Badge variant="outline" className="text-blue-300 border-blue-300/30">
                      {transaction.type}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-200">Gas Used:</span>
                    <span className="text-white font-medium">{transaction.gasUsed} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Status:</span>
                    <Badge className="bg-emerald-400/20 text-emerald-300">
                      {transaction.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Timestamp:</span>
                    <span className="text-white font-medium text-sm">{full}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Impact Analysis */}
            <div>
              <h5 className="text-lg font-semibold text-white mb-4">Impact Analysis</h5>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className={`p-1 rounded ${
                    impact.impact === 'positive' ? 'bg-emerald-400/20' :
                    impact.impact === 'negative' ? 'bg-red-400/20' :
                    'bg-blue-400/20'
                  }`}>
                    {impact.impact === 'positive' && <TrendingUp className="h-4 w-4 text-emerald-400" />}
                    {impact.impact === 'negative' && <TrendingDown className="h-4 w-4 text-red-400" />}
                    {impact.impact === 'neutral' && <AlertTriangle className="h-4 w-4 text-blue-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{impact.description}</p>
                    <p className="text-blue-200 text-sm mt-1">{impact.risk}</p>
                    <p className="text-emerald-300 text-sm mt-1">{impact.savings}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Gas Optimization */}
            <div>
              <h5 className="text-lg font-semibold text-white mb-4">Gas Optimization</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-blue-200 text-sm">Efficiency</p>
                  <Badge 
                    variant="outline" 
                    className={gasOpt.efficiency === 'efficient' ? 'text-emerald-300 border-emerald-300/30' : 'text-yellow-300 border-yellow-300/30'}
                  >
                    {gasOpt.efficiency}
                  </Badge>
                </div>
                <div>
                  <p className="text-blue-200 text-sm">Savings</p>
                  <p className="text-white font-medium">{gasOpt.savings}</p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm">Recommendation</p>
                  <p className="text-blue-300 text-sm">{gasOpt.recommendation}</p>
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(transaction.txHash);
                }}
                className="text-white border-slate-600"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Copied!' : 'Copy Hash'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`https://etherscan.io/tx/${transaction.txHash}`, '_blank');
                }}
                className="text-white border-slate-600"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Etherscan
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
