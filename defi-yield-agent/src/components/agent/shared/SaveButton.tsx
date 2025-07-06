
import { Button } from '@/components/ui/button';
import { useAgentSettingsContext } from '../context/AgentSettingsContext';

export const SaveButton = () => {
  const { handleSave, isSaving } = useAgentSettingsContext();

  return (
    <div className="flex justify-end pt-2">
      <Button
        onClick={handleSave}
        disabled={isSaving}
        className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white px-8 py-3 text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:hover:shadow-none"
      >
        {isSaving ? 'Saving...' : 'Save Settings'}
      </Button>
    </div>
  );
};
