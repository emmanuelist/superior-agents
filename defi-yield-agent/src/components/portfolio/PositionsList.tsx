
import { Card } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { PositionCard } from './PositionCard';
import { CompactPositionCard } from './CompactPositionCard';
import { PositionListItem } from './PositionListItem';

interface Position {
  protocol: string;
  amount: number;
  yield: number;
  chain: string;
  logo: string;
  trend: string;
  trendUp: boolean;
}

interface PositionsListProps {
  positions: Position[];
  viewMode?: 'compact' | 'detailed' | 'list';
}

export const PositionsList = ({ positions, viewMode = 'detailed' }: PositionsListProps) => {
  return (
    <Card className="bg-slate-800/70 backdrop-blur-sm border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 shadow-lg">
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Activity className="h-5 w-5 mr-2.5 text-emerald-400" />
            Current Positions
          </h3>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 font-medium">Live Updates</span>
          </div>
        </div>
        
        {viewMode === 'list' ? (
          <div className="space-y-3">
            {positions.map((position, index) => (
              <PositionListItem key={index} position={position} />
            ))}
          </div>
        ) : (
          <div className={`grid gap-4 ${
            viewMode === 'compact' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {positions.map((position, index) => (
              viewMode === 'compact' ? (
                <CompactPositionCard key={index} position={position} />
              ) : (
                <PositionCard key={index} position={position} />
              )
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
