
import { Card } from '@/components/ui/card';
import { TrendingUp, Activity, DollarSign, ArrowUp } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { StaggeredContainer } from '@/components/ui/StaggeredContainer';

interface PortfolioMetricsProps {
  totalYield: number;
  apy: number;
  dailyYield: number;
}

export const PortfolioMetrics = ({ totalYield, apy, dailyYield }: PortfolioMetricsProps) => {
  const MetricCard = ({ 
    icon: Icon, 
    value, 
    label, 
    subLabel, 
    change, 
    color = 'emerald',
    decimals = 2,
    prefix = '',
    suffix = '' 
  }: {
    icon: any;
    value: number;
    label: string;
    subLabel: string;
    change: string;
    color?: 'emerald' | 'blue' | 'amber';
    decimals?: number;
    prefix?: string;
    suffix?: string;
  }) => {
    const colorClasses = {
      emerald: {
        icon: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/20',
        change: 'text-emerald-400',
        hover: 'hover:border-emerald-500/40',
        subLabel: 'text-emerald-300'
      },
      blue: {
        icon: 'text-blue-400',
        bg: 'bg-blue-500/10 border-blue-500/20',
        change: 'text-blue-400',
        hover: 'hover:border-blue-500/40',
        subLabel: 'text-blue-300'
      },
      amber: {
        icon: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/20',
        change: 'text-amber-400',
        hover: 'hover:border-amber-500/40',
        subLabel: 'text-amber-300'
      }
    };

    const colors = colorClasses[color];

    return (
      <Card className={`bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-600/40 ${colors.hover} transition-all duration-300 group`}>
        <div className="p-3 sm:p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 ${colors.bg} rounded-lg border flex-shrink-0`}>
              <Icon className={`h-3 w-3 sm:h-4 sm:w-4 ${colors.icon}`} />
            </div>
            <div className={`flex items-center ${colors.change} text-xs font-medium`}>
              <ArrowUp className="h-3 w-3 mr-1 flex-shrink-0" />
              <span>{change}</span>
            </div>
          </div>
          
          {/* Value */}
          <div className="space-y-1">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {prefix}<AnimatedCounter value={value} decimals={decimals} duration={1800} />{suffix}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium truncate">{label}</p>
            <div className={`text-xs ${colors.subLabel} font-medium`}>
              {subLabel}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <StaggeredContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4" staggerDelay={100}>
      <MetricCard
        icon={TrendingUp}
        value={totalYield}
        label="Total Yield Earned"
        subLabel="This month: +$247.80"
        change="+12.1%"
        color="emerald"
        prefix="$"
        decimals={2}
      />
      
      <MetricCard
        icon={Activity}
        value={apy}
        label="Average APY"
        subLabel="Above market avg"
        change="+0.3%"
        color="blue"
        suffix="%"
        decimals={2}
      />
      
      <MetricCard
        icon={DollarSign}
        value={dailyYield}
        label="Daily Yield"
        subLabel="Auto-managed"
        change="+5.2%"
        color="amber"
        prefix="$"
        decimals={2}
      />
    </StaggeredContainer>
  );
};
