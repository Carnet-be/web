import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { CalendarDaysIcon, PlusIcon, ArrowUpIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import {  DollarSignIcon } from "lucide-react"
import staticData from "@/data/data"

const Overview: React.FC = () => {
  const [timeframe, setTimeframe] = useState("this_week")
  const [widgets, setWidgets] = useState<string[]>([
    "total_sales",
    "revenue",
    "orders",
    "new_customers",
    "order_status",
    "customer_activity",
    "product_inventory",
    "notifications",
  ]);

  const handleWidgetAdd = (widget: string) => {
    if (!widgets.includes(widget)) {
      setWidgets([...widgets, widget]);
    }
  };


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center justify-between w-full">
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
                "total_sales",
                "revenue",
                "orders",
                "new_customers",
                "order_status",
                "customer_activity",
                "product_inventory",
                "notifications",
              ].map((widget) => (
                <DropdownMenuItem
                  key={widget}
                  onSelect={() => handleWidgetAdd(widget)}
                  className={widgets.includes(widget) ? "line-through" : ""}
                >
                  {widget.replace(/_/g, " ")}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {widgets.map((widget, index) => (
            <div key={index}>
              {widget === "total_sales" && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                    <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{staticData.totalSales.amount}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ArrowUpIcon className="w-3 h-3" />
                      <span>{staticData.totalSales.growth}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {/* Replace TimeseriesChart with a proper chart component */}
                  </CardFooter>
                </Card>
              )}
              {widget === "revenue" && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{staticData.revenue.amount}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ArrowUpIcon className="w-3 h-3" />
                      <span>{staticData.revenue.growth}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {/* proper chart component */}
                  </CardFooter>
                </Card>
              )}
              {widget === "orders" && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Orders</CardTitle>
                    <ShoppingCartIcon className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{staticData.orders.amount}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ArrowUpIcon className="w-3 h-3" />
                      <span>{staticData.orders.growth}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {/* proper chart component */}
                  </CardFooter>
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

