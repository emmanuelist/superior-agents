
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Zap } from 'lucide-react';

interface Transaction {
  id: string;
  type: string;
  description: string;
  amount: number;
  from: string;
  to: string;
  timestamp: string;
  status: string;
  txHash: string;
  gasUsed: number;
}

interface TransactionAnalyticsProps {
  transactions: Transaction[];
}

export const TransactionAnalytics = ({ transactions }: TransactionAnalyticsProps) => {
  // Calculate analytics data
  const totalGasSpent = transactions.reduce((sum, tx) => sum + tx.gasUsed, 0);
  const totalVolume = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const avgGasPerTx = totalGasSpent / transactions.length;
  
  // Transaction types distribution
  const typeDistribution = transactions.reduce((acc, tx) => {
    acc[tx.type] = (acc[tx.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(typeDistribution).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
    color: getTypeColor(type)
  }));

  // Daily transaction volume
  const dailyVolume = transactions.reduce((acc, tx) => {
    const date = new Date(tx.timestamp).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const volumeData = Object.entries(dailyVolume)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-7) // Last 7 days
    .map(([date, volume]) => ({
      date: new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      volume
    }));

  // Gas usage over time
  const gasData = transactions
    .slice(-10) // Last 10 transactions
    .map((tx, index) => ({
      tx: `TX ${index + 1}`,
      gas: tx.gasUsed,
      type: tx.type
    }));

  function getTypeColor(type: string) {
    switch (type) {
      case 'rebalance': return '#3B82F6';
      case 'top-up': return '#10B981';
      case 'bridge': return '#8B5CF6';
      case 'deposit': return '#F59E0B';
      default: return '#6B7280';
    }
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-200">Total Volume</p>
                <p className="text-2xl font-bold text-white">${totalVolume.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-200">Total Gas</p>
                <p className="text-2xl font-bold text-white">{totalGasSpent.toFixed(4)} ETH</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-200">Avg Gas/TX</p>
                <p className="text-2xl font-bold text-white">${(avgGasPerTx * 2000).toFixed(0)}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-200">Success Rate</p>
                <p className="text-2xl font-bold text-white">100%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Types Distribution */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Transaction Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily Volume */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Daily Volume (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Volume']}
                />
                <Line type="monotone" dataKey="volume" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Gas Usage Chart */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Gas Usage (Last 10 Transactions)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={gasData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="tx" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number) => [`${value} ETH`, 'Gas Used']}
              />
              <Bar dataKey="gas" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
