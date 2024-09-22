import AlertError from '@/components/section/alertError';
import LoadingSection from '@/components/section/loadingSection';
import dataService from '@/services/data.service';
import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { CarsSections, SearchSection } from './sections';

const MarketPlacePage = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['data'],
    queryFn: () => dataService.getAllData(),
  });
  if (isPending) return <LoadingSection />;
  if (isError) return <AlertError refetch={refetch} />;
  return (
    <Suspense fallback={<LoadingSection />}>
      <div className="">
        <div className="p-4">
          <h1 className=" text-3xl font-bold ">Marketplace</h1>
          <span>Browse through our wide range of cars</span>
        </div>

        <div className="my-4 space-y-10 rounded-[16px]  p-4 md:my-7 md:p-7 bg-muted/50">
          <SearchSection data={data} />

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold ">Cars for sale</h2>
            <CarsSections />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default MarketPlacePage;
