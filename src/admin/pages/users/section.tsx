import { getImageUrl } from '@/lib/utils';
import userService from '@/services/user.service';
import {
  Avatar,
  Button,
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
import { useNavigate, useSearchParams } from 'react-router-dom';

export const UsersTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: rows,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['users', searchParams.toString()],
    queryFn: () => userService.searchUsers(searchParams.toString()),
  });
  //
  const columns = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'avatar',
      label: 'AVATAR',
    },
    {
      key: 'name',
      label: 'NAME',
    },
    {
      key: 'email',
      label: 'EMAIL',
    },
    {
      key: 'phone',
      label: 'PHONE',
    },

    {
      key: 'registeredAt',
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

  const router = useNavigate();
  const render = (item: User, columnKey: any) => {
    const value = getKeyValue(item, columnKey);
    switch (columnKey) {
      case 'avatar':
        return <Avatar src={getImageUrl(item.avatar)} />;
      case 'name':
        return item.firstName + ' ' + item.lastName;
      case 'registeredAt':
      case 'updatedAt':
        return value ? new Date(value).toLocaleDateString() : '-';

      case '':
        return (
          <div className="flex items-center justify-end space-x-2">
            <Button
              isIconOnly
              key="edit"
              onClick={() => {
                //router.push(`/forms/car/${item.id}`);
                router(`edit/${item.uid}`);
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
