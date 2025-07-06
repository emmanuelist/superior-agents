
import { SettingsCard } from '../shared/SettingsCard';
import { SmartSlider } from '../SmartSlider';
import { useAgentSettingsContext } from '../context/AgentSettingsContext';

export const CoreSettingsSection = () => {
  const { settings, updateSetting } = useAgentSettingsContext();

  return (
    <SettingsCard title="Core Settings">
      <div className="space-y-6">
        <SmartSlider
          label="Risk Tolerance"
          value={settings.riskTolerance}
          onValueChange={(value) => updateSetting('riskTolerance', value)}
          min={1}
          max={10}
          step={1}
          description="Higher values allow investments in riskier, higher-yield protocols"
          recommendations={{
            optimal: 6,
            warning: 9
          }}
          formatValue={(value) => `${value}/10`}
        />

        <SmartSlider
          label="Rebalance Frequency"
          value={settings.rebalanceFrequency}
          onValueChange={(value) => updateSetting('rebalanceFrequency', value)}
          min={1}
          max={168}
          step={1}
          unit=" hours"
          description="How often the agent checks and rebalances your portfolio"
          recommendations={{
            optimal: 24,
            warning: 4
          }}
          formatValue={(value) => value === 1 ? '1 hour' : `${value} hours`}
        />

        <SmartSlider
          label="Maximum Gas Price"
          value={settings.maxGasPrice}
          onValueChange={(value) => updateSetting('maxGasPrice', value)}
          min={10}
          max={100}
          step={5}
          unit=" Gwei"
          description="Agent will wait for lower gas prices before executing transactions"
          recommendations={{
            optimal: 30,
            warning: 70
          }}
        />
      </div>
    </SettingsCard>
  );
};
