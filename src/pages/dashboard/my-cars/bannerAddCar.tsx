import animationData from '@/assets/location.json';
import Animation from '@/components/section/Animation';
import { cn } from '@/lib/utils';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
export const BannierAddAuction = () => {
  const nav = useNavigate();
  return (
    <div
      className={cn(
        'mx-auto flex h-[150px] md:h-[250px] max-w-[900px] flex-row items-center justify-between rounded-xl bg-primary p-4 md:p-10 drop-shadow-xl',
      )}
    >
      <div className="flex w-full max-w-[400px] flex-grow flex-col gap-4 space-y-3 md:space-y-6 justify-center items-center md:items-start">
        <p className="text-sm md:text-xl font-bold text-white">
          Add your car to the auction, get the best price and sell it quickly
        </p>
        <Button
          onClick={() => {
            // setLoading(true);
            // const exist = await utils.profile.existProfile.fetch();
            // setLoading(false);
            // if (!exist) {
            //   onOpen();
            //   return;
            // }
            nav('/dashboard/my-cars/add');
          }}
          className="w-full max-w-[200px] cursor-pointer rounded-xl bg-white px-4 py-2 text-center text-primary no-underline"
        >
          Add Car
        </Button>
      </div>
      <div className="hidden md:block w-full max-w-[330px]">
        <Animation animationData={animationData} />
      </div>
    </div>
  );
};
