import BackButton from '@/components/backButton';
import AlertError from '@/components/section/alertError';
import LoadingSection from '@/components/section/loadingSection';
import carService from '@/services/car.service';
import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import CarDetailsPage from './carDetails';

const CarDetailPage = ({
  view,
}: {
  view?: 'admin' | 'owner' | 'user' | 'garage';
}) => {
  const { id } = useParams();
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['car', id],
    queryFn: () => carService.search({ uid: id }),
  });
  if (isPending) return <LoadingSection className="h-[80vh]" />;
  if (isError) return <AlertError refetch={refetch} />;
  if (!data?.data?.[0]) return <Navigate to={'/dashboard'} />;
  return (
    <Suspense>
      <div>
        <BackButton />
      </div>
      <div className="flex flex-col gap-3 pb-3"></div>
      <CarDetailsPage car={data?.data?.[0]} view={view} />
    </Suspense>
  );
};

export default CarDetailPage;
