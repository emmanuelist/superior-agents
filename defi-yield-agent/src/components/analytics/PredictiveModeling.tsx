
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, Brain, Target, AlertCircle, Loader2 } from 'lucide-react';
import { generatePredictionData, generateScenarioData, TimeHorizon, PredictionDataPoint, ScenarioData } from '@/utils/predictionDataService';

interface PredictiveModelingProps {
  forecastData?: PredictionDataPoint[];
  scenarios?: ScenarioData[];
}

export const PredictiveModeling = ({ forecastData, scenarios }: PredictiveModelingProps) => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>('30D');
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicForecastData, setDynamicForecastData] = useState<PredictionDataPoint[]>([]);
  const [dynamicScenarios, setDynamicScenarios] = useState<ScenarioData[]>([]);

  // Generate initial data
  useEffect(() => {
    setDynamicForecastData(forecastData || generatePredictionData(timeHorizon));
    setDynamicScenarios(scenarios || generateScenarioData(timeHorizon));
  }, [forecastData, scenarios]);

  // Handle time horizon changes
  const handleTimeHorizonChange = async (newTimeHorizon: TimeHorizon) => {
    if (newTimeHorizon === timeHorizon) return;
    
    setIsLoading(true);
    setTimeHorizon(newTimeHorizon);
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setDynamicForecastData(generatePredictionData(newTimeHorizon));
    setDynamicScenarios(generateScenarioData(newTimeHorizon));
    setSelectedScenario(null); // Reset selected scenario
    setIsLoading(false);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/95 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-2xl">
          <p className="text-slate-300 text-sm font-medium mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-slate-300 text-sm capitalize">{entry.dataKey}</span>
                </div>
                <span className="text-white font-bold text-sm">
                  {entry.value?.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'emerald';
      case 'Medium': return 'yellow';
      case 'High': return 'red';
      default: return 'slate';
    }
  };

  const getTimeHorizonDescription = () => {
    switch (timeHorizon) {
      case '7D': return 'Short-term predictions with high accuracy';
      case '30D': return 'Medium-term forecasts with market trends';
      case '90D': return 'Long-term projections with strategic insights';
    }
  };

  return (
    <div className="space-y-6">
      {/* Yield Forecast Chart */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Brain className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">AI Yield Forecast</h3>
                <p className="text-sm text-slate-400">{getTimeHorizonDescription()}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              {(['7D', '30D', '90D'] as TimeHorizon[]).map((range) => (
                <Button
                  key={range}
                  size="sm"
                  variant={timeHorizon === range ? 'default' : 'outline'}
                  onClick={() => handleTimeHorizonChange(range)}
                  disabled={isLoading}
                  className="px-3 py-1 text-xs transition-all duration-200"
                >
                  {isLoading && timeHorizon === range && (
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  )}
                  {range}
                </Button>
              ))}
            </div>
          </div>

          <div className="h-80 mb-4 relative">
            {isLoading && (
              <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                <div className="flex items-center gap-2 text-white">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Updating predictions...</span>
                </div>
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dynamicForecastData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                
                {/* Confidence Band */}
                <Line
                  type="monotone"
                  dataKey="confidence.upper"
                  stroke="#3b82f6"
                  strokeWidth={1}
                  strokeDasharray="2 2"
                  dot={false}
                  strokeOpacity={0.5}
                />
                <Line
                  type="monotone"
                  dataKey="confidence.lower"
                  stroke="#3b82f6"
                  strokeWidth={1}
                  strokeDasharray="2 2"
                  dot={false}
                  strokeOpacity={0.5}
                />
                
                {/* Actual Data */}
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#10b981' }}
                />
                
                {/* Predicted Data */}
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3, fill: '#f59e0b' }}
                />
                
                {/* Current Point */}
                <ReferenceLine x="Today" stroke="#8b5cf6" strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full" />
              <span className="text-slate-300 text-sm">Historical Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
              <span className="text-slate-300 text-sm">AI Prediction</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-blue-400 rounded-full" />
              <span className="text-slate-300 text-sm">Confidence Range</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Scenario Analysis */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Target className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Market Scenarios ({timeHorizon})</h3>
              <p className="text-sm text-slate-400">Probability-weighted outcomes for {timeHorizon.toLowerCase()} timeframe</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dynamicScenarios.map((scenario, index) => {
              const riskColor = getRiskColor(scenario.risk);
              const isSelected = selectedScenario === scenario.scenario;
              
              return (
                <Card 
                  key={index}
                  className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isSelected 
                      ? `bg-${riskColor}-500/20 border-${riskColor}-400/50 shadow-lg` 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => setSelectedScenario(
                    selectedScenario === scenario.scenario ? null : scenario.scenario
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium text-sm">{scenario.scenario}</h4>
                    <Badge className={`bg-${riskColor}-500/20 text-${riskColor}-400 text-xs`}>
                      {scenario.risk}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-xs">Probability</span>
                      <span className="text-white font-semibold text-sm">{scenario.probability}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-xs">Expected Return</span>
                      <span className={`font-semibold text-sm ${
                        scenario.expectedReturn >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {scenario.expectedReturn >= 0 ? '+' : ''}{scenario.expectedReturn.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 bg-${riskColor}-400 rounded-full transition-all duration-500`}
                        style={{ width: `${scenario.probability}%` }}
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {selectedScenario && (
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400 font-semibold">Scenario Analysis: {selectedScenario}</span>
              </div>
              <p className="text-slate-300 text-sm">
                This {timeHorizon.toLowerCase()} scenario analysis uses machine learning models trained on historical DeFi data, 
                current market conditions, and volatility patterns. Predictions become less certain over longer time horizons.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
