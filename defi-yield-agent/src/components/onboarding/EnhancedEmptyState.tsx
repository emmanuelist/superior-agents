
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, TrendingUp, PlayCircle, BookOpen, ExternalLink } from 'lucide-react';

interface EnhancedEmptyStateProps {
  type: 'no-positions' | 'no-yields' | 'no-history';
  userAddress?: string;
  onConnectWallet?: () => void;
  onExploreYields?: () => void;
  onEnableSampleData?: () => void;
}

export const EnhancedEmptyState = ({ 
  type, 
  userAddress, 
  onConnectWallet, 
  onExploreYields,
  onEnableSampleData 
}: EnhancedEmptyStateProps) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-positions':
        return {
          title: userAddress ? "Ready to Start Earning?" : "Connect Your Wallet",
          description: userAddress 
            ? "You don't have any active positions yet. Let's find the best yields for your portfolio!"
            : "Connect your wallet to start earning optimized yields across DeFi protocols.",
          icon: userAddress ? <TrendingUp className="h-12 w-12 text-primary" /> : <Wallet className="h-12 w-12 text-primary" />,
          actions: userAddress ? [
            {
              label: "Explore Yield Opportunities",
              onClick: onExploreYields,
              variant: "default" as const,
              icon: <TrendingUp className="h-4 w-4" />
            },
            {
              label: "See Sample Data",
              onClick: onEnableSampleData,
              variant: "outline" as const,
              icon: <PlayCircle className="h-4 w-4" />
            }
          ] : [
            {
              label: "Connect Wallet",
              onClick: onConnectWallet,
              variant: "default" as const,
              icon: <Wallet className="h-4 w-4" />
            }
          ]
        };

      case 'no-yields':
        return {
          title: "No Yield Opportunities Found",
          description: "Try adjusting your filters or check back later for new opportunities.",
          icon: <TrendingUp className="h-12 w-12 text-muted-foreground" />,
          actions: [
            {
              label: "Reset Filters",
              onClick: () => window.location.reload(),
              variant: "outline" as const
            },
            {
              label: "View All Protocols",
              onClick: onExploreYields,
              variant: "default" as const
            }
          ]
        };

      case 'no-history':
        return {
          title: "No Transaction History",
          description: "Your transaction history will appear here once you start using the platform.",
          icon: <BookOpen className="h-12 w-12 text-muted-foreground" />,
          actions: [
            {
              label: "Start Your First Position",
              onClick: onExploreYields,
              variant: "default" as const,
              icon: <TrendingUp className="h-4 w-4" />
            }
          ]
        };

      default:
        return {
          title: "Nothing to see here",
          description: "This section is empty.",
          icon: <div className="h-12 w-12" />,
          actions: []
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full text-center border-dashed border-2 border-muted">
        <CardContent className="p-8 space-y-6">
          <div className="flex justify-center">
            {content.icon}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{content.title}</h3>
            <p className="text-muted-foreground">{content.description}</p>
          </div>

          {type === 'no-positions' && userAddress && (
            <div className="space-y-3">
              <div className="flex justify-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  🔒 Non-custodial
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  ⚡ Auto-optimized
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  🛡️ Risk managed
                </Badge>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4 text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Potential yearly earnings:</span>
                  <span className="font-semibold text-primary">~12.3% APY</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Based on current market conditions
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            {content.actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                onClick={action.onClick}
                className="flex items-center gap-2"
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>

          {type === 'no-positions' && (
            <div className="pt-4 border-t border-muted">
              <p className="text-xs text-muted-foreground mb-2">New to DeFi?</p>
              <Button variant="ghost" size="sm" className="text-xs">
                <BookOpen className="h-3 w-3 mr-1" />
                Learn the basics
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
