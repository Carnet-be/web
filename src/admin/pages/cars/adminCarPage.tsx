import AlertError from '@/components/section/alertError';
import LoadingSection from '@/components/section/loadingSection';
import dataService from '@/services/data.service';
import { useQuery } from '@tanstack/react-query';
import {
  AdminSearchSection,
  CarsTable,
  CarTypeSwitch,
  TabsSection,
} from './sections';

const AdminCarPage = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['data'],
    queryFn: () => dataService.getAllData(),
  });
  if (isPending) return <LoadingSection />;
  if (isError) return <AlertError refetch={refetch} />;
  return (
    <div className="space-y-8">
      <div>
        <div>
          <h1>Cars</h1>
          <span className="text-sm text-gray-400">
            Manage all the cars in the platform
          </span>
        </div>
      </div>
      <CarTypeSwitch />
      <AdminSearchSection
        data={{
          brands: data.brands,
          models: data.models,
        }}
      />

      <TabsSection />

      <div>
        <CarsTable />
      </div>
    </div>
  );
};

export default AdminCarPage;
