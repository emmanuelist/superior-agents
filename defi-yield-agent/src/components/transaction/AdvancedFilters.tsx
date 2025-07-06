
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Filter, X, Save, RotateCcw } from 'lucide-react';

interface FilterState {
  search: string;
  type: string;
  status: string;
  dateRange: {
    from: string;
    to: string;
  };
  amountRange: {
    min: string;
    max: string;
  };
  gasRange: {
    min: string;
    max: string;
  };
}

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onSavePreset: (name: string, filters: FilterState) => void;
  savedPresets: Array<{ name: string; filters: FilterState }>;
  onLoadPreset: (filters: FilterState) => void;
}

export const AdvancedFilters = ({
  filters,
  onFiltersChange,
  onSavePreset,
  savedPresets,
  onLoadPreset
}: AdvancedFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [showSavePreset, setShowSavePreset] = useState(false);

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const resetFilters = () => {
    onFiltersChange({
      search: '',
      type: 'all',
      status: 'all',
      dateRange: { from: '', to: '' },
      amountRange: { min: '', max: '' },
      gasRange: { min: '', max: '' }
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.type !== 'all') count++;
    if (filters.status !== 'all') count++;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    if (filters.amountRange.min || filters.amountRange.max) count++;
    if (filters.gasRange.min || filters.gasRange.max) count++;
    return count;
  };

  const handleSavePreset = () => {
    if (presetName.trim()) {
      onSavePreset(presetName.trim(), filters);
      setPresetName('');
      setShowSavePreset(false);
    }
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
      <div className="space-y-4">
        {/* Basic Filters Row */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>
          
          <Select value={filters.type} onValueChange={(value) => updateFilters({ type: value })}>
            <SelectTrigger className="w-full md:w-40 bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="rebalance">Rebalance</SelectItem>
              <SelectItem value="deposit">Deposit</SelectItem>
              <SelectItem value="bridge">Bridge</SelectItem>
              <SelectItem value="top-up">Top-up</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.status} onValueChange={(value) => updateFilters({ status: value })}>
            <SelectTrigger className="w-full md:w-40 bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-white border-slate-600 relative"
            >
              <Filter className="h-4 w-4 mr-2" />
              Advanced
              {activeFilterCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-blue-500 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
            
            {activeFilterCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="text-white border-slate-600"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="space-y-4 border-t border-white/10 pt-4">
            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">Date Range</label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={filters.dateRange.from}
                    onChange={(e) => updateFilters({ 
                      dateRange: { ...filters.dateRange, from: e.target.value }
                    })}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <Input
                    type="date"
                    value={filters.dateRange.to}
                    onChange={(e) => updateFilters({ 
                      dateRange: { ...filters.dateRange, to: e.target.value }
                    })}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              {/* Amount Range */}
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">Amount Range ($)</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.amountRange.min}
                    onChange={(e) => updateFilters({ 
                      amountRange: { ...filters.amountRange, min: e.target.value }
                    })}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.amountRange.max}
                    onChange={(e) => updateFilters({ 
                      amountRange: { ...filters.amountRange, max: e.target.value }
                    })}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Gas Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">Gas Range (ETH)</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    step="0.0001"
                    placeholder="Min"
                    value={filters.gasRange.min}
                    onChange={(e) => updateFilters({ 
                      gasRange: { ...filters.gasRange, min: e.target.value }
                    })}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <Input
                    type="number"
                    step="0.0001"
                    placeholder="Max"
                    value={filters.gasRange.max}
                    onChange={(e) => updateFilters({ 
                      gasRange: { ...filters.gasRange, max: e.target.value }
                    })}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              {/* Saved Presets */}
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">Filter Presets</label>
                <div className="flex gap-2">
                  <Select onValueChange={(value) => {
                    const preset = savedPresets.find(p => p.name === value);
                    if (preset) onLoadPreset(preset.filters);
                  }}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Load preset" />
                    </SelectTrigger>
                    <SelectContent>
                      {savedPresets.map((preset) => (
                        <SelectItem key={preset.name} value={preset.name}>
                          {preset.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="outline"
                    onClick={() => setShowSavePreset(!showSavePreset)}
                    className="text-white border-slate-600"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Save Preset Input */}
            {showSavePreset && (
              <div className="flex gap-2">
                <Input
                  placeholder="Preset name..."
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <Button onClick={handleSavePreset} className="bg-blue-600 hover:bg-blue-700">
                  Save
                </Button>
                <Button variant="outline" onClick={() => setShowSavePreset(false)} className="text-white border-slate-600">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
            {filters.search && (
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                Search: {filters.search}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => updateFilters({ search: '' })}
                />
              </Badge>
            )}
            {filters.type !== 'all' && (
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                Type: {filters.type}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => updateFilters({ type: 'all' })}
                />
              </Badge>
            )}
            {filters.status !== 'all' && (
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                Status: {filters.status}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => updateFilters({ status: 'all' })}
                />
              </Badge>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
