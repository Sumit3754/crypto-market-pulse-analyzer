
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const portfolioData = [
  { name: 'ETH', value: 45, amount: 2.5, usdValue: 6142 },
  { name: 'UNI', value: 25, amount: 150, usdValue: 1851 },
  { name: 'LINK', value: 20, amount: 89, usdValue: 1684 },
  { name: 'AAVE', value: 10, amount: 8, usdValue: 1254 },
];

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

export const PortfolioTracker = () => {
  const totalValue = portfolioData.reduce((sum, item) => sum + item.usdValue, 0);
  const totalChange = 5.7; // Mock 24h change

  return (
    <Card className="p-4 bg-black/40 backdrop-blur-lg border-purple-500/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet className="h-5 w-5 text-purple-400" />
            <h3 className="font-semibold text-white">Portfolio</h3>
          </div>
          <div className="text-right">
            <p className="text-white font-bold">${totalValue.toLocaleString()}</p>
            <div className="flex items-center text-green-400 text-sm">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{totalChange}%
            </div>
          </div>
        </div>
        
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number, name: string) => [
                  `${value}%`,
                  name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-2">
          {portfolioData.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <span className="text-white font-medium">{item.name}</span>
                <span className="text-gray-400">{item.amount}</span>
              </div>
              <span className="text-white">${item.usdValue.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
