import { LeftSide, RightSide } from './sections';

const CarDetailsPage = ({
  car,
  view = 'user',
}: {
  car: Car;
  view?: 'admin' | 'owner' | 'user' | 'garage';
}) => {
  return (
    <div className="relative mb-10 flex flex-wrap justify-center gap-6">
      <LeftSide car={car} />
      <RightSide car={car} view={view} />
    </div>
  );
};

export default CarDetailsPage;
