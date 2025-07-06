
import { useState } from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { TooltipProvider } from '@/components/ui/tooltip';
import { YieldTableHeader } from './YieldTableHeader';
import { YieldTableRow } from './YieldTableRow';
import { ExpandedRowContent } from './ExpandedRowContent';
import { PositionManagementModal } from '../portfolio/PositionManagementModal';
import { TableSkeleton } from '@/components/ui/loading/TableSkeleton';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Plus, Minus } from 'lucide-react';
import { RiskAnalyzer } from '../RiskAnalyzer';
import { useIsMobile } from '@/hooks/use-mobile';

type SortField = 'protocol' | 'chain' | 'apy' | 'change' | 'tvl';
type SortDirection = 'asc' | 'desc';

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

interface YieldTableProps {
  data: YieldData[];
  userAddress?: string;
  sortField: SortField;
  sortDirection: SortDirection;
  expandedRows: Set<number>;
  onSort: (field: SortField) => void;
  onToggleExpansion: (index: number) => void;
  generateHistoricalData: (apy: number, volatility: number) => any[];
  isLoading?: boolean;
}

const MobileYieldCard = ({ 
  protocol, 
  index, 
  userAddress, 
  isExpanded, 
  onToggleExpansion, 
  onPositionAction 
}: {
  protocol: YieldData;
  index: number;
  userAddress?: string;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  onPositionAction: (protocol: YieldData) => void;
}) => (
  <Card 
    className={`card-compact transition-all duration-200 ${
      protocol.userPosition ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/10 border-white/20'
    } hover:bg-white/15`}
  >
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-responsive-base font-semibold text-white truncate">{protocol.protocol}</h3>
            {protocol.userPosition && (
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-400/30 text-2xs">
                Active
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-2xs">
              {protocol.chain}
            </Badge>
            <RiskAnalyzer
              protocol={protocol.protocol}
              riskLevel={protocol.riskLevel}
              tvl={protocol.tvlNumeric}
              apy={protocol.apy}
              volatility={protocol.volatility}
            />
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleExpansion}
          className="touch-target ml-2"
        >
          {isExpanded ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div>
          <div className="text-responsive-xs text-blue-200 mb-1">APY</div>
          <div className="text-responsive-base font-semibold text-emerald-400">
            {protocol.apy.toFixed(1)}%
          </div>
        </div>
        <div>
          <div className="text-responsive-xs text-blue-200 mb-1">24h Change</div>
          <div className={`text-responsive-sm font-medium flex items-center ${
            protocol.change >= 0 ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {protocol.change >= 0 ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            {protocol.change >= 0 ? '+' : ''}{protocol.change.toFixed(1)}%
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <div className="text-responsive-xs text-blue-200 mb-1">TVL</div>
          <div className="text-responsive-sm text-white font-mono">
            ${protocol.tvl}
          </div>
        </div>
      </div>

      {/* Position Info */}
      {protocol.userPosition && (
        <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
          <div className="text-responsive-xs text-emerald-400 mb-1">Your Position</div>
          <div className="text-responsive-sm text-white">
            ${protocol.userPosition.currentValue.toLocaleString()} invested
          </div>
          <div className="text-responsive-xs text-emerald-300">
            Current APY: {protocol.userPosition.currentApy.toFixed(1)}%
          </div>
        </div>
      )}

      {/* Actions */}
      {userAddress && (
        <div className="flex gap-2">
          {protocol.userPosition ? (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onPositionAction(protocol)}
                className="flex-1 touch-target"
              >
                <Minus className="h-4 w-4 mr-1" />
                Withdraw
              </Button>
              <Button
                size="sm"
                onClick={() => onPositionAction(protocol)}
                className="flex-1 touch-target"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add More
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              onClick={() => onPositionAction(protocol)}
              className="w-full touch-target"
            >
              Stake
            </Button>
          )}
        </div>
      )}
    </div>
  </Card>
);

export const YieldTable = ({
  data,
  userAddress,
  sortField,
  sortDirection,
  expandedRows,
  onSort,
  onToggleExpansion,
  generateHistoricalData,
  isLoading = false
}: YieldTableProps) => {
  const [selectedProtocol, setSelectedProtocol] = useState<YieldData | null>(null);
  const isMobile = useIsMobile();

  if (isLoading) {
    return <TableSkeleton rows={8} showUserColumn={!!userAddress} />;
  }

  const handlePositionAction = (protocol: YieldData) => {
    setSelectedProtocol(protocol);
  };

  // Mobile card view
  if (isMobile) {
    return (
      <TooltipProvider>
        <div className="space-responsive-sm">
          {data.map((protocol, index) => (
            <div key={index}>
              <MobileYieldCard
                protocol={protocol}
                index={index}
                userAddress={userAddress}
                isExpanded={expandedRows.has(index)}
                onToggleExpansion={() => onToggleExpansion(index)}
                onPositionAction={handlePositionAction}
              />
              {expandedRows.has(index) && (
                <div className="mt-4">
                  <ExpandedRowContent
                    key={`expanded-${index}`}
                    protocol={protocol}
                    userAddress={userAddress}
                    generateHistoricalData={generateHistoricalData}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedProtocol && (
          <PositionManagementModal
            isOpen={!!selectedProtocol}
            onClose={() => setSelectedProtocol(null)}
            protocol={selectedProtocol}
          />
        )}
      </TooltipProvider>
    );
  }

  // Desktop table view
  return (
    <TooltipProvider>
      <div className="table-scroll">
        <Table className="min-w-full">
          <YieldTableHeader
            userAddress={userAddress}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <TableBody>
            {data.map((protocol, index) => (
              <>
                <YieldTableRow
                  key={index}
                  protocol={protocol}
                  index={index}
                  userAddress={userAddress}
                  isExpanded={expandedRows.has(index)}
                  onToggleExpansion={() => onToggleExpansion(index)}
                  onPositionAction={handlePositionAction}
                />
                {expandedRows.has(index) && (
                  <ExpandedRowContent
                    key={`expanded-${index}`}
                    protocol={protocol}
                    userAddress={userAddress}
                    generateHistoricalData={generateHistoricalData}
                  />
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedProtocol && (
        <PositionManagementModal
          isOpen={!!selectedProtocol}
          onClose={() => setSelectedProtocol(null)}
          protocol={selectedProtocol}
        />
      )}
    </TooltipProvider>
  );
};
