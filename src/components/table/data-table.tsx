/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Cross2Icon } from "@radix-ui/react-icons";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingState,
  Table as TableT,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AxiosResponse } from "axios";
import * as React from "react";
// import { useMutation } from "react-query";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./data-table-view-options";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDelete?: (row: TData[]) => Promise<AxiosResponse<void, any>>;
  onSuccessfulDelete?: () => void;
  // type?: "lookup" | "set" | "lookup-values" | "set-values" | "token";
}
declare module "@tanstack/react-table" {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    myfilter: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}
export function DataTable<TData, TValue>({
  columns,
  data,
  onDelete,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const filter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "myfilter",
    filterFns: {
      myfilter: filter, //define as a filter function that can be used in column definitions
    },
  });

  function getSelectionSize() {
    const items = table.getSelectedRowModel();
    // for (const row in table.getState().rowSelection) {
    //   if (table.getState().rowSelection[row]) {
    //     items.push(row);
    //   }
    // }
    return items.rows.length;
  }

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  // const { mutate, isLoading } = useMutation(onDelete!, {
  //   onSuccess: () => {
  //     toast.success("Deleted successfully");
  //     onSuccessfulDelete && onSuccessfulDelete();

  //     setOpenDeleteDialog(false);
  //     table.setRowSelection({});
  //   },
  //   // onError: (error) => {
  //   //   console.log(error);
  //   //   toast.error("An error occurred");
  //   // },
  // });

  function DataTableToolbar<TData>({
    table,
  }: {
    table: TableT<TData>;
    searchOn?: string[];
  }) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
      <div className="flex items-center justify-between">
        <div className="flex-col-reverse flex md:flex-row flex-1 items-start md:items-center  gap-2">
          <div className="flex items-center gap-5">
            <Input
              placeholder="Search"
              autoFocus
              value={globalFilter}
              onChange={(event) => {
                setGlobalFilter(event.target.value);
              }}
              className="h-10 w-full lg:w-[300px] outline-none ring-transparent focus:ring-2 focus:ring-primary-500"
            />
            {getSelectionSize() > 0 &&
              (onDelete ? (
                <Dialog
                  open={openDeleteDialog}
                  onOpenChange={setOpenDeleteDialog}
                >
                  <DialogTrigger>
                    <Button
                      variant="destructive"
                      size={"sm"}
                      className="flex items-center"
                    >
                      Delete ({getSelectionSize()})
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirmation</DialogTitle>
                      <DialogDescription>
                        <div className="space-y-2">
                          <span>
                            You are about to delete ({getSelectionSize()}) items
                          </span>
                          <div className="flex justify-end space-x-2">
                            <Button
                              onClick={() => {
                                setOpenDeleteDialog(false);
                              }}
                              variant={"secondary"}
                            >
                              Cancel
                            </Button>
                            <Button
                              //  disabled={isLoading}
                              onClick={() => {
                                // const items = table.getSelectedRowModel();
                                // mutate(
                                //   items.rows.map((i) => i.original as any)
                                // );
                              }}
                              className="flex items-center gap-3"
                              variant={"destructive"}
                            >
                              {/* {isLoading && (
                                <Loader2 className="animate-spin size-4" />
                              )} */}
                              Delete
                            </Button>
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ) : null)}
          </div>

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <DataTableViewOptions table={table} />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-2">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
