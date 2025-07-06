
import { ArrowUpDown, Info } from 'lucide-react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type SortField = 'protocol' | 'chain' | 'apy' | 'change' | 'tvl';
type SortDirection = 'asc' | 'desc';

interface YieldTableHeaderProps {
  userAddress?: string;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export const YieldTableHeader = ({ userAddress, sortField, sortDirection, onSort }: YieldTableHeaderProps) => {
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 opacity-50" />;
    return (
      <ArrowUpDown 
        className={`h-3 w-3 ${sortDirection === 'asc' ? 'rotate-180' : ''} transition-transform`} 
      />
    );
  };

  return (
    <TableHeader>
      <TableRow className="border-white/20 hover:bg-transparent">
        <TableHead className="text-blue-200 font-medium w-8"></TableHead>
        {userAddress && (
          <TableHead className="text-blue-200 font-medium w-12 text-center">
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center justify-center gap-1">
                  Position
                  <Info className="h-3 w-3" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Shows if you have an active position in this protocol</p>
              </TooltipContent>
            </Tooltip>
          </TableHead>
        )}
        <TableHead 
          className="text-blue-200 font-medium cursor-pointer hover:text-white transition-colors"
          onClick={() => onSort('protocol')}
        >
          <div className="flex items-center gap-1">
            Protocol
            {getSortIcon('protocol')}
          </div>
        </TableHead>
        <TableHead 
          className="text-blue-200 font-medium cursor-pointer hover:text-white transition-colors"
          onClick={() => onSort('chain')}
        >
          <div className="flex items-center gap-1">
            Chain
            {getSortIcon('chain')}
          </div>
        </TableHead>
        <TableHead 
          className="text-blue-200 font-medium text-right cursor-pointer hover:text-white transition-colors"
          onClick={() => onSort('apy')}
        >
          <div className="flex items-center justify-end gap-1">
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1">
                  APY
                  <Info className="h-3 w-3" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Annual Percentage Yield - Expected yearly returns</p>
              </TooltipContent>
            </Tooltip>
            {getSortIcon('apy')}
          </div>
        </TableHead>
        <TableHead 
          className="text-blue-200 font-medium text-right cursor-pointer hover:text-white transition-colors"
          onClick={() => onSort('change')}
        >
          <div className="flex items-center justify-end gap-1">
            24h Change
            {getSortIcon('change')}
          </div>
        </TableHead>
        <TableHead 
          className="text-blue-200 font-medium text-right cursor-pointer hover:text-white transition-colors"
          onClick={() => onSort('tvl')}
        >
          <div className="flex items-center justify-end gap-1">
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1">
                  TVL
                  <Info className="h-3 w-3" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Total Value Locked - Amount of assets in the protocol</p>
              </TooltipContent>
            </Tooltip>
            {getSortIcon('tvl')}
          </div>
        </TableHead>
        <TableHead className="text-blue-200 font-medium text-center">
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center justify-center gap-1">
                Risk & Analytics
                <Info className="h-3 w-3" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Risk assessment and gas efficiency analysis</p>
            </TooltipContent>
          </Tooltip>
        </TableHead>
        {userAddress && (
          <TableHead className="text-blue-200 font-medium text-center w-32">
            Actions
          </TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
};
