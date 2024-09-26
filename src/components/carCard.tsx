import { cn, getImageUrl, getPrice } from '@/lib/utils';
import { Button } from '@nextui-org/react';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LoadingSection from './section/loadingSection';

const CarCard = ({
  children: car,
  className,
  link,
}: {
  children: Car;
  className?: string;
  link?: string;
}) => {
  const { t } = useTranslation();
  const c = (key: string) => t(`common.${key}`);

  const navigate = useNavigate();
  return (
    <Suspense fallback={<LoadingSection className="aspect-[5/3]" />}>
      <div
        onClick={() => navigate(link ?? `/dashboard/car/${car.id}`)}
        style={{
          boxShadow: '0px 0px 65px -58px rgba(0,0,0,0.7)',
        }}
        className={cn(
          'group overflow-hidden rounded-xl bg-gray-50 transition duration-300 hover:shadow-2xl',
          className,
        )}
      >
        <div className="relative aspect-[5/3]  overflow-hidden">
          <img
            src={getImageUrl(car.images?.[0])}
            className="transition duration-400 group-hover:scale-110 w-full h-full object-cover"
            alt={car.name}
          />
        </div>
        <div className="space-y-1 p-3">
          <div className="flex flex-row items-center justify-between gap-1">
            <span className="text-sm font-semibold text-black">{car.name}</span>

            {car.kilometrage && (
              <span className="text-sm text-primary">
                {car.kilometrage} km/h
              </span>
            )}
          </div>
          <hr />
          <div className="flex flex-row items-start justify-between gap-1">
            <span className="font-semibold text-primary">
              {getPrice({
                inRange: car.inRange ?? false,
                maxPrice: car.maxPrice,
                minPrice: car.minPrice,
                price: car.price,
              })}
            </span>
            <Button
              onClick={() => navigate(link ?? `/dashboard/car/${car.id}`)}
              size="sm"
              color="primary"
              variant="flat"
            >
              {c('details')}
            </Button>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default CarCard;
