
import { Card } from '@/components/ui/card';
import { Zap, Shield } from 'lucide-react';
import { StatusItem } from './StatusItem';
import { BufferCard } from './BufferCard';

interface PortfolioSidebarProps {
  cardBalance: number;
  emergencyBuffer: number;
}

export const PortfolioSidebar = ({ cardBalance, emergencyBuffer }: PortfolioSidebarProps) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Agent Status */}
      <Card className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-500">
        <div className="p-3 sm:p-4">
          <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center">
            <Zap className="h-4 w-4 mr-2 text-blue-400" />
            Agent Status
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <StatusItem label="Last Rebalance" value="2 hours ago" status="success" />
            <StatusItem label="Next Check" value="In 22 hours" status="pending" />
            <StatusItem label="Gas Optimization" value="Active" status="success" />
            <StatusItem label="Opportunities Found" value="3 new" status="success" />
          </div>
        </div>
      </Card>

      {/* Safety Buffers */}
      <Card className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-500">
        <div className="p-3 sm:p-4">
          <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center">
            <Shield className="h-4 w-4 mr-2 text-green-400" />
            Safety Buffers
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <BufferCard 
              label="Card Balance" 
              value={cardBalance} 
              percentage={75} 
              color="emerald"
            />
            <BufferCard 
              label="Emergency Buffer" 
              value={emergencyBuffer} 
              percentage={100} 
              color="blue"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
