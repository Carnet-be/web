import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

const AlertError = ({
  refetch,
  title = 'Something went wrong',
  message = 'We apologize for the inconvenience. Please try again later or contact support if the problem persists.',
  className,
}: {
  refetch: () => void;
  title?: string;
  message?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'h-screen w-full flex flex-col gap-4 items-center justify-center p-5',
        className,
      )}
    >
      <Alert variant="destructive" className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{title}</AlertTitle>
        </div>
        <AlertDescription>{message}</AlertDescription>
        <Button onClick={refetch} variant="outline" size="sm">
          Retry
        </Button>
      </Alert>
    </div>
  );
};

export default AlertError;
