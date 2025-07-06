
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Shield, Zap, Target, ChevronRight, ChevronLeft } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartRiskAssessment: () => void;
}

export const WelcomeModal = ({ isOpen, onClose, onStartRiskAssessment }: WelcomeModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to DeFi Yield Agent",
      content: (
        <div className="text-center space-y-4">
          <div className="text-6xl">🚀</div>
          <p className="text-muted-foreground">
            Your AI-powered agent for optimizing DeFi yields automatically. 
            Let's get you set up for maximum returns with smart risk management.
          </p>
        </div>
      )
    },
    {
      title: "How It Works",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold">Auto Optimization</h4>
                <p className="text-sm text-muted-foreground">AI finds the best yields across protocols</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 text-secondary mx-auto mb-2" />
                <h4 className="font-semibold">Risk Management</h4>
                <p className="text-sm text-muted-foreground">Smart protection with your risk tolerance</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <Zap className="h-8 w-8 text-warning mx-auto mb-2" />
                <h4 className="font-semibold">Gas Optimization</h4>
                <p className="text-sm text-muted-foreground">Minimal fees with maximum efficiency</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 text-info mx-auto mb-2" />
                <h4 className="font-semibold">Auto Rebalancing</h4>
                <p className="text-sm text-muted-foreground">Continuous optimization while you sleep</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "Let's Personalize Your Experience",
      content: (
        <div className="text-center space-y-4">
          <div className="text-4xl">🎯</div>
          <p className="text-muted-foreground">
            We'll ask a few quick questions to understand your risk tolerance and investment goals. 
            This helps us customize the perfect strategy for you.
          </p>
          <div className="bg-primary/10 rounded-lg p-4">
            <p className="text-sm text-primary font-medium">
              ✓ Takes less than 2 minutes<br/>
              ✓ You can change settings anytime<br/>
              ✓ No personal information required
            </p>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onStartRiskAssessment();
    }
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{steps[currentStep].title}</DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          {steps[currentStep].content}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-colors ${
                  index === currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
            )}
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
