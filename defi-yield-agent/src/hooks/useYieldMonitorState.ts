
import { useState } from 'react';
import { SortField, SortDirection } from '@/types/yield';

export const useYieldMonitorState = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChain, setSelectedChain] = useState('all');
  const [sortField, setSortField] = useState<SortField>('apy');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [minApy, setMinApy] = useState('');
  const [maxApy, setMaxApy] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [myYieldsExpanded, setMyYieldsExpanded] = useState(true);
  const [viewMode, setViewMode] = useState<'market' | 'personal'>('personal');
  const [isLoading, setIsLoading] = useState(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const toggleRowExpansion = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  const handleClearFilters = () => {
    setIsLoading(true);
    setSearchTerm('');
    setSelectedChain('all');
    setMinApy('');
    setMaxApy('');
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  };

  return {
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
  };
};
