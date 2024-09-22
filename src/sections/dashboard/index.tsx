import ErrorSection from '@/components/section/errorSection';
import LoadingSection from '@/components/section/loadingSection';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { Button, Modal, ModalContent } from '@nextui-org/react';
import { PersonIcon } from '@radix-ui/react-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import {
  Building,
  Building2,
  Car,
  CircleUser,
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

import dataService from '@/services/data.service';
import GarageForm from './GarageForm';
import { LanguageToggle } from './languageSwitcher';
import { ModeToggle } from './themeSwitcher';

export const description =
  'A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.';

export const iframeHeight = '800px';

export const containerClassName = 'w-full h-full';

export default function Dashboard() {
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
  const menu: Menu[] = [
    {
      groupLabel: 'General',
      items: [
        {
          label: 'Marketplace',
          icon: <Car className="h-4 w-4" />,
          route: '/dashboard/marketplace',
        },
        {
          label: 'Garages',
          icon: <Building className="h-4 w-4" />,
          route: '/dashboard/garages',
        },
        {
          label: 'My cars',
          icon: <List className="h-4 w-4" />,
          route: '/dashboard/my-cars',
        },
      ],
    },

    {
      groupLabel: 'Settings',
      items: [
        {
          label: 'Profile',
          icon: <PersonIcon className="h-4 w-4" />,
          route: '/dashboard/settings/profile',
        },
      ],
    },
  ];
  const menuGarage: Menu[] = [
    {
      groupLabel: 'General',
      items: [
        {
          label: 'Marketplace',
          icon: <Car className="h-4 w-4" />,
          route: '/dashboard/marketplace',
        },
        {
          label: 'Garages',
          icon: <Building2 className="h-4 w-4" />,
          route: '/dashboard/garages',
        },
        {
          label: 'My Cars',
          icon: <List className="h-4 w-4" />,
          route: '/dashboard/my-cars',
        },
        {
          label: 'My Garage',
          icon: <Building className="h-4 w-4" />,
          route: '/dashboard/my-garage',
        },
      ],
    },

    {
      groupLabel: 'Settings',
      items: [
        {
          label: 'Profile',
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
  useQuery({
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
        title: 'Logging out',
        description: 'You are about to log out',
      });
    },
    onSuccess() {
      clear();
      dismiss();
    },
    onError() {
      dismiss();
      toast({
        // title: 'Error',
        description: 'Something went wrong, please try again',
      });
    },
  });

  const closeSheet = () => setIsSheetOpen(false);
  const [isOpenNewGarage, setIsOpenNewGarage] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const getMenu = () => {
    if (user?.isGarage) {
      return menuGarage;
    }
    return menu;
  };

  if (isPending || !user) {
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
              <Logo />
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
                <SellYourCarCard />
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
                      changeLanguage({ language: lng });
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
                <SellYourCarCard />
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
                    placeholder="Search ..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            {!user.isGarage && (
              <Button
                size="sm"
                onClick={() => {
                  setIsOpenNewGarage(true);
                }}
                color="primary"
              >
                Create a garage
              </Button>
            )}
            <DropdownMenu open={isUserOpen} onOpenChange={setIsUserOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  // color="secondary"
                  size="sm"
                  isIconOnly
                  onClick={() => setIsUserOpen(true)}
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => mutate()}
                  className="gap-2 text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="md:flex gap-4 hidden">
              <ModeToggle />
              <LanguageToggle
                onSelect={(lng: string) => {
                  changeLanguage({ language: lng });
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
          {(onClose) => <GarageForm user={user} onSuccess={() => onClose()} />}
        </ModalContent>
      </Modal>
    </>
  );
}

function SellYourCarCard() {
  const nav = useNavigate();
  return (
    <div className="">
      <Card>
        <CardHeader className="pt-0 p-4">
          <CardDescription>A new way to sell your car</CardDescription>
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
            Sell your car
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Add this state to control the chat visibility
