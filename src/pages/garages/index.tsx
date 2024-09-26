import AlertError from '@/components/section/alertError';
import LoadingSection from '@/components/section/loadingSection';
import garageService from '@/services/garage.service';
import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { GarageItem } from './sections';

export default function GaragesPage() {
  const [search] = useSearchParams();
  const {
    data: garages,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['garages-user', search?.toString()],
    queryFn: () => garageService.getGarages(search?.toString()),
  });
  const { t } = useTranslation();
  if (isPending) return <LoadingSection />;
  if (isError) return <AlertError refetch={refetch} />;
  return (
    <Suspense>
      <div className="space-y-8">
        <div>
          <div>
            <h1 className="text-2xl font-bold">{t('garage.title')}</h1>
            <span className="text-sm text-gray-400">
              {t('garage.description')}
            </span>
          </div>
        </div>
        {/* <SearchBar /> */}

        <div className="flex w-full flex-col gap-3">
          {garages?.data.map((g) => (
            <GarageItem key={g.id} garage={g} />
          ))}
        </div>
        {garages?.data.length === 0 && <div>{t('garage.noGarages')}</div>}
      </div>
    </Suspense>
  );
}

import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

// const SearchBar = () => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   return (
//     <Input
//       type="text"
//       placeholder="Search garages..."
//       value={searchParams.get('search') || ''}
//       startContent={<SearchIcon className="text-gray-400 size-4" />}
//       isClearable
//       onClear={() => {
//         searchParams.delete('search');
//         setSearchParams(searchParams);
//       }}
//       onChange={(e) => {
//         if (e.target.value) {
//           searchParams.set('search', e.target.value);
//         } else {
//           searchParams.delete('search');
//         }
//         setSearchParams(searchParams);
//       }}
//       className="max-w-sm"
//     />
//   );
// };
