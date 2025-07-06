
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Dashboard } from '@/components/Dashboard';
import { LandingPage } from '@/components/LandingPage';
import { UserPreferencesProvider, useUserPreferences } from '@/contexts/UserPreferencesContext';
import { WelcomeModal } from '@/components/onboarding/WelcomeModal';
import { RiskAssessmentForm } from '@/components/onboarding/RiskAssessmentForm';
import { OnboardingTooltip } from '@/components/onboarding/OnboardingTooltip';

const IndexContent = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string>('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showRiskAssessment, setShowRiskAssessment] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const location = useLocation();
  const { preferences, completeOnboarding } = useUserPreferences();

  useEffect(() => {
    // Check if user is already connected
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setIsConnected(true);
            setUserAddress(accounts[0]);
          }
        } catch (error) {
          console.log('Error checking connection:', error);
        }
      }
    };

    checkConnection();
  }, []);

  useEffect(() => {
    // Show onboarding flow for new connected users
    if (isConnected && !preferences.hasCompletedOnboarding) {
      setShowWelcome(true);
    }
  }, [isConnected, preferences.hasCompletedOnboarding]);

  const handleConnection = (address: string) => {
    setIsConnected(true);
    setUserAddress(address);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setUserAddress('');
  };

  const handleStartRiskAssessment = () => {
    setShowWelcome(false);
    setShowRiskAssessment(true);
  };

  const handleCompleteOnboarding = (riskProfile: any) => {
    completeOnboarding(riskProfile);
    setShowRiskAssessment(false);
    setOnboardingStep(1); // Start showing tooltips
  };

  const onboardingTooltips = [
    {
      id: 'portfolio-overview',
      title: 'Portfolio Overview',
      content: 'Here you can see your total portfolio value and performance metrics.',
      targetSelector: '[data-onboarding="portfolio-overview"]',
      position: 'bottom' as const
    },
    {
      id: 'yield-opportunities',
      title: 'Yield Opportunities',
      content: 'Browse and compare yield opportunities across different DeFi protocols.',
      targetSelector: '[data-onboarding="yield-opportunities"]',
      position: 'bottom' as const
    },
    {
      id: 'risk-analyzer',
      title: 'Risk Analysis',
      content: 'Each opportunity shows risk metrics based on your preferences.',
      targetSelector: '[data-onboarding="risk-analyzer"]',
      position: 'left' as const
    }
  ];

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950">
        <LandingPage onConnection={handleConnection} />
      </div>
    );
  }

  return (
    <>
      <Dashboard userAddress={userAddress} onDisconnect={handleDisconnect} />
      
      {/* Onboarding Modals */}
      <WelcomeModal
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
        onStartRiskAssessment={handleStartRiskAssessment}
      />
      
      <RiskAssessmentForm
        isOpen={showRiskAssessment}
        onClose={() => setShowRiskAssessment(false)}
        onComplete={handleCompleteOnboarding}
      />

      {/* Onboarding Tooltips */}
      {preferences.hasCompletedOnboarding && onboardingStep > 0 && onboardingStep <= onboardingTooltips.length && (
        <OnboardingTooltip
          {...onboardingTooltips[onboardingStep - 1]}
          onNext={() => {
            if (onboardingStep < onboardingTooltips.length) {
              setOnboardingStep(onboardingStep + 1);
            } else {
              setOnboardingStep(0);
            }
          }}
          isLast={onboardingStep === onboardingTooltips.length}
        />
      )}
    </>
  );
};

const Index = () => {
  return (
    <UserPreferencesProvider>
      <IndexContent />
    </UserPreferencesProvider>
  );
};

export default Index;
