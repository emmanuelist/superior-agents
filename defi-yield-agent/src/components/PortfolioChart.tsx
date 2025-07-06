
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Calendar, Filter, ArrowUpRight, ArrowDownRight, Wifi, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { 
  getPortfolioData, 
  calculateGrowthMetrics, 
  getLastUpdated, 
  timeRangeConfigs 
} from '@/utils/portfolioDataService';

export const PortfolioChart = () => {
  const [selectedRange, setSelectedRange] = useState('6m');
  const [selectedMetric, setSelectedMetric] = useState<'value' | 'yield'>('value');
  const [lastUpdated, setLastUpdated] = useState(getLastUpdated());
  const [isLive, setIsLive] = useState(true);

  // Get dynamic data based on selected range
  const portfolioData = getPortfolioData(selectedRange);
  const growthMetrics = calculateGrowthMetrics(portfolioData, selectedMetric);

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(getLastUpdated());
      // In a real app, this would trigger a data refresh
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/95 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 shadow-2xl max-w-xs">
          <p className="text-slate-300 text-xs sm:text-sm font-medium mb-2">{label}</p>
          <div className="space-y-1 sm:space-y-2">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between space-x-2 sm:space-x-4">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div 
                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-slate-300 text-xs sm:text-sm capitalize">{entry.dataKey}</span>
                </div>
                <span className="text-white font-bold text-xs sm:text-sm">
                  ${entry.value?.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const formatYAxisValue = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${value.toFixed(0)}`;
  };

  const getXAxisInterval = () => {
    const config = timeRangeConfigs.find(c => c.value === selectedRange);
    if (!config) return 0;
    
    // Show fewer labels for ranges with many data points
    if (config.dataPoints > 50) return Math.floor(config.dataPoints / 6);
    if (config.dataPoints > 20) return Math.floor(config.dataPoints / 4);
    return 0;
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-xl border border-white/10 shadow-2xl">
      <div className="card-responsive">
        {/* Enhanced header with live indicators */}
        <div className="flex flex-col space-y-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl border border-blue-500/30">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-responsive-lg font-bold text-white">Portfolio Performance</h3>
                <div className="flex items-center space-x-2 text-responsive-xs">
                  <div className="flex items-center text-emerald-400 font-medium">
                    <div className={`w-2 h-2 rounded-full mr-1 ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`}></div>
                    <span>Real-time tracking</span>
                  </div>
                  <span className="text-slate-400">•</span>
                  <div className="flex items-center text-slate-400">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Updated {lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced controls with growth metrics */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
                growthMetrics.changePercent >= 0 
                  ? 'bg-emerald-500/20 border-emerald-500/30' 
                  : 'bg-red-500/20 border-red-500/30'
              }`}>
                {growthMetrics.changePercent >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" />
                )}
                <span className={`text-xs sm:text-sm font-bold ${
                  growthMetrics.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {growthMetrics.changePercent >= 0 ? '+' : ''}{growthMetrics.changePercent.toFixed(1)}%
                </span>
                <span className="text-xs text-slate-400">
                  ({selectedRange.toUpperCase()})
                </span>
              </div>
              
              <button
                onClick={() => setSelectedMetric(selectedMetric === 'value' ? 'yield' : 'value')}
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-slate-700/50 rounded-lg border border-white/10 hover:bg-slate-600/50 transition-colors touch-target"
              >
                <Filter className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400" />
                <span className="text-slate-300 text-xs sm:text-sm capitalize font-medium">{selectedMetric}</span>
              </button>
            </div>
          </div>

          {/* Enhanced time range selector */}
          <div className="flex flex-wrap items-center gap-2">
            {timeRangeConfigs.map((range) => (
              <button
                key={range.value}
                onClick={() => setSelectedRange(range.value)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 touch-target ${
                  selectedRange === range.value
                    ? 'bg-gradient-to-r from-blue-500/30 to-indigo-500/30 text-blue-300 border border-blue-500/40 shadow-lg'
                    : 'bg-slate-700/30 text-slate-400 hover:text-slate-300 hover:bg-slate-600/30 border border-white/10'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive chart container */}
        <div className="chart-container mb-4 sm:mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioData} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
              <defs>
                <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" strokeOpacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="#94a3b8" 
                fontSize={10}
                tickLine={false}
                axisLine={false}
                interval={getXAxisInterval()}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxisValue}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={selectedMetric}
                stroke={selectedMetric === 'value' ? '#3b82f6' : '#10b981'}
                strokeWidth={2}
                fill={selectedMetric === 'value' ? 'url(#valueGradient)' : 'url(#yieldGradient)'}
                dot={{ fill: selectedMetric === 'value' ? '#3b82f6' : '#10b981', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 4, stroke: selectedMetric === 'value' ? '#3b82f6' : '#10b981', strokeWidth: 2, fill: '#1e293b' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Enhanced stats grid with dynamic calculations */}
        <div className="grid-responsive-4">
          <div className="bg-slate-700/30 rounded-lg p-3 sm:p-4 border border-white/10">
            <div className="text-slate-400 text-xs font-medium mb-1">Current {selectedMetric === 'value' ? 'Value' : 'Yield'}</div>
            <div className="text-white text-base sm:text-xl font-bold">
              ${growthMetrics.current.toLocaleString()}
            </div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3 sm:p-4 border border-white/10">
            <div className="text-slate-400 text-xs font-medium mb-1">Period Change</div>
            <div className={`text-base sm:text-xl font-bold ${
              growthMetrics.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {growthMetrics.changePercent >= 0 ? '+' : ''}{growthMetrics.changePercent.toFixed(1)}%
            </div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3 sm:p-4 border border-white/10">
            <div className="text-slate-400 text-xs font-medium mb-1">All Time High</div>
            <div className="text-white text-base sm:text-xl font-bold">$16,240</div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3 sm:p-4 border border-white/10">
            <div className="text-slate-400 text-xs font-medium mb-1">Total Return</div>
            <div className="text-emerald-400 text-base sm:text-xl font-bold">+23.4%</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
