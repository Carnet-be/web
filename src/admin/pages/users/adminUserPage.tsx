import AlertError from '@/components/section/alertError';
import LoadingSection from '@/components/section/loadingSection';
import dataService from '@/services/data.service';
import { useQuery } from '@tanstack/react-query';
import { UsersTable } from './section';

const AdminUserPage = () => {
  const { isPending, isError, refetch } = useQuery({
    queryKey: ['data'],
    queryFn: () => dataService.getAllData(),
  });
  if (isPending) return <LoadingSection />;
  if (isError) return <AlertError refetch={refetch} />;
  return (
    <div className="space-y-8">
      <div>
        <div>
          <h1>Users</h1>
          <span className="text-sm text-gray-400">
            Manage all the users in the platform
          </span>
        </div>
      </div>

      <div>
        <UsersTable />
      </div>
    </div>
  );
};

export default AdminUserPage;
