
import { Badge } from '@/components/ui/badge';
import { CompactTransactionCard } from './CompactTransactionCard';
import { TransactionTable } from './TransactionTable';
import { EmptyState } from '@/components/ui/EmptyState';

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

interface FilterState {
  search: string;
  type: string;  
  status: string;
  dateRange: {
    from: string;
    to: string;
  };
  amountRange: {
    min: string;
    max: string;
  };
  gasRange: {
    min: string;
    max: string;
  };
}

interface TransactionListViewProps {
  filteredTransactions: Transaction[];
  totalTransactions: number;
  listViewMode: 'cards' | 'table';
  onViewDetails: (transaction: Transaction) => void;
  onClearFilters: () => void;
}

export const TransactionListView = ({
  filteredTransactions,
  totalTransactions,
  listViewMode,
  onViewDetails,
  onClearFilters
}: TransactionListViewProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Transaction History</h3>
        <Badge variant="outline" className="text-slate-300">
          {filteredTransactions.length} of {totalTransactions} transactions
        </Badge>
      </div>

      {listViewMode === 'cards' ? (
        <div className="space-y-2">
          {filteredTransactions.map((tx) => (
            <CompactTransactionCard
              key={tx.id}
              transaction={tx}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <TransactionTable
          transactions={filteredTransactions}
          onViewDetails={onViewDetails}
        />
      )}

      {filteredTransactions.length === 0 && (
        <EmptyState
          title="No transactions found"
          description="No transactions match your current filters. Try adjusting your search criteria."
          action={{
            label: 'Clear Filters',
            onClick: onClearFilters
          }}
          type="filter"
        />
      )}
    </div>
  );
};
