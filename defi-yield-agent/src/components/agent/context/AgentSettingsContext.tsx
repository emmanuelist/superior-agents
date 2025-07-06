
import { createContext, useContext, ReactNode } from 'react';
import { useAgentSettings, AgentSettingsState } from '../hooks/useAgentSettings';
import { useAgentData } from '../hooks/useAgentData';
import { RiskProfile, AgentPreset } from '@/types/agent';

interface AgentSettingsContextType {
  settings: AgentSettingsState;
  updateSetting: <K extends keyof AgentSettingsState>(key: K, value: AgentSettingsState[K]) => void;
  handleSave: () => Promise<void>;
  applyPresetSettings: (presetSettings: Partial<AgentSettingsState>) => void;
  isSaving: boolean;
  agentStatus: any;
  agentMetrics: any;
}

const AgentSettingsContext = createContext<AgentSettingsContextType | undefined>(undefined);

export const useAgentSettingsContext = () => {
  const context = useContext(AgentSettingsContext);
  if (!context) {
    throw new Error('useAgentSettingsContext must be used within AgentSettingsProvider');
  }
  return context;
};

interface AgentSettingsProviderProps {
  children: ReactNode;
}

export const AgentSettingsProvider = ({ children }: AgentSettingsProviderProps) => {
  const settingsHook = useAgentSettings();
  const { agentStatus, agentMetrics } = useAgentData();

  return (
    <AgentSettingsContext.Provider 
      value={{
        ...settingsHook,
        agentStatus,
        agentMetrics
      }}
    >
      {children}
    </AgentSettingsContext.Provider>
  );
};
