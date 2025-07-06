
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, TrendingUp, Zap } from 'lucide-react';
import { RiskProfile, AgentPreset } from '@/types/agent';

interface RiskProfileSelectorProps {
  selectedProfile: RiskProfile;
  onProfileChange: (profile: RiskProfile) => void;
  onApplyPreset: (preset: AgentPreset) => void;
}

export const RiskProfileSelector = ({ selectedProfile, onProfileChange, onApplyPreset }: RiskProfileSelectorProps) => {
  const presets: AgentPreset[] = [
    {
      name: 'Conservative',
      description: 'Low risk, stable returns. Perfect for beginners.',
      icon: '🛡️',
      settings: {
        riskTolerance: 3,
        rebalanceFrequency: 48,
        maxGasPrice: 20,
        minCardBalance: 100,
        emergencyBuffer: 1000,
      }
    },
    {
      name: 'Balanced',
      description: 'Moderate risk with balanced growth potential.',
      icon: '⚖️',
      settings: {
        riskTolerance: 6,
        rebalanceFrequency: 24,
        maxGasPrice: 30,
        minCardBalance: 75,
        emergencyBuffer: 750,
      }
    },
    {
      name: 'Aggressive',
      description: 'High risk, high reward. For experienced users.',
      icon: '🚀',
      settings: {
        riskTolerance: 9,
        rebalanceFrequency: 12,
        maxGasPrice: 50,
        minCardBalance: 50,
        emergencyBuffer: 500,
      }
    }
  ];

  const getPresetColor = (preset: AgentPreset, isSelected: boolean) => {
    const baseClasses = "border-2 transition-all duration-300 min-h-[120px] sm:min-h-[140px]";
    if (isSelected) {
      return `${baseClasses} border-blue-400 bg-blue-500/20`;
    }
    return `${baseClasses} border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 active:bg-white/20`;
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <div className="p-3 sm:p-4 lg:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Quick Setup Profiles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {presets.map((preset) => {
            const isSelected = selectedProfile === preset.name.toLowerCase() as RiskProfile;
            return (
              <div
                key={preset.name}
                className={`${getPresetColor(preset, isSelected)} rounded-lg p-3 sm:p-4 cursor-pointer touch-manipulation`}
                onClick={() => {
                  onProfileChange(preset.name.toLowerCase() as RiskProfile);
                  onApplyPreset(preset);
                }}
              >
                <div className="text-center h-full flex flex-col justify-center">
                  <div className="text-2xl mb-2">{preset.icon}</div>
                  <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">{preset.name}</h4>
                  <p className="text-xs sm:text-sm text-blue-200 mb-3 line-clamp-2">{preset.description}</p>
                  <div className="text-xs text-blue-300 leading-relaxed">
                    Risk: {preset.settings.riskTolerance}/10<br className="sm:hidden" /><span className="hidden sm:inline"> • </span>
                    Rebalance: {preset.settings.rebalanceFrequency}h
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
