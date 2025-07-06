
export interface UserPosition {
  protocol: string;
  chain: string;
  amount: number;
  currentApy: number;
  invested: number;
  currentValue: number;
  yieldEarned: number;
  entryDate: Date;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface YieldOpportunity {
  protocol: string;
  chain: string;
  apy: number;
  tvl: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  gasScore: number;
  potentialGain: number;
  breakEvenDays: number;
}

export interface OptimizationRecommendation {
  type: 'rebalance' | 'migrate' | 'compound';
  fromProtocol?: string;
  toProtocol: string;
  amount: number;
  currentApy: number;
  newApy: number;
  potentialGain: number;
  riskChange: 'increase' | 'decrease' | 'same';
  gasCost: number;
  confidence: 'high' | 'medium' | 'low';
}

// Mock user positions - in real app this would come from wallet/API
export const getUserPositions = (userAddress: string): UserPosition[] => {
  return [
    {
      protocol: 'Aave USDC',
      chain: 'Ethereum',
      amount: 8500,
      currentApy: 7.2,
      invested: 8000,
      currentValue: 8500,
      yieldEarned: 500,
      entryDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      riskLevel: 'Low'
    },
    {
      protocol: 'Compound USDT',
      chain: 'Polygon',
      amount: 4200,
      currentApy: 6.8,
      invested: 4000,
      currentValue: 4200,
      yieldEarned: 200,
      entryDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      riskLevel: 'Low'
    },
    {
      protocol: 'Yearn DAI',
      chain: 'Arbitrum',
      amount: 2720.5,
      currentApy: 9.1,
      invested: 2500,
      currentValue: 2720.5,
      yieldEarned: 220.5,
      entryDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      riskLevel: 'Medium'
    }
  ];
};

export const calculateOptimizationRecommendations = (
  userPositions: UserPosition[],
  marketOpportunities: any[]
): OptimizationRecommendation[] => {
  const recommendations: OptimizationRecommendation[] = [];
  
  userPositions.forEach(position => {
    // Find better opportunities for each position
    const betterOpportunities = marketOpportunities.filter(opp => 
      opp.apy > position.currentApy + 1 && // At least 1% better
      opp.chain === position.chain && // Same chain to minimize gas
      opp.riskLevel === position.riskLevel // Same risk level
    );
    
    betterOpportunities.forEach(opportunity => {
      const apyDiff = opportunity.apy - position.currentApy;
      const potentialGain = (position.amount * apyDiff / 100);
      const gasCost = position.chain === 'Ethereum' ? 50 : 5; // Mock gas costs
      
      if (potentialGain > gasCost * 2) { // Only recommend if gain > 2x gas cost
        recommendations.push({
          type: 'migrate',
          fromProtocol: position.protocol,
          toProtocol: opportunity.protocol,
          amount: position.amount,
          currentApy: position.currentApy,
          newApy: opportunity.apy,
          potentialGain: potentialGain - gasCost,
          riskChange: 'same',
          gasCost,
          confidence: apyDiff > 2 ? 'high' : 'medium'
        });
      }
    });
  });
  
  return recommendations.slice(0, 3); // Return top 3 recommendations
};

export const calculatePortfolioMetrics = (positions: UserPosition[]) => {
  const totalInvested = positions.reduce((sum, pos) => sum + pos.invested, 0);
  const totalValue = positions.reduce((sum, pos) => sum + pos.currentValue, 0);
  const totalYield = positions.reduce((sum, pos) => sum + pos.yieldEarned, 0);
  const weightedApy = positions.reduce((sum, pos) => {
    return sum + (pos.currentApy * pos.currentValue / totalValue);
  }, 0);
  
  return {
    totalInvested,
    totalValue,
    totalYield,
    weightedApy,
    totalReturn: totalValue - totalInvested,
    returnPercentage: ((totalValue - totalInvested) / totalInvested) * 100
  };
};
