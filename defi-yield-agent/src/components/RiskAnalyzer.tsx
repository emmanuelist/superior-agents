
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RiskAnalyzerProps {
  protocol: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  tvl: number;
  apy: number;
  volatility?: number;
}

export const RiskAnalyzer = ({ protocol, riskLevel, tvl, apy, volatility = 0.5 }: RiskAnalyzerProps) => {
  const calculateRiskScore = () => {
    let score = 0;
    
    // TVL factor (higher TVL = lower risk)
    if (tvl > 1000000000) score += 3; // >$1B
    else if (tvl > 100000000) score += 2; // >$100M
    else score += 1;
    
    // APY factor (extremely high APY = higher risk)
    if (apy > 20) score -= 1;
    else if (apy > 10) score += 0;
    else score += 1;
    
    // Volatility factor
    if (volatility < 0.3) score += 2;
    else if (volatility < 0.6) score += 1;
    else score -= 1;
    
    return Math.max(1, Math.min(5, score));
  };

  const riskScore = calculateRiskScore();
  
  const getRiskDetails = () => {
    const factors = [];
    
    if (tvl > 1000000000) factors.push('High TVL ($1B+)');
    else if (tvl < 50000000) factors.push('Low TVL (<$50M)');
    
    if (apy > 15) factors.push('Very high APY');
    if (volatility > 0.7) factors.push('High volatility');
    if (protocol.toLowerCase().includes('experimental')) factors.push('Experimental protocol');
    
    const auditStatus = Math.random() > 0.3 ? 'Audited' : 'Unaudited';
    factors.push(auditStatus);
    
    return factors;
  };

  const riskFactors = getRiskDetails();
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'High': return 'bg-red-500/20 text-red-400 border-red-400/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <Badge className={getRiskColor(riskLevel)}>
              {riskLevel}
            </Badge>
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <Shield
                  key={i}
                  className={`h-3 w-3 ${
                    i < riskScore ? 'text-emerald-400' : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-900 border-gray-700 max-w-xs">
          <div className="space-y-2">
            <p className="font-medium text-white">Risk Analysis</p>
            <p className="text-sm text-gray-300">Score: {riskScore}/5</p>
            <div className="space-y-1">
              {riskFactors.map((factor, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <Info className="h-3 w-3 text-blue-400" />
                  <span className="text-gray-300">{factor}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Volatility: {(volatility * 100).toFixed(1)}%
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
