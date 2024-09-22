import { cn } from '@/lib/utils';
import { Spinner } from '@nextui-org/react';

const LoadingSection = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'h-screen w-full flex items-center justify-center',
        className,
      )}
    >
      <Spinner size="lg" />
    </div>
  );
};

export default LoadingSection;
