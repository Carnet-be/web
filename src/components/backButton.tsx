import { Button } from '@nextui-org/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ link }: { link?: string }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (link) {
      navigate(link);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      startContent={<ArrowLeft className="size-3" />}
      size="sm"
      variant="light"
      onPress={handleGoBack}
    >
      Back
    </Button>
  );
};

export default BackButton;
