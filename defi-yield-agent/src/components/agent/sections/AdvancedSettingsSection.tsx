
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SettingsCard } from '../shared/SettingsCard';
import { SettingRow } from '../shared/SettingRow';
import { useAgentSettingsContext } from '../context/AgentSettingsContext';

export const AdvancedSettingsSection = () => {
  const { settings, updateSetting } = useAgentSettingsContext();
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <SettingsCard title="">
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center justify-between w-full text-left mb-3 min-h-[44px] touch-manipulation py-2"
      >
        <h3 className="text-base sm:text-lg font-semibold text-white">Advanced Settings</h3>
        {showAdvanced ? (
          <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 flex-shrink-0" />
        )}
      </button>
      
      {showAdvanced && (
        <div className="space-y-4 animate-fade-in">
          <SettingRow
            label="Enable Notifications"
            description="Receive updates about agent actions and important events"
            control={
              <Switch
                checked={settings.notificationsEnabled}
                onCheckedChange={(checked) => updateSetting('notificationsEnabled', checked)}
              />
            }
          />
        </div>
      )}
    </SettingsCard>
  );
};
