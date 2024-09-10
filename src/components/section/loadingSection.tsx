import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const LoadingSection = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'h-screen w-full flex items-center justify-center',
        className,
      )}
    >
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
};

export default LoadingSection;
