import AlertError from '@/components/section/alertError';
import { TableSectionSkeleton } from '@/components/section/tableSectionSkeletton';
import { DataTable } from '@/components/table/data-table';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { DataTableRowActions } from '@/components/table/data-table-row-actions';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useDate from '@/hooks/use-day';
import categoryService from '@/services/category.service';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef, Table } from '@tanstack/react-table';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import query from '@/lib/query';
import { Cross2Icon } from '@radix-ui/react-icons';
import { PlusIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import FormDialogCategory from './formDialog';

const CategoryPage = () => {
  const { dayjs } = useDate();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getCategories,
  });
  const [editDialog, setEditDialog] = useState<Category | undefined>(undefined);

  const columns: ColumnDef<Category>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => <div>{row.getValue('name')}</div>,
      enableSorting: true,
      enableHiding: false,
    },

    {
      accessorKey: 'description',

      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span
              data-testid={row.getValue('title')}
              className="max-w-[500px] truncate text-xs line-clamp-3"
            >
              {row.getValue('description') ?? '-'}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'productsCount',
      header: ({ column }) => (
        <DataTableColumnHeader
          className="w-[120px] flex items-center justify-center "
          column={column}
          title="Products"
        />
      ),

      cell: ({ row }) => (
        <div className="flex items-center justify-center  w-[120px]">
          <NavLink
            to={`/dashboard/management/products?categoryId=${row.original.uid}`}
          >
            <Badge className="h-6 w-6 shrink-0 items-center justify-center rounded-full cursor-pointer">
              {row.original.productsCount ?? 0}
            </Badge>
          </NavLink>
        </div>
      ),
    },
    {
      accessorKey: 'created',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),

      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {dayjs(row.original.createdAt).format('lll')}
            </span>
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          onEdit={(v) => setEditDialog(v.original)}
          onDelete={
            (v) => {
              categoryService.deleteCategory(v.original.id).then(() => {
                query.setQueryData(['categories'], (data: Category[]) => {
                  return data?.filter((d) => d.id !== v.original.id);
                });
              });
            }
            //tokensServices(row.original.id).then(() => refetch())
          }
        />
      ),
    },
  ];
  if (isLoading) return <TableSectionSkeleton rows={10} columns={4} />;
  if (isError)
    return (
      <AlertError
        refetch={refetch}
        title="Failed to get categories"
        className="h-full"
      />
    );
  return (
    <div>
      <DataTable<Category>
        columns={columns}
        data={data ?? []}
        Toolbar={({ table }) => (
          <DataTableToolbarCategory
            table={table}
            onDelete={async () => {
              console.log('delete');
            }}
          />
        )}
      />
      <FormDialogCategory
        open={!!editDialog}
        item={editDialog}
        setOpen={(b) => setEditDialog(b ? editDialog : undefined)}
        onSuccess={() => {
          setEditDialog(undefined);
        }}
      />
    </div>
  );
};

export default CategoryPage;

function DataTableToolbarCategory({
  table,
  onDelete,
}: {
  table: Table<Category>;
  onDelete?: (row: Category[]) => Promise<void>;
}) {
  const [openInsertDialog, setOpenInsertDialog] = useState(false);
  const isFiltered = table.getState().columnFilters.length > 0;
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [globalFilter, setGlobalFilter] = React.useState(
    searchParams.get('query') || '',
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex-col-reverse flex md:flex-row flex-1 items-start md:items-center  gap-2">
        <div className="flex items-center gap-5">
          <Input
            placeholder="Search"
            value={globalFilter}
            onChange={(event) => {
              setSearchParams({ query: event.target.value });
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
                    size={'sm'}
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
                            variant={'secondary'}
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
                            variant={'destructive'}
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
      <Button
        onClick={() => setOpenInsertDialog(true)}
        variant={'secondary'}
        className="gap-2"
      >
        <PlusIcon className="size-4" />
        Add
      </Button>
      <FormDialogCategory
        open={openInsertDialog}
        setOpen={setOpenInsertDialog}
        onSuccess={() => {
          setOpenInsertDialog(false);
        }}
      />
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
