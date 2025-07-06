
import { Switch } from '@/components/ui/switch';
import { SettingsCard } from '../shared/SettingsCard';
import { SettingRow } from '../shared/SettingRow';
import { SmartSlider } from '../SmartSlider';
import { useAgentSettingsContext } from '../context/AgentSettingsContext';

export const CardManagementSection = () => {
  const { settings, updateSetting } = useAgentSettingsContext();

  return (
    <SettingsCard title="Card Management">
      <div className="space-y-4">
        <SettingRow
          label="Enable Card Auto Top-Up"
          description="Automatically refill your MetaMask Card when balance gets low"
          control={
            <Switch
              checked={settings.enableCardTopUp}
              onCheckedChange={(checked) => updateSetting('enableCardTopUp', checked)}
            />
          }
        />

        <SmartSlider
          label="Minimum Card Balance"
          value={settings.minCardBalance}
          onValueChange={(value) => updateSetting('minCardBalance', value)}
          min={25}
          max={500}
          step={25}
          unit=""
          description="Trigger auto top-up when card balance falls below this amount"
          recommendations={{
            optimal: 100
          }}
          formatValue={(value) => `$${value}`}
        />

        <SmartSlider
          label="Emergency Buffer"
          value={settings.emergencyBuffer}
          onValueChange={(value) => updateSetting('emergencyBuffer', value)}
          min={100}
          max={2000}
          step={100}
          unit=""
          description="Amount to keep readily available for immediate card spending"
          recommendations={{
            optimal: 750
          }}
          formatValue={(value) => `$${value}`}
        />
      </div>
    </SettingsCard>
  );
};
