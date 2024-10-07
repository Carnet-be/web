import CarCard from '@/components/carCard';
import { cn, getImageUrl } from '@/lib/utils';
import { Avatar, Button, Link, ScrollShadow } from '@nextui-org/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function GarageItem({ garage }: { garage: Garage }) {
  const { t } = useTranslation();
  const c = (key: string) => t(`common.${key}`);
  return (
    <div
      style={{
        backgroundImage: `url(${getImageUrl(garage.cover)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="relative h-[400px] w-full overflow-hidden rounded-md"
    >
      <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-r from-black to-black/20  p-1 py-5 text-white">
        <div className="flex flex-row justify-between  px-10">
          <div className="flex gap-3">
            <Avatar
              src={getImageUrl(garage.logo)}
              className="h-16 w-16 rounded-full border-2 border-white"
            />
            <div className="flex flex-col items-start justify-center gap-1">
              <h2 className="text-2xl font-bold text-white">{garage.name}</h2>
              <p className="line-clamp-2 max-w-[500px]">{garage.description}</p>
            </div>
          </div>

          <Link href={`/${garage.slug}`}>
            <Button color="secondary" className="shadow">
              {c('visit')}
            </Button>
          </Link>
        </div>
        <CarsSectionGarage cars={garage.cars ?? []} />
      </div>
    </div>
  );
}

export const CarsSectionGarage = ({ cars }: { cars: Car[] }) => {
  const carousel = useRef<HTMLDivElement | null>(null);
  const next = () =>
    carousel.current?.scrollBy({ left: 300, behavior: 'smooth' });
  const prev = () =>
    carousel.current?.scrollBy({ left: -300, behavior: 'smooth' });

  //TODO: scroll to the element
  return (
    <div className="flex flex-row items-center gap-2 py-5">
      <Button variant={'light'} isIconOnly onClick={prev}>
        <ChevronLeft
          className={cn('text-white', cars.length <= 2 && 'opacity-0')}
        />
      </Button>
      <ScrollShadow
        orientation="horizontal"
        ref={carousel}
        className="flex flex-grow flex-row gap-6 overflow-x-hidden"
      >
        {cars.map((b) => (
          <CarCard
            key={b.id}
            link={`/dashboard/marketplace/${b.uid}`}
            className={'min-w-[300px]'}
          >
            {b}
          </CarCard>
        ))}
      </ScrollShadow>
      <Button variant={'light'} isIconOnly onClick={next}>
        <ChevronRight
          className={cn('text-white', cars.length <= 2 && 'opacity-0')}
        />
      </Button>
    </div>
  );
};
