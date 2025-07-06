
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, TrendingUp, Zap } from 'lucide-react';
import { RiskProfile } from '@/contexts/UserPreferencesContext';

interface RiskAssessmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (riskProfile: RiskProfile) => void;
}

export const RiskAssessmentForm = ({ isOpen, onClose, onComplete }: RiskAssessmentFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [riskLevel, setRiskLevel] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');
  const [maxAllocation, setMaxAllocation] = useState([75]);
  const [preferredChains, setPreferredChains] = useState<string[]>(['Ethereum']);
  const [minAPY, setMinAPY] = useState([5]);

  const riskOptions = [
    {
      id: 'conservative',
      title: 'Conservative',
      icon: <Shield className="h-6 w-6" />,
      description: 'Stable returns, lower risk protocols',
      features: ['Lower volatility', 'Established protocols', 'Insurance coverage preferred']
    },
    {
      id: 'moderate',
      title: 'Moderate',
      icon: <TrendingUp className="h-6 w-6" />,
      description: 'Balanced approach to risk and reward',
      features: ['Medium volatility', 'Mix of protocols', 'Good risk/reward ratio']
    },
    {
      id: 'aggressive',
      title: 'Aggressive',
      icon: <Zap className="h-6 w-6" />,
      description: 'Higher returns, accept more risk',
      features: ['Higher volatility', 'New protocols', 'Maximum yield focus']
    }
  ];

  const chainOptions = [
    'Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Avalanche', 'BSC'
  ];

  const handleChainToggle = (chain: string) => {
    setPreferredChains(prev => 
      prev.includes(chain) 
        ? prev.filter(c => c !== chain)
        : [...prev, chain]
    );
  };

  const handleComplete = () => {
    const profile: RiskProfile = {
      level: riskLevel,
      maxAllocation: maxAllocation[0],
      preferredChains,
      minAPY: minAPY[0],
    };
    onComplete(profile);
  };

  const steps = [
    {
      title: "What's your risk tolerance?",
      content: (
        <div className="space-y-4">
          {riskOptions.map((option) => (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all ${
                riskLevel === option.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
              }`}
              onClick={() => setRiskLevel(option.id as any)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    riskLevel === option.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{option.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {option.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    },
    {
      title: "Portfolio allocation settings",
      content: (
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Maximum portfolio allocation to DeFi yields
            </label>
            <div className="px-4">
              <Slider
                value={maxAllocation}
                onValueChange={setMaxAllocation}
                max={100}
                min={10}
                step={5}
                className="mb-2"
              />
              <div className="text-center text-sm text-muted-foreground">
                {maxAllocation[0]}% of your portfolio
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Minimum APY target
            </label>
            <div className="px-4">
              <Slider
                value={minAPY}
                onValueChange={setMinAPY}
                max={20}
                min={1}
                step={0.5}
                className="mb-2"
              />
              <div className="text-center text-sm text-muted-foreground">
                {minAPY[0]}% minimum APY
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Preferred blockchain networks",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select the blockchain networks you're comfortable using:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {chainOptions.map((chain) => (
              <div key={chain} className="flex items-center space-x-2">
                <Checkbox
                  id={chain}
                  checked={preferredChains.includes(chain)}
                  onCheckedChange={() => handleChainToggle(chain)}
                />
                <label htmlFor={chain} className="text-sm font-medium cursor-pointer">
                  {chain}
                </label>
              </div>
            ))}
          </div>
          {preferredChains.length === 0 && (
            <p className="text-sm text-warning">Please select at least one blockchain network.</p>
          )}
        </div>
      )
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Risk Assessment - Step {currentStep + 1} of {steps.length}</DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <h3 className="text-lg font-semibold mb-4">{steps[currentStep].title}</h3>
          {steps[currentStep].content}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button 
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={currentStep === 2 && preferredChains.length === 0}
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleComplete}
                disabled={preferredChains.length === 0}
              >
                Complete Setup
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
