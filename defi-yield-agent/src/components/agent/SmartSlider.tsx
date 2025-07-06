
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface SmartSliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  description: string;
  recommendations?: {
    optimal: number;
    warning?: number;
  };
  formatValue?: (value: number) => string;
}

export const SmartSlider = ({
  label,
  value,
  onValueChange,
  min,
  max,
  step,
  unit = '',
  description,
  recommendations,
  formatValue
}: SmartSliderProps) => {
  const getRiskColor = (value: number) => {
    if (recommendations?.warning && value >= recommendations.warning) {
      return 'text-red-400';
    }
    if (recommendations?.optimal && Math.abs(value - recommendations.optimal) <= step) {
      return 'text-emerald-400';
    }
    return 'text-blue-400';
  };

  const displayValue = formatValue ? formatValue(value) : `${value}${unit}`;

  return (
    <div className="space-y-3 sm:space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <label className="text-white font-medium text-sm sm:text-base leading-snug">
          {label}
        </label>
        <div className={cn("font-bold text-sm sm:text-base", getRiskColor(value))}>
          {displayValue}
        </div>
      </div>
      
      <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">{description}</p>
      
      <div className="relative py-2">
        <Slider
          value={[value]}
          onValueChange={([newValue]) => onValueChange(newValue)}
          max={max}
          min={min}
          step={step}
          className="w-full touch-manipulation"
        />
        
        {recommendations && (
          <div className="flex justify-between text-xs text-blue-300 mt-3 gap-2">
            <span className="text-left">Conservative</span>
            {recommendations.optimal && (
              <span className="text-emerald-400 text-center flex-1 hidden sm:inline">
                Optimal: {formatValue ? formatValue(recommendations.optimal) : `${recommendations.optimal}${unit}`}
              </span>
            )}
            <span className="text-right">Aggressive</span>
          </div>
        )}
        
        {/* Mobile-only optimal value display */}
        {recommendations?.optimal && (
          <div className="sm:hidden text-xs text-emerald-400 text-center mt-2">
            Optimal: {formatValue ? formatValue(recommendations.optimal) : `${recommendations.optimal}${unit}`}
          </div>
        )}
      </div>
      
      {recommendations?.warning && value >= recommendations.warning && (
        <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded p-2 sm:p-3 leading-relaxed">
          ⚠️ High risk setting. Consider lowering for better safety.
        </div>
      )}
    </div>
  );
};
