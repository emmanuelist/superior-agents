
import { Card } from '@/components/ui/card';
import { ReactNode } from 'react';

interface SettingsCardProps {
  title: string;
  children: ReactNode;
  badge?: ReactNode;
}

export const SettingsCard = ({ title, children, badge }: SettingsCardProps) => (
  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
    <div className="p-3 sm:p-4 lg:p-5">
      {title && (
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">{title}</h3>
          {badge}
        </div>
      )}
      {children}
    </div>
  </Card>
);
