import BackButton from '@/components/backButton';
import AlertError from '@/components/section/alertError';
import LoadingSection from '@/components/section/loadingSection';
import { transformNullToUndefined } from '@/lib/utils';
import carService from '@/services/car.service';
import dataService from '@/services/data.service';
import userService from '@/services/user.service';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import CreateCar from './carForm';

const CarForm = () => {
  const { id } = useParams();

  const [carQuery, userQuery, dataQuery] = useQueries({
    queries: [
      {
        queryKey: ['car', id],
        queryFn: () => carService.search({ uid: id }),
      },
      {
        queryKey: ['me'],
        queryFn: () => userService.me(),
      },
      {
        queryKey: ['data'],
        queryFn: () => dataService.getAllData(),
      },
    ],
  });

  if (carQuery.isPending || dataQuery.isPending)
    return <LoadingSection className="min-h-screen w-full" />;
  if (carQuery.isError || dataQuery.isError)
    return <AlertError refetch={carQuery.refetch} />;

  return (
    <div>
      <BackButton />
      <CreateCar
        data={dataQuery.data}
        car={
          transformNullToUndefined({
            ...carQuery.data?.data?.[0],
            phoneNumber: userQuery.data?.phoneNumber,
          }) as Car
        }
      />
    </div>
  );
};

export default CarForm;

export const CarFormAdd = () => {
  const dataQuery = useQuery({
    queryKey: ['data'],
    queryFn: () => dataService.getAllData(),
  });

  if (dataQuery.isPending)
    return <LoadingSection className="min-h-screen w-full" />;
  if (dataQuery.isError) return <AlertError refetch={dataQuery.refetch} />;

  return (
    <div>
      <BackButton />
      <CreateCar data={dataQuery.data} />
    </div>
  );
};
