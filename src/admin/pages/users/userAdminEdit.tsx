import AlertError from '@/components/section/alertError';
import LoadingSection from '@/components/section/loadingSection';
import { ProfileForm } from '@/pages/dashboard/settings/profilePage';
import userService from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';

const UserAdminEdit = () => {
  const { id } = useParams();
  const {
    data: user,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.searchUsers(`uid=${id}`),
  });

  if (isPending) return <LoadingSection className="h-[80vh]" />;

  if (isError) return <AlertError refetch={refetch} />;
  if (!user?.data?.[0]) return <Navigate to="/dashboard/admin/users" />;
  return <ProfileForm user={user?.data?.[0]} onSuccess={refetch} />;
};

export default UserAdminEdit;
