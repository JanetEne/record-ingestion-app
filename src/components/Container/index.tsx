import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

declare type ContainerType = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerType) => {
  return (
    <div
      className={cn(
        'mx-auto xmd:max-w-6xl xl:max-w-[1440px] px-5 sm:px-12 lg:px-8',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
