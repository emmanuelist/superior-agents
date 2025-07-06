
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface RiskProfile {
  level: 'conservative' | 'moderate' | 'aggressive';
  maxAllocation: number;
  preferredChains: string[];
  minAPY: number;
}

export interface UserPreferences {
  hasCompletedOnboarding: boolean;
  riskProfile: RiskProfile | null;
  preferredView: 'list' | 'cards';
  showSampleData: boolean;
  dismissedTips: string[];
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  completeOnboarding: (riskProfile: RiskProfile) => void;
  dismissTip: (tipId: string) => void;
  resetOnboarding: () => void;
}

const defaultPreferences: UserPreferences = {
  hasCompletedOnboarding: false,
  riskProfile: null,
  preferredView: 'list',
  showSampleData: false,
  dismissedTips: [],
};

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export const UserPreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse user preferences:', error);
      }
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const completeOnboarding = (riskProfile: RiskProfile) => {
    setPreferences(prev => ({
      ...prev,
      hasCompletedOnboarding: true,
      riskProfile,
    }));
  };

  const dismissTip = (tipId: string) => {
    setPreferences(prev => ({
      ...prev,
      dismissedTips: [...prev.dismissedTips, tipId],
    }));
  };

  const resetOnboarding = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <UserPreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        completeOnboarding,
        dismissTip,
        resetOnboarding,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};
