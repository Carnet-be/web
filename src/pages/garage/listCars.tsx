import CarCard from '@/components/carCard';
import ErrorSection from '@/components/section/errorSection';
import LoadingSection from '@/components/section/loadingSection';
import carService from '@/services/car.service';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const ListCars = () => {
  const { slug: id } = useParams();
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['cars', 'garage', id],
    queryFn: () => carService.search({ garageSlug: id }),
    enabled: !!id,
  });
  const { t } = useTranslation();

  if (isPending) return <LoadingSection className="h-[100px]" />;
  if (isError) return <ErrorSection refetch={refetch} />;

  if (data?.data?.length === 0)
    return (
      <div className="text-center text-gray-400">{t('garage.noCars')}</div>
    );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-5 py-3">
      {data?.data?.map((car) => (
        <CarCard
          key={car.id}
          link={`/${id}/car/${car.uid}`}
          className="bg-white"
        >
          {{ ...car }}
        </CarCard>
      ))}
    </div>
  );
};

export default ListCars;
