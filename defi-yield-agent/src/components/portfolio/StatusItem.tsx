
interface StatusItemProps {
  label: string;
  value: string;
  status: 'success' | 'pending' | 'error';
}

export const StatusItem = ({ label, value, status }: StatusItemProps) => {
  const statusConfig = {
    success: { 
      color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
      dot: 'bg-emerald-400',
      icon: '✓'
    },
    pending: { 
      color: 'text-yellow-400 bg-yellow-500/15 border-yellow-500/30',
      dot: 'bg-yellow-400 animate-pulse',
      icon: '⏳'
    },
    error: { 
      color: 'text-red-400 bg-red-500/15 border-red-500/30',
      dot: 'bg-red-400',
      icon: '⚠'
    }
  };

  const config = statusConfig[status];

  return (
    <div className="bg-slate-700/30 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-600/30 hover:bg-slate-700/50 transition-all duration-300 group">
      <div className="flex items-center gap-3">
        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${config.dot}`}></div>
          <p className="text-slate-300 font-medium text-sm sm:text-base truncate">{label}</p>
        </div>
        <div className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold border whitespace-nowrap ${config.color}`}>
          <span className="flex-shrink-0">{config.icon}</span>
          <span className="truncate max-w-20 sm:max-w-none">{value}</span>
        </div>
      </div>
    </div>
  );
};
