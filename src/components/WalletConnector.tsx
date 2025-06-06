
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, CheckCircle, AlertCircle } from 'lucide-react';

interface WalletConnectorProps {
  walletConnected: boolean;
  setWalletConnected: (connected: boolean) => void;
}

export const WalletConnector = ({ walletConnected, setWalletConnected }: WalletConnectorProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    setWalletConnected(true);
    setIsConnecting(false);
  };

  const handleDisconnect = () => {
    setWalletConnected(false);
  };

  if (walletConnected) {
    return (
      <Card className="p-4 bg-black/40 backdrop-blur-lg border-green-500/20">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <h3 className="font-semibold text-white">Wallet Connected</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Address:</span>
              <span className="text-white font-mono">0x742d...4b2</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Network:</span>
              <span className="text-green-400">Ethereum</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Balance:</span>
              <span className="text-white">3.2 ETH</span>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDisconnect}
            className="w-full border-red-500/30 text-red-400 hover:bg-red-500/20"
          >
            Disconnect
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-black/40 backdrop-blur-lg border-purple-500/20">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Wallet className="h-5 w-5 text-purple-400" />
          <h3 className="font-semibold text-white">Connect Wallet</h3>
        </div>
        
        <div className="flex items-start space-x-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-blue-400 text-xs">
            Connect your wallet to access portfolio tracking and personalized analytics.
          </p>
        </div>
        
        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
        >
          {isConnecting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </>
          )}
        </Button>
        
        <p className="text-gray-400 text-xs text-center">
          Supports MetaMask, WalletConnect, and more
        </p>
      </div>
    </Card>
  );
};
