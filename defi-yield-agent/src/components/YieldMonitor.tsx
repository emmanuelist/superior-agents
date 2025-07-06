
import { YieldMetrics } from './YieldMetrics';
import { ViewModeToggle } from './yield/ViewModeToggle';
import { TopOpportunities } from './yield/TopOpportunities';
import { YieldFilters } from './yield/YieldFilters';
import { YieldTable } from './yield/YieldTable';
import { MarketInsights } from './yield/MarketInsights';
import { MyYieldsSection } from './portfolio/MyYieldsSection';
import { OptimizationRecommendations } from './portfolio/OptimizationRecommendations';
import { MetricsSkeleton } from './ui/loading/MetricsSkeleton';
import { useYieldData, useFilteredYieldData } from '@/hooks/useYieldData';
import { useYieldMonitorState } from '@/hooks/useYieldMonitorState';
import { generateHistoricalData } from '@/utils/yieldUtils';
import { YieldMonitorProps } from '@/types/yield';

export const YieldMonitor = ({ userAddress }: YieldMonitorProps) => {
  const {
    searchTerm,
    setSearchTerm,
    selectedChain,
    setSelectedChain,
    sortField,
    sortDirection,
    minApy,
    setMinApy,
    maxApy,
    setMaxApy,
    expandedRows,
    myYieldsExpanded,
    setMyYieldsExpanded,
    viewMode,
    setViewMode,
    isLoading,
    handleSort,
    toggleRowExpansion,
    handleClearFilters
  } = useYieldMonitorState();

  const {
    yieldData,
    userPositions,
    recommendations,
    enhancedYieldData,
    topOpportunities,
    chains
  } = useYieldData(userAddress);

  const filteredAndSortedData = useFilteredYieldData(
    enhancedYieldData,
    searchTerm,
    selectedChain,
    minApy,
    maxApy,
    sortField,
    sortDirection
  );

  return (
    <div className="container-fluid space-responsive-md">
      {/* View Mode Toggle */}
      {userAddress && (
        <div className="animate-fade-in">
          <ViewModeToggle 
            viewMode={viewMode} 
            onViewModeChange={setViewMode} 
          />
        </div>
      )}

      {/* Enhanced Metrics Dashboard */}
      {isLoading ? (
        <MetricsSkeleton />
      ) : (
        <div className="animate-slide-up">
          <YieldMetrics data={filteredAndSortedData} />
        </div>
      )}

      {/* Portfolio Integration Section - Only show if user is connected and in personal view */}
      {userAddress && viewMode === 'personal' && (
        <div className="space-responsive-sm animate-fade-in">
          {/* My Active Positions */}
          <MyYieldsSection 
            positions={userPositions}
            isExpanded={myYieldsExpanded}
            onToggle={() => setMyYieldsExpanded(!myYieldsExpanded)}
          />

          {/* Optimization Recommendations */}
          <OptimizationRecommendations recommendations={recommendations} />
        </div>
      )}

      {/* Top Opportunities */}
      <div className="animate-slide-up">
        <TopOpportunities 
          opportunities={topOpportunities}
          userPositions={userPositions}
          viewMode={viewMode}
          userAddress={userAddress}
        />
      </div>

      {/* Filters and Search */}
      <div className="animate-fade-in">
        <YieldFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedChain={selectedChain}
          setSelectedChain={setSelectedChain}
          minApy={minApy}
          setMinApy={setMinApy}
          maxApy={maxApy}
          setMaxApy={setMaxApy}
          sortField={sortField}
          sortDirection={sortDirection}
          chains={chains}
          filteredDataLength={filteredAndSortedData.length}
          totalDataLength={yieldData.length}
          userPositionsLength={userPositions.length}
          userAddress={userAddress}
          viewMode={viewMode}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Enhanced Table with Expandable Rows */}
      <div className="animate-scale-in">
        <YieldTable
          data={filteredAndSortedData}
          userAddress={userAddress}
          sortField={sortField}
          sortDirection={sortDirection}
          expandedRows={expandedRows}
          onSort={handleSort}
          onToggleExpansion={toggleRowExpansion}
          generateHistoricalData={generateHistoricalData}
          isLoading={isLoading}
        />
      </div>

      {/* Market Insights */}
      <div className="animate-fade-in">
        <MarketInsights />
      </div>
    </div>
  );
};
