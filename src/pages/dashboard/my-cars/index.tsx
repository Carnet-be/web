import { BannierAddAuction } from './bannerAddCar';
import MyCarList from './myCarsList';

const MyCarsPage = () => {
  return (
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
      <MyCarList />
    </div>
  );
};

export default MyCarsPage;
