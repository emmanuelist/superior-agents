
import { useMemo } from 'react';
import { yieldData } from '@/data/mockYieldData';
import { getUserPositions, calculateOptimizationRecommendations } from '@/services/portfolioIntegration';
import { YieldData, SortField, SortDirection } from '@/types/yield';

export const useYieldData = (userAddress?: string) => {
  // Get user portfolio data
  const userPositions = useMemo(() => {
    return userAddress ? getUserPositions(userAddress) : [];
  }, [userAddress]);

  // Get optimization recommendations
  const recommendations = useMemo(() => {
    return userAddress ? calculateOptimizationRecommendations(userPositions, yieldData) : [];
  }, [userPositions, userAddress]);

  // Mark protocols where user has positions
  const enhancedYieldData = useMemo(() => {
    return yieldData.map(protocol => ({
      ...protocol,
      userPosition: userPositions.find(pos => pos.protocol === protocol.protocol)
    }));
  }, [userPositions]);

  const topOpportunities = useMemo(() => {
    return [...yieldData].sort((a, b) => b.apy - a.apy).slice(0, 3);
  }, []);

  const chains = ['all', ...Array.from(new Set(yieldData.map(item => item.chain)))];

  return {
    yieldData,
    userPositions,
    recommendations,
    enhancedYieldData,
    topOpportunities,
    chains
  };
};

export const useFilteredYieldData = (
  enhancedYieldData: YieldData[],
  searchTerm: string,
  selectedChain: string,
  minApy: string,
  maxApy: string,
  sortField: SortField,
  sortDirection: SortDirection
) => {
  return useMemo(() => {
    let filtered = enhancedYieldData.filter(item => {
      const matchesSearch = item.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.chain.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesChain = selectedChain === 'all' || item.chain === selectedChain;
      const matchesMinApy = !minApy || item.apy >= parseFloat(minApy);
      const matchesMaxApy = !maxApy || item.apy <= parseFloat(maxApy);
      
      return matchesSearch && matchesChain && matchesMinApy && matchesMaxApy;
    });

    filtered.sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;

      switch (sortField) {
        case 'protocol':
          aVal = a.protocol;
          bVal = b.protocol;
          break;
        case 'chain':
          aVal = a.chain;
          bVal = b.chain;
          break;
        case 'apy':
          aVal = a.apy;
          bVal = b.apy;
          break;
        case 'change':
          aVal = a.change;
          bVal = b.change;
          break;
        case 'tvl':
          aVal = a.tvlNumeric;
          bVal = b.tvlNumeric;
          break;
        default:
          return 0;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      
      return sortDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });

    return filtered;
  }, [enhancedYieldData, searchTerm, selectedChain, sortField, sortDirection, minApy, maxApy]);
};
