// import imageUrl from "@/assets/logo.svg";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Plus } from "lucide-react";
// import { useState } from "react";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import TodoForm from "../todos/todoForm";
// import { MainNav } from "./mainNav";
// import { ModeToggle } from "./themeSwitcher";
// import { UserNav } from "./userNav";
// export default function DashboardSection() {
//   const [openInsertDialog, setOpenInsertDialog] = useState(false);
//   const pathname = useLocation().pathname;
//   const nav = useNavigate();
//   return (
//     <>
//       <div className="flex-col md:flex relative">
//         <div className="border-b sticky top-0 left-0 backdrop-blur-xl">
//           <div className="flex h-16 items-center px-4 container ">
//             <img src={imageUrl} alt="Logo" className="h-8" />
//             <MainNav className="mx-6" />
//             <div className="ml-auto flex items-center space-x-4">
//               <ModeToggle />
//               <UserNav />
//             </div>
//           </div>
//         </div>
//         <div className="flex-1 space-y-4 p-3 md:p-8 pt-6">
//           <div className="flex items-center justify-between space-y-2">
//             <h2 className="text-lg md:text-3xl font-bold tracking-tight">
//               Dashboard
//             </h2>
//             <div className="flex items-center space-x-2">
//               <Dialog
//                 open={openInsertDialog}
//                 onOpenChange={setOpenInsertDialog}
//               >
//                 <DialogTrigger>
//                   <Button size={"sm"} className="flex items-center gap-2">
//                     <Plus />
//                     New Task
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Add new toDo</DialogTitle>
//                     <DialogDescription>
//                       <TodoForm
//                         onSuccess={() => {
//                           if (!pathname.includes("/todos")) {
//                             nav("/todos");
//                           }
//                           setOpenInsertDialog(false);
//                         }}
//                       />
//                     </DialogDescription>
//                   </DialogHeader>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// }

import { Button } from '@/components/ui/button';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import authService from '@/services/auth.service';
import useAuthStore from '@/state/auth';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import {
  BadgePercent,
  ChartNoAxesColumn,
  CircleUser,
  LogOut,
  Menu,
  Package,
  ReceiptText,
  Search,
  Settings,
  Shirt,
  Store,
  UsersRound,
} from 'lucide-react';
import { NavLink as Link, Outlet, useLocation } from 'react-router-dom';
import { LanguageToggle } from './languageSwitcher';
import ShopSwitcher from './shopSwitcher';
import { ModeToggle } from './themeSwitcher';
export const description =
  'A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.';

export const iframeHeight = '800px';

export const containerClassName = 'w-full h-full';

export default function Dashboard() {
  const pathname = useLocation().pathname;

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
          label: 'Dashboard',
          icon: <ChartNoAxesColumn className="h-4 w-4" />,
          route: '/dashboard',
        },
        {
          label: 'Shop',
          icon: <Store className="h-4 w-4" />,
          route: '/shop',
        },
      ],
    },
    {
      groupLabel: 'Management',
      items: [
        {
          label: 'Products',
          icon: <Shirt className="h-4 w-4" />,
          route: '/products',
        },
        {
          label: 'Orders',
          icon: <Package className="h-4 w-4" />,
          route: '/orders',
        },
        {
          label: 'Customers',
          icon: <UsersRound className="h-4 w-4" />,
          route: '/customers',
        },
        {
          label: 'Offers',
          icon: <BadgePercent className="h-4 w-4" />,
          route: '/offers',
        },
      ],
    },
    {
      groupLabel: 'Settings',
      items: [
        {
          label: 'General',
          icon: <Settings className="h-4 w-4" />,
          route: '/settings/general',
        },
        {
          label: 'Billing',
          icon: <ReceiptText className="h-4 w-4" />,
          route: '/settings/billing',
        },
      ],
    },
  ];

  const { clear } = useAuthStore();
  const { toast, dismiss } = useToast();
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

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <ShopSwitcher />
          </div>
          <div className="flex-1">
            <nav className="grid items-start p-4 px-7 text-sm font-medium  gap-2">
              {menu.map((group) => (
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
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </div>
          <SupportCard />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium space-y-2">
                <ShopSwitcher />
                {menu.map((group) => (
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
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </nav>
              <div className="grow"></div>
              <SupportCard />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search ..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
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
          <ModeToggle />
          <LanguageToggle />
        </header>

        <main className="flex flex-1 flex-col">
          <ScrollArea className="h-[calc(100vh-70px)] m-1  p-4  gap-4 lg:gap-6 lg:p-6">
            <Outlet />
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}

function SupportCard() {
  return (
    <div className="p-5">
      <Card>
        <CardHeader className="pt-0 p-4">
          <CardDescription>
            Do you need help? Contact our support team.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
          <Button variant={'default'} size="sm" className="w-full">
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
