
import { TrendingUp, Activity, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MarketHeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  walletConnected: boolean;
}

export const MarketHeader = ({ darkMode, setDarkMode, walletConnected }: MarketHeaderProps) => {
  return (
    <header className="flex items-center justify-between p-6 bg-black/20 backdrop-blur-lg rounded-xl border border-purple-500/20">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CryptoFlow
            </h1>
            <p className="text-gray-400 text-sm">Web3 Market Analyzer</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">Live Data</span>
        </div>
        
        <div className="flex items-center space-x-2 px-3 py-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
          <TrendingUp className="h-4 w-4 text-blue-400" />
          <span className="text-blue-400 text-sm font-medium">24h: +5.2%</span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDarkMode(!darkMode)}
          className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20"
        >
          <Zap className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};
