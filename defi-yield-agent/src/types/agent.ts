
export type AgentStatus = 'active' | 'paused' | 'working' | 'error';

export interface AgentActivity {
  id: string;
  type: 'rebalance' | 'yield_optimization' | 'card_topup' | 'gas_optimization';
  description: string;
  timestamp: Date;
  profit?: number;
  status: 'success' | 'pending' | 'failed';
}

export interface AgentMetrics {
  totalProfit: number;
  successRate: number;
  transactionsExecuted: number;
  gasEfficiency: number;
}

export type RiskProfile = 'conservative' | 'balanced' | 'aggressive';

export interface AgentPreset {
  name: string;
  description: string;
  icon: string;
  settings: {
    riskTolerance: number;
    rebalanceFrequency: number;
    maxGasPrice: number;
    minCardBalance: number;
    emergencyBuffer: number;
  };
}
