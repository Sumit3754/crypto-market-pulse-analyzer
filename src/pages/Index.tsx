
import { useState, useEffect } from 'react';
import { MarketHeader } from '@/components/MarketHeader';
import { TokenSearch } from '@/components/TokenSearch';
import { PriceChart } from '@/components/PriceChart';
import { MarketOverview } from '@/components/MarketOverview';
import { AlertsPanel } from '@/components/AlertsPanel';
import { PortfolioTracker } from '@/components/PortfolioTracker';
import { WalletConnector } from '@/components/WalletConnector';

const Index = () => {
  const [selectedToken, setSelectedToken] = useState('ETH/USDT');
  const [walletConnected, setWalletConnected] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <MarketHeader 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          walletConnected={walletConnected}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <TokenSearch 
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
            />
            
            <PriceChart token={selectedToken} />
            
            <MarketOverview />
          </div>
          
          <div className="space-y-6">
            <WalletConnector 
              walletConnected={walletConnected}
              setWalletConnected={setWalletConnected}
            />
            
            <AlertsPanel />
            
            {walletConnected && <PortfolioTracker />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
