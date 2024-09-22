import { cn, getImageUrl } from '@/lib/utils';
import { Avatar, Button } from '@nextui-org/react';
import { Mail, PhoneCall, View } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ContentCarPage, ImagesSection } from './components';

export const LeftSide = ({ car }: { car: Car }) => {
  console.log('car', car);
  return (
    <div className="flex  w-full flex-grow flex-col gap-3 lg:w-[57%]">
      <ImagesSection images={car.images ?? []} />

      <div className="py-2"></div>
      <ContentCarPage car={car} />
    </div>
  );
};

export const RightSide = ({
  car,
  view,
}: {
  car: Car;
  mine?: boolean;
  view?: 'admin' | 'owner' | 'user' | 'garage';
}) => {
  let img: string | undefined = undefined;
  let name: string | undefined = undefined;

  const { t: c } = useTranslation();

  return (
    <div className=" sticky right-0 top-0 w-full space-y-8 lg:w-[40%]">
      {view !== 'garage' && car.garage && (
        <GarageItemContact garage={car.garage} />
      )}

      {car.user && <UserItemContact user={car.user} />}
      <div className="w-full space-y-4 rounded-xl bg-white p-3">
        <div className="flex flex-row items-center justify-between gap-2 px-5">
          <div className="flex flex-col items-center font-semibold text-primary">
            <h6 className="text-lg">{car.name}</h6>
            {/* <span>{car.year}</span> */}
          </div>
          <span className="font-semibold text-gray-500">#{car.id}</span>
        </div>
        <div className="flex flex-wrap gap-4">
          <MiniCard
            containerClass="w-[20%] lg:w-[30%]"
            size={110}
            title={c('brand')}
            img={`/body/${car.body?.logo ?? 'Coupe'}.svg`}
            value={car.body?.name ?? '-'}
          />
          <MiniCard
            containerClass="w-[48%] lg:w-[30%]"
            size={90}
            title={c('fuel')}
            img={'/images/fuel.png'}
            value={car.fuel ?? '-'}
          />
          <MiniCard
            containerClass="w-[48%] lg:w-[30%]"
            size={110}
            title={c('color')}
            value={car.color}
            color={car.color}
          />
          <MiniCard
            containerClass="w-[48%] lg:w-[30%]"
            size={110}
            title={c('transmission')}
            img={'/images/transmission.png'}
            value={car?.transmission ?? '-'}
          />
          <MiniCard
            containerClass="w-[48%] lg:w-[30%]"
            size={110}
            title={c('horsePower')}
            img={'/images/horse.png'}
            value={car.cc?.toString() ?? '-'}
          />
          <MiniCard
            containerClass="w-[48%] lg:w-[30%]"
            size={110}
            title={c('mileage')}
            img={'/images/mileage.png'}
            value={car.kilometrage?.toString() ?? '-'}
          />
          <MiniCard
            containerClass="w-[48%] lg:w-[30%] text-primary"
            size={110}
            title={c('co2')}
            img={'/images/CO2.svg'}
            value={car.co2?.toString() ?? '-'}
          />
          <MiniCard
            containerClass="w-[48%] lg:w-[30%]"
            size={110}
            title={c('doors')}
            img={'/images/Doors.svg'}
            value={car.doors?.toString() ?? '-'}
          />
          <MiniCard
            containerClass="w-[48%] lg:w-[30%]"
            size={110}
            title={c('engine size')}
            img={'/images/engine.svg'}
            value={car.cc?.toString() ?? '-'}
          />
        </div>
      </div>
      {/* {car.type==="direct" ? (
          <Buy car={car} />
        ) : user?.type === "BID" ? (
          <>
            <CountDown
              variant="primary"
              onTimeOut={onTimeOut}
              endDate={car.end_date || new Date()}
            />
          </>
        ) : (
          <carStatus car={car} />
        )}
        {!isBuyNow && (
          <BidSection user={user} car={car} isTimeOut={isTimeOut} />
        )} */}
    </div>
  );
};

const MiniCard = (props: {
  value?: string;
  img?: string;
  title?: string;
  imgClass?: string;
  size?: number;
  containerClass?: string;
  color?: string;
}) => {
  const { value, img, title, imgClass, size, containerClass, color } = props;

  return (
    <div
      className={cn(
        'bg-base-100 flex flex-col items-center justify-between gap-1 rounded-xl px-4  py-2 text-primary',
        containerClass,
        { [`h-[${size}px]`]: size },
      )}
    >
      <span className="text-[10px] text-gray-500">{title ? title : ''}</span>
      {img && (
        <div
          className={cn(
            'relative h-[30px] w-full flex items-center justify-center',
            imgClass,
          )}
        >
          <img
            alt="logo"
            src={img}
            className="object-contain h-[30px] mx-auto"
          />
        </div>
      )}
      {color ? (
        <>
          <div
            style={{ backgroundColor: value }}
            className={cn('h-8 w-8 rounded-full border')}
          ></div>
          <span className="text-[12px]">{color}</span>
        </>
      ) : (
        <span className="text-[12px]">{value}</span>
      )}
    </div>
  );
};

export function GarageItemContact({ garage }: { garage: Garage }) {
  const [show, setShow] = useState(false);
  const { t } = useTranslation('common');
  if (!garage) return null;

  return (
    <div
      style={{
        backgroundImage: `url(${getImageUrl(garage?.cover)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="relative h-[260px] w-full overflow-hidden rounded-md"
    >
      <div className="absolute bottom-0 left-0 right-0 h-full space-y-3 bg-gradient-to-r from-black  to-black/20 p-3 py-5 text-white">
        <div className="flex flex-row justify-between">
          <div className="flex gap-3">
            <Avatar
              src={getImageUrl(garage.logo)}
              className="h-16 w-16 rounded-full border-2 border-white"
            />
            <div className="flex flex-col items-start justify-center gap-1">
              <h2 className="text-2xl font-bold text-white">{garage.name}</h2>
            </div>
          </div>

          <Link to={`/${garage.slug}`}>
            <Button color="secondary" className="shadow">
              {t('visit')}
            </Button>
          </Link>
        </div>
        <p className="line-clamp-2 max-w-[500px]">{garage.description}</p>
        <div className="backdrop-blur-40 relative rounded-md bg-white/20 p-4">
          <div className="flex items-center gap-3">
            <PhoneCall />
            <span>{garage.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail />
            <span>{}</span>
          </div>
          {!show && (
            <div
              onClick={() => {
                setShow(true);
              }}
              className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-md backdrop-blur-md"
            >
              <View className="text-lg" />
              {t('show contact')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function UserItemContact({ user }: { user: User }) {
  const [show, setShow] = useState(false);
  const { t } = useTranslation('common');
  if (!user) return <div></div>;

  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-md">
      <div className="absolute bottom-0 left-0 right-0 h-full space-y-3 bg-gradient-to-r from-black  to-black/20 p-3 py-5 text-white">
        <div className="flex flex-row justify-between">
          <div className="flex gap-3">
            <Avatar
              src={getImageUrl(user.avatar)}
              className="h-16 w-16 rounded-full border-2 border-white"
            />
            <div className="flex flex-col items-start justify-center gap-1">
              <h2 className="text-2xl font-bold text-white">
                {user.firstName} {user.lastName}
              </h2>
            </div>
          </div>
        </div>
        <div className="backdrop-blur-40 relative rounded-md bg-white/20 p-4">
          <div className="flex items-center gap-3">
            <PhoneCall />
            <span>{user.phoneNumber ?? '--'}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail />
            <span>{user.email ?? '--'}</span>
          </div>
          {!show && (
            <div
              onClick={() => {
                setShow(true);
              }}
              className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-md backdrop-blur-md"
            >
              <View className="text-lg" />
              {t('show contact')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
