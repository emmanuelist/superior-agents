
export interface PortfolioDataPoint {
  date: string;
  value: number;
  yield: number;
  volume: number;
  timestamp: Date;
}

export interface TimeRangeConfig {
  label: string;
  value: string;
  days: number;
  dataPoints: number;
  interval: 'hourly' | 'daily' | 'weekly' | 'monthly';
}

export const timeRangeConfigs: TimeRangeConfig[] = [
  { label: '7D', value: '7d', days: 7, dataPoints: 168, interval: 'hourly' },
  { label: '1M', value: '1m', days: 30, dataPoints: 30, interval: 'daily' },
  { label: '3M', value: '3m', days: 90, dataPoints: 12, interval: 'weekly' },
  { label: '6M', value: '6m', days: 180, dataPoints: 24, interval: 'weekly' },
  { label: '1Y', value: '1y', days: 365, dataPoints: 12, interval: 'monthly' },
];

// Generate mock data for different time ranges
const generateDataPoints = (config: TimeRangeConfig): PortfolioDataPoint[] => {
  const data: PortfolioDataPoint[] = [];
  const now = new Date();
  const baseValue = 12500;
  const baseYield = 890;
  
  for (let i = config.dataPoints - 1; i >= 0; i--) {
    let date: Date;
    let dateLabel: string;
    
    switch (config.interval) {
      case 'hourly':
        date = new Date(now.getTime() - (i * 60 * 60 * 1000));
        dateLabel = date.getHours().toString().padStart(2, '0') + ':00';
        break;
      case 'daily':
        date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
        dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        break;
      case 'weekly':
        date = new Date(now.getTime() - (i * 7 * 24 * 60 * 60 * 1000));
        dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        break;
      case 'monthly':
        date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        dateLabel = date.toLocaleDateString('en-US', { month: 'short' });
        break;
      default:
        date = new Date();
        dateLabel = 'Now';
    }
    
    // Add some realistic variation
    const variation = (Math.sin(i * 0.2) + Math.random() * 0.4 - 0.2) * 0.05;
    const trendGrowth = (config.dataPoints - i) / config.dataPoints * 0.15;
    
    const value = baseValue * (1 + variation + trendGrowth);
    const yieldValue = baseYield * (1 + variation * 1.2 + trendGrowth * 0.8);
    
    data.push({
      date: dateLabel,
      value: Math.round(value * 100) / 100,
      yield: Math.round(yieldValue * 100) / 100,
      volume: Math.round((2000 + Math.random() * 2000) * 100) / 100,
      timestamp: date
    });
  }
  
  return data;
};

// Cache for generated data
const dataCache = new Map<string, PortfolioDataPoint[]>();

export const getPortfolioData = (timeRange: string): PortfolioDataPoint[] => {
  if (dataCache.has(timeRange)) {
    return dataCache.get(timeRange)!;
  }
  
  const config = timeRangeConfigs.find(c => c.value === timeRange);
  if (!config) return [];
  
  const data = generateDataPoints(config);
  dataCache.set(timeRange, data);
  return data;
};

export const calculateGrowthMetrics = (data: PortfolioDataPoint[], metric: 'value' | 'yield') => {
  if (data.length < 2) return { current: 0, previous: 0, change: 0, changePercent: 0 };
  
  const current = data[data.length - 1][metric];
  const previous = data[data.length - 2][metric];
  const change = current - previous;
  const changePercent = (change / previous) * 100;
  
  return {
    current,
    previous,
    change,
    changePercent
  };
};

export const getLastUpdated = (): string => {
  return new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
};
