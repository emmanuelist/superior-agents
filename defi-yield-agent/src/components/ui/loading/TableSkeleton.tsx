
import { Skeleton } from '@/components/ui/skeleton';

interface TableSkeletonProps {
  rows?: number;
  showUserColumn?: boolean;
}

export const TableSkeleton = ({ rows = 5, showUserColumn = false }: TableSkeletonProps) => {
  return (
    <div className="space-y-3">
      {/* Header skeleton */}
      <div className="flex items-center gap-4 p-4 border-b border-white/10">
        <Skeleton className="h-4 w-8" />
        {showUserColumn && <Skeleton className="h-4 w-16" />}
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
      
      {/* Row skeletons */}
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
          <Skeleton className="h-4 w-8" />
          {showUserColumn && <Skeleton className="h-6 w-12 rounded-full" />}
          <div className="space-y-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      ))}
    </div>
  );
};
