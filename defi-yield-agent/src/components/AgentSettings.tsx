
import { useState } from 'react';
import { AgentStatusCard } from './agent/AgentStatusCard';
import { RiskProfileSelector } from './agent/RiskProfileSelector';
import { AgentControlSection } from './agent/sections/AgentControlSection';
import { CoreSettingsSection } from './agent/sections/CoreSettingsSection';
import { CardManagementSection } from './agent/sections/CardManagementSection';
import { AdvancedSettingsSection } from './agent/sections/AdvancedSettingsSection';
import { SaveButton } from './agent/shared/SaveButton';
import { AgentSettingsProvider, useAgentSettingsContext } from './agent/context/AgentSettingsContext';
import { RiskProfile, AgentPreset } from '@/types/agent';

interface AgentSettingsProps {
  userAddress: string;
}

const AgentSettingsContent = () => {
  const [selectedProfile, setSelectedProfile] = useState<RiskProfile>('balanced');
  const { agentStatus, agentMetrics, applyPresetSettings } = useAgentSettingsContext();

  const handleApplyPreset = (preset: AgentPreset) => {
    applyPresetSettings(preset.settings);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 space-y-3 sm:space-y-4">
      {/* Agent Status Dashboard */}
      <AgentStatusCard status={agentStatus} metrics={agentMetrics} />

      {/* Quick Setup Profiles */}
      <RiskProfileSelector
        selectedProfile={selectedProfile}
        onProfileChange={setSelectedProfile}
        onApplyPreset={handleApplyPreset}
      />

      {/* Agent Control */}
      <AgentControlSection />

      {/* Core Settings */}
      <CoreSettingsSection />

      {/* Card Management */}
      <CardManagementSection />

      {/* Advanced Settings */}
      <AdvancedSettingsSection />

      {/* Save Button */}
      <SaveButton />
    </div>
  );
};

export const AgentSettings = ({ userAddress }: AgentSettingsProps) => {
  return (
    <AgentSettingsProvider>
      <AgentSettingsContent />
    </AgentSettingsProvider>
  );
};
