
import { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { TimelineView } from '@/components/transaction/TimelineView';
import { TransactionAnalytics } from '@/components/transaction/TransactionAnalytics';
import { AdvancedFilters } from '@/components/transaction/AdvancedFilters';
import { TransactionDetailsModal } from '@/components/transaction/TransactionDetailsModal';
import { TransactionStats } from '@/components/transaction/TransactionStats';
import { TransactionViewControls } from '@/components/transaction/TransactionViewControls';
import { TransactionListView } from '@/components/transaction/TransactionListView';

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

interface TransactionHistoryProps {
  userAddress: string;
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

export const TransactionHistory = ({ userAddress }: TransactionHistoryProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: 'all',
    status: 'all',
    dateRange: { from: '', to: '' },
    amountRange: { min: '', max: '' },
    gasRange: { min: '', max: '' }
  });
  
  const [savedPresets, setSavedPresets] = useState<Array<{ name: string; filters: FilterState }>>([
    { name: 'High Value', filters: { ...filters, amountRange: { min: '1000', max: '' } } },
    { name: 'Recent', filters: { ...filters, dateRange: { from: '2024-01-10', to: '' } } }
  ]);
  
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('list');
  const [listViewMode, setListViewMode] = useState<'cards' | 'table'>('cards');

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'rebalance',
      description: 'Rebalanced portfolio to higher yield protocols',
      amount: 8500,
      from: 'Compound USDT',
      to: 'Aave USDC',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'completed',
      txHash: '0x1234...5678',
      gasUsed: 0.0023,
    },
    {
      id: '2',
      type: 'top-up',
      description: 'Auto top-up MetaMask Card',
      amount: 100,
      from: 'Emergency Buffer',
      to: 'MetaMask Card',
      timestamp: '2024-01-14T15:45:00Z',
      status: 'completed',
      txHash: '0x2345...6789',
      gasUsed: 0.0018,
    },
    {
      id: '3',
      type: 'bridge',
      description: 'Cross-chain transfer for better yield',
      amount: 3000,
      from: 'Ethereum',
      to: 'Arbitrum',
      timestamp: '2024-01-13T09:15:00Z',
      status: 'completed',
      txHash: '0x3456...7890',
      gasUsed: 0.0045,
    },
    {
      id: '4',
      type: 'deposit',
      description: 'Deposited into Yearn DAI vault',
      amount: 2720.50,
      from: 'Wallet',
      to: 'Yearn Finance',
      timestamp: '2024-01-12T14:20:00Z',
      status: 'completed',
      txHash: '0x4567...8901',
      gasUsed: 0.0032,
    },
    {
      id: '5',
      type: 'rebalance',
      description: 'Emergency rebalance due to protocol risk',
      amount: 5000,
      from: 'High Risk Protocol',
      to: 'Aave USDC',
      timestamp: '2024-01-11T08:00:00Z',
      status: 'completed',
      txHash: '0x5678...9012',
      gasUsed: 0.0041,
    },
  ];

  const applyFilters = (transactionList: Transaction[]) => {
    return transactionList.filter(tx => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        if (!tx.description.toLowerCase().includes(searchTerm) &&
            !tx.from.toLowerCase().includes(searchTerm) &&
            !tx.to.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }

      // Type filter
      if (filters.type !== 'all' && tx.type !== filters.type) return false;

      // Status filter  
      if (filters.status !== 'all' && tx.status !== filters.status) return false;

      // Date range filter
      if (filters.dateRange.from || filters.dateRange.to) {
        const txDate = new Date(tx.timestamp);
        if (filters.dateRange.from && txDate < new Date(filters.dateRange.from)) return false;
        if (filters.dateRange.to && txDate > new Date(filters.dateRange.to)) return false;
      }

      // Amount range filter
      if (filters.amountRange.min && tx.amount < parseFloat(filters.amountRange.min)) return false;
      if (filters.amountRange.max && tx.amount > parseFloat(filters.amountRange.max)) return false;

      // Gas range filter
      if (filters.gasRange.min && tx.gasUsed < parseFloat(filters.gasRange.min)) return false;
      if (filters.gasRange.max && tx.gasUsed > parseFloat(filters.gasRange.max)) return false;

      return true;
    });
  };

  const filteredTransactions = applyFilters(transactions);

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSavePreset = (name: string, filters: FilterState) => {
    setSavedPresets(prev => [...prev.filter(p => p.name !== name), { name, filters }]);
  };

  const handleLoadPreset = (presetFilters: FilterState) => {
    setFilters(presetFilters);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    console.log(`Exporting ${filteredTransactions.length} transactions as ${format.toUpperCase()}`);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      status: 'all',
      dateRange: { from: '', to: '' },
      amountRange: { min: '', max: '' },
      gasRange: { min: '', max: '' }
    });
  };

  return (
    <div className="space-y-6">
      {/* Transaction Stats */}
      <TransactionStats
        totalTransactions={transactions.length}
        avgGasCost="$0.08"
        autoRebalances={12}
        crossChainOps={5}
      />

      {/* Advanced Filters */}
      <AdvancedFilters
        filters={filters}
        onFiltersChange={setFilters}
        onSavePreset={handleSavePreset}
        savedPresets={savedPresets}
        onLoadPreset={handleLoadPreset}
      />

      {/* View Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
        <TransactionViewControls
          activeView={activeView}
          listViewMode={listViewMode}
          onListViewModeChange={setListViewMode}
          onExport={handleExport}
        />

        <TabsContent value="list" className="space-y-4">
          <TransactionListView
            filteredTransactions={filteredTransactions}
            totalTransactions={transactions.length}
            listViewMode={listViewMode}
            onViewDetails={handleViewDetails}
            onClearFilters={handleClearFilters}
          />
        </TabsContent>

        <TabsContent value="timeline">
          <TimelineView transactions={filteredTransactions} />
        </TabsContent>

        <TabsContent value="analytics">
          <TransactionAnalytics transactions={filteredTransactions} />
        </TabsContent>
      </Tabs>

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        transaction={selectedTransaction}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTransaction(null);
        }}
      />
    </div>
  );
};
