
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

type SortField = 'protocol' | 'chain' | 'apy' | 'change' | 'tvl';
type SortDirection = 'asc' | 'desc';

interface YieldFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedChain: string;
  setSelectedChain: (chain: string) => void;
  minApy: string;
  setMinApy: (apy: string) => void;
  maxApy: string;
  setMaxApy: (apy: string) => void;
  sortField: SortField;
  sortDirection: SortDirection;
  chains: string[];
  filteredDataLength: number;
  totalDataLength: number;
  userPositionsLength: number;
  userAddress?: string;
  viewMode: 'market' | 'personal';
  onClearFilters: () => void;
}

export const YieldFilters = ({
  searchTerm,
  setSearchTerm,
  selectedChain,
  setSelectedChain,
  minApy,
  setMinApy,
  maxApy,
  setMaxApy,
  sortField,
  sortDirection,
  chains,
  filteredDataLength,
  totalDataLength,
  userPositionsLength,
  userAddress,
  viewMode,
  onClearFilters
}: YieldFiltersProps) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const hasActiveFilters = searchTerm || selectedChain !== 'all' || minApy || maxApy;

  return (
    <>
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
        <div className="p-4 sm:p-6">
          {/* Main Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-4 w-4" />
                <Input
                  placeholder="Search protocols or chains..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300 focus:border-blue-400 transition-colors"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Mobile: Toggle Advanced Filters */}
            <div className="sm:hidden">
              <Button
                variant="outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="w-full border-white/20 text-blue-300 hover:text-white hover:bg-white/10"
              >
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
                {showAdvancedFilters ? (
                  <ChevronUp className="h-4 w-4 ml-2" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-2" />
                )}
              </Button>
            </div>
          </div>

          {/* Advanced Filters - Always visible on desktop, toggleable on mobile */}
          <div className={`${showAdvancedFilters ? 'block' : 'hidden'} sm:block`}>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6">
              <Select value={selectedChain} onValueChange={setSelectedChain}>
                <SelectTrigger className="w-full sm:w-[140px] bg-white/10 border-white/20 text-white hover:bg-white/15 transition-colors">
                  <SelectValue placeholder="Chain" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20 z-50">
                  {chains.map(chain => (
                    <SelectItem key={chain} value={chain} className="text-white hover:bg-white/10">
                      {chain === 'all' ? 'All Chains' : chain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <div className="relative">
                  <Input
                    placeholder="Min APY"
                    value={minApy}
                    onChange={(e) => setMinApy(e.target.value)}
                    className="w-20 sm:w-24 bg-white/10 border-white/20 text-white placeholder:text-blue-300 text-xs focus:border-blue-400 transition-colors"
                    type="number"
                    min="0"
                    step="0.1"
                  />
                  {minApy && (
                    <button
                      onClick={() => setMinApy('')}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Input
                    placeholder="Max APY"
                    value={maxApy}
                    onChange={(e) => setMaxApy(e.target.value)}
                    className="w-20 sm:w-24 bg-white/10 border-white/20 text-white placeholder:text-blue-300 text-xs focus:border-blue-400 transition-colors"
                    type="number"
                    min="0"
                    step="0.1"
                  />
                  {maxApy && (
                    <button
                      onClick={() => setMaxApy('')}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  onClick={onClearFilters}
                  className="text-blue-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="text-blue-200 text-sm">
                Showing <span className="font-semibold text-white">{filteredDataLength}</span> of{' '}
                <span className="font-semibold text-white">{totalDataLength}</span> protocols
              </p>
              {userAddress && viewMode === 'personal' && (
                <span className="text-emerald-400 text-sm font-medium">
                  ({userPositionsLength} active positions)
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-300">
              <Filter className="h-3 w-3" />
              <span>Sorted by {sortField} ({sortDirection})</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Enhanced Empty State */}
      {filteredDataLength === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <EmptyState
            title="No protocols found"
            description={
              hasActiveFilters
                ? "Try adjusting your filters or search terms to find what you're looking for."
                : "It looks like there are no yield protocols available at the moment."
            }
            action={{
              label: hasActiveFilters ? "Clear All Filters" : "Refresh Data",
              onClick: onClearFilters
            }}
            type={hasActiveFilters ? "filter" : "search"}
          />
        </Card>
      )}
    </>
  );
};
