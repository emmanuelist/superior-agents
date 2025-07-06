
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, ChevronDown, ChevronRight, Plus, Minus } from 'lucide-react';
import { RiskAnalyzer } from '../RiskAnalyzer';

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

interface YieldTableRowProps {
  protocol: YieldData;
  index: number;
  userAddress?: string;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  onPositionAction: (protocol: YieldData) => void;
}

export const YieldTableRow = ({ 
  protocol, 
  index, 
  userAddress, 
  isExpanded, 
  onToggleExpansion, 
  onPositionAction 
}: YieldTableRowProps) => {
  return (
    <TableRow 
      className={`border-white/10 hover:bg-white/5 transition-all duration-200 group ${
        protocol.userPosition ? 'bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10' : ''
      }`}
    >
      <TableCell>
        <button
          onClick={onToggleExpansion}
          className="text-blue-300 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </TableCell>
      {userAddress && (
        <TableCell className="text-center">
          {protocol.userPosition && (
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-400/30 text-xs animate-pulse">
              Active
            </Badge>
          )}
        </TableCell>
      )}
      <TableCell className="text-white font-medium">
        <div className="min-w-0">
          <p className="truncate">{protocol.protocol}</p>
          {protocol.userPosition && (
            <p className="text-xs text-emerald-400 truncate">
              ${protocol.userPosition.currentValue.toLocaleString()} invested
            </p>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 hover:bg-blue-500/30 transition-colors">
          {protocol.chain}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="text-emerald-400 font-semibold text-base">
          {protocol.apy.toFixed(1)}%
        </div>
        {protocol.userPosition && (
          <p className="text-xs text-blue-200">
            vs {protocol.userPosition.currentApy.toFixed(1)}% current
          </p>
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className={`flex items-center justify-end transition-colors ${
          protocol.change >= 0 ? 'text-emerald-400' : 'text-red-400'
        }`}>
          {protocol.change >= 0 ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          {protocol.change >= 0 ? '+' : ''}{protocol.change.toFixed(1)}%
        </div>
      </TableCell>
      <TableCell className="text-right text-blue-200 font-mono">
        ${protocol.tvl}
      </TableCell>
      <TableCell className="text-center">
        <RiskAnalyzer
          protocol={protocol.protocol}
          riskLevel={protocol.riskLevel}
          tvl={protocol.tvlNumeric}
          apy={protocol.apy}
          volatility={protocol.volatility}
        />
      </TableCell>
      {userAddress && (
        <TableCell className="text-center">
          <div className="flex gap-1">
            {protocol.userPosition ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onPositionAction(protocol)}
                  className="px-2 py-1 text-xs"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => onPositionAction(protocol)}
                  className="px-2 py-1 text-xs"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={() => onPositionAction(protocol)}
                className="px-3 py-1 text-xs w-full"
              >
                Stake
              </Button>
            )}
          </div>
        </TableCell>
      )}
    </TableRow>
  );
};
