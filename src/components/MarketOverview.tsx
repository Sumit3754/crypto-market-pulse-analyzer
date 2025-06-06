
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

const marketData = [
  {
    title: 'Total Value Locked',
    value: '$12.4B',
    change: '+2.3%',
    positive: true,
    icon: DollarSign,
  },
  {
    title: '24h Volume',
    value: '$1.8B',
    change: '+15.7%',
    positive: true,
    icon: Activity,
  },
  {
    title: 'Active Pairs',
    value: '8,432',
    change: '+156',
    positive: true,
    icon: TrendingUp,
  },
  {
    title: 'Gas Price',
    value: '23 gwei',
    change: '-12%',
    positive: false,
    icon: TrendingDown,
  },
];

export const MarketOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {marketData.map((item, index) => (
        <Card key={index} className="p-4 bg-black/40 backdrop-blur-lg border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">{item.title}</p>
              <p className="text-white text-2xl font-bold mt-1">{item.value}</p>
              <div className={`flex items-center mt-1 ${item.positive ? 'text-green-400' : 'text-red-400'}`}>
                {item.positive ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                <span className="text-xs font-medium">{item.change}</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${item.positive ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              <item.icon className={`h-6 w-6 ${item.positive ? 'text-green-400' : 'text-red-400'}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
