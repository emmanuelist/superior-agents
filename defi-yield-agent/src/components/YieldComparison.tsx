
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ArrowUpRight, Star, Zap } from 'lucide-react';

const yieldData = [
  { protocol: 'Aave USDC', current: 7.2, average: 6.8, optimal: 8.5, chain: 'Ethereum', tvl: '$2.1B', logo: '🏛️' },
  { protocol: 'Compound USDT', current: 6.8, average: 6.2, optimal: 7.9, chain: 'Polygon', tvl: '$890M', logo: '🏢' },
  { protocol: 'Yearn DAI', current: 9.1, average: 8.1, optimal: 10.2, chain: 'Arbitrum', tvl: '$1.4B', logo: '🏰' },
  { protocol: 'Curve 3Pool', current: 5.4, average: 5.1, optimal: 6.8, chain: 'Ethereum', tvl: '$3.2B', logo: '🌊' },
];

export const YieldComparison = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = yieldData.find(item => item.protocol === label);
      return (
        <div className="bg-slate-800/95 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-2xl">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-2xl">{data?.logo}</span>
            <div>
              <p className="text-white font-bold">{label}</p>
              <p className="text-slate-400 text-sm">{data?.chain} • TVL: {data?.tvl}</p>
            </div>
          </div>
          <div className="space-y-2">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-slate-300 text-sm capitalize">{entry.dataKey}</span>
                </div>
                <span className="text-white font-bold">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const totalOptimizationPotential = yieldData.reduce((sum, item) => sum + (item.optimal - item.current), 0);

  return (
    <Card className="bg-slate-800/50 backdrop-blur-xl border border-white/10 shadow-2xl">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl border border-emerald-500/30">
              <BarChart className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Yield Opportunities</h3>
              <p className="text-slate-400 text-sm">Real-time yield optimization analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg px-4 py-2 border border-emerald-500/30">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold text-sm">+{totalOptimizationPotential.toFixed(1)}% Available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yieldData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <defs>
                <linearGradient id="averageGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#64748b" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#475569" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#1e40af" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient id="optimalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#047857" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" strokeOpacity={0.3} />
              <XAxis 
                dataKey="protocol" 
                stroke="#94a3b8" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="average" 
                fill="url(#averageGradient)"
                radius={[2, 2, 0, 0]}
                name="Market Average"
              />
              <Bar 
                dataKey="current" 
                fill="url(#currentGradient)"
                radius={[2, 2, 0, 0]}
                name="Current APY"
              />
              <Bar 
                dataKey="optimal" 
                fill="url(#optimalGradient)"
                radius={[2, 2, 0, 0]}
                name="Optimal APY"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {yieldData.map((item, index) => (
            <div key={index} className="bg-gradient-to-r from-slate-700/30 to-slate-600/20 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{item.logo}</span>
                  <div>
                    <h4 className="text-white font-bold text-sm">{item.protocol}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                        {item.chain}
                      </span>
                      <span className="text-slate-400 text-xs">{item.tvl}</span>
                    </div>
                  </div>
                </div>
                {item.optimal - item.current > 1 && (
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star className="h-3 w-3" />
                    <span className="text-xs font-medium">High Potential</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Current APY</span>
                  <span className="text-blue-400 font-bold">{item.current}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Optimal APY</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">{item.optimal}%</span>
                    <div className="flex items-center text-emerald-400 text-xs bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span>+{(item.optimal - item.current).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                
                {/* Progress bar showing optimization potential */}
                <div className="mt-3">
                  <div className="w-full bg-slate-600/30 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-emerald-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(item.current / item.optimal) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Current</span>
                    <span>Optimal</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 border-t border-white/10 space-y-4 md:space-y-0">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
              <span className="text-slate-400 text-sm">Market Average</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-slate-400 text-sm">Current APY</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-slate-400 text-sm">Optimal APY</span>
            </div>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-emerald-500/25">
            Optimize All Positions
          </button>
        </div>
      </div>
    </Card>
  );
};
