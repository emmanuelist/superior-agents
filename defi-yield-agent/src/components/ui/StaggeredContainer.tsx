
import { ReactNode, Children, cloneElement, isValidElement, ReactElement } from 'react';

interface StaggeredContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggeredContainer = ({ 
  children, 
  staggerDelay = 100, 
  className = '' 
}: StaggeredContainerProps) => {
  const childrenArray = Children.toArray(children);

  return (
    <div className={className}>
      {childrenArray.map((child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement<any>, {
            key: index,
            style: {
              ...(child.props.style || {}),
              animationDelay: `${index * staggerDelay}ms`,
            },
            className: `${child.props.className || ''} animate-fade-in`,
          });
        }
        return child;
      })}
    </div>
  );
};
