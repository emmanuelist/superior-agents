
export interface PredictionDataPoint {
  date: string;
  actual?: number;
  predicted: number;
  confidence: {
    upper: number;
    lower: number;
  };
}

export interface ScenarioData {
  scenario: string;
  probability: number;
  expectedReturn: number;
  risk: 'Low' | 'Medium' | 'High';
}

export type TimeHorizon = '7D' | '30D' | '90D';

// Generate realistic prediction data based on time horizon
export const generatePredictionData = (timeHorizon: TimeHorizon): PredictionDataPoint[] => {
  const now = new Date();
  const baseYield = 8.2; // Current portfolio yield
  
  let days: number;
  let dataPoints: number;
  let volatility: number;
  let trend: number;
  
  switch (timeHorizon) {
    case '7D':
      days = 7;
      dataPoints = 14; // Every 12 hours
      volatility = 0.02; // Lower volatility for short term
      trend = 0.001; // Minimal trend
      break;
    case '30D':
      days = 30;
      dataPoints = 30; // Daily
      volatility = 0.05; // Medium volatility
      trend = 0.003; // Moderate trend
      break;
    case '90D':
      days = 90;
      dataPoints = 18; // Every 5 days
      volatility = 0.08; // Higher volatility for long term
      trend = 0.005; // Stronger trend
      break;
  }
  
  const data: PredictionDataPoint[] = [];
  
  for (let i = 0; i < dataPoints; i++) {
    const dayOffset = (i / dataPoints) * days;
    const date = new Date(now.getTime() + dayOffset * 24 * 60 * 60 * 1000);
    
    let dateLabel: string;
    if (timeHorizon === '7D') {
      dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit' });
    } else if (timeHorizon === '30D') {
      dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else {
      dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    
    // Generate prediction with trend and volatility
    const trendEffect = trend * i;
    const randomVariation = (Math.random() - 0.5) * volatility;
    const cyclicalEffect = Math.sin(i * 0.3) * volatility * 0.3;
    
    const predicted = baseYield + (baseYield * (trendEffect + randomVariation + cyclicalEffect));
    
    // Generate confidence intervals (wider for longer horizons)
    const confidenceWidth = volatility * (1 + i * 0.1) * baseYield;
    
    // Add actual data for past points (first 1/3 of data)
    const actual = i < dataPoints / 3 ? predicted + (Math.random() - 0.5) * volatility * baseYield : undefined;
    
    data.push({
      date: dateLabel,
      actual,
      predicted: Math.max(0, predicted),
      confidence: {
        upper: Math.max(0, predicted + confidenceWidth),
        lower: Math.max(0, predicted - confidenceWidth)
      }
    });
  }
  
  return data;
};

// Generate scenario data based on time horizon
export const generateScenarioData = (timeHorizon: TimeHorizon): ScenarioData[] => {
  const baseScenarios = [
    {
      scenario: 'Bull Market',
      risk: 'Medium' as const,
    },
    {
      scenario: 'Bear Market',
      risk: 'High' as const,
    },
    {
      scenario: 'Stable Market',
      risk: 'Low' as const,
    },
    {
      scenario: 'High Volatility',
      risk: 'High' as const,
    },
    {
      scenario: 'DeFi Growth',
      risk: 'Medium' as const,
    }
  ];
  
  return baseScenarios.map(scenario => {
    let probabilityBase: number;
    let returnMultiplier: number;
    
    switch (timeHorizon) {
      case '7D':
        probabilityBase = 15 + Math.random() * 25; // 15-40% probability
        returnMultiplier = 0.3; // Lower returns for short term
        break;
      case '30D':
        probabilityBase = 10 + Math.random() * 30; // 10-40% probability
        returnMultiplier = 1; // Normal returns
        break;
      case '90D':
        probabilityBase = 5 + Math.random() * 35; // 5-40% probability
        returnMultiplier = 2; // Higher potential returns for long term
        break;
    }
    
    // Adjust probability based on scenario type
    let probability = probabilityBase;
    let expectedReturn: number;
    
    switch (scenario.scenario) {
      case 'Bull Market':
        probability *= (timeHorizon === '90D' ? 1.2 : 0.8);
        expectedReturn = (8 + Math.random() * 15) * returnMultiplier;
        break;
      case 'Bear Market':
        probability *= (timeHorizon === '7D' ? 0.6 : 1.1);
        expectedReturn = (-15 + Math.random() * 10) * returnMultiplier;
        break;
      case 'Stable Market':
        probability *= (timeHorizon === '7D' ? 1.5 : 0.8);
        expectedReturn = (-2 + Math.random() * 6) * returnMultiplier;
        break;
      case 'High Volatility':
        probability *= (timeHorizon === '90D' ? 1.3 : 0.9);
        expectedReturn = (-10 + Math.random() * 25) * returnMultiplier;
        break;
      case 'DeFi Growth':
        probability *= (timeHorizon === '90D' ? 1.4 : 0.7);
        expectedReturn = (5 + Math.random() * 20) * returnMultiplier;
        break;
      default:
        expectedReturn = (-5 + Math.random() * 15) * returnMultiplier;
    }
    
    return {
      ...scenario,
      probability: Math.min(Math.round(probability), 100),
      expectedReturn: Math.round(expectedReturn * 100) / 100
    };
  }).sort((a, b) => b.probability - a.probability);
};
