
// Mock historical data generator
export const generateHistoricalData = (currentApy: number, volatility: number) => {
  const data = [];
  for (let i = 30; i >= 0; i--) {
    const variation = (Math.random() - 0.5) * volatility * 2;
    data.push({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      apy: Math.max(0.1, currentApy + variation)
    });
  }
  return data;
};
