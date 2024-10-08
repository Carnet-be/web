import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { ReactNode } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (row: Row<TData>) => void;
  onDelete?: (row: Row<TData>) => void;
  children?: ReactNode;
}

export function DataTableRowActions<TData>({
  row,
  onEdit,
  onDelete,
  children,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {onEdit && (
          <DropdownMenuItem
            onClick={() => {
              onEdit(row);
            }}
          >
            Edit
          </DropdownMenuItem>
        )}
        {children}
        {onDelete && (
          <DropdownMenuItem
            onClick={() => {
              onDelete(row);
            }}
          >
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
