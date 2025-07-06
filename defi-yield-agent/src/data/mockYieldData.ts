
import { YieldData } from '@/types/yield';

export const yieldData: YieldData[] = [
  { protocol: 'Aave USDC', chain: 'Ethereum', apy: 7.2, change: +0.3, tvl: '2.1B', tvlNumeric: 2100000000, riskLevel: 'Low', volatility: 0.2, gasScore: 3 },
  { protocol: 'Compound USDT', chain: 'Polygon', apy: 6.8, change: -0.1, tvl: '890M', tvlNumeric: 890000000, riskLevel: 'Low', volatility: 0.15, gasScore: 9 },
  { protocol: 'Yearn DAI', chain: 'Arbitrum', apy: 9.1, change: +0.8, tvl: '340M', tvlNumeric: 340000000, riskLevel: 'Medium', volatility: 0.35, gasScore: 7 },
  { protocol: 'Curve 3Pool', chain: 'Ethereum', apy: 5.4, change: -0.2, tvl: '1.8B', tvlNumeric: 1800000000, riskLevel: 'Low', volatility: 0.1, gasScore: 4 },
  { protocol: 'Convex FRAX', chain: 'Ethereum', apy: 8.7, change: +0.5, tvl: '120M', tvlNumeric: 120000000, riskLevel: 'Medium', volatility: 0.4, gasScore: 5 },
  { protocol: 'Beefy Finance', chain: 'Polygon', apy: 12.3, change: +1.2, tvl: '85M', tvlNumeric: 85000000, riskLevel: 'High', volatility: 0.8, gasScore: 8 },
  { protocol: 'Lido stETH', chain: 'Ethereum', apy: 4.1, change: +0.1, tvl: '32.5B', tvlNumeric: 32500000000, riskLevel: 'Low', volatility: 0.05, gasScore: 6 },
  { protocol: 'Uniswap V3 ETH/USDC', chain: 'Arbitrum', apy: 15.7, change: -0.9, tvl: '450M', tvlNumeric: 450000000, riskLevel: 'High', volatility: 1.2, gasScore: 6 },
];
