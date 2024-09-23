import { getImageUrl } from '@/lib/utils';
import garageService from '@/services/garage.service';
import {
  Avatar,
  Button,
  Chip,
  getKeyValue,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { Edit } from 'lucide-react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

export const GaragesTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const {
    data: rows,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['garages', searchParams.toString()],
    queryFn: () => garageService.getGarages(searchParams.toString()),
  });

  const columns = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'logo',
      label: 'LOGO',
    },
    {
      key: 'name',
      label: 'NAME',
    },
    {
      key: 'description',
      label: 'DESCRIPTION',
    },
    {
      key: 'slug',
      label: 'SLUG',
    },
    {
      key: 'city',
      label: 'CITY',
    },
    {
      key: 'carCount',
      label: 'CAR COUNT',
    },
    {
      key: 'createdAt',
      label: 'CREATED AT',
    },
    {
      key: 'actions',
      label: '',
    },
  ];

  const router = useNavigate();
  const render = (item: Garage, columnKey: any) => {
    const value = getKeyValue(item, columnKey);
    switch (columnKey) {
      case 'logo':
        return <Avatar src={getImageUrl(item.logo)} />;

      case 'city':
        return <div className="max-w-xs line-clamp-2">{item.city?.name}</div>;
      case 'carCount':
        return <Chip>{value}</Chip>;
      case 'slug':
        return (
          <Link
            to={`/${item.slug}`}
            className="text-blue-500 hover:text-blue-700"
          >
            {value}
          </Link>
        );
      case 'createdAt':
      case 'updatedAt':
        return value ? new Date(value).toLocaleDateString() : '-';
      case 'actions':
        return (
          <div className="flex items-center justify-end space-x-2">
            <Button
              isIconOnly
              size="sm"
              onClick={() => {
                router(`edit/${item.id}`);
              }}
            >
              <Edit size={18} />
            </Button>
          </div>
        );
      default:
        return getKeyValue(item, columnKey);
    }
  };

  return (
    <Table
      aria-label="Garages table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
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
      layout="auto"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            allowsSorting={column.key !== 'actions'}
            className={column.key === 'id' ? 'w-10' : ''}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        loadingState={isError ? 'error' : isLoading ? 'loading' : undefined}
        loadingContent={<Spinner />}
        emptyContent={isLoading ? '' : 'No garages found'}
        items={rows?.data ?? []}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === 'actions' ? (
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      isIconOnly
                      size="sm"
                      onClick={() => {
                        router(`edit/${item.id}`);
                      }}
                    >
                      <Edit size={18} />
                    </Button>
                  </div>
                ) : (
                  render(item as any, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
