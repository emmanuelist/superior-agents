
export interface AnalyticsDataPoint {
  date: string;
  value: number;
  yield: number;
  benchmark?: number;
  volume?: number;
  timestamp: Date;
}

export interface AnalyticsTimeRangeConfig {
  label: string;
  value: string;
  days: number;
  dataPoints: number;
  interval: 'hourly' | 'daily' | 'weekly' | 'monthly';
}

export const analyticsTimeRanges: AnalyticsTimeRangeConfig[] = [
  { label: '7D', value: '7D', days: 7, dataPoints: 168, interval: 'hourly' },
  { label: '30D', value: '30D', days: 30, dataPoints: 30, interval: 'daily' },
  { label: '90D', value: '90D', days: 90, dataPoints: 90, interval: 'daily' },
  { label: '1Y', value: '1Y', days: 365, dataPoints: 52, interval: 'weekly' },
  { label: 'ALL', value: 'ALL', days: 730, dataPoints: 24, interval: 'monthly' },
];

// Generate analytics data based on time range and metric
export const generateAnalyticsData = (timeRange: string, metric: 'value' | 'yield' = 'value'): AnalyticsDataPoint[] => {
  const config = analyticsTimeRanges.find(c => c.value === timeRange);
  if (!config) return [];

  const data: AnalyticsDataPoint[] = [];
  const now = new Date();
  const baseValue = metric === 'value' ? 12500 : 890;
  const baseVariation = metric === 'value' ? 0.05 : 0.08;

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
        dateLabel = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        break;
      default:
        date = new Date();
        dateLabel = 'Now';
    }
    
    // Generate realistic variation based on time period
    const timeBasedVariation = Math.sin(i * 0.1) * baseVariation * 0.3;
    const randomVariation = (Math.random() - 0.5) * baseVariation * 0.5;
    const trendGrowth = (config.dataPoints - i) / config.dataPoints * baseVariation * 2;
    
    const totalVariation = timeBasedVariation + randomVariation + trendGrowth;
    
    const value = Math.round(baseValue * (1 + totalVariation) * 100) / 100;
    const yieldValue = Math.round((metric === 'yield' ? value : baseValue * 0.8 * (1 + totalVariation * 0.6)) * 100) / 100;
    const benchmarkValue = value * (0.95 + Math.random() * 0.1); // Benchmark slightly lower on average
    
    data.push({
      date: dateLabel,
      value: Math.max(0, value),
      yield: Math.max(0, yieldValue),
      benchmark: Math.max(0, benchmarkValue),
      volume: Math.round((1500 + Math.random() * 1000) * 100) / 100,
      timestamp: date
    });
  }
  
  return data;
};

// Calculate growth metrics for analytics data
export const calculateAnalyticsGrowth = (data: AnalyticsDataPoint[], metric: 'value' | 'yield') => {
  if (data.length < 2) return { current: 0, previous: 0, change: 0, changePercent: 0 };
  
  const current = data[data.length - 1][metric];
  const first = data[0][metric];
  const change = current - first;
  const changePercent = (change / first) * 100;
  
  return {
    current,
    previous: first,
    change,
    changePercent
  };
};

// Cache for analytics data
const analyticsDataCache = new Map<string, AnalyticsDataPoint[]>();

export const getAnalyticsData = (timeRange: string, metric: 'value' | 'yield' = 'value'): AnalyticsDataPoint[] => {
  const cacheKey = `${timeRange}-${metric}`;
  
  if (analyticsDataCache.has(cacheKey)) {
    return analyticsDataCache.get(cacheKey)!;
  }
  
  const data = generateAnalyticsData(timeRange, metric);
  analyticsDataCache.set(cacheKey, data);
  return data;
};

export const clearAnalyticsCache = () => {
  analyticsDataCache.clear();
};
