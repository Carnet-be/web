import LoadingSection from '@/components/section/loadingSection';
import useUser from '@/hooks/use-user';
import { cn, getImageUrl, getPrice } from '@/lib/utils';
import carService from '@/services/car.service';
import {
  Button,
  Chip,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { useQueries } from '@tanstack/react-query';
import { Edit } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const CarsSection = () => {
  const user = useUser();
  const [{ data }] = useQueries({
    queries: [
      {
        queryKey: ['cars', 'mine', user?.id, user?.garage?.id],
        queryFn: carService.mine,
        enabled: !!user,
      },
    ],
  });

  const { t } = useTranslation('dashboard.my cars');

  if (!data) {
    return <LoadingSection className="h-[400px]" />;
  }

  // if (isError) {
  //   return <ErrorSection refetch={refetch} />;
  // }

  if (!data || data.length === 0) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <span className="text-2xl font-semibold">{t('no cars')}</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {data?.map((car) => (
        <CarCard key={car.id} className="bg-white">
          {car}
        </CarCard>
      ))}
    </div>
  );
};

const CarCard = ({
  children: car,
  className,
}: {
  children: Car;
  className?: string;
}) => {
  const primaryImage = getImageUrl(car.images?.[0]);
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  return (
    <div
      style={{
        boxShadow: '0px 0px 65px -58px rgba(0,0,0,0.7)',
      }}
      className={cn(
        'relative aspect-[.8] overflow-hidden rounded-xl bg-gray-50',
        className,
      )}
    >
      <img
        src={primaryImage}
        className="w-full h-full object-cover"
        alt={car.name}
      />
      <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-end space-y-[2px] bg-gradient-to-t from-black/70 to-30% p-2">
        <div className="flex flex-row items-center justify-between gap-1">
          <span className="text-sm font-semibold text-white">{car.name}</span>
        </div>

        <div className="flex flex-row items-start justify-between gap-1">
          <span className="font-semibold text-green-300 ">
            {getPrice({
              inRange: car.inRange ?? false,
              minPrice: car.minPrice,
              maxPrice: car.maxPrice,
              price: car.price,
            })}
          </span>
        </div>
        <div className="flex flex-row items-center justify-end gap-3">
          <Link href={`/dashboard/my-cars/edit/${car.uid}`}>
            <Button startContent={<Edit size={15} />} color="primary" size="sm">
              {t('edit')}
            </Button>
          </Link>

          <Button
            isDisabled={car.status !== 'published'}
            size="sm"
            onClick={() => {
              if (car.status === 'published') {
                navigate(`/dashboard/marketplace/${car.uid}`);
              }
            }}
          >
            {t('details')}
          </Button>
        </div>
      </div>
      <div className="absolute right-2 top-2">
        <StatusTag>{t(car.status) as any}</StatusTag>
      </div>
    </div>
  );
};

export default CarCard;

const StatusTag = ({ children }: { children: Car['status'] }) => {
  const color =
    children === 'pending'
      ? 'warning'
      : children === 'published'
      ? 'success'
      : 'secondary';

  const description = () => {
    switch (children) {
      case 'pending':
        return 'Your car is pending for approval';
      case 'published':
        return 'Your car is published';
      // case 'paused':
      //   return 'Your car is paused';
      // case 'finished':
      //   return 'Your auction is expired';
      // case 'completed':
      //   return 'Your auction is completed';
      case 'sold':
        return 'Your car is sold';
      default:
        return '';
    }
  };
  return (
    <Popover
      showArrow
      backdrop="opaque"
      placement="right"
      classNames={{
        base: [
          // arrow color
          'before:bg-default-200',
        ],
      }}
    >
      <PopoverTrigger>
        <Chip
          color={color}
          title={children}
          className="font-bold capitalize text-white"
        >
          {children}
        </Chip>
      </PopoverTrigger>
      <PopoverContent className="border border-default-200 bg-gradient-to-br from-white to-default-300 px-4 py-3 dark:from-default-100 dark:to-default-50">
        {() => (
          <div className="px-1 py-2">
            <div className="text-tiny">{description()}</div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
