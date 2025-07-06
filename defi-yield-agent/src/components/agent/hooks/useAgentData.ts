
import { AgentStatus, AgentMetrics } from '@/types/agent';

export const useAgentData = () => {
  // Mock data - in real app this would come from API
  const agentStatus: AgentStatus = 'active';
  const agentMetrics: AgentMetrics = {
    totalProfit: 1247,
    successRate: 94,
    transactionsExecuted: 156,
    gasEfficiency: 87
  };

  return {
    agentStatus,
    agentMetrics
  };
};
