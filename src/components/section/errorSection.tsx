import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

const ErrorSection = ({ refetch }: { refetch: () => void }) => {
  return (
    <div className="h-screen w-screen flex flex-col gap-4 items-center justify-center">
      <AlertCircle className="h-16 w-16 text-destructive" />
      <p className="text-destructive text-center text-sm">
        Something went wrong, please try again
      </p>
      <div className="flex gap-2">
        <Button onClick={() => refetch()}>Try again</Button>
      </div>
    </div>
  );
};

export default ErrorSection;
