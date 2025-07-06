
export type SortField = 'protocol' | 'chain' | 'apy' | 'change' | 'tvl';
export type SortDirection = 'asc' | 'desc';

export interface YieldData {
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

export interface UserPosition {
  protocol: string;
  amount: number;
  apy: number;
}

export interface OptimizationRecommendation {
  protocol: string;
  potentialIncrease: number;
}

export interface YieldMonitorProps {
  userAddress?: string;
}
