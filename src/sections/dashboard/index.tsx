import ErrorSection from '@/components/section/errorSection';
import LoadingSection from '@/components/section/loadingSection';
import { useTranslation } from 'react-i18next';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import Logo from '@/components/ui/logo';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
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
  Modal,
  ModalContent,
} from '@nextui-org/react';
import { PersonIcon } from '@radix-ui/react-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import {
  Building,
  Building2,
  Car,
  List,
  LogOut,
  Menu,
  Search,
} from 'lucide-react';
import { useState } from 'react';
import {
  NavLink as Link,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { CardContent, CardDescription } from '@/components/ui/card';
import { getProfileInfo } from '@/lib/utils';
import dataService from '@/services/data.service';
import GarageForm from './GarageForm';
import { LanguageToggle } from './languageSwitcher';
import { ModeToggle } from './themeSwitcher';

export const containerClassName = 'w-full h-full';

export default function Dashboard({ isAdmin = false }: { isAdmin?: boolean }) {
  const { t } = useTranslation();
  const pathname = useLocation().pathname;
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  type Menu = {
    groupLabel: string;
    items: {
      label: string;
      icon: React.ReactNode;
      route: string;
    }[];
  };
  const menuAdmin: Menu[] = [
    {
      groupLabel: t('dashboard.menu.management'),
      items: [
        {
          label: t('dashboard.menu.cars'),
          icon: <List className="h-4 w-4" />,
          route: '/dashboard/admin/cars',
        },
        {
          label: t('dashboard.menu.users'),
          icon: <Car className="h-4 w-4" />,
          route: '/dashboard/admin/users',
        },
        {
          label: t('dashboard.menu.garages'),
          icon: <Building className="h-4 w-4" />,
          route: '/dashboard/admin/garages',
        },
      ],
    },
  ];
  const menu: Menu[] = [
    {
      groupLabel: t('dashboard.menu.general'),
      items: [
        {
          label: t('dashboard.menu.marketplace'),
          icon: <Car className="h-4 w-4" />,
          route: '/dashboard/marketplace',
        },
        {
          label: t('dashboard.menu.garages'),
          icon: <Building className="h-4 w-4" />,
          route: '/dashboard/garages',
        },
        {
          label: t('dashboard.menu.myCars'),
          icon: <List className="h-4 w-4" />,
          route: '/dashboard/my-cars',
        },
      ],
    },

    {
      groupLabel: t('dashboard.menu.settings'),
      items: [
        {
          label: t('dashboard.menu.profile'),
          icon: <PersonIcon className="h-4 w-4" />,
          route: '/dashboard/settings/profile',
        },
      ],
    },
  ];
  const menuGarage: Menu[] = [
    {
      groupLabel: t('dashboard.menu.general'),
      items: [
        {
          label: t('dashboard.menu.marketplace'),
          icon: <Car className="h-4 w-4" />,
          route: '/dashboard/marketplace',
        },
        {
          label: t('dashboard.menu.garages'),
          icon: <Building2 className="h-4 w-4" />,
          route: '/dashboard/garages',
        },
        {
          label: t('dashboard.menu.myCars'),
          icon: <List className="h-4 w-4" />,
          route: '/dashboard/my-cars',
        },
        {
          label: t('dashboard.menu.myGarage'),
          icon: <Building className="h-4 w-4" />,
          route: '/dashboard/my-garage',
        },
      ],
    },

    {
      groupLabel: t('dashboard.menu.settings'),
      items: [
        {
          label: t('dashboard.menu.profile'),
          icon: <PersonIcon className="h-4 w-4" />,
          route: '/dashboard/settings/profile',
        },
      ],
    },
  ];
  const {
    data: user,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['me'],
    queryFn: () => userService.me(),
  });
  const { data: data, isPending: isPendingData } = useQuery({
    queryKey: ['data'],
    queryFn: () => dataService.getAllData(),
  });
  const { clear } = useAuthStore();
  const { toast, dismiss } = useToast();
  const { mutate: changeLanguage } = useMutation({
    mutationFn: userService.updateUser,
  });
  const { mutate } = useMutation({
    mutationFn: authService.seller.logout,
    onMutate() {
      toast({
        title: t('dashboard.toast.success.title'),
        description: t('dashboard.toast.success.description'),
      });
    },
    onSuccess() {
      clear();
      dismiss();
    },
    onError() {
      dismiss();
      toast({
        title: t('dashboard.toast.error.title'),
        description: t('dashboard.toast.error.description'),
      });
    },
  });

  const closeSheet = () => setIsSheetOpen(false);
  const [isOpenNewGarage, setIsOpenNewGarage] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const navigator = useNavigate();
  const getMenu = () => {
    if (isAdmin) {
      return menuAdmin;
    }
    if (user?.isGarage) {
      return menuGarage;
    }
    return menu;
  };

  if (isPending || isPendingData) {
    return <LoadingSection />;
  }

  if (isError) {
    return <ErrorSection refetch={refetch} />;
  }

  // if (user?.isEmailVerified !== true) {
  //   return <WaitingForEmailVerification onRefetch={() => refetch()} />;
  // }

  // if (!user.shops || user.shops.length === 0) {
  //   return (
  //     <div className="relative flex items-center justify-center min-h-screen bg-background">
  //       <ShopFormPage user={user} />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r dark:border-r-muted/40 bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b dark:border-b-muted/40 bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-center">
              <Logo
                type={isAdmin ? 'admin' : user?.isGarage ? 'garage' : 'user'}
              />
            </div>
            <div className="flex-1">
              <nav className="grid items-start p-4 px-7 text-sm font-medium  gap-2">
                {getMenu().map((group) => (
                  <div key={group.groupLabel} className="mb-4 space-y-1">
                    <h3 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                      {group.groupLabel}
                    </h3>
                    {group.items.map((item) => (
                      <Link
                        key={item.label}
                        to={item.route}
                        className={clsx(
                          'flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary',
                          {
                            'bg-muted text-primary': pathname.includes(
                              item.route,
                            ),
                            'text-muted-foreground': !pathname.includes(
                              item.route,
                            ),
                          },
                        )}
                        onClick={closeSheet}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
                {!isAdmin && <SellYourCarCard />}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b dark:border-b-muted/40 bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  color="secondary"
                  size="sm"
                  isIconOnly
                  className="rounded-full md:hidden"
                  onClick={() => setIsSheetOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <div className="flex  gap-2">
                  <ModeToggle />
                  <LanguageToggle
                    onSelect={(lng: string) => {
                      changeLanguage({ user: { language: lng }, id: user.id });
                    }}
                  />
                </div>
                <nav className="grid gap-2 text-lg font-medium space-y-2">
                  {getMenu().map((group) => (
                    <div key={group.groupLabel} className="mb-4 space-y-1">
                      <h3 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                        {group.groupLabel}
                      </h3>
                      {group.items.map((item) => (
                        <Link
                          key={item.label}
                          to={item.route}
                          className={clsx(
                            'flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary',
                            {
                              'bg-muted text-primary': pathname.includes(
                                item.route,
                              ),
                              'text-muted-foreground': !pathname.includes(
                                item.route,
                              ),
                            },
                          )}
                          onClick={closeSheet}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </nav>
                {!isAdmin && <SellYourCarCard />}
                <div className="grow"></div>
              </SheetContent>
            </Sheet>
            <div className=" w-full flex-1">
              <div className="flex md:hidden">
                <Logo className="h-6" />
              </div>
              <form>
                <div className="relative hidden md:flex w-full">
                  <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={t('dashboard.searchPlaceholder')}
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            {!user.isGarage && !isAdmin && (
              <Button
                size="sm"
                onClick={() => {
                  setIsOpenNewGarage(true);
                }}
                color="primary"
              >
                {t('dashboard.createGarage')}
              </Button>
            )}
            <DropdownMenu open={isUserOpen} onOpenChange={setIsUserOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  isIconOnly
                  onClick={() => setIsUserOpen(true)}
                  className="rounded-full"
                >
                  <Avatar src={getProfileInfo(user).image} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-w-[340px] p-0">
                <Card className="w-full">
                  <CardHeader className="justify-between">
                    <div className="flex gap-5">
                      <Avatar
                        isBordered
                        radius="full"
                        size="md"
                        src={getProfileInfo(user).image}
                      />
                      <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                          {getProfileInfo(user).name}
                        </h4>
                        <h5 className="text-small tracking-tight text-primary">
                          {getProfileInfo(user).description}
                        </h5>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="px-3 py-0 text-small text-default-400">
                    <p className="line-clamp-3">{user.garage?.description}</p>
                  </CardBody>
                  <CardFooter className="gap-3 justify-center">
                    {!isAdmin && (
                      <Button
                        color="primary"
                        variant="flat"
                        onClick={() => {
                          navigator('/dashboard/settings/profile');
                          setIsUserOpen(false);
                        }}
                      >
                        <PersonIcon className="mr-2 h-4 w-4" />
                        {t('dashboard.menu.profile')}
                      </Button>
                    )}
                    <Button
                      color="danger"
                      variant="flat"
                      onClick={() => mutate()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {t('dashboard.logout')}
                    </Button>
                  </CardFooter>
                </Card>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="md:flex gap-4 hidden">
              <ModeToggle />
              <LanguageToggle
                onSelect={(lng: string) => {
                  changeLanguage({ user: { language: lng }, id: user.id });
                }}
              />
            </div>
          </header>

          <main className="flex-1 overflow-hidden">
            <ScrollArea className="h-[calc(100vh-60px)]">
              <div className="p-4 lg:p-6">
                <Outlet />
              </div>
            </ScrollArea>
          </main>
        </div>
      </div>
      <Modal
        isDismissable={false}
        placement="auto"
        isOpen={isOpenNewGarage}
        onOpenChange={setIsOpenNewGarage}
      >
        <ModalContent>
          {(onClose) => (
            <GarageForm
              data={data ?? { cities: [], countries: [] }}
              user={user}
              onSuccess={() => onClose()}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function SellYourCarCard() {
  const { t } = useTranslation();
  const nav = useNavigate();
  return (
    <div className="">
      <Card>
        <CardHeader className="pt-0 p-4">
          <CardDescription>
            {t('dashboard.sellYourCar.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
          <Button
            startContent={<Car className="h-4 w-4" />}
            color="primary"
            size="sm"
            onClick={() => {
              nav('/dashboard/my-cars/add');
            }}
            className="w-full"
          >
            {t('dashboard.sellYourCar.button')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Add this state to control the chat visibility
