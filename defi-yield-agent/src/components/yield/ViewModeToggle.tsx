
import { Button } from '@/components/ui/button';
import { User, Users } from 'lucide-react';

interface ViewModeToggleProps {
  viewMode: 'market' | 'personal';
  onViewModeChange: (mode: 'market' | 'personal') => void;
}

export const ViewModeToggle = ({ viewMode, onViewModeChange }: ViewModeToggleProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      <Button
        variant={viewMode === 'personal' ? 'default' : 'outline'}
        onClick={() => onViewModeChange('personal')}
        className="flex items-center gap-2"
      >
        <User className="h-4 w-4" />
        Personal View
      </Button>
      <Button
        variant={viewMode === 'market' ? 'default' : 'outline'}
        onClick={() => onViewModeChange('market')}
        className="flex items-center gap-2"
      >
        <Users className="h-4 w-4" />
        Market View
      </Button>
    </div>
  );
};
