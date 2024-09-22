import { Button } from '@nextui-org/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
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
