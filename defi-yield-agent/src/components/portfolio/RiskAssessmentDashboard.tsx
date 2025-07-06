
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Shield, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

interface RiskAssessmentDashboardProps {
  userPositions: any[];
}

export const RiskAssessmentDashboard = ({ userPositions }: RiskAssessmentDashboardProps) => {
  // Calculate portfolio risk metrics
  const totalValue = userPositions.reduce((sum, pos) => sum + pos.currentValue, 0);
  const riskDistribution = userPositions.reduce((acc, pos) => {
    const risk = pos.riskLevel || 'Medium';
    acc[risk] = (acc[risk] || 0) + pos.currentValue;
    return acc;
  }, {} as Record<string, number>);

  const lowRiskPercent = ((riskDistribution.Low || 0) / totalValue) * 100;
  const mediumRiskPercent = ((riskDistribution.Medium || 0) / totalValue) * 100;
  const highRiskPercent = ((riskDistribution.High || 0) / totalValue) * 100;

  const overallRiskScore = (lowRiskPercent * 0.2 + mediumRiskPercent * 0.5 + highRiskPercent * 0.8) / 100;

  const getRiskLevel = (score: number) => {
    if (score <= 0.3) return { level: 'Conservative', color: 'text-emerald-400', icon: CheckCircle };
    if (score <= 0.6) return { level: 'Moderate', color: 'text-yellow-400', icon: Shield };
    return { level: 'Aggressive', color: 'text-red-400', icon: AlertTriangle };
  };

  const riskAssessment = getRiskLevel(overallRiskScore);
  const RiskIcon = riskAssessment.icon;

  return (
    <Card className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/30">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-400" />
            Risk Assessment
          </h3>
          <Badge className={`${riskAssessment.color} bg-opacity-20`}>
            <RiskIcon className="h-3 w-3 mr-1" />
            {riskAssessment.level}
          </Badge>
        </div>

        {/* Overall Risk Score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300">Portfolio Risk Score</span>
            <span className={`font-semibold ${riskAssessment.color}`}>
              {(overallRiskScore * 100).toFixed(0)}/100
            </span>
          </div>
          <Progress 
            value={overallRiskScore * 100} 
            className="h-2"
          />
        </div>

        {/* Risk Distribution */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">Risk Distribution</h4>
          
          <div className="space-y-3">
            {/* Low Risk */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                <span className="text-slate-300 text-sm">Low Risk</span>
              </div>
              <div className="text-right">
                <span className="text-white font-medium">{lowRiskPercent.toFixed(1)}%</span>
                <span className="text-slate-400 text-xs ml-2">
                  ${(riskDistribution.Low || 0).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Medium Risk */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-slate-300 text-sm">Medium Risk</span>
              </div>
              <div className="text-right">
                <span className="text-white font-medium">{mediumRiskPercent.toFixed(1)}%</span>
                <span className="text-slate-400 text-xs ml-2">
                  ${(riskDistribution.Medium || 0).toLocaleString()}
                </span>
              </div>
            </div>

            {/* High Risk */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-slate-300 text-sm">High Risk</span>
              </div>
              <div className="text-right">
                <span className="text-white font-medium">{highRiskPercent.toFixed(1)}%</span>
                <span className="text-slate-400 text-xs ml-2">
                  ${(riskDistribution.High || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Recommendations */}
        <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
          <h5 className="text-white font-medium mb-2">Recommendations</h5>
          <div className="space-y-2 text-sm">
            {highRiskPercent > 40 && (
              <div className="flex items-start gap-2 text-red-300">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Consider reducing high-risk exposure below 30%</span>
              </div>
            )}
            {lowRiskPercent < 20 && (
              <div className="flex items-start gap-2 text-blue-300">
                <TrendingDown className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Consider adding more stable protocols for balance</span>
              </div>
            )}
            {lowRiskPercent >= 50 && (
              <div className="flex items-start gap-2 text-emerald-300">
                <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Well-balanced conservative portfolio</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
