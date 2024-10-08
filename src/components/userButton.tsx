import query from '@/lib/query';
import { getProfileInfo } from '@/lib/utils';
import authService from '@/services/auth.service';
import userService from '@/services/user.service';
import useAuthStore from '@/state/auth';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { DashboardIcon, PersonIcon } from '@radix-ui/react-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Building2, Car, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from './ui/use-toast';

function UserButton() {
  const { token } = useAuthStore();
  const { t: useT } = useTranslation();
  const c = (key: string) => useT('common.' + key);

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => userService.me(),
    enabled: !!token,
  });

  if (!user || !token) {
    return (
      <div className="flex gap-3">
        <a
          href="/auth/register"
          className="hover:bg-blue-dark rounded-md bg-primary px-7 py-1 text-base font-medium text-white hidden md:block"
        >
          {c('get started')}
        </a>
        <a
          href="/auth/login"
          className="hover:bg-blue-dark  rounded-md border-2 border-primary bg-white px-7 py-1 text-base font-medium text-primary"
        >
          {c('login')}
        </a>
      </div>
    );
  }

  return (
    <>
      <Popover showArrow placement="bottom">
        <PopoverTrigger>
          <Avatar
            name={getProfileInfo(user).name}
            radius="full"
            size="md"
            src={getProfileInfo(user).image}
          />
        </PopoverTrigger>
        <PopoverContent className="p-1">
          <Card shadow="none" className="w-[300px] border-none bg-transparent">
            <CardHeader className="justify-between">
              <div className="flex gap-3">
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src={getProfileInfo(user).image}
                />
                <div className="flex flex-col items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    {getProfileInfo(user).name}
                  </h4>
                  {getProfileInfo(user).description && (
                    <h5 className="text-small tracking-tight text-default-500">
                      {`${getProfileInfo(user).description}`}
                    </h5>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardBody className="space-y-1 px-3 py-0">
              {token?.role === 'admin' ? (
                <Link href="/dashboard/admin">
                  <Button
                    variant="light"
                    size="sm"
                    fullWidth
                    startContent={<DashboardIcon className="size-5" />}
                    className="flex justify-start"
                  >
                    {c('dashboard')}
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard/marketplace">
                  <Button
                    variant="light"
                    size="sm"
                    fullWidth
                    startContent={<DashboardIcon className="size-5" />}
                    className="flex justify-start"
                  >
                    {c('marketplace')}
                  </Button>
                </Link>
              )}
              <Link
                href={
                  token?.role === 'admin'
                    ? '/dashboard/admin/garages'
                    : '/dashboard/garages'
                }
              >
                <Button
                  variant="light"
                  size="sm"
                  fullWidth
                  startContent={<Building2 className="size-5" />}
                  className="flex justify-start"
                >
                  {c('garages')}
                </Button>
              </Link>
              {token?.role === 'admin' ? (
                <Link href="/dashboard/admin/cars">
                  <Button
                    variant="light"
                    size="sm"
                    fullWidth
                    startContent={<Car className="size-5" />}
                    className="flex justify-start"
                  >
                    {c('cars')}
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard/my-cars">
                  <Button
                    variant="light"
                    size="sm"
                    fullWidth
                    startContent={<Car className="size-5" />}
                    className="flex justify-start"
                  >
                    {c('my cars')}
                  </Button>
                </Link>
              )}
              <Link href="/dashboard/settings/profile">
                <Button
                  variant="light"
                  size="sm"
                  fullWidth
                  startContent={<PersonIcon className="size-5" />}
                  className="flex justify-start"
                >
                  {c('profile')}
                </Button>
              </Link>
            </CardBody>
            <CardFooter className="gap-3">
              <LogoutButton />
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default UserButton;

const LogoutButton = () => {
  const { t: useT } = useTranslation();
  const c = (key: string) => useT('common.' + key);
  const { toast } = useToast();
  const { mutate } = useMutation({
    mutationFn: authService.seller.logout,
    onMutate() {
      toast({
        title: 'Logging out',
        description: 'You are about to log out',
      });
    },
    onSuccess() {
      toast({
        title: 'Logged out',
        description: 'You have been logged out',
      });
      query.setQueryData(['me'], null);
    },
    onError() {
      toast({
        // title: 'Error',
        description: 'Something went wrong, please try again',
      });
    },
  });
  return (
    <Button
      onClick={() => mutate()}
      color="danger"
      variant="flat"
      size="sm"
      fullWidth
      startContent={<LogOut />}
      className="flex justify-start"
    >
      {c('logout')}
    </Button>
  );
};
