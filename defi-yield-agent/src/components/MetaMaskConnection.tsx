
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, AlertCircle } from 'lucide-react';

interface MetaMaskConnectionProps {
  onConnection: (address: string) => void;
}

export const MetaMaskConnection = ({ onConnection }: MetaMaskConnectionProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string>('');

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setIsConnecting(true);
    setError('');

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        onConnection(accounts[0]);
      }
    } catch (error: any) {
      console.error('Error connecting to MetaMask:', error);
      setError('Failed to connect to MetaMask. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 lg:py-20">
      <div className="glass-card rounded-2xl p-6 lg:p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6 space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <Wallet className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl lg:text-2xl font-bold text-foreground">Connect Your Wallet</h2>
            <p className="text-muted-foreground text-sm lg:text-base">Connect your MetaMask wallet to start optimizing your yields</p>
          </div>
        </div>

        {error && (
          <div className="status-error rounded-lg p-3 mb-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <Button
          onClick={connectWallet}
          disabled={isConnecting}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
        >
          {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          By connecting your wallet, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};
