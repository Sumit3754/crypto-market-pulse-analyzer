
import { useState } from 'react';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TokenSearchProps {
  selectedToken: string;
  setSelectedToken: (token: string) => void;
}

const topTokens = [
  { symbol: 'ETH/USDT', price: 2456.78, change: 5.2, volume: '1.2B' },
  { symbol: 'BTC/USDT', price: 43210.45, change: -2.1, volume: '890M' },
  { symbol: 'UNI/USDT', price: 12.34, change: 8.7, volume: '156M' },
  { symbol: 'LINK/USDT', price: 18.92, change: 3.4, volume: '98M' },
  { symbol: 'AAVE/USDT', price: 156.78, change: -1.2, volume: '67M' },
];

export const TokenSearch = ({ selectedToken, setSelectedToken }: TokenSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Card className="p-6 bg-black/40 backdrop-blur-lg border-purple-500/20">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search token address or symbol (e.g., 0x... or ETH)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Analyze Token
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {topTokens.map((token) => (
            <button
              key={token.symbol}
              onClick={() => setSelectedToken(token.symbol)}
              className={`p-3 rounded-lg border transition-all hover:scale-105 ${
                selectedToken === token.symbol
                  ? 'bg-purple-500/20 border-purple-500/50'
                  : 'bg-gray-800/30 border-gray-600/30 hover:border-purple-500/30'
              }`}
            >
              <div className="text-left">
                <div className="font-medium text-white">{token.symbol}</div>
                <div className="text-gray-300 text-sm">${token.price.toLocaleString()}</div>
                <div className={`flex items-center text-xs ${
                  token.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {token.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(token.change)}%
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};
