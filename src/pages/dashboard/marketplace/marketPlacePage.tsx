import AlertError from '@/components/section/alertError';
import LoadingSection from '@/components/section/loadingSection';
import dataService from '@/services/data.service';
import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { CarsSections, SearchSection } from './sections';

const MarketPlacePage = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['data'],
    queryFn: () => dataService.getAllData(),
  });
  const { t: translate } = useTranslation();
  const t = (key: string) => translate(`marketplace.${key}`);
  if (isPending) return <LoadingSection />;
  if (isError) return <AlertError refetch={refetch} />;
  return (
    <Suspense fallback={<LoadingSection />}>
      <div className="">
        <div className="p-4">
          <h1 className=" text-3xl font-bold ">{t('title')}</h1>
          <span className="text-muted-foreground max-w-[300px] w-full">
            {t('description')}
          </span>
        </div>

        <div className="my-4 space-y-10 rounded-[16px]  p-4 md:my-7 md:p-7 bg-muted/50">
          <SearchSection data={data} />

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold ">{t('carsForSale')}</h2>
            <CarsSections />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default MarketPlacePage;
