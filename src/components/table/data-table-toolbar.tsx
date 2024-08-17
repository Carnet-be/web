"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { priorities, statuses } from "./data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchOn?: string[];
}

export function DataTableToolbar<TData>({
  table,
  searchOn = [
    "title",
    "name",
    "leftSystem",
    "rightSystem",
    "value",
    "token_id",
    "token_name",
    "left",
    "right",
  ],
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex-col-reverse flex md:flex-row flex-1 items-start md:items-center  gap-2">
        <Input
          placeholder="Search"
          value={
            (table.getColumn("title")?.getFilterValue() as string) ||
            (table.getColumn("name")?.getFilterValue() as string) ||
            (table.getColumn("leftSystem")?.getFilterValue() as string) ||
            (table.getColumn("rightSystem")?.getFilterValue() as string) ||
            (table.getColumn("value")?.getFilterValue() as string) ||
            (table.getColumn("token_id")?.getFilterValue() as string) ||
            (table.getColumn("token_name")?.getFilterValue() as string) ||
            (table.getColumn("left")?.getFilterValue() as string) ||
            (table.getColumn("right")?.getFilterValue() as string) ||
            ""
          }
          onChange={(event) =>
            // table.getColumn("title")?.setFilterValue(event.target.value)
            searchOn.forEach((column) =>
              table.getColumn(column)?.setFilterValue(event.target.value)
            )
          }
          className="h-8 w-full lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
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
