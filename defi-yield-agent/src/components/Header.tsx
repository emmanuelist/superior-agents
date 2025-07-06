
import { Button } from '@/components/ui/button';
import { Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  userAddress: string;
  onDisconnect: () => void;
}

export const Header = ({ userAddress, onDisconnect }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="border-b border-white/20 bg-white/5 backdrop-blur-sm safe-area-top">
      <div className="container-fluid">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent truncate">
              DeFi Yield Agent
            </h1>
            <div className="hidden lg:block">
              <span className="text-xs sm:text-sm text-blue-200">Automated Yield Optimization</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
            <div className="bg-white/10 rounded-lg px-3 py-2 border border-white/20">
              <span className="text-xs lg:text-sm text-blue-200">Connected:</span>
              <span className="text-white font-mono ml-2 text-xs lg:text-sm">{formatAddress(userAddress)}</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-blue-200 hover:bg-white/10 touch-target hidden md:flex"
            >
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={onDisconnect}
              variant="outline"
              size="sm"
              className="border-red-400/50 text-red-300 hover:bg-red-500/20 touch-target"
            >
              <span className="hidden lg:inline">Disconnect</span>
              <span className="lg:hidden">Exit</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="touch-target-lg"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-white/20 py-4 animate-fade-in">
            <div className="space-y-4">
              {/* User Info */}
              <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                <div className="text-xs text-blue-200 mb-1">Connected Wallet</div>
                <div className="text-white font-mono text-sm">{formatAddress(userAddress)}</div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-blue-200 hover:bg-white/10 touch-target-lg mobile-full"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                
                <Button
                  onClick={() => {
                    onDisconnect();
                    setMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full border-red-400/50 text-red-300 hover:bg-red-500/20 touch-target-lg mobile-full"
                >
                  Disconnect Wallet
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
