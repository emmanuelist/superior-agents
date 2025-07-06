
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowUpDown, TrendingUp, AlertTriangle, Calculator } from 'lucide-react';

interface PositionManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  protocol: {
    protocol: string;
    chain: string;
    apy: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    userPosition?: {
      currentValue: number;
      currentApy: number;
      yieldEarned: number;
    };
  };
}

export const PositionManagementModal = ({ isOpen, onClose, protocol }: PositionManagementModalProps) => {
  const [action, setAction] = useState<'stake' | 'unstake'>('stake');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const currentPosition = protocol.userPosition?.currentValue || 0;
  const projectedValue = action === 'stake' 
    ? currentPosition + parseFloat(amount || '0')
    : currentPosition - parseFloat(amount || '0');
  const projectedYield = (projectedValue * protocol.apy) / 100;

  const handleTransaction = async () => {
    setIsLoading(true);
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    onClose();
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-emerald-400 bg-emerald-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'High': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-slate-800 border-slate-600">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5 text-blue-400" />
            Manage Position
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            {protocol.protocol} on {protocol.chain}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Protocol Info */}
          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300 text-sm">Current APY</span>
              <span className="text-emerald-400 font-semibold">{protocol.apy}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-sm">Risk Level</span>
              <Badge className={getRiskColor(protocol.riskLevel)}>
                {protocol.riskLevel}
              </Badge>
            </div>
          </div>

          {/* Current Position */}
          {protocol.userPosition && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
              <h4 className="text-emerald-400 font-medium mb-2">Current Position</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-300">Amount</span>
                  <span className="text-white">${protocol.userPosition.currentValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Yield Earned</span>
                  <span className="text-emerald-400">+${protocol.userPosition.yieldEarned.toFixed(0)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Selection */}
          <div className="flex gap-2">
            <Button
              variant={action === 'stake' ? 'default' : 'outline'}
              onClick={() => setAction('stake')}
              className="flex-1"
            >
              Stake
            </Button>
            <Button
              variant={action === 'unstake' ? 'default' : 'outline'}
              onClick={() => setAction('unstake')}
              className="flex-1"
              disabled={!protocol.userPosition}
            >
              Unstake
            </Button>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-slate-300">
              Amount (USD)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
            />
            {action === 'unstake' && protocol.userPosition && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAmount(protocol.userPosition!.currentValue.toString())}
                className="w-full text-xs"
              >
                Max: ${protocol.userPosition.currentValue.toLocaleString()}
              </Button>
            )}
          </div>

          {/* Transaction Preview */}
          {amount && parseFloat(amount) > 0 && (
            <>
              <Separator className="bg-slate-600" />
              <div className="bg-slate-700/50 rounded-lg p-3">
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-blue-400" />
                  Transaction Preview
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">New Position</span>
                    <span className="text-white">${projectedValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Projected Annual Yield</span>
                    <span className="text-emerald-400">+${projectedYield.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Est. Gas Fee</span>
                    <span className="text-slate-300">~$5-15</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Warning for high risk */}
          {protocol.riskLevel === 'High' && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5" />
                <div>
                  <p className="text-red-400 font-medium text-sm">High Risk Protocol</p>
                  <p className="text-red-300 text-xs">This protocol has higher volatility and risk. Only invest what you can afford to lose.</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleTransaction}
              disabled={!amount || parseFloat(amount) <= 0 || isLoading}
              className="flex-1"
            >
              {isLoading ? 'Processing...' : `${action === 'stake' ? 'Stake' : 'Unstake'} ${amount && `$${parseFloat(amount).toLocaleString()}`}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
