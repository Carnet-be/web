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
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  CalendarDaysIcon,
  PlusIcon,
  ArrowUpIcon,
  ShoppingCartIcon,
  UsersIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { CircleMinus, DollarSignIcon, PackageIcon, Users } from 'lucide-react';
import staticData from '@/data/data';

const Overview: React.FC = () => {
  const [timeframe, setTimeframe] = useState('this_week');
  const [widgets, setWidgets] = useState<string[]>([
    'total_sales',
    'revenue',
    'orders',
    'new_customers',
    'order_status',
    'customer_activity',
    'product_inventory',
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {widgets.map((widget, index) => (
            <div key={index}>
              {widget === 'total_sales' && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Sales
                      <Button
                        variant="link"
                        onClick={() => handleWidgetRemove(widget)}
                      >
                        <CircleMinus className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </CardTitle>
                    <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${data.totalSales.amount.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ArrowUpIcon className="w-3 h-3" />
                      <span>
                        {data.totalSales.growth}% from last week
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {/*  proper chart component */}
                  </CardFooter>
                </Card>
              )}
              {widget === 'revenue' && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Revenue
                      <Button
                        variant="link"
                        onClick={() => handleWidgetRemove(widget)}
                      >
                        <CircleMinus className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </CardTitle>
                    <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
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
                  <CardFooter>{/* proper chart component */}</CardFooter>
                </Card>
              )}
              {widget === 'orders' && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Orders
                      <Button
                        variant="link"
                        onClick={() => handleWidgetRemove(widget)}
                      >
                        <CircleMinus className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </CardTitle>
                    <ShoppingCartIcon className="w-4 h-4 text-muted-foreground" />
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
                  <CardFooter>{/* proper chart component */}</CardFooter>
                </Card>
              )}
              {widget === 'new_customers' && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      New Customers
                      <Button
                        variant="link"
                        onClick={() => handleWidgetRemove(widget)}
                      >
                        <CircleMinus className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </CardTitle>
                    <UsersIcon className="w-4 h-4 text-muted-foreground" />
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
                  <CardFooter>{/* proper chart component */}</CardFooter>
                </Card>
              )}
              {widget === 'order_status' && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Order Status
                      <Button
                        variant="link"
                        onClick={() => handleWidgetRemove(widget)}
                      >
                        <CircleMinus className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </CardTitle>
                    <ShoppingCartIcon className="w-4 h-4 text-muted-foreground" />
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
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order</TableHead>
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
                            <TableCell>${order.amount.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardFooter>
                </Card>
              )}
              {widget === 'customer_activity' && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Customer Activity
                      <Button
                        variant="link"
                        onClick={() => handleWidgetRemove(widget)}
                      >
                        <CircleMinus className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </CardTitle>
                    <Users className="w-4 h-4 text-muted-foreground" />
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
                  <CardFooter>{/* proper chart component */}</CardFooter>
                </Card>
              )}
              {widget === 'product_inventory' && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Product Inventory
                      <Button
                        variant="link"
                        onClick={() => handleWidgetRemove(widget)}
                      >
                        <CircleMinus className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </CardTitle>
                    <PackageIcon className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {data.productInventory.map((product, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center gap-2"
                        >
                          <div className="text-2xl font-bold">
                            {product.quantity.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {product.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline">
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Reorder
                      </Button>
                      <Button>
                        <PackageIcon className="w-4 h-4 mr-2" />
                        Manage
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )}
              {widget === 'notifications' && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Notifications
                      <Button
                        variant="link"
                        onClick={() => handleWidgetRemove(widget)}
                      >
                        <CircleMinus className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </CardTitle>
                    <BellIcon className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {data.notifications.map((notification, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col p-2 border-b border-muted-foreground/20 last:border-none"
                        >
                          <div className="text-sm font-medium">
                            {notification.message}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {notification.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Overview;
