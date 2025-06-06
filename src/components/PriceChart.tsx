
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, BarChart3, Activity } from 'lucide-react';

interface PriceChartProps {
  token: string;
}

// Mock price data - in real app this would come from DEX APIs
const generateMockData = (days: number) => {
  const data = [];
  let price = 2400;
  for (let i = 0; i < days * 24; i++) {
    price += (Math.random() - 0.5) * 50;
    data.push({
      time: new Date(Date.now() - (days * 24 - i) * 60 * 60 * 1000).toISOString(),
      price: Math.max(price, 1000),
      volume: Math.random() * 1000000,
      liquidity: Math.random() * 10000000 + 50000000,
    });
  }
  return data;
};

export const PriceChart = ({ token }: PriceChartProps) => {
  const [timeframe, setTimeframe] = useState('1D');
  const [chartType, setChartType] = useState('price');
  
  const timeframes = ['1H', '1D', '7D', '30D'];
  const chartTypes = [
    { key: 'price', label: 'Price', icon: TrendingUp },
    { key: 'volume', label: 'Volume', icon: BarChart3 },
    { key: 'liquidity', label: 'Liquidity', icon: Activity },
  ];

  const data = generateMockData(timeframe === '1H' ? 1/24 : timeframe === '1D' ? 1 : timeframe === '7D' ? 7 : 30);

  const formatValue = (value: number, type: string) => {
    if (type === 'price') return `$${value.toFixed(2)}`;
    if (type === 'volume') return `$${(value / 1000000).toFixed(1)}M`;
    if (type === 'liquidity') return `$${(value / 1000000).toFixed(1)}M`;
    return value.toString();
  };

  return (
    <Card className="p-6 bg-black/40 backdrop-blur-lg border-purple-500/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{token} Analysis</h2>
            <p className="text-gray-400">Real-time DEX data visualization</p>
          </div>
          
          <div className="flex space-x-2">
            {chartTypes.map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={chartType === key ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType(key)}
                className={chartType === key 
                  ? "bg-gradient-to-r from-purple-500 to-pink-500" 
                  : "border-gray-600 text-gray-300 hover:bg-gray-700"
                }
              >
                <Icon className="h-4 w-4 mr-1" />
                {label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-2">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(tf)}
              className={timeframe === tf 
                ? "bg-purple-500 hover:bg-purple-600" 
                : "border-gray-600 text-gray-300 hover:bg-gray-700"
              }
            >
              {tf}
            </Button>
          ))}
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9ca3af"
                tickFormatter={(value) => new Date(value).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              />
              <YAxis 
                stroke="#9ca3af"
                tickFormatter={(value) => formatValue(value, chartType)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number) => [formatValue(value, chartType), chartType]}
                labelFormatter={(value) => new Date(value).toLocaleString()}
              />
              <Area
                type="monotone"
                dataKey={chartType}
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#colorGradient)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
