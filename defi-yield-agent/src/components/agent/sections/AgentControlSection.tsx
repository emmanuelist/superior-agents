
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { SettingsCard } from '../shared/SettingsCard';
import { SettingRow } from '../shared/SettingRow';
import { useAgentSettingsContext } from '../context/AgentSettingsContext';

export const AgentControlSection = () => {
  const { settings, updateSetting } = useAgentSettingsContext();

  return (
    <SettingsCard
      title="Agent Control"
      badge={
        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
          Smart Mode
        </Badge>
      }
    >
      <div className="space-y-4">
        <SettingRow
          label="Enable Agent"
          description="Allow the agent to automatically manage your funds"
          control={
            <Switch
              checked={settings.agentEnabled}
              onCheckedChange={(checked) => updateSetting('agentEnabled', checked)}
            />
          }
        />
        
        <SettingRow
          label="Enable Cross-Chain Operations"
          description="Allow the agent to move funds between different chains"
          control={
            <Switch
              checked={settings.enableCrossChain}
              onCheckedChange={(checked) => updateSetting('enableCrossChain', checked)}
            />
          }
        />
      </div>
    </SettingsCard>
  );
};
