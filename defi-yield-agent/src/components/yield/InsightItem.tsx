
interface InsightItemProps {
  text: string;
  positive: boolean;
}

export const InsightItem = ({ text, positive }: InsightItemProps) => (
  <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${positive ? 'bg-emerald-400' : 'bg-red-400'}`} />
    <p className="text-sm text-blue-200 flex-1">{text}</p>
  </div>
);
