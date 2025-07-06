
interface BufferCardProps {
  label: string;
  value: number;
  percentage: number;
  color: 'emerald' | 'blue';
}

export const BufferCard = ({ label, value, percentage, color }: BufferCardProps) => {
  const colorConfig = {
    emerald: 'from-emerald-400/80 to-emerald-500/80',
    blue: 'from-blue-400/80 to-blue-500/80'
  };

  return (
    <div className="bg-slate-700/30 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-600/30 hover:bg-slate-700/50 transition-all duration-300 group">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3 mb-3">
        <span className="text-slate-300 font-medium text-sm sm:text-base">{label}</span>
        <span className="text-white font-black text-base sm:text-lg group-hover:scale-105 transition-transform duration-300">
          ${value.toFixed(2)}
        </span>
      </div>
      
      <div className="relative">
        <div className="w-full bg-slate-600/30 rounded-full h-2 sm:h-3 overflow-hidden">
          <div 
            className={`bg-gradient-to-r ${colorConfig[color]} h-2 sm:h-3 rounded-full transition-all duration-1000 group-hover:animate-pulse`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="absolute right-0 -top-5 sm:-top-6 text-xs text-slate-400 font-semibold">
          {percentage}%
        </div>
      </div>
    </div>
  );
};
