
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, CheckCircle, AlertCircle, Copy, ExternalLink } from 'lucide-react';

interface WalletConnectorProps {
  walletConnected: boolean;
  setWalletConnected: (connected: boolean) => void;
}

export const WalletConnector = ({ walletConnected, setWalletConnected }: WalletConnectorProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    setConnectionError(null);
    
    try {
      // Check if MetaMask is installed
      if (typeof window !== 'undefined' && window.ethereum) {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Simulate additional connection steps
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setWalletConnected(true);
        console.log('Wallet connected successfully');
      } else {
        // Fallback simulation for demo
        await new Promise(resolve => setTimeout(resolve, 2000));
        setWalletConnected(true);
        console.log('Demo wallet connected');
      }
    } catch (error) {
      setConnectionError('Connection failed. Please try again.');
      console.error('Wallet connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setWalletConnected(false);
    setConnectionError(null);
    console.log('Wallet disconnected');
  };

  const copyAddress = () => {
    navigator.clipboard.writeText('0x742d...4b2');
    console.log('Address copied to clipboard');
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
              <div className="flex items-center space-x-1">
                <span className="text-white font-mono">0x742d...4b2</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyAddress}
                  className="h-4 w-4 p-0 text-gray-400 hover:text-white"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Network:</span>
              <span className="text-green-400 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                Ethereum
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Balance:</span>
              <span className="text-white">3.2 ETH</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDisconnect}
              className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/20"
            >
              Disconnect
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
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
        
        {connectionError && (
          <div className="flex items-start space-x-2 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
            <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-red-400 text-xs">{connectionError}</p>
          </div>
        )}
        
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
