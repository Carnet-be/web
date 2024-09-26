import AlertError from '@/components/section/alertError';
import LoadingSection from '@/components/section/loadingSection';
import garageService from '@/services/garage.service';
import { Button, Image } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import GaragePageView from './garagePage';

const GaragePage = () => {
  const { slug: id } = useParams();
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['garage', id],
    queryFn: () => garageService.getGarage(id!),
    enabled: !!id,
  });

  if (isPending) return <LoadingSection />;
  if (isError) return <AlertError refetch={refetch} />;
  if (!data) return <NoGarage />;

  return (
    <Suspense fallback={<LoadingSection />}>
      <GaragePageView>{data}</GaragePageView>
    </Suspense>
  );
};

export default GaragePage;

const NoGarage = () => {
  const { t } = useTranslation();
  return (
    <Suspense>
      <div className="flex flex-col items-center justify-center h-screen p-6 max-w-[500px] mx-auto">
        <Image
          src={'/images/car_default.png'}
          alt={t('garage.noGarage.alt')}
          className="w-full max-w-[300px] h-auto"
        />
        <h1 className="text-4xl font-bold text-center pb-5">
          {t('garage.noGarage.title')}
        </h1>
        <p className="text-lg text-center">
          {t('garage.noGarage.description')}
        </p>
        <div className="pt-4">
          <Button color="primary">{t('garage.noGarage.button')}</Button>
        </div>
      </div>
    </Suspense>
  );
};
