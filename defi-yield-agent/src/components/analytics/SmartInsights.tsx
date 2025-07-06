
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, TrendingUp, AlertTriangle, Target, Zap, Info } from 'lucide-react';

interface Insight {
  id: string;
  type: 'opportunity' | 'warning' | 'optimization' | 'achievement';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action?: string;
  value?: number;
}

interface SmartInsightsProps {
  insights: Insight[];
}

export const SmartInsights = ({ insights }: SmartInsightsProps) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return TrendingUp;
      case 'warning': return AlertTriangle;
      case 'optimization': return Target;
      case 'achievement': return Zap;
      default: return Info;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'emerald';
      case 'warning': return 'red';
      case 'optimization': return 'blue';
      case 'achievement': return 'purple';
      default: return 'slate';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'emerald';
      default: return 'slate';
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Smart Insights</h3>
            <p className="text-sm text-slate-400">AI-powered recommendations for your portfolio</p>
          </div>
        </div>

        <div className="space-y-4">
          {insights.map((insight) => {
            const Icon = getInsightIcon(insight.type);
            const color = getInsightColor(insight.type);
            const impactColor = getImpactColor(insight.impact);
            
            return (
              <Card 
                key={insight.id}
                className={`p-4 bg-${color}-500/5 border-${color}-400/20 hover:bg-${color}-500/10 transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 bg-${color}-500/20 rounded-lg flex-shrink-0`}>
                    <Icon className={`h-4 w-4 text-${color}-400`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{insight.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={`bg-${impactColor}-500/20 text-${impactColor}-400 text-xs`}>
                          {insight.impact} impact
                        </Badge>
                        {insight.value && (
                          <Badge className={`bg-${color}-500/20 text-${color}-400 text-xs`}>
                            {insight.type === 'opportunity' ? '+' : ''}
                            {insight.value > 100 ? `$${insight.value.toLocaleString()}` : `${insight.value.toFixed(1)}%`}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-slate-300 text-sm mb-3">
                      {insight.description}
                    </p>
                    
                    {insight.action && (
                      <Button 
                        size="sm" 
                        className={`bg-${color}-500/20 text-${color}-400 border-${color}-400/30 hover:bg-${color}-500/30`}
                      >
                        {insight.action}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {insights.length === 0 && (
          <div className="text-center py-8">
            <Lightbulb className="h-12 w-12 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-400">No insights available at the moment.</p>
            <p className="text-slate-500 text-sm">Check back later for AI-powered recommendations.</p>
          </div>
        )}
      </div>
    </Card>
  );
};
