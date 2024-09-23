import { useToast } from '@/components/ui/use-toast';
import { getImageUrl } from '@/lib/utils';
import carService from '@/services/car.service';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Pagination,
  Spinner,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  getKeyValue,
} from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MoreHorizontal, Search, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';

export const CarTypeSwitch = ({}: {}) => {
  const [searchParams] = useSearchParams();

  return (
    <Tabs
      onSelectionChange={() => {
        // const params = new URLSearchParams(searchParams);
        // params.set('type', k.toString());
        // router.replace(`${pathname}?${params.toString()}`);
      }}
      selectedKey={searchParams.get('type') ?? 'direct'}
      aria-label="Options"
      color="primary"
      variant="solid"
    >
      <Tab
        key="direct"
        title={
          <div className="flex items-center space-x-2">
            <span>Marketplace</span>
          </div>
        }
      />
      <Tab
        key="auction"
        disabled
        title={
          <div className="flex items-center space-x-2 cursor-not-allowed">
            <span>Auctions</span>
          </div>
        }
      />
    </Tabs>
  );
};
export function TabsSection({}: {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const isDirect = searchParams.get('type') != 'auction';

  return (
    <div className="flex w-full flex-col">
      {isDirect ? (
        <Tabs
          aria-label="Options"
          color="primary"
          variant="underlined"
          onSelectionChange={(k) => {
            searchParams.set('status', k.toString());
            setSearchParams(searchParams);
          }}
          selectedKey={searchParams.get('status') ?? 'published'}
          classNames={{
            tabList:
              'gap-6 w-full relative rounded-none p-0 border-b border-divider',
            cursor: 'w-full bg-primary',
            tab: 'max-w-fit px-0 h-12',
            tabContent: 'group-data-[selected=true]:text-primary',
          }}
        >
          <Tab
            key="published"
            title={
              <div className="flex items-center space-x-2">
                <span>Published</span>
              </div>
            }
          />

          <Tab
            key="pending"
            title={
              <div className="flex items-center space-x-2">
                <span>Pending</span>
              </div>
            }
          />
        </Tabs>
      ) : (
        <Tabs
          aria-label="Options"
          color="primary"
          variant="underlined"
          onSelectionChange={() => {
            // const params = new URLSearchParams(searchParams);
            // params.set('status', k.toString());
            // router.replace(`${pathname}?${params.toString()}`);
          }}
          selectedKey={searchParams.get('status') ?? 'published'}
          classNames={{
            tabList:
              'gap-6 w-full relative rounded-none p-0 border-b border-divider',
            cursor: 'w-full bg-primary',
            tab: 'max-w-fit px-0 h-12',
            tabContent: 'group-data-[selected=true]:text-primary',
          }}
        >
          <Tab
            key="published"
            title={
              <div className="flex items-center space-x-2">
                <span>Published</span>
                <Chip size="sm" variant="faded">
                  {0}
                </Chip>
              </div>
            }
          />
          <Tab
            key="paused"
            title={
              <div className="flex items-center space-x-2">
                <span>Paused</span>
                <Chip size="sm" variant="faded">
                  {0}
                </Chip>
              </div>
            }
          />
          <Tab
            key="pending"
            title={
              <div className="flex items-center space-x-2">
                <span>Pending</span>
                <Chip size="sm" variant="faded">
                  {0}
                </Chip>
              </div>
            }
          />
          <Tab
            key="finished"
            title={
              <div className="flex items-center space-x-2">
                <span>Need Confirmation</span>
                <Chip size="sm" variant="faded">
                  {0}
                </Chip>
              </div>
            }
          />
          <Tab
            key="completed"
            title={
              <div className="flex items-center space-x-2">
                <span>Completed</span>
                <Chip size="sm" variant="faded">
                  {0}
                </Chip>
              </div>
            }
          />
        </Tabs>
      )}
    </div>
  );
}

export const AdminSearchSection = ({
  data,
}: {
  data: {
    brands: Brand[];
    models: Model[];
  };
}) => {
  const brands = data.brands;
  const models = data.models;
  const pathname = useLocation().pathname;
  const router = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearch = (key: string, value: string | null | undefined) => {
    if (!value) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    setSearchParams(searchParams);
  };
  const [searchInput, setSearchInput] = useState<string>(
    searchParams.get('search') ?? '',
  );
  const debouncedValue = useDebounce<string>(searchInput, 400);
  useEffect(() => {
    setSearch('search', debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Autocomplete
          //variant={variant}
          label="Brand"
          placeholder="Select a brand"
          variant="faded"
          labelPlacement="outside"
          selectedKey={
            (searchParams.get('brand')
              ? searchParams.get('brand')
              : null) as any
          }
          onSelectionChange={(k: any) => {
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            const value = k?.toString();
            setSearch('brand', value);
          }}
        >
          {brands.map((b) => (
            <AutocompleteItem
              key={b.id}
              value={b.id}
              // startContent={<Avatar alt="Argentina" className="w-6 h-6" src="https://flagcdn.com/ar.svg" />}
            >
              {b.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>

        <Autocomplete
          //variant={variant}
          label="Models"
          placeholder="Select a model"
          variant="faded"
          labelPlacement="outside"
          selectedKey={
            (searchParams.get('model')
              ? searchParams.get('model')
              : undefined) as any
          }
          disabled={!searchParams.get('brand')}
          onSelectionChange={(k: any) => {
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            const value = k?.toString();
            setSearch('model', value);
          }}
        >
          {models
            .filter((m) => m.brandId.toString() == searchParams.get('brand'))
            .map((b) => (
              <AutocompleteItem key={b.id} value={b.id}>
                {b.name}
              </AutocompleteItem>
            ))}
        </Autocomplete>
      </div>
      <div className="flex flex-row items-center justify-end gap-4 pt-4">
        <Button
          onClick={() => {
            // const params = new URLSearchParams(searchParams);
            // params.delete('search');
            // params.delete('brand');
            // params.delete('model');
            // router.replace(`${pathname}?${params.toString()}`);
            setSearchParams({});
          }}
          className={
            searchParams.has('search') ||
            searchParams.has('brand') ||
            searchParams.has('model')
              ? undefined
              : 'hidden'
          }
          startContent={<XIcon size={20} />}
        >
          Reset Filters
        </Button>
        <Input
          //variant={variant}
          startContent={
            <Search className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
          }
          placeholder="Search"
          className="w-[400px]"
          isClearable
          value={searchInput}
          onClear={() => setSearchInput('')}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export const CarsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const {
    data: rows,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['cars', searchParams.toString()],
    queryFn: () =>
      carService.search({
        query: searchParams.get('search') ?? undefined,
        brandId: searchParams.get('brand') ?? undefined,
        modelId: searchParams.get('model') ?? undefined,
        status: (searchParams.get('status') as any) ?? 'published',
        page: parseInt(searchParams.get('page') ?? '1'),
        limit: 20,
      }),
  });
  //
  const columns = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'image',
      label: 'IMAGE',
    },
    {
      key: 'name',
      label: 'NAME',
    },

    {
      key: 'createdAt',
      label: 'CREATED AT',
    },
    {
      key: 'updatedAt',
      label: 'LAST UPDATE',
    },
    {
      key: '',
      label: '',
    },
  ];

  const { toast } = useToast();

  const { mutate: updateCars, isPending: isUpdating } = useMutation({
    mutationFn: carService.updateCarStatus,
    onSuccess: () => {
      void refetch();
      toast({
        title: 'Car updated',
        variant: 'default',
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: 'Error updating car',
        variant: 'destructive',
      });
    },
  });
  const router = useNavigate();
  const render = (item: Car, columnKey: any) => {
    const value = getKeyValue(item, columnKey);
    switch (columnKey) {
      case 'image':
        return (
          <div className="relative flex aspect-[3/2] w-[120px]  flex-col items-center justify-center overflow-hidden rounded-sm bg-white">
            <Image
              src={getImageUrl(item.images?.[0])}
              alt="photo"
              radius="sm"
              className="w-full h-full object-cover"
            />
          </div>
        );
      case 'createdAt':
      case 'updatedAt':
        return value ? new Date(value).toLocaleDateString() : '-';
      case 'state':
        return (
          <Chip variant="faded" size="sm" className="mx-auto">
            <span className="text-sm">{value}</span>
          </Chip>
        );
      case '':
        return (
          <div className="flex items-center justify-end space-x-2">
            {searchParams.get('status') == 'pending' && (
              <Button
                isLoading={isUpdating}
                onClick={() => {
                  updateCars({
                    id: item.id,
                    status: 'published',
                  });
                }}
                size="sm"
                color="primary"
              >
                Publish
              </Button>
            )}
            {searchParams.get('status') == 'published' ||
              (!searchParams.get('status') && (
                <Button
                  isLoading={isUpdating}
                  onClick={() => {
                    updateCars({ id: item.id, status: 'pending' });
                  }}
                  size="sm"
                  color="primary"
                >
                  Unpublish
                </Button>
              ))}
            <Dropdown>
              <DropdownTrigger>
                <Button size="sm" isIconOnly>
                  <MoreHorizontal />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="new"
                  onClick={() => {
                    //router.push(`cars/view/${item.id}`);
                  }}
                >
                  View
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  onClick={() => {
                    //router.push(`/forms/car/${item.id}`);
                    router(`edit/${item.uid}`);
                  }}
                >
                  Edit
                </DropdownItem>

                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  Delete permanently
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return getKeyValue(item, columnKey);
    }
  };
  return (
    <Table
      aria-label="Example empty table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            // color="secondary"
            page={
              searchParams.get('page')
                ? parseInt(searchParams.get('page') ?? '1')
                : 1
            }
            total={Math.ceil((rows?.total ?? 0) / (rows?.limit ?? 1))}
            onChange={(page) => {
              const totalPages = Math.ceil(
                (rows?.total ?? 0) / (rows?.limit ?? 1),
              );
              if (page <= totalPages) {
                searchParams.set('page', page.toString());
                setSearchParams(searchParams);
              }
            }}
          />
        </div>
      }
      classNames={{
        wrapper: 'min-h-[222px]',
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        loadingState={isError ? 'error' : isLoading ? 'loading' : undefined}
        loadingContent={<Spinner />}
        emptyContent={isLoading ? '' : 'No cars found'}
        items={rows?.data ?? []}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{render(item as any, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
