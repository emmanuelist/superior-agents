
import { Button } from '@/components/ui/button';
import { SearchX, Filter, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  type?: 'search' | 'filter' | 'error';
}

export const EmptyState = ({ title, description, action, type = 'search' }: EmptyStateProps) => {
  const icons = {
    search: SearchX,
    filter: Filter,
    error: RefreshCw,
  };

  const Icon = icons[type];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-4 p-3 rounded-full bg-white/5 border border-white/10">
        <Icon className="h-8 w-8 text-blue-300" />
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-blue-200 mb-6 max-w-sm">{description}</p>
      
      {action && (
        <Button 
          onClick={action.onClick}
          variant="outline"
          className="border-white/20 text-blue-300 hover:text-white hover:bg-white/10"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};
