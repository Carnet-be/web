import LoadingSection from '@/components/section/loadingSection';
import { Suspense } from 'react';
import { BannierAddAuction } from './bannerAddCar';
import { CarsSection } from './myCarsList';

const MyCarsPage = () => {
  return (
    <Suspense fallback={<LoadingSection />}>
      <div className="space-y-10">
        <BannierAddAuction />
        {/* <CarTypeSwitch
    counts={{ direct: count?.direct ?? 0, auction: count?.auction ?? 0 }}
  />
  <TabsSection
    filter={{
      belongsTo: orgId ?? userId ?? undefined,
    }}
  /> */}
        <CarsSection />
      </div>
    </Suspense>
  );
};

export default MyCarsPage;
