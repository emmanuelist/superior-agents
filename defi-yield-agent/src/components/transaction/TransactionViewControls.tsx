
import { Button } from '@/components/ui/button';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, BarChart3, List, Calendar, Grid3X3, Table } from 'lucide-react';

interface TransactionViewControlsProps {
  activeView: string;
  listViewMode: 'cards' | 'table';
  onListViewModeChange: (mode: 'cards' | 'table') => void;
  onExport: (format: 'csv' | 'pdf') => void;
}

export const TransactionViewControls = ({
  activeView,
  listViewMode,
  onListViewModeChange,
  onExport
}: TransactionViewControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <TabsList className="bg-white/10 border-white/20">
        <TabsTrigger value="list" className="data-[state=active]:bg-white/20">
          <List className="h-4 w-4 mr-2" />
          List View
        </TabsTrigger>
        <TabsTrigger value="timeline" className="data-[state=active]:bg-white/20">
          <Calendar className="h-4 w-4 mr-2" />
          Timeline
        </TabsTrigger>
        <TabsTrigger value="analytics" className="data-[state=active]:bg-white/20">
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics
        </TabsTrigger>
      </TabsList>

      <div className="flex items-center gap-2">
        {/* List View Mode Toggle */}
        {activeView === 'list' && (
          <div className="flex bg-slate-700/50 rounded-lg p-1">
            <Button
              size="sm"
              variant={listViewMode === 'cards' ? 'default' : 'ghost'}
              onClick={() => onListViewModeChange('cards')}
              className="px-3 py-1 text-xs"
            >
              <Grid3X3 className="h-3 w-3 mr-1" />
              Cards
            </Button>
            <Button
              size="sm"
              variant={listViewMode === 'table' ? 'default' : 'ghost'}
              onClick={() => onListViewModeChange('table')}
              className="px-3 py-1 text-xs"
            >
              <Table className="h-3 w-3 mr-1" />
              Table
            </Button>
          </div>
        )}

        {/* Export buttons */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onExport('csv')}
            className="text-white border-slate-600"
          >
            <Download className="h-4 w-4 mr-2" />
            CSV
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onExport('pdf')}
            className="text-white border-slate-600"
          >
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>
    </div>
  );
};
