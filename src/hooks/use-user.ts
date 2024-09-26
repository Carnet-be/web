import userService from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: userService.me,
  });
  return data;
};

export default useUser;
