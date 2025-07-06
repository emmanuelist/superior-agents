
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, TrendingUp, Zap, Target } from 'lucide-react';
import { AgentStatus, AgentMetrics } from '@/types/agent';

interface AgentStatusCardProps {
  status: AgentStatus;
  metrics: AgentMetrics;
}

export const AgentStatusCard = ({ status, metrics }: AgentStatusCardProps) => {
  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'working': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const getStatusIcon = (status: AgentStatus) => {
    switch (status) {
      case 'active': return <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />;
      case 'working': return <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />;
      case 'paused': return <div className="w-2 h-2 bg-yellow-400 rounded-full" />;
      case 'error': return <div className="w-2 h-2 bg-red-400 rounded-full" />;
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Activity className="h-6 w-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Agent Status</h3>
          </div>
          <Badge className={`${getStatusColor(status)} flex items-center space-x-2 px-3 py-1`}>
            {getStatusIcon(status)}
            <span className="capitalize font-medium">{status}</span>
          </Badge>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-blue-200">Total Profit</span>
            </div>
            <div className="text-lg font-bold text-white">
              ${metrics.totalProfit.toLocaleString()}
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-200">Success Rate</span>
            </div>
            <div className="text-lg font-bold text-white">
              {metrics.successRate}%
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-blue-200">Transactions</span>
            </div>
            <div className="text-lg font-bold text-white">
              {metrics.transactionsExecuted}
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-blue-200">Gas Efficiency</span>
            </div>
            <div className="text-lg font-bold text-white">
              {metrics.gasEfficiency}%
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
