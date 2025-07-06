
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';

interface YieldDataPoint {
  date: string;
  apy: number;
}

interface YieldChartProps {
  data: YieldDataPoint[];
  protocol: string;
  currentApy: number;
}

export const YieldChart = ({ data, protocol, currentApy }: YieldChartProps) => {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white font-medium">{protocol} - 30 Day History</h4>
        <span className="text-emerald-400 font-semibold">{currentApy.toFixed(1)}%</span>
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={{ stroke: '#ffffff20' }}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={{ stroke: '#ffffff20' }}
              domain={['dataMin - 0.5', 'dataMax + 0.5']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value: number) => [`${value.toFixed(2)}%`, 'APY']}
            />
            <Line 
              type="monotone" 
              dataKey="apy" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 0, r: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
