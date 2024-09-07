import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  ArrowUpIcon,
  CalendarDaysIcon,
  CircleMinus,
  DollarSignIcon,
  EllipsisVertical,
  PackageIcon,
  PlusIcon,
  ShoppingCartIcon,
  Users,
  UsersIcon,
} from 'lucide-react';
import staticData from '@/data/data';
import RevenueChart from '@/components/charts/RevenueChart';
import { ScrollArea } from '@/components/ui/scroll-area';
import CustomerActivityChart from '@/components/charts/CustomerActivityChart';


const Overview: React.FC = () => {
  const [timeframe, setTimeframe] = useState('this_week');
  const [widgets, setWidgets] = useState<string[]>([
    'total_sales',
    'orders',
    'new_customers',
    'product_inventory',
    'revenue',
    'customer_activity',
    'order_status',
    'notifications',
  ]);

  const handleWidgetAdd = (widget: string) => {
    if (!widgets.includes(widget)) {
      setWidgets([...widgets, widget]);
    }
  };
  const handleWidgetRemove = (widget: string) => {
    setWidgets(widgets.filter((w) => w !== widget));
  };
  const data = staticData(timeframe);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center justify-between w-full pt-4">
          <div className="grid grid-cols-1 gap-4">
            <Button variant="secondary" className="flex items-center gap-2">
              <CalendarDaysIcon className="w-4 h-4" />
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="text-left font-normal">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this_week">This Week</SelectItem>
                  <SelectItem value="this_month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="shrink-0">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Widget
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {[
                'total_sales',
                'revenue',
                'orders',
                'new_customers',
                'order_status',
                'customer_activity',
                'product_inventory',
                'notifications',
              ].map((widget) => (
                <DropdownMenuItem
                  key={widget}
                  onSelect={() => handleWidgetAdd(widget)}
                  className="flex items-center"
                >
                  <input
                    type="checkbox"
                    checked={widgets.includes(widget)}
                    onChange={() => handleWidgetAdd(widget)}
                    className="mr-2"
                  />
                  {widget.replace(/_/g, ' ')}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div
          className={`grid gap-4 ${
            widgets.filter((widget) =>
              [
                'total_sales',
                'orders',
                'new_customers',
                'product_inventory',
              ].includes(widget),
            ).length === 1
              ? 'grid-cols-1'
              : widgets.filter((widget) =>
                  [
                    'total_sales',
                    'orders',
                    'new_customers',
                    'product_inventory',
                  ].includes(widget),
                ).length === 2
              ? 'grid-cols-2'
              : widgets.filter((widget) =>
                  [
                    'total_sales',
                    'orders',
                    'new_customers',
                    'product_inventory',
                  ].includes(widget),
                ).length === 3
              ? 'grid-cols-3'
              : 'grid-cols-4'
          }`}
        >
          {['total_sales', 'orders', 'new_customers', 'product_inventory'].map(
            (widget) =>
              widgets.includes(widget) && (
                <div key={widget}>
                  {widget === 'total_sales' && (
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="flex items-center text-sm font-medium gap-2">
                          <DollarSignIcon className="w-4 h-4 text-muted-foreground " />
                          Total Sales
                        </CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="link"
                              size="sm"
                              className="shrink-0 "
                            >
                              <EllipsisVertical className="w-4 h-4 text-muted-foreground " />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Button>
                                <PackageIcon className="w-4 h-4 mr-2" />
                                Manage
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Button
                                className="bg-slate-500"
                                onClick={() => handleWidgetRemove(widget)}
                              >
                                <CircleMinus className="w-4 h-4 mr-2 " />
                                Remove
                              </Button>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ${data.totalSales.amount.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <ArrowUpIcon className="w-3 h-3" />
                          <span>{data.totalSales.growth}% from last week</span>
                        </div>
                      </CardContent>
                      <CardFooter></CardFooter>
                    </Card>
                  )}
                  {widget === 'orders' && (
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="flex items-center text-sm font-medium gap-2">
                          <ShoppingCartIcon className="w-4 h-4 text-muted-foreground" />
                          Orders
                        </CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="link"
                              size="sm"
                              className="shrink-0 "
                            >
                              <EllipsisVertical className="w-4 h-4 text-muted-foreground " />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Button>
                                <PackageIcon className="w-4 h-4 mr-2" />
                                Manage
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Button
                                className="bg-slate-500"
                                onClick={() => handleWidgetRemove(widget)}
                              >
                                <CircleMinus className="w-4 h-4 mr-2 " />
                                Remove
                              </Button>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {data.orders.amount.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <ArrowUpIcon className="w-3 h-3" />
                          <span>{data.orders.growth}% from last week</span>
                        </div>
                      </CardContent>
                      <CardFooter></CardFooter>
                    </Card>
                  )}
                  {widget === 'new_customers' && (
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="flex items-center text-sm font-medium gap-2">
                          <UsersIcon className="w-4 h-4 text-muted-foreground" />
                          New Customers
                        </CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="link"
                              size="sm"
                              className="shrink-0 "
                            >
                              <EllipsisVertical className="w-4 h-4 text-muted-foreground " />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Button>
                                <PackageIcon className="w-4 h-4 mr-2" />
                                Manage
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Button
                                className="bg-slate-500"
                                onClick={() => handleWidgetRemove(widget)}
                              >
                                <CircleMinus className="w-4 h-4 mr-2 " />
                                Remove
                              </Button>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {data.newCustomers.amount.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <ArrowUpIcon className="w-3 h-3" />
                          <span>
                            {data.newCustomers.growth}% from last week
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter></CardFooter>
                    </Card>
                  )}
                  {widget === 'product_inventory' && (
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="flex items-center text-sm font-medium gap-2">
                          <PackageIcon className="w-4 h-4 text-muted-foreground" />
                          Product Inventory
                        </CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="link"
                              size="sm"
                              className="shrink-0 "
                            >
                              <EllipsisVertical className="w-4 h-4 text-muted-foreground " />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Button variant="outline">
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Reorder
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Button>
                                <PackageIcon className="w-4 h-4 mr-2" />
                                Manage
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Button
                                className="bg-slate-500"
                                onClick={() => handleWidgetRemove(widget)}
                              >
                                <CircleMinus className="w-4 h-4 mr-2 " />
                                Remove
                              </Button>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-8">
                          {data.productInventory.map((product, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col items-center"
                            >
                              <div className="text-2xl font-bold">
                                {product.quantity.toLocaleString()}
                              </div>
                              <div className="text-nowrap text-xs text-muted-foreground">
                                {product.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter></CardFooter>
                    </Card>
                  )}
                </div>
              ),
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            'revenue',
            'customer_activity',
            'order_status',
            'notifications',
          ].map(
            (widget) =>
              widgets.includes(widget) && (
                <div
                  key={widget}
                  className={
                    widget === 'revenue'
                      ? 'lg:col-span-2 lg:row-span-1 '
                      : widget === 'order_status'
                      ? 'lg:col-span-4 lg:row-span-1 '
                      : widget === 'customer_activity'
                      ? 'lg:col-span-2 lg:row-span-1 '
                      : ''
                  }
                >
                  {widget === 'revenue' && (
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="flex items-center text-sm font-medium gap-2">
                          <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
                          Revenue
                        </CardTitle>
                        <div className="relative inline-block">
                          {' '}
                          <Button
                            variant="link"
                            onClick={() => handleWidgetRemove(widget)}
                            className="relative group"
                          >
                            <CircleMinus className="w-4 h-4 text-muted-foreground" />
                            <span className="absolute bottom-6 left-2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              Remove Widget
                            </span>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ${data.revenue.amount.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <ArrowUpIcon className="w-3 h-3" />
                          <span>{data.revenue.growth}% from last week</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <RevenueChart timeframe={timeframe} />
                      </CardFooter>
                    </Card>
                  )}
                  {widget === 'order_status' && (
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="flex items-center text-sm font-medium gap-2">
                          <ShoppingCartIcon className="w-4 h-4 text-muted-foreground" />
                          Order Status
                        </CardTitle>
                        <div className="relative inline-block">
                          {' '}
                          <Button
                            variant="link"
                            onClick={() => handleWidgetRemove(widget)}
                            className="relative group"
                          >
                            <CircleMinus className="w-4 h-4 text-muted-foreground" />
                            <span className="absolute bottom-6 left-2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              Remove Widget
                            </span>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          {data.orderStatus.statuses.map((status, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col items-center gap-2"
                            >
                              <div className="text-2xl font-bold">
                                {status.count.toLocaleString()}
                              </div>
                              <Badge
                                variant={
                                  status.status === 'Pending'
                                    ? 'secondary'
                                    : 'outline'
                                }
                              >
                                {status.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <ScrollArea className="w-full h-52">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Order</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {data.orderStatus.table.map((order, idx) => (
                                <TableRow key={idx}>
                                  <TableCell>{order.order}</TableCell>
                                  <TableCell>{order.status}</TableCell>
                                  <TableCell>{order.date}</TableCell>
                                  <TableCell>
                                    ${order.amount.toFixed(2)}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </ScrollArea>
                      </CardFooter>
                    </Card>
                  )}
                  {widget === 'customer_activity' && (
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="flex items-center text-sm font-medium gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          Customer Activity
                        </CardTitle>
                        <div className="relative inline-block">
                          {' '}
                          <Button
                            variant="link"
                            onClick={() => handleWidgetRemove(widget)}
                            className="relative group"
                          >
                            <CircleMinus className="w-4 h-4 text-muted-foreground" />
                            <span className="absolute bottom-6 left-2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              Remove Widget
                            </span>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          {data.customerActivity.map((activity, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col items-center gap-2"
                            >
                              <div className="text-2xl font-bold">
                                {activity.count.toLocaleString()}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {activity.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <CustomerActivityChart data={data} />
                      </CardFooter>
                    </Card>
                  )}
                </div>
              ),
          )}
        </div>
      </main>
    </div>
  );
};

export default Overview;
