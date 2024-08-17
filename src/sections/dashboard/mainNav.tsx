import { NavLink, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";
import { ModeToggle } from "./themeSwitcher";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = useLocation().pathname;
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <NavLink
        to="/"
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          {
            "text-primary": pathname.includes("/todos"),
          }
        )}
      >
        ToDos
      </NavLink>

      <ModeToggle />
    </nav>
  );
}
