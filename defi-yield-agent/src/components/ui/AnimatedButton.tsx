
import { forwardRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  loading?: boolean;
  ripple?: boolean;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, loading, ripple = true, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          'relative overflow-hidden transition-all duration-200',
          'hover:scale-105 hover:shadow-lg',
          'active:scale-95',
          ripple && 'before:absolute before:inset-0 before:bg-white/20 before:scale-0 before:rounded-full before:transition-transform before:duration-300 hover:before:scale-100',
          loading && 'pointer-events-none opacity-70',
          className
        )}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <span className={cn('transition-opacity duration-200', loading && 'opacity-0')}>
          {children}
        </span>
      </Button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';
