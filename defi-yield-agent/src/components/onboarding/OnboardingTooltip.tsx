
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronRight } from 'lucide-react';
import { useUserPreferences } from '@/contexts/UserPreferencesContext';

interface OnboardingTooltipProps {
  id: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  targetSelector: string;
  delay?: number;
  onNext?: () => void;
  isLast?: boolean;
}

export const OnboardingTooltip = ({ 
  id, 
  title, 
  content, 
  position, 
  targetSelector, 
  delay = 1000,
  onNext,
  isLast = false
}: OnboardingTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const { preferences, dismissTip } = useUserPreferences();

  useEffect(() => {
    if (preferences.dismissedTips.includes(id)) return;

    const timer = setTimeout(() => {
      const element = document.querySelector(targetSelector) as HTMLElement;
      if (element) {
        setTargetElement(element);
        setIsVisible(true);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [id, targetSelector, delay, preferences.dismissedTips]);

  const handleDismiss = () => {
    setIsVisible(false);
    dismissTip(id);
  };

  const handleNext = () => {
    handleDismiss();
    if (onNext) onNext();
  };

  if (!isVisible || !targetElement) return null;

  const rect = targetElement.getBoundingClientRect();
  const tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 1000,
  };

  switch (position) {
    case 'top':
      tooltipStyle.bottom = window.innerHeight - rect.top + 10;
      tooltipStyle.left = rect.left + rect.width / 2;
      tooltipStyle.transform = 'translateX(-50%)';
      break;
    case 'bottom':
      tooltipStyle.top = rect.bottom + 10;
      tooltipStyle.left = rect.left + rect.width / 2;
      tooltipStyle.transform = 'translateX(-50%)';
      break;
    case 'left':
      tooltipStyle.right = window.innerWidth - rect.left + 10;
      tooltipStyle.top = rect.top + rect.height / 2;
      tooltipStyle.transform = 'translateY(-50%)';
      break;
    case 'right':
      tooltipStyle.left = rect.right + 10;
      tooltipStyle.top = rect.top + rect.height / 2;
      tooltipStyle.transform = 'translateY(-50%)';
      break;
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-[999]" onClick={handleDismiss} />
      
      {/* Tooltip */}
      <Card className="max-w-sm border-primary shadow-lg z-[1000]" style={tooltipStyle}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-sm">{title}</h4>
            <Button variant="ghost" size="sm" onClick={handleDismiss} className="h-6 w-6 p-0">
              <X className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{content}</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleDismiss}>
              Skip
            </Button>
            <Button size="sm" onClick={handleNext}>
              {isLast ? 'Got it!' : 'Next'}
              {!isLast && <ChevronRight className="h-3 w-3 ml-1" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
