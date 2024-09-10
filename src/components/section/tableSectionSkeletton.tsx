import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function TableSectionSkeleton({
  columns = 5,
  rows = 7,
  addButton = true,
}: {
  columns?: number;
  rows?: number;
  addButton?: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-[250px]" />
        {addButton && <Skeleton className="h-10 w-[100px]" />}{' '}
        {/* Button in top right */}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columns }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-[100px]" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, row) => (
              <TableRow key={row}>
                {Array.from({ length: columns }).map((_, cell) => (
                  <TableCell key={cell}>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8" /> {/* Previous page button */}
          <Skeleton className="h-8 w-8" /> {/* Page number */}
          <Skeleton className="h-8 w-8" /> {/* Next page button */}
        </div>
      </div>
    </div>
  );
}
