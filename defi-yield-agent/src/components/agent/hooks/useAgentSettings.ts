
import { useState } from 'react';

export interface AgentSettingsState {
  agentEnabled: boolean;
  riskTolerance: number;
  minCardBalance: number;
  emergencyBuffer: number;
  rebalanceFrequency: number;
  maxGasPrice: number;
  enableCrossChain: boolean;
  enableCardTopUp: boolean;
  notificationsEnabled: boolean;
}

export const useAgentSettings = () => {
  const [settings, setSettings] = useState<AgentSettingsState>({
    agentEnabled: true,
    riskTolerance: 5,
    minCardBalance: 50,
    emergencyBuffer: 500,
    rebalanceFrequency: 24,
    maxGasPrice: 30,
    enableCrossChain: true,
    enableCardTopUp: true,
    notificationsEnabled: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const updateSetting = <K extends keyof AgentSettingsState>(
    key: K,
    value: AgentSettingsState[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    console.log('Saving settings:', settings);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const applyPresetSettings = (presetSettings: Partial<AgentSettingsState>) => {
    setSettings(prev => ({ ...prev, ...presetSettings }));
  };

  return {
    settings,
    updateSetting,
    handleSave,
    applyPresetSettings,
    isSaving
  };
};
