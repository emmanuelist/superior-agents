
interface SettingRowProps {
  label: string;
  description: string;
  control: React.ReactNode;
}

export const SettingRow = ({ label, description, control }: SettingRowProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 sm:py-3 space-y-3 sm:space-y-0 min-h-[60px] sm:min-h-[44px]">
    <div className="flex-1 sm:pr-4">
      <h4 className="text-white font-medium text-sm sm:text-base leading-snug">{label}</h4>
      <p className="text-xs sm:text-sm text-blue-200 mt-1 leading-relaxed">{description}</p>
    </div>
    <div className="flex justify-end sm:ml-4 min-w-[44px] min-h-[44px] items-center justify-center">
      {control}
    </div>
  </div>
);
