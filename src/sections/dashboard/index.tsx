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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import clsx from "clsx";
import {
  Boxes,
  CalendarClock,
  CircleUser,
  Home,
  Menu,
  Search,
  SquareAsterisk,
  UnfoldHorizontal,
} from "lucide-react";
import { NavLink as Link, Outlet, useLocation } from "react-router-dom";
import { ModeToggle } from "./themeSwitcher";
export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

export const iframeHeight = "800px";

export const containerClassName = "w-full h-full";

export default function Dashboard() {
  const pathname = useLocation().pathname;
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              {/* <img src={imageUrl} alt="Stratagems" className="h-8 fill-black" /> */}
              <svg
                width="32"
                height="31"
                viewBox="0 0 32 31"
                fill="000000"
                className="fill-black dark:fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 15.4951C0 6.93382 6.90062 0 15.399 0C18.9865 0 22.2898 1.2329 24.9069 3.30417C22.9171 2.18963 20.6136 1.54852 18.1729 1.54852C10.5176 1.54852 4.31289 7.79192 4.31289 15.4951C4.31289 23.1982 10.5176 29.4416 18.1729 29.4416C20.6136 29.4416 22.9171 28.8104 24.9069 27.686C22.2898 29.7572 18.9865 30.9901 15.399 30.9901C6.90062 31 0 24.0563 0 15.4951ZM31.0626 15.4951C31.0626 22.3401 25.5441 27.8931 18.7415 27.8931C15.8695 27.8931 13.2327 26.9068 11.1351 25.2498C12.7328 26.1473 14.5658 26.6503 16.5262 26.6503C22.6525 26.6503 27.6123 21.6497 27.6123 15.4951C27.6123 9.34044 22.6525 4.3398 16.5262 4.3398C14.5756 4.3398 12.7328 4.85269 11.1351 5.74038C13.2327 4.08336 15.8695 3.09704 18.7415 3.09704C25.5441 3.09704 31.0626 8.65002 31.0626 15.4951ZM12.9583 17.7537C13.0367 19.3713 14.2423 20.0124 15.7126 20.0124C16.6438 20.0124 18.1141 19.7362 18.1141 18.5132C18.1141 15.8797 10.3215 17.5762 10.3215 12.5657C10.3215 9.77442 12.8995 8.45275 15.3598 8.45275C18.1337 8.45275 20.6332 9.69551 20.7313 12.7827H17.6632C17.5064 11.3723 16.487 11.0073 15.2421 11.0073C14.409 11.0073 13.3994 11.3131 13.3994 12.329C13.3994 14.7455 21.192 13.0095 21.192 18.1779C21.192 21.3735 18.3592 22.5472 15.6048 22.5472C12.625 22.5472 9.90984 21.0678 9.89023 17.7537H12.9681H12.9583Z"
                />
              </svg>
              <span className="">Stratagems Tools</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
              <Link
                to="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/tokens"
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary",
                  {
                    "bg-muted text-primary": pathname.includes("/tokens"),
                    "text-muted-foreground": !pathname.includes("/tokens"),
                  }
                )}
              >
                <SquareAsterisk className="h-4 w-4" />
                Tokens
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge> */}
              </Link>
              <Link
                to="/sets"
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary",
                  {
                    "bg-muted text-primary": pathname.includes("/sets"),
                    "text-muted-foreground": !pathname.includes("/sets"),
                  }
                )}
              >
                <Boxes className="h-4 w-4" />
                Sets{" "}
              </Link>
              <Link
                to="/lookups"
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary",
                  {
                    "bg-muted text-primary": pathname.includes("/lookups"),
                    "text-muted-foreground": !pathname.includes("/lookups"),
                  }
                )}
              >
                <UnfoldHorizontal className="h-4 w-4" />
                Lookups
              </Link>
              <Link
                to="/last-updates"
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary",
                  {
                    "bg-muted text-primary": pathname.includes("/last-updates"),
                    "text-muted-foreground":
                      !pathname.includes("/last-updates"),
                  }
                )}
              >
                <CalendarClock className="h-4 w-4" />
                Last Updates
              </Link>
            </nav>
          </div>
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
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <svg
                    width="32"
                    height="31"
                    viewBox="0 0 32 31"
                    // fill="000000"
                    className="fill-black dark:fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 15.4951C0 6.93382 6.90062 0 15.399 0C18.9865 0 22.2898 1.2329 24.9069 3.30417C22.9171 2.18963 20.6136 1.54852 18.1729 1.54852C10.5176 1.54852 4.31289 7.79192 4.31289 15.4951C4.31289 23.1982 10.5176 29.4416 18.1729 29.4416C20.6136 29.4416 22.9171 28.8104 24.9069 27.686C22.2898 29.7572 18.9865 30.9901 15.399 30.9901C6.90062 31 0 24.0563 0 15.4951ZM31.0626 15.4951C31.0626 22.3401 25.5441 27.8931 18.7415 27.8931C15.8695 27.8931 13.2327 26.9068 11.1351 25.2498C12.7328 26.1473 14.5658 26.6503 16.5262 26.6503C22.6525 26.6503 27.6123 21.6497 27.6123 15.4951C27.6123 9.34044 22.6525 4.3398 16.5262 4.3398C14.5756 4.3398 12.7328 4.85269 11.1351 5.74038C13.2327 4.08336 15.8695 3.09704 18.7415 3.09704C25.5441 3.09704 31.0626 8.65002 31.0626 15.4951ZM12.9583 17.7537C13.0367 19.3713 14.2423 20.0124 15.7126 20.0124C16.6438 20.0124 18.1141 19.7362 18.1141 18.5132C18.1141 15.8797 10.3215 17.5762 10.3215 12.5657C10.3215 9.77442 12.8995 8.45275 15.3598 8.45275C18.1337 8.45275 20.6332 9.69551 20.7313 12.7827H17.6632C17.5064 11.3723 16.487 11.0073 15.2421 11.0073C14.409 11.0073 13.3994 11.3131 13.3994 12.329C13.3994 14.7455 21.192 13.0095 21.192 18.1779C21.192 21.3735 18.3592 22.5472 15.6048 22.5472C12.625 22.5472 9.90984 21.0678 9.89023 17.7537H12.9681H12.9583Z"
                    />
                  </svg>
                  <span className="sr-only">Stratagems Tools</span>
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/tokens"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <SquareAsterisk className="h-4 w-4" />
                  Tokens
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  to="/sets"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Boxes className="h-5 w-5" />
                  Sets
                </Link>
                <Link
                  to="/lookups"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <UnfoldHorizontal className="h-5 w-5" />
                  Lookups
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search ..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild> */}
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
          <ModeToggle />
          {/* </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
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
