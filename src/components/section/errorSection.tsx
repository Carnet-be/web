import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';

const ErrorSection = ({ refetch }: { refetch?: () => void }) => {
  const { t } = useTranslation();
  return (
    <div className="h-screen w-screen flex flex-col gap-4 items-center justify-center">
      <AlertCircle className="h-16 w-16 text-destructive" />
      <p className="text-destructive text-center text-sm">
        {t('section.error.message')}
      </p>
      <div className="flex gap-2">
        {refetch && (
          <Button onClick={() => refetch()}>{t('section.error.button')}</Button>
        )}
      </div>
    </div>
  );
};

export default ErrorSection;
