
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, ZoomIn, ZoomOut, Download, BarChart3, PieChart as PieChartIcon, Loader2 } from 'lucide-react';
import { getAnalyticsData, calculateAnalyticsGrowth, analyticsTimeRanges, AnalyticsDataPoint } from '@/utils/analyticsDataService';

interface InteractiveChartProps {
  title: string;
  metric: 'value' | 'yield';
  showBenchmark?: boolean;
}

export const InteractiveChart = ({ title, metric, showBenchmark = false }: InteractiveChartProps) => {
  const [chartType, setChartType] = useState<'line' | 'area' | 'pie'>('area');
  const [timeRange, setTimeRange] = useState('30D');
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<AnalyticsDataPoint[]>([]);

  // Load initial data
  useEffect(() => {
    setChartData(getAnalyticsData(timeRange, metric));
  }, []);

  // Handle time range changes with loading state
  const handleTimeRangeChange = async (newTimeRange: string) => {
    if (newTimeRange === timeRange) return;
    
    setIsLoading(true);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 600));
    
    setTimeRange(newTimeRange);
    setChartData(getAnalyticsData(newTimeRange, metric));
    setIsLoading(false);
  };

  const growthMetrics = calculateAnalyticsGrowth(chartData, metric);

  const pieData = [
    { name: 'Aave USDC', value: 45, color: '#3b82f6' },
    { name: 'Compound USDT', value: 30, color: '#10b981' },
    { name: 'Yearn DAI', value: 25, color: '#f59e0b' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/95 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-2xl">
          <p className="text-slate-300 text-sm font-medium mb-2">{label}</p>
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
                <span className="text-white font-bold text-sm">
                  {entry.dataKey === 'yield' ? `${entry.value?.toFixed(2)}%` : `$${entry.value?.toLocaleString()}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (chartType === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number, name: string) => [`${value}%`, name]}
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.95)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                color: 'white'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    const ChartComponent = chartType === 'area' ? AreaChart : LineChart;
    
    return (
      <ChartComponent data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
        />
        <YAxis 
          stroke="#94a3b8" 
          fontSize={10}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        
        {chartType === 'area' ? (
          <>
            <Area
              type="monotone"
              dataKey={metric}
              stroke={metric === 'value' ? '#3b82f6' : '#10b981'}
              strokeWidth={2}
              fill={metric === 'value' ? 'url(#valueGradient)' : 'url(#yieldGradient)'}
            />
            {showBenchmark && (
              <Area
                type="monotone"
                dataKey="benchmark"
                stroke="#f59e0b"
                strokeWidth={1}
                strokeDasharray="5 5"
                fill="none"
              />
            )}
          </>
        ) : (
          <>
            <Line
              type="monotone"
              dataKey={metric}
              stroke={metric === 'value' ? '#3b82f6' : '#10b981'}
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            {showBenchmark && (
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#f59e0b"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={{ r: 1 }}
              />
            )}
          </>
        )}
      </ChartComponent>
    );
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            {growthMetrics.changePercent !== 0 && (
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                growthMetrics.changePercent >= 0 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {growthMetrics.changePercent >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span className="text-xs font-bold">
                  {growthMetrics.changePercent >= 0 ? '+' : ''}{growthMetrics.changePercent.toFixed(1)}%
                </span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Chart Type Selector */}
            <div className="flex bg-slate-700/50 rounded-lg p-1">
              <Button
                size="sm"
                variant={chartType === 'area' ? 'default' : 'ghost'}
                onClick={() => setChartType('area')}
                className="px-3 py-1 text-xs"
              >
                <BarChart3 className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant={chartType === 'line' ? 'default' : 'ghost'}
                onClick={() => setChartType('line')}
                className="px-3 py-1 text-xs"
              >
                <TrendingUp className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant={chartType === 'pie' ? 'default' : 'ghost'}
                onClick={() => setChartType('pie')}
                className="px-3 py-1 text-xs"
              >
                <PieChartIcon className="h-3 w-3" />
              </Button>
            </div>

            {/* Time Range Selector */}
            <div className="flex gap-1">
              {analyticsTimeRanges.map((range) => (
                <Button
                  key={range.value}
                  size="sm"
                  variant={timeRange === range.value ? 'default' : 'outline'}
                  onClick={() => handleTimeRangeChange(range.value)}
                  disabled={isLoading}
                  className="px-3 py-1 text-xs transition-all duration-200"
                >
                  {isLoading && timeRange === range.value && (
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  )}
                  {range.label}
                </Button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsZoomed(!isZoomed)}
                className="px-3 py-1 text-xs"
              >
                {isZoomed ? <ZoomOut className="h-3 w-3" /> : <ZoomIn className="h-3 w-3" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="px-3 py-1 text-xs"
              >
                <Download className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        <div className="h-80 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
              <div className="flex items-center gap-2 text-white">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Loading {timeRange} data...</span>
              </div>
            </div>
          )}
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>

        {chartType === 'pie' && (
          <div className="mt-4 flex justify-center">
            <div className="flex flex-wrap gap-4">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-slate-300 text-sm">{entry.name}</span>
                  <Badge className="bg-white/10 text-white">
                    {entry.value}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Value Display */}
        <div className="mt-4 flex justify-center">
          <div className="bg-slate-700/30 rounded-lg px-4 py-2 border border-white/10">
            <div className="text-slate-400 text-xs font-medium">Current {metric === 'value' ? 'Value' : 'Yield'}</div>
            <div className="text-white text-lg font-bold">
              {metric === 'yield' ? `${growthMetrics.current.toFixed(2)}%` : `$${growthMetrics.current.toLocaleString()}`}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
